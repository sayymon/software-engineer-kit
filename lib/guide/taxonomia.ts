// SPDX-License-Identifier: MIT
// Artifact taxonomy: tipo (category) and subtipo (closed list per category) with display labels.
// Port of taxonomia.py of the guide. The real guide uses only the tipos of TIPOS. The tipos of TIPOS_LEGADOS stay
// accepted by the schema for old documents, and the completeness check warns when they appear.

/** tipo -> { subtipo: label }. A tipo without an entry has no subtipo. */
export const SUBTIPOS: Record<string, Record<string, string>> = {
  documento: {
    especificacao: 'especificação',
    plano: 'plano',
    analise: 'análise ou mapeamento',
    relatorio: 'relatório',
    checklist: 'checklist',
    registro: 'registro',
    guia: 'guia ou documentação de uso',
  },
  diagrama: {
    arquitetura: 'arquitetura',
    sequencia: 'sequência',
    der: 'entidade e relacionamento (DER)',
    dominio: 'domínio',
    contextos: 'contextos',
    wbs: 'WBS/EAP',
    gantt: 'Gantt',
    roadmap: 'roadmap',
    ishikawa: 'Ishikawa',
    pareto: 'Pareto',
    mapa_de_impacto: 'mapa de impacto',
    quadro: 'quadro do programa',
  },
  teste: {
    unidade: 'unidade',
    integracao: 'integração',
    contrato: 'contrato',
    ponta_a_ponta: 'ponta a ponta',
    performance: 'performance',
    seguranca: 'segurança',
    regressao: 'regressão',
    caracterizacao: 'caracterização',
    aceitacao: 'aceitação',
    evals: 'evals',
  },
  ambiente: {
    local: 'local',
    desenvolvimento: 'desenvolvimento',
    sandbox: 'sandbox',
    efemero: 'efêmero (preview por PR)',
    qa: 'QA ou teste',
    staging: 'staging',
    homologacao: 'homologação (UAT)',
    pre_producao: 'pré-produção',
    producao: 'produção',
    dr: 'recuperação de desastre (DR)',
    carga: 'carga e performance',
  },
  acao: {
    comunicacao: 'comunicação',
    configuracao: 'configuração',
    implantacao: 'implantação',
    reversao: 'reversão',
    aprovacao: 'aprovação',
    contencao: 'contenção',
    liberacao: 'liberação',
    delegacao: 'delegação',
    ajuste: 'ajuste de artefato',
    card: 'abertura ou atualização de card',
  },
  evidencia: {
    log: 'log ou rastro',
    registro_visual: 'registro visual',
    estado_dos_dados: 'estado dos dados',
    verificacao: 'verificação',
    contexto: 'contexto do problema',
  },
  sinal: { alerta: 'alerta' },
  dashboard: { tecnico: 'técnico', negocio: 'negócio' },
  codigo: {
    aplicacao: 'aplicação',
    contrato_de_api: 'contrato de API',
    query: 'query',
    pipeline: 'pipeline de CI/CD',
    iac: 'infraestrutura como código (IaC)',
    branch: 'branch',
  },
};

export const TIPOS = ['documento', 'diagrama', 'teste', 'ambiente', 'acao', 'evidencia', 'sinal', 'dashboard', 'codigo', 'commit', 'pull_request', 'adr', 'biblioteca', 'agente', 'skill', 'script'] as const;
export const TIPOS_LEGADOS = ['dado', 'decisao', 'card', 'comunicacao', 'configuracao'] as const;

/** Display label of a subtipo. Free text (old documents) comes back unchanged. */
export function rotuloSubtipo(tipo: unknown, subtipo: unknown): string {
  const s = String(subtipo ?? '');
  return SUBTIPOS[String(tipo ?? '')]?.[s] ?? s;
}

/** Communication is the action of subtipo `comunicacao` (or the legacy tipo `comunicacao`). */
export function eComunicacao(artefato: Record<string, unknown>): boolean {
  const tipo = artefato.tipo;
  return tipo === 'comunicacao' || (tipo === 'acao' && artefato.subtipo === 'comunicacao');
}
