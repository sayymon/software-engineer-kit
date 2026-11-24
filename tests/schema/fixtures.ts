// SPDX-License-Identifier: MIT
// One valid and one invalid fixture per entity type. The test fails when a type has no fixture.
import type { Tipo } from '../../lib/schema';

const fonte = {
  id: 'fonte_oficial',
  tipo: 'artigo',
  titulo: 'Documentacao oficial',
  link: 'https://example.org/docs',
  status_revisao: 'revisada',
  proxima_revisao: '2027-01-01',
};

const conceitual = {
  exemplo: 'Um exemplo curto.',
  quando_usar: ['Primeiro cenario', 'Segundo cenario'],
  quando_evitar: ['Cenario a evitar'],
  status: 'rascunho',
  publico: false,
  fontes: [fonte],
  fonte_ids: ['fonte_oficial'],
  dataVerificacao: '2026-11-22',
};

const bigO = { tempoMelhor: 'O(n log n)', tempoMedio: 'O(n log n)', tempoPior: 'O(n^2)', memoria: 'O(log n)' };

const raias = [
  { id: 'api_orq', nome: 'Orquestracao', responsabilidade: 'Coordena o fluxo', cor: '#0072B2', orquestradora: true },
  { id: 'api_exe', nome: 'Execucao', responsabilidade: 'Implementa', cor: '#E69F00' },
];
const nos = [
  { id: 'api_orq_s1', raia: 'api_orq', tipo: 'inicio', rotulo: 'Inicio', proximo: [{ para: 'api_orq_e1', condicao: '' }] },
  { id: 'api_orq_e1', raia: 'api_orq', tipo: 'fim', rotulo: 'Fim', retorno: 'pronto' },
];

