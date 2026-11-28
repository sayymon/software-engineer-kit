// SPDX-License-Identifier: MIT
// Entradas, saídas and perguntas-chave of the Modal_de_Playbook on the `feature` flow (task 7.6; Requirements 8.1 to 8.7). Replaces modal-itens.spec.ts
// for the data items; the shell, content per type and history live in modal-playbook.spec.ts. No artefact of the feature has `semProdutor` today,
// so that warning is checked on a real page with the API response altered (page.route). `page.url()` is read after every interaction and Nó
// clicks use a real mouse movement. Requires a built site: npm run build.
//
// Requirement -> test (titles start with the number):
//  8.1 [8.1] entradas e saídas como botões que distinguem artefato de variável
//  8.2 [8.2] artefato: tipo, descrição, exemplo, produtores e consumidores; [8.2] variável: idem
//  8.3 [8.3] produtor/consumidor oferece "Destacar no Diagrama"; [8.3] produtor de outra Demanda sem a ação
//  8.4 [8.4] destacar de outra raia ativa a View/expande, aplica data-destacado, rola e foca; [8.4] Subtarefa produtora; [8.4] Nó já desenhado; [8.4] destacar a partir de outra View
//  8.5 [8.5] aviso "sem produtor" (page.route) na linha e no detalhe
//  8.6 [8.6] perguntas-chave em lista ordenada, na ordem do guia
//  8.7 [8.7] tipo e subtipo do artefato na linha e no detalhe; [8.7] en mostra os textos em inglês
import { expect, test, type Locator, type Page } from '@playwright/test';
import { existsSync } from 'node:fs';

if (!existsSync('site/dist/pt-BR/flows/feature/index.html')) throw new Error('site/dist ausente: rode npm run build');

const URL_BASE = '/pt-BR/flows/feature/';
const palco = (page: Page) => page.locator('[data-flow-stage]');
const pronto = (page: Page) => expect(palco(page)).toHaveAttribute('data-rendered', 'true', { timeout: 90_000 });
const dialogo = (page: Page) => page.locator('dialog[data-flow-modal]');
const titulo = (page: Page) => dialogo(page).locator('h2');
const secao = (page: Page, chave: string) => dialogo(page).locator(`[data-flow-secao="${chave}"]`);
const hash = (page: Page) => new URL(page.url()).hash;
const noDoDiagrama = (page: Page, id: string) => palco(page).locator(`g.node[data-id="${id}"][role="button"]`);
const conteudoPronto = (page: Page) => expect(dialogo(page).locator('[data-flow-conteudo]')).not.toHaveAttribute('aria-busy', 'true');
const focoNoId = (page: Page) => page.evaluate(() => document.activeElement?.getAttribute('data-id'));

async function abrirPagina(page: Page, url: string) {
  const erros: string[] = [];
  page.on('pageerror', (e) => erros.push(e.message));
  await page.goto(url);
  await page.reload();
  await pronto(page);
  return erros;
}

async function clicarNo(page: Page, id: string) {
  const no = noDoDiagrama(page, id);
  await no.scrollIntoViewIfNeeded();
  const caixa = await no.boundingBox();
  if (!caixa) throw new Error('Nó sem caixa');
  await page.mouse.move(caixa.x + caixa.width / 2, caixa.y + caixa.height / 2, { steps: 5 });
  await page.mouse.down();
  await page.mouse.up();
  await expect(dialogo(page)).toBeVisible();
  await conteudoPronto(page);
}

async function empilhar(page: Page, botao: Locator) {
  await botao.click();
  await conteudoPronto(page);
}

/** Opens the variable "Tipo de feature" (input of feat_cls_t1), whose producers include Nós of another lane. */
async function abrirVariavelDoTipo(page: Page) {
  await abrirPagina(page, `${URL_BASE}#exp=feat_cls`);
  await clicarNo(page, 'feat_cls_t1');
  await empilhar(page, secao(page, 'entradas').locator('button[data-flow-item="variavel"]', { hasText: 'Tipo de feature' }));
}

