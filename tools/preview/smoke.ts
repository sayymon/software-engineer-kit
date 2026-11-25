// SPDX-License-Identifier: MIT
// Preview smoke check. Starts `astro preview` on a free port over the built site, fetches the main page kinds in every
// built locale, checks the Mermaid asset, the en fallback marker, the search index files, the static API and every
// internal link of the built HTML. Exits non-zero on any failure.
// Env: KIT_OUT_DIR (default ./dist, relative to site/), KIT_LOCALES, SITE_BASE.
import { spawn } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { createServer } from 'node:net';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FsContentRepository, LOCALES, type Locale } from '../../lib/content';
import { SiteIndex } from '../../lib/content/site';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const outName = (process.env.KIT_OUT_DIR ?? './dist').replace(/^\.\//, '');
const outDir = join(root, 'site', outName);
const base = process.env.SITE_BASE && process.env.SITE_BASE !== '/' ? process.env.SITE_BASE.replace(/\/$/, '') : '';
const wanted = (process.env.KIT_LOCALES ?? '').split(',').map((s) => s.trim()).filter(Boolean);
const locales = LOCALES.filter((l) => (wanted.length ? wanted.includes(l) : existsSync(join(outDir, l))));

const failures: string[] = [];
const fail = (msg: string) => {
  failures.push(msg);
  console.error(`FAIL ${msg}`);
};
const pass = (msg: string) => console.log(`ok   ${msg}`);

async function freePort(): Promise<number> {
  return new Promise((res, rej) => {
    const srv = createServer();
    srv.once('error', rej);
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address() as { port: number };
      srv.close(() => res(port));
    });
  });
}

async function get(origin: string, path: string): Promise<{ status: number; text: string }> {
  const res = await fetch(`${origin}${path}`);
  return { status: res.status, text: await res.text() };
}

/** Internal links and assets of every built HTML file must exist in the output. */
function checkInternalLinks(): number {
  let files = 0;
  let links = 0;
  const missing = new Set<string>();
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const abs = join(dir, name);
      if (statSync(abs).isDirectory()) {
        if (name === 'pagefind') continue;
        walk(abs);
      } else if (name.endsWith('.html')) {
        files += 1;
        const html = readFileSync(abs, 'utf8');
        for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
          const url = m[1].replace(/&amp;/g, '&');
          if (!url.startsWith('/') || url.startsWith('//')) continue;
          if (base && !url.startsWith(`${base}/`) && url !== base) continue;
          const path = url.slice(base.length).split('#')[0].split('?')[0];
          const first = path.split('/')[1];
          if ((LOCALES as readonly string[]).includes(first) && !locales.includes(first as Locale)) continue; // other locale not part of this build
          links += 1;
          const target = path.endsWith('/') ? join(outDir, path, 'index.html') : join(outDir, path);
          const alt = existsSync(target) && statSync(target).isDirectory() ? join(target, 'index.html') : target;
          if (!existsSync(alt)) missing.add(`${url} (from ${abs.slice(outDir.length)})`);
        }
      }
    }
  };
  walk(outDir);
  if (missing.size) {
    for (const m of [...missing].slice(0, 30)) fail(`broken internal link ${m}`);
    if (missing.size > 30) fail(`... and ${missing.size - 30} more broken internal links`);
  } else {
    pass(`internal links: ${links} references in ${files} pages all resolve`);
  }
  return missing.size;
}

type Probe = { kind: string; route: string; expect: string[] };

function probes(index: SiteIndex): Probe[] {
  const first = (tipo: string, pick?: (id: string) => boolean) => {
    const list = index.ofTipo(tipo).sort((a, b) => a.id.localeCompare(b.id));
    const page = (pick && list.find((p) => pick(p.id))) || list[0];
    if (!page) throw new Error(`no ${tipo} entity to probe`);
    return page;
  };
  const tool = first('ferramenta');
  const pattern = first('padrao');
  const algo = first('algoritmo');
  const stack = first('stack');
  const guide = first('guia-pratico', (id) => id === 'criar_site');
  const cert = first('certificacao');
  const flow = first('demanda', (id) => id === 'feature');
  const category = first('categoria');
  const list: Probe[] = [
    { kind: 'home', route: '', expect: ['<h1'] },
    { kind: 'tool', route: tool.route, expect: [`<h1>`, 'data-tipo="ferramenta"'] },
    { kind: 'category', route: category.route, expect: ['data-tipo="categoria"'] },
    { kind: 'pattern', route: pattern.route, expect: ['data-tipo="padrao"'] },
    { kind: 'algorithm', route: algo.route, expect: ['class="complexity"', '<pre'] },
    { kind: 'stack', route: stack.route, expect: ['class="checklist"'] },
    { kind: 'guide', route: guide.route, expect: ['data-island="mermaid"', 'vendor/mermaid/mermaid.min.js', 'mermaid-source'] },
    { kind: 'certification', route: cert.route, expect: ['data-tipo="certificacao"'] },
    { kind: 'flow', route: flow.route, expect: ['data-island="mermaid"', 'class="matrix"'] },
    { kind: 'journeys', route: 'journeys', expect: ['<h1'] },
    { kind: 'search', route: 'search', expect: ['id="search-form"'] },
    { kind: 'licenses hub', route: 'fundamentals/licenses', expect: ['class="notice"', ...index.ofTipo('licenca').map((p) => `${p.route}/`)] },
  ];
  const licenseGuide = index.byId.get('guia_de_escolha_de_licenca');
  if (licenseGuide) list.push({ kind: 'license decision guide', route: licenseGuide.route, expect: ['Não é aconselhamento jurídico', 'data-tipo="abordagem"'] });
  for (const [gid, mark] of [['criar_site', 'site_3d_webgl'], ['configurar_git_github', 'ssh_identidades_por_remoto']] as const) {
    const g = index.byId.get(gid);
    if (g) list.push({ kind: `guide ${gid} new branch`, route: g.route, expect: ['data-island="mermaid"', mark] });
  }
  const mit = index.ofTipo('licenca').find((p) => String(p.entity.data.spdx ?? '').toUpperCase() === 'MIT');
  if (mit) list.push({ kind: 'MIT note', route: mit.route, expect: ['class="notice"'] });
  else throw new Error('MIT license note (spdx MIT) is missing: the smoke list requires it');
  return list;
}