export const valid: Record<Tipo, Record<string, unknown>> = {
  ferramenta: { id: 'vscode', tipo: 'ferramenta', nome: 'VS Code', precoUSD: 0, plataformas: ['desktop'], licenca: ['MIT'] },
  categoria: { id: 'editor_de_codigo', tipo: 'categoria', nome: 'Editor de codigo', slug: 'editor-de-codigo', grupo: 'Desenvolvimento' },
  'caso-de-uso': { id: 'programacao_em_par', tipo: 'caso-de-uso', nome: 'Programacao em par', nivel: 'caso', eixo: 'tarefa' },
  empresa: { id: 'acme_software', tipo: 'empresa', nome: 'Acme Software', website: 'https://example.org' },
  modelo: { id: 'modelo_exemplo', tipo: 'modelo', nome: 'Modelo Exemplo', status: 'ativo', contextoTokens: 'não verificado' },
  benchmark: { id: 'bench_exemplo', tipo: 'benchmark', nome: 'Bench Exemplo', area: 'codigo', saturacao: 'baixa' },
  funcionalidade: { id: 'tool_use', tipo: 'funcionalidade', nome: 'Tool use' },
  padrao: {
    id: 'outbox',
    tipo: 'padrao',
    nome: 'Outbox transacional',
    familia: 'distribuido-arquitetura',
    tradeoffs: ['Ganha: consistencia; paga: latencia', 'Ganha: simplicidade; paga: tabela extra'],
    ...conceitual,
  },
  algoritmo: {
    id: 'dijkstra',
    tipo: 'algoritmo',
    nome: 'Dijkstra',
    area: 'grafos',
    subarea: 'caminho minimo',
    entrada: 'Grafo ponderado e origem',
    saida: 'Menores distancias',
    complexidade: { ...bigO, tempoMelhor: 'O(V + E)', tempoMedio: 'O(V + E log V)', tempoPior: 'O(V + E log V)' },
    preCondicoes: ['Pesos nao negativos'],
    limitacoes: ['Nao aceita pesos negativos'],
    casosDeUso: ['Roteamento', 'Logistica'],
    ...conceitual,
  },
  'estrutura-de-dados': {
    id: 'pilha',
    tipo: 'estrutura-de-dados',
    nome: 'Pilha',
    familia: 'linear',
    operacoes: [{ nome: 'push', melhor: 'O(1)', medio: 'O(1)', pior: 'O(1)' }],
    memoria: 'O(n)',
    tradeoffs: ['Ganha: acesso LIFO; paga: sem acesso aleatorio', 'Ganha: simples; paga: capacidade fixa em vetor'],
    casosDeBorda: ['Pilha vazia', 'Estouro de capacidade'],
    ...conceitual,
  },
  stack: {
    id: 'api_transacional',
    tipo: 'stack',
    nome: 'API transacional',
    dominio: 'software',
    slots: [1, 2, 3].map((n) => ({
      id: `slot_${n}`,
      papel: `Papel ${n}`,
      categoria: '[[editor_de_codigo]]',
      obrigatorio: true,
      maisBarata: ['[[vscode]]'],
      custoBeneficio: ['[[vscode]]'],
      qualidadeMaxima: ['[[vscode]]'],
    })),
    condicoes: Object.fromEntries(
      ['time_maturidade', 'escala_volume', 'orcamento', 'latencia', 'compliance_dados', 'prazo_entrega', 'lock_in'].map((k) => [
        k,
        { favorece: ['Condicao favoravel'], contra: ['Condicao contraria'], semAlternativa: 'Sem alternativa direta' },
      ]),
    ),
    outrosArquetipos: [{ stack: '[[api_eventos]]', quando: 'Quando o fluxo e assincrono' }],
    checklist: [
      { id: 'repo.protecao_branch_principal', dominio: 'repositorio', titulo: 'Proteger a branch principal', verificacao: 'Merge so por pull request', nivel: 'essencial' },
    ],
    padroes: ['[[outbox]]'],
    casosDeUso: ['[[programacao_em_par]]'],
    ...conceitual,
  },
  'guia-pratico': {
    id: 'criar_api',
    tipo: 'guia-pratico',
    nome: 'Como criar uma API',
    sigla: 'api',
    grupo: 'Construir software',
    raias,
    nos,
    ...conceitual,
  },
  certificacao: {
    id: 'cert_exemplo',
    tipo: 'certificacao',
    nome: 'Certificacao Exemplo',
    emissor: 'Emissor Exemplo',
    area: 'tecnica',
    nivel: 'fundamental',
    urlOficial: 'https://example.org/cert',
    status: 'ativa',
    custoUSD: 'não verificado',
  },
  licenca: {
    id: 'mit',
    tipo: 'licenca',
    nome: 'MIT',
    spdx: 'MIT',
    tipoLicenca: 'permissiva',
    permissoes: ['Uso comercial'],
    condicoes: ['Manter o aviso de copyright'],
    limitacoes: ['Sem garantia'],
    clausulaPatentes: 'Não há concessão explícita de patentes.',
    compatibilidade: ['Compatível com a maioria das licenças'],
    quandoUsar: ['Alcance máximo', 'Bibliotecas'],
    quandoEvitar: ['Quando a proteção contra fechamento do código é necessária'],
    aprovacaoOSI: true,
    aprovacaoFSF: true,
    urlOficial: 'https://opensource.org/license/mit',
  },
  hub: { id: 'mapa_de_padroes', tipo: 'hub', nome: 'Mapa de padroes', camada: 'fundamentals', itens: ['[[outbox]]'] },
  demanda: { id: 'bug', tipo: 'demanda', nome: 'Bug', sigla: 'bug', raias: [{ id: 'bug_orq' }], decisoes: [{ id: 'bug_orq_s1' }] },
  jornada: {
    id: 'engenheiro_backend',
    tipo: 'jornada',
    nome: 'Engenheiro backend',
    etapas: [{ id: 'fundamentos', titulo: 'Fundamentos', itens: ['[[dijkstra]]'] }],
  },
  competencia: {
    id: 'modelagem_de_dados',
    tipo: 'competencia',
    nome: 'Modelagem de dados',
    area: 'dados',
    niveis: [{ nivel: 'fundamental', descricao: 'Modela entidades simples', evidencias: ['Diagrama entidade relacionamento'] }],
  },
  tecnica: { id: 'tdd', tipo: 'tecnica', nome: 'TDD', ...conceitual },
  abordagem: { id: 'iterativa', tipo: 'abordagem', nome: 'Abordagem iterativa', ...conceitual },
  estrategia: { id: 'strangler', tipo: 'estrategia', nome: 'Strangler fig', ...conceitual },
  requisito: { id: 'latencia_p95', tipo: 'requisito', nome: 'Latencia p95', categoria: 'nao-funcional', ...conceitual },
};