test('[8.1] entradas e saídas são botões clicáveis que distinguem artefato de variável', async ({ page }) => {
  await abrirPagina(page, `${URL_BASE}#exp=feat_ent`);
  await clicarNo(page, 'feat_ent_t2');
  for (const chave of ['entradas', 'saidas']) {
    const linhas = secao(page, chave).locator('[data-tipo-dado]');
    expect(await linhas.count()).toBeGreaterThan(0);
    const tipos = await linhas.evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.tipoDado));
    for (const t of tipos) expect(['artefato', 'variavel']).toContain(t);
    for (const linha of await linhas.all()) {
      const tipo = await linha.getAttribute('data-tipo-dado');
      await expect(linha.locator(`button[data-flow-item="${tipo}"]`)).toHaveCount(1);
    }
  }
  await expect(secao(page, 'entradas').locator('[data-tipo-dado="artefato"]').first()).toContainText('artefato');
  expect(hash(page)).toContain('no=feat_ent_t2');
});

test('[8.6] perguntas-chave em lista ordenada, na ordem do guia', async ({ page }) => {
  await abrirPagina(page, `${URL_BASE}#exp=feat_ent`);
  await clicarNo(page, 'feat_ent_t1');
  const lista = secao(page, 'perguntas').locator('ol');
  await expect(lista).toHaveCount(1);
  const itens = lista.locator('> li');
  await expect(itens).toHaveCount(5);
  await expect(itens.nth(0)).toContainText('É necessidade de usuário, oportunidade de negócio');
  await expect(itens.nth(1)).toContainText('Qual time vai atender');
  expect(hash(page)).toContain('no=feat_ent_t1');
});

test('[8.2/8.7] artefato: tipo, subtipo, descrição e exemplo da página canônica, produtores, consumidores e link para a página', async ({ page }) => {
  await abrirPagina(page, `${URL_BASE}#exp=feat_ent`);
  await clicarNo(page, 'feat_ent_t2');
  const linha = secao(page, 'entradas').locator('[data-tipo-dado="artefato"]', { hasText: 'Registro da necessidade' });
  await expect(linha).toContainText('documento · especificacao'); // 8.7 on the row: tipo and subtipo
  await empilhar(page, linha.locator('button[data-flow-item="artefato"]'));
  await expect(titulo(page)).toHaveText('Registro da necessidade');
  const meta = dialogo(page).locator('.flow-modal__meta');
  await expect(meta).toContainText('artefato');
  await expect(meta).toContainText('documento'); // tipo
  await expect(meta).toContainText('especificacao'); // subtipo
  await expect(dialogo(page).locator('.flow-modal__fatos[data-fatos="ok"]')).toBeVisible();
  await expect(dialogo(page).locator('.flow-modal__descricao')).not.toBeEmpty();
  await expect(secao(page, 'exemplo').locator('p')).not.toBeEmpty();
  expect(await secao(page, 'produtores').locator('li').count()).toBeGreaterThan(3);
  expect(await secao(page, 'consumidores').locator('li').count()).toBeGreaterThan(3);
  await expect(dialogo(page).locator('[data-sem-produtor]')).toHaveCount(0);
  const link = dialogo(page).locator('[data-flow-conteudo] > a.flow-modal__pagina');
  await expect(link).toHaveAttribute('href', '/pt-BR/flows/artefatos/registro_da_necessidade/');
  await link.click();
  await expect.poll(() => new URL(page.url()).pathname).toBe('/pt-BR/flows/artefatos/registro_da_necessidade/');
});