async function main() {
  if (!existsSync(join(outDir, 'index.html'))) {
    console.error(`no build at ${outDir}. Run npm run build first.`);
    process.exit(1);
  }
  if (locales.length === 0) {
    console.error('no locale found in the build output');
    process.exit(1);
  }

  const repo = new FsContentRepository(join(root, 'content'));
  const port = await freePort();
  const origin = `http://127.0.0.1:${port}`;
  const server = spawn(process.execPath, [join(root, 'node_modules/astro/bin/astro.mjs'), 'preview', '--root', join(root, 'site'), '--host', '127.0.0.1', '--port', String(port)], {
    cwd: root,
    env: { ...process.env, KIT_ROOT: root, KIT_OUT_DIR: `./${outName}`, ASTRO_TELEMETRY_DISABLED: '1' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let serverLog = '';
  server.stdout.on('data', (d) => (serverLog += String(d)));
  server.stderr.on('data', (d) => (serverLog += String(d)));
  const stop = () => server.kill('SIGTERM');
  process.on('exit', stop);

  try {
    let up = false;
    for (let i = 0; i < 100 && !up; i++) {
      try {
        const r = await fetch(`${origin}${base}/`);
        up = r.status < 500;
      } catch {
        await new Promise((r) => setTimeout(r, 200));
      }
    }
    if (!up) {
      fail(`preview server did not start\n${serverLog}`);
      return;
    }
    pass(`astro preview on ${origin}${base}/`);

    let fallbackSeen = false;
    for (const locale of locales) {
      const index = new SiteIndex(locale as Locale, repo.list(locale as Locale));
      for (const p of probes(index)) {
        const path = `${base}/${locale}/${p.route ? `${p.route}/` : ''}`;
        const { status, text } = await get(origin, path);
        if (status !== 200) {
          fail(`${locale} ${p.kind}: ${path} returned ${status}`);
          continue;
        }
        const missing = p.expect.filter((e) => !text.includes(e));
        if (missing.length) fail(`${locale} ${p.kind}: ${path} lacks ${missing.map((m) => JSON.stringify(m)).join(', ')}`);
        else pass(`${locale} ${p.kind}: ${path}`);
        if (locale === 'en' && text.includes('data-fallback="true"') && text.includes('class="banner"')) fallbackSeen = true;
        if (p.kind === 'licenses hub') {
          const phrase = locale === 'en' ? 'not legal advice' : 'aconselhamento jurídico';
          if (!text.includes(phrase)) fail(`${locale} licenses hub: legal notice "${phrase}" missing`);
        }
        if (p.kind === 'guide' || p.kind === 'flow') {
          const asset = await get(origin, `${base}/vendor/mermaid/mermaid.min.js`);
          if (asset.status !== 200 || asset.text.length < 100000) fail(`${locale} ${p.kind}: mermaid asset not served (status ${asset.status})`);
        }
      }
      for (const api of ['api/index.json', 'api/graph.json', 'api/flows/feature.json']) {
        const { status, text } = await get(origin, `${base}/${locale}/${api}`);
        try {
          const json = JSON.parse(text);
          const ok = status === 200 && (api.endsWith('graph.json') ? json.nodes?.length > 0 && json.edges?.length > 0 : api.endsWith('index.json') ? json.items?.length > 0 : json.raias?.length > 0 && json.diagrams?.completo);
          if (ok) pass(`${locale} ${api}`);
          else fail(`${locale} ${api}: unexpected payload`);
        } catch {
          fail(`${locale} ${api}: not JSON (status ${status})`);
        }
      }
      const entry = await get(origin, `${base}/pagefind/pagefind-entry.json`);
      if (entry.status !== 200) fail(`pagefind entry missing (status ${entry.status})`);
      else {
        const langs = Object.keys(JSON.parse(entry.text).languages ?? {});
        if (langs.some((l) => l.toLowerCase().startsWith(locale.toLowerCase().slice(0, 2)))) pass(`${locale} pagefind language index (${langs.join(', ')})`);
        else fail(`pagefind has no index for ${locale} (found ${langs.join(', ')})`);
      }
    }
    if (locales.includes('en')) {
      if (fallbackSeen) pass('en fallback marker (data-fallback="true" and banner)');
      else fail('no en page carries the fallback marker');
    }
    for (const f of ['pagefind.js', 'pagefind-entry.json']) {
      if (!existsSync(join(outDir, 'pagefind', f))) fail(`pagefind file missing: pagefind/${f}`);
    }
    checkInternalLinks();
  } finally {
    stop();
  }
}

await main();
if (failures.length) {
  console.error(`\nsmoke: ${failures.length} failure(s)`);
  process.exit(1);
}
console.log('\nsmoke: all checks passed');