type Mutation = (valid: Record<string, unknown>) => Record<string, unknown>;

/** Each invalid fixture breaks one rule of the type. */
export const invalidMutations: Record<Tipo, { reason: string; mutate: Mutation }> = {
  ferramenta: { reason: 'id with uppercase and spaces', mutate: (v) => ({ ...v, id: 'VS Code' }) },
  categoria: { reason: 'slug not kebab-case', mutate: (v) => ({ ...v, slug: 'Editor_De_Codigo' }) },
  'caso-de-uso': { reason: 'nivel outside the enum', mutate: (v) => ({ ...v, nivel: 'variacao' }) },
  empresa: { reason: 'website without https', mutate: (v) => ({ ...v, website: 'http://example.org' }) },
  modelo: { reason: 'price that is neither a number nor the unverified marker', mutate: (v) => ({ ...v, precoEntradaUSD: 'caro' }) },
  benchmark: { reason: 'missing area', mutate: ({ area: _area, ...rest }) => rest },
  funcionalidade: { reason: 'unknown extra key', mutate: (v) => ({ ...v, usoPessoal: 'usa' }) },
  padrao: { reason: 'family outside the enum', mutate: (v) => ({ ...v, familia: 'outra' }) },
  algoritmo: { reason: 'worst case without Big-O', mutate: (v) => ({ ...v, complexidade: { ...(v.complexidade as object), tempoPior: 'rapido' } }) },
  'estrutura-de-dados': { reason: 'fewer than 2 edge cases', mutate: (v) => ({ ...v, casosDeBorda: ['Pilha vazia'] }) },
  stack: { reason: 'fewer than 3 slots', mutate: (v) => ({ ...v, slots: (v.slots as unknown[]).slice(0, 2) }) },
  'guia-pratico': { reason: 'sigla with 4 letters', mutate: (v) => ({ ...v, sigla: 'apis' }) },
  certificacao: { reason: 'official url without https', mutate: (v) => ({ ...v, urlOficial: 'ftp://example.org' }) },
  licenca: { reason: 'license type outside the enum', mutate: (v) => ({ ...v, tipoLicenca: 'tudo' }) },
  hub: { reason: 'layer outside the enum', mutate: (v) => ({ ...v, camada: 'outside-enum' }) },
  demanda: { reason: 'missing decisoes', mutate: ({ decisoes: _d, ...rest }) => rest },
  jornada: { reason: 'no stages', mutate: (v) => ({ ...v, etapas: [] }) },
  competencia: { reason: 'level outside the enum', mutate: (v) => ({ ...v, niveis: [{ nivel: 'mestre', descricao: 'x' }] }) },
  tecnica: { reason: 'Fonte with an extra key', mutate: (v) => ({ ...v, fontes: [{ ...fonte, publico: true }] }) },
  abordagem: { reason: 'status outside the enum', mutate: (v) => ({ ...v, status: 'pronto' }) },
  estrategia: { reason: 'quando_usar with a single item', mutate: (v) => ({ ...v, quando_usar: ['so um'] }) },
  requisito: { reason: 'tipo changed to an unknown value', mutate: (v) => ({ ...v, tipo: 'requisitos' }) },
};
