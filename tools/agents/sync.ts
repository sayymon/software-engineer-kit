// SPDX-License-Identifier: MIT
// Gera as definições de agente do Claude Code, do OpenCode e do Kiro a partir de .agents/.
// Fonte única: .agents/roles/*.md (papéis) e .agents/mcp.servers.json (MCPs).
// A autonomia vem de `papeis[].atuacao_de_agente` em content/guide/catalogos/papeis.yaml (lido pelo loader do guia):
//   execucao -> pode editar e rodar comandos; apoio -> somente leitura; nao -> sem agente.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { loadGuideDoc } from "../../lib/guide/load";

const root = process.cwd();
type Server = { description: string; type: "local" | "remote"; command?: string[]; url?: string; tokenEnv?: string };
const servers: Record<string, Server> = JSON.parse(readFileSync(join(root, ".agents/mcp.servers.json"), "utf8"));
// Modelos por nível de raciocínio. Só o Kiro aceita `model` por agente; os ids vêm de `/model`.
const modelos: { kiro: Record<string, string> } = JSON.parse(readFileSync(join(root, ".agents/models.json"), "utf8"));
const guia = loadGuideDoc(join(root, "content/guide")) as {
  papeis: { id: string; atuacao_de_agente: "nao" | "apoio" | "execucao" }[];
};
const atuacao = new Map(guia.papeis.map((p) => [p.id, p.atuacao_de_agente]));

const roles = readdirSync(join(root, ".agents/roles"))
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const { data, content } = matter(readFileSync(join(root, ".agents/roles", f), "utf8"));
    const mode = atuacao.get(data.id);
    if (!mode) throw new Error(`Papel ${data.id} não existe em catalogos/papeis.yaml`);
    if (mode === "nao") throw new Error(`Papel ${data.id} tem atuacao_de_agente=nao`);
    const mcp: string[] = data.mcp ?? [];
    for (const m of mcp) if (!servers[m]) throw new Error(`MCP ${m} não está em mcp.servers.json`);
    const modelo: string | undefined = data.modelo;
    if (modelo && !modelos.kiro[modelo]) throw new Error(`Nível de modelo ${modelo} não está em models.json`);
    return { id: data.id as string, name: data.name as string, description: data.description as string, mcp, mode, modelo, body: content.trim() };
  });

const out = (path: string, text: string) => {
  mkdirSync(join(root, path, ".."), { recursive: true });
  writeFileSync(join(root, path), text.endsWith("\n") ? text : text + "\n");
};
const clean = (dir: string, ext: string) => {
  try {
    for (const f of readdirSync(join(root, dir))) if (f.endsWith(ext)) rmSync(join(root, dir, f));
  } catch {}
};
const GEN = "<!-- Gerado por `npm run agents:sync` a partir de .agents/. Edite a fonte. -->";
const q = (s: string) => JSON.stringify(s);

// MCPs do projeto.
const claudeMcp: Record<string, unknown> = {};
const openMcp: Record<string, unknown> = {};
const kiroMcp: Record<string, unknown> = {};
for (const [n, s] of Object.entries(servers)) {
  if (s.type === "local") {
    const [command, ...args] = s.command!;
    claudeMcp[n] = { command, args };
    kiroMcp[n] = { command, args };
    openMcp[n] = { type: "local", command: s.command, enabled: true };
  } else {
    const auth = s.tokenEnv ? `Bearer \${${s.tokenEnv}}` : undefined;
    claudeMcp[n] = { type: "http", url: s.url, ...(auth && { headers: { Authorization: auth } }) };
    kiroMcp[n] = { url: s.url, ...(auth && { headers: { Authorization: auth } }) };
    openMcp[n] = {
      type: "remote",
      url: s.url,
      enabled: true,
      ...(s.tokenEnv && { headers: { Authorization: `Bearer {env:${s.tokenEnv}}` } }),
    };
  }
}
out(".mcp.json", JSON.stringify({ mcpServers: claudeMcp }, null, 2));
out(".kiro/settings/mcp.json", JSON.stringify({ mcpServers: kiroMcp }, null, 2));
// Os MCPs ficam desligados por padrão no OpenCode e cada agente liga os seus.
out(
  "opencode.json",
  JSON.stringify(
    {
      $schema: "https://opencode.ai/config.json",
      instructions: ["AGENTS.md"],
      mcp: openMcp,
      tools: Object.fromEntries(Object.keys(servers).map((n) => [`${n}_*`, false])),
    },
    null,
    2,
  ),
);

clean(".claude/agents", ".md");
clean(".opencode/agents", ".md");
clean(".kiro/agents", ".json");

for (const r of roles) {
  const exec = r.mode === "execucao";
  const claudeTools = [
    "Read", "Grep", "Glob", "WebFetch",
    ...(exec ? ["Edit", "Write", "Bash"] : []),
    ...r.mcp.map((m) => `mcp__${m}`),
  ];
  out(
    `.claude/agents/${r.name}.md`,
    `---\nname: ${r.name}\ndescription: ${q(r.description)}\ntools: ${claudeTools.join(", ")}\n---\n${GEN}\n\n${r.body}`,
  );

  const mcpTools = r.mcp.map((m) => `  ${q(`${m}_*`)}: true`).join("\n");
  out(
    `.opencode/agents/${r.name}.md`,
    `---\ndescription: ${q(r.description)}\nmode: subagent\npermission:\n  edit: ${exec ? "allow" : "deny"}\n  bash: ${exec ? "ask" : "deny"}\n  webfetch: allow\ntools:\n${mcpTools}\n---\n${GEN}\n\n${r.body}`,
  );

  out(
    `.kiro/agents/${r.name}.json`,
    JSON.stringify(
      {
        name: r.name,
        description: r.description,
        prompt: r.body,
        ...(r.modelo && { model: modelos.kiro[r.modelo] }),
        tools: ["read", ...(exec ? ["write", "shell"] : []), ...r.mcp.map((m) => `@${m}`)],
        // Formato V3: leitura e skills sem confirmação; escrita e shell seguem pedindo.
        permissions: { rules: [{ capability: "fs_read", effect: "allow" }, { capability: "skill", effect: "allow" }] },
        includeMcpJson: true,
        resources: ["file://AGENTS.md", "file://.kiro/steering/**/*.md"],
      },
      null,
      2,
    ),
  );
}
console.log(`agents:sync gerou ${roles.length} agentes para Claude Code, OpenCode e Kiro.`);