test('[8.2] variável: tipo, descrição, produtores e consumidores', async ({ page }) => {
  await abrirVariavelDoTipo(page);
  await expect(titulo(page)).toHaveText('Tipo de feature');
  await expect(dialogo(page).locator('.flow-modal__meta').first()).toContainText('variável');
  await expect(dialogo(page).locator('.flow-modal__meta').nth(1)).toContainText('Tipo da variável'); // tipo da variável (enum)
  await expect(dialogo(page).locator('.flow-modal__descricao')).not.toBeEmpty();
  expect(await secao(page, 'produtores').locator('li').count()).toBeGreaterThan(0);
  expect(await secao(page, 'consumidores').locator('li').count()).toBeGreaterThan(0);
  await expect(dialogo(page).locator('[data-flow-conteudo] > a.flow-modal__pagina')).toHaveAttribute('href', /^\/pt-BR\/flows\/variaveis\//);
  expect(hash(page)).toContain('no=feat_cls_t1');
});

test('[8.3/8.4] destacar um produtor de outra raia: fecha o modal, expande a raia, destaca, rola e foca o Nó; Voltar retorna ao estado anterior', async ({ page }) => {
  const erros = await abrirPagina(page, `${URL_BASE}#exp=feat_cls`);
  const antes = page.url();
  await clicarNo(page, 'feat_cls_t1');
  await empilhar(page, secao(page, 'entradas').locator('button[data-flow-item="variavel"]', { hasText: 'Tipo de feature' }));
  await secao(page, 'produtores').locator('button[data-flow-destacar="feat_ent_t1"]').click();
  await expect(dialogo(page)).toBeHidden();
  await pronto(page);
  const h = hash(page);
  expect(h).toContain('feat_ent'); // the lane of the producer joined the Conjunto_Expandido
  expect(h).toContain('feat_cls');
  expect(h).not.toContain('no=');
  const alvo = noDoDiagrama(page, 'feat_ent_t1');
  await expect(alvo).toHaveAttribute('data-destacado', 'true');
  await expect(alvo).toBeInViewport();
  await expect.poll(() => focoNoId(page)).toBe('feat_ent_t1');
  expect(await page.locator('main').evaluate((m) => m.hasAttribute('inert'))).toBe(false);
  // The `no=` entry became the entry of the new state: Back lands on the page as it was before the modal.
  await page.goBack();
  await expect.poll(() => page.url()).toBe(antes);
  await pronto(page);
  await expect(page.locator('[data-destacado="true"]')).toHaveCount(0);
  expect(erros).toEqual([]);
});

test('[8.3/8.4] consumidor listado também oferece destacar e ativa o destaque', async ({ page }) => {
  await abrirVariavelDoTipo(page);
  const botao = secao(page, 'consumidores').locator('button[data-flow-destacar]').first();
  await expect(botao).toBeVisible();
  const id = (await botao.getAttribute('data-flow-destacar')) as string;
  await botao.click();
  await expect(dialogo(page)).toBeHidden();
  await pronto(page);
  expect(hash(page)).not.toContain('no=');
  await expect(noDoDiagrama(page, id)).toHaveAttribute('data-destacado', 'true');
  await expect(noDoDiagrama(page, id)).toBeInViewport();
});

test('[8.4] destacar uma Subtarefa produtora liga as subtarefas da tarefa dela e a destaca', async ({ page }) => {
  await abrirVariavelDoTipo(page);
  await secao(page, 'produtores').locator('button[data-flow-destacar="feat_ent_t1_st2"]').click();
  await expect(dialogo(page)).toBeHidden();
  await pronto(page);
  expect(hash(page)).toContain('feat_ent_t1');
  await expect(palco(page).locator('[data-id="feat_ent_t1_st2"][data-destacado="true"]')).toHaveCount(1);
  await expect(noDoDiagrama(page, 'feat_ent_t1_st2')).toBeInViewport();
  expect(page.url()).not.toContain('no=');
});

test('[8.4] destacar o Nó que já está desenhado: destaca no lugar e deixa a URL como estava antes de abrir o modal', async ({ page }) => {
  await abrirPagina(page, `${URL_BASE}#exp=feat_cls`);
  const antes = page.url();
  await clicarNo(page, 'feat_cls_t1');
  expect(hash(page)).toContain('no=feat_cls_t1');
  await dialogo(page).locator('.flow-modal__acoes button[data-flow-destacar="feat_cls_t1"]').click();
  await expect(dialogo(page)).toBeHidden();
  await expect.poll(() => page.url()).toBe(antes);
  await pronto(page);
  await expect(noDoDiagrama(page, 'feat_cls_t1')).toHaveAttribute('data-destacado', 'true');
  await expect.poll(() => focoNoId(page)).toBe('feat_cls_t1');
});

test('[8.4] destacar a partir de outra View ativa a View que contém o Nó', async ({ page }) => {
  // Opened from the View of one lane; the producer lives in another lane, so the View must change to one that draws it.
  await abrirPagina(page, `${URL_BASE}#exp=feat_cls&view=raia:feat_cls`);
  await clicarNo(page, 'feat_cls_t1');
  await empilhar(page, secao(page, 'entradas').locator('button[data-flow-item="variavel"]', { hasText: 'Tipo de feature' }));
  await secao(page, 'produtores').locator('button[data-flow-destacar="feat_ent_t1"]').click();
  await expect(dialogo(page)).toBeHidden();
  await pronto(page);
  expect(hash(page)).not.toContain('no=');
  await expect(noDoDiagrama(page, 'feat_ent_t1')).toHaveAttribute('data-destacado', 'true');
  await expect(noDoDiagrama(page, 'feat_ent_t1')).toBeInViewport();
  await expect(page.locator('[role="tab"][aria-selected="true"]')).toHaveCount(1);
});

test('[8.3] produtor de outra Demanda: nome e link para a página, sem ação de destacar', async ({ page }) => {
  await abrirPagina(page, `${URL_BASE}#exp=feat_lev`);
  await clicarNo(page, 'feat_lev_t3');
  await empilhar(page, secao(page, 'entradas').locator('button[data-flow-item="artefato"]', { hasText: 'Critérios de aceite' }));
  const externo = secao(page, 'produtores').locator('[data-externo]', { hasText: 'Refinar o requisito e os critérios de aceitação' }).first();
  await expect(externo).toBeVisible();
  await expect(externo).toContainText('outra Demanda');
  await expect(externo.locator('button')).toHaveCount(0);
  await expect(externo.locator('a')).toHaveAttribute('href', '/pt-BR/flows/tarefas/bug_pre_t3/');
  expect(page.url()).toContain('no=feat_lev_t3');
});

test('[8.5] aviso "sem produtor" (fixture: a resposta da API é alterada, porque nenhum artefato da feature tem esse caso hoje)', async ({ page }) => {
  await page.route('**/api/flows/feature.json', async (route) => {
    const resposta = await route.fetch();
    const json = (await resposta.json()) as { dados: Record<string, { produzidoPor: string[]; semProdutor: boolean }> };
    const d = json.dados.registro_da_necessidade as { produzidoPor: string[]; semProdutor: boolean };
    d.produzidoPor = [];
    d.semProdutor = true;
    await route.fulfill({ response: resposta, json });
  });
  await abrirPagina(page, `${URL_BASE}#exp=feat_ent`);
  await clicarNo(page, 'feat_ent_t2');
  const linha = secao(page, 'entradas').locator('li', { hasText: 'Registro da necessidade' });
  await expect(linha.locator('[data-sem-produtor]')).toHaveText('sem produtor');
  await expect(secao(page, 'saidas').locator('[data-sem-produtor]')).toHaveCount(0); // only inputs warn
  await empilhar(page, linha.locator('button[data-flow-item="artefato"]'));
  await expect(dialogo(page).locator('[data-sem-produtor]')).toHaveText('sem produtor');
  await expect(secao(page, 'produtores')).toContainText('nenhum');
  expect(await secao(page, 'consumidores').locator('li').count()).toBeGreaterThan(3);
  expect(hash(page)).toContain('no=feat_ent_t2');
});

test('[8.7] em en os textos do detalhe vêm em inglês e a descrição vem da página canônica em en', async ({ page }) => {
  await abrirPagina(page, '/en/flows/feature/#exp=feat_ent');
  await clicarNo(page, 'feat_ent_t2');
  await empilhar(page, secao(page, 'entradas').locator('button[data-flow-item="artefato"]').first());
  await expect(secao(page, 'produtores').locator('h3')).toHaveText('Produced by');
  await expect(secao(page, 'consumidores').locator('h3')).toHaveText('Consumed by');
  await expect(dialogo(page).locator('[data-flow-conteudo] > a.flow-modal__pagina')).toHaveAttribute('href', /^\/en\/flows\/artefatos\//);
});
