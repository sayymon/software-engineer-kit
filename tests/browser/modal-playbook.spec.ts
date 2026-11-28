// SPDX-License-Identifier: MIT
// Modal_de_Playbook on the `feature` flow (task 7.6). Replaces modal-casca / modal-conteudo / modal-itens (items live in entradas-saidas.spec.ts).
// `page.url()` is read after every interaction; Nó clicks use a real mouse movement (mouse.move + mouse.click). Requires a built site: npm run build.
//
// Requirement -> test (titles start with the number):
//  6.1  [6.1] tarefa: nome, tipo, Raia, resumo, Fazer, Evitar, perguntas-chave, entradas, saídas, técnicas e papéis com a letra RACI
//  6.2  [6.2] gateway: pergunta de decisão, saídas com a condição, papel que decide
//  6.3  [6.3] Subtarefa condicional mostra "Executar quando"; a comum não
//  6.4  [6.4] chamada de Raia: Raia chamada, retornos e botão que abre a View da Raia
//  6.5  [6.5] itens clicáveis (papel, técnica, pergunta, artefato, variável, rito) empilham o anterior
//  6.6  [6.6/6.7] empilha e desempilha pelo botão voltar, a URL segue o Nó do topo
//  6.7  [6.6/6.7] botão voltar oculto com um único item
//  6.8  [6.8] link para a Pagina_Canonica em papel, rito e técnica
//  6.9  [6.9] clique abre o dialog nativo, foco no diálogo, resto isolado; [6.9] Tab/Shift+Tab em loop
//  6.10 [6.10] Esc devolve o foco ao Nó; [6.10] botão fechar devolve o foco
//  6.11 [6.11] clique escreve no=; Voltar/Avançar do navegador; [6.11] URL com no= reabre, inexistente é ignorado
//  6.12 [6.12] en cai para pt-BR com marcador visível; pt-BR sem marcador
import { expect, test, type Locator, type Page } from '@playwright/test';
import { existsSync } from 'node:fs';

if (!existsSync('site/dist/pt-BR/flows/feature/index.html')) throw new Error('site/dist ausente: rode npm run build');

const URL_BASE = '/pt-BR/flows/feature/';
const URL_NOS = `${URL_BASE}#exp=feat_orq`; // the Visão geral draws clusters only: expanding one lane draws Nós
const NO = 'svg g.node[data-id][role="button"]:not([data-id^="cluster:"])';
const palco = (page: Page) => page.locator('[data-flow-stage]');
const pronto = (page: Page) => expect(palco(page)).toHaveAttribute('data-rendered', 'true', { timeout: 90_000 });
const dialogo = (page: Page) => page.locator('dialog[data-flow-modal]');
const titulo = (page: Page) => dialogo(page).locator('h2');
const secao = (page: Page, chave: string) => dialogo(page).locator(`[data-flow-secao="${chave}"]`);
const hash = (page: Page) => new URL(page.url()).hash;
const noDoDiagrama = (page: Page, id: string) => palco(page).locator(`g.node[data-id="${id}"][role="button"]`);
const conteudoPronto = (page: Page) => expect(dialogo(page).locator('[data-flow-conteudo]')).not.toHaveAttribute('aria-busy', 'true');
const focoNoId = (page: Page) => page.evaluate(() => document.activeElement?.getAttribute('data-id'));
const mainInerte = (page: Page) => page.locator('main').evaluate((m) => m.hasAttribute('inert'));

async function abrirPagina(page: Page, url: string) {
  const erros: string[] = [];
  page.on('pageerror', (e) => erros.push(e.message));
  await page.goto(url);
  await page.reload();
  await pronto(page);
  return erros;
}

/** Real pointer: moves the mouse over the Nó (so hover handlers run), then presses and releases. */
async function mouseClicar(page: Page, alvo: Locator) {
  await alvo.scrollIntoViewIfNeeded();
  const caixa = await alvo.boundingBox();
  if (!caixa) throw new Error('alvo sem caixa');
  await page.mouse.move(caixa.x + caixa.width / 2, caixa.y + caixa.height / 2, { steps: 5 });
  await page.mouse.down();
  await page.mouse.up();
}

async function clicarNo(page: Page, id: string) {
  await mouseClicar(page, noDoDiagrama(page, id));
  await expect(dialogo(page)).toBeVisible();
  await conteudoPronto(page);
}

async function empilhar(page: Page, botao: Locator) {
  await botao.click();
  await conteudoPronto(page);
}

test.describe('conteúdo por tipo de Nó', () => {
  test('[6.1] tarefa: nome, tipo, Raia, resumo, Fazer, Evitar, perguntas-chave na ordem do guia, saídas, técnicas e papéis com a letra RACI', async ({ page }) => {
    const erros = await abrirPagina(page, `${URL_BASE}#exp=feat_ent`);
    await clicarNo(page, 'feat_ent_t1');
    expect(hash(page)).toContain('no=feat_ent_t1');
    await expect(titulo(page)).toHaveText('Registrar a necessidade ou oportunidade');
    const meta = dialogo(page).locator('.flow-modal__meta');
    await expect(meta).toContainText('tarefa');
    await expect(meta).toContainText('Entendimento da necessidade e contexto');
    await expect(secao(page, 'resumo')).toContainText('Registrar a necessidade ou oportunidade no formato que o time usa');
    await expect(secao(page, 'fazer').locator('li')).toHaveCount(3);
    await expect(secao(page, 'evitar').locator('li')).toHaveCount(2);
    const perguntas = secao(page, 'perguntas').locator('li button');
    await expect(perguntas).toHaveCount(5);
    await expect(perguntas.first()).toContainText('É necessidade de usuário, oportunidade de negócio');
    await expect(perguntas.nth(1)).toContainText('Qual time vai atender');
    await expect(secao(page, 'saidas').locator('li')).toHaveCount(6);
    await expect(secao(page, 'saidas').locator('[data-tipo-dado="artefato"]').first()).toContainText('artefato');
    await expect(secao(page, 'saidas').locator('[data-tipo-dado="variavel"]').first()).toContainText('variável');
    await expect(secao(page, 'tecnicas').locator('li button').first()).toBeVisible();
    const papel = secao(page, 'papeis').locator('li', { hasText: 'PM' }).first();
    await expect(papel.locator('abbr[data-raci="R"]')).toHaveText('R');
    expect(erros).toEqual([]);
  });

  test('[6.2] gateway: pergunta de decisão, saídas com a condição e o papel que decide', async ({ page }) => {
    await abrirPagina(page, `${URL_BASE}#exp=feat_ent`);
    await clicarNo(page, 'feat_ent_g1');
    expect(hash(page)).toContain('no=feat_ent_g1');
    await expect(titulo(page)).toHaveText('Já existe solução que atende?');
    await expect(dialogo(page).locator('.flow-modal__meta')).toContainText('gateway');
    await expect(secao(page, 'pergunta')).toContainText('Já existe solução que atende a necessidade?');
    const saidas = secao(page, 'saidas-condicao').locator('li');
    await expect(saidas).toHaveCount(2);
    await expect(saidas.nth(0)).toContainText('atende por completo');
    await expect(saidas.nth(1)).toContainText('atende em parte ou não existe');
    await expect(secao(page, 'decide').locator('button')).toHaveText('Arquiteto de Software');
  });

  test('[6.3] Subtarefa condicional mostra "Executar quando"; a comum não', async ({ page }) => {
    await abrirPagina(page, `${URL_BASE}#exp=feat_ent&sub=1`);
    await clicarNo(page, 'feat_ent_t3_st2');
    expect(hash(page)).toContain('no=feat_ent_t3_st2');
    await expect(dialogo(page).locator('.flow-modal__meta')).toContainText('subtarefa condicional');
    await expect(secao(page, 'executar-quando').locator('h3')).toHaveText('Executar quando');
    await expect(secao(page, 'executar-quando').locator('p')).toContainText('origem_da_demanda = necessidade_de_usuario');
    await page.keyboard.press('Escape');
    await expect(dialogo(page)).toBeHidden();
    await expect.poll(() => hash(page)).not.toContain('no=');
    await pronto(page);
    await clicarNo(page, 'feat_ent_t1_st1');
    await expect(secao(page, 'executar-quando')).toHaveCount(0);
  });

  test('[6.4] chamada de Raia: mostra a Raia chamada e os retornos; o botão fecha o modal e abre a View da Raia', async ({ page }) => {
    await abrirPagina(page, `${URL_BASE}#exp=feat_orq`);
    const urlAntes = page.url();
    await clicarNo(page, 'feat_orq_c1');
    expect(hash(page)).toContain('no=feat_orq_c1');
    await expect(secao(page, 'raia-chamada').locator('.flow-modal__raia-chamada')).toHaveText('Entendimento da necessidade e contexto');
    await expect(secao(page, 'retornos').locator('li').first()).toBeVisible();
    await dialogo(page).locator('button[data-flow-abrir-raia]').click();
    await expect(dialogo(page)).toBeHidden();
    await expect.poll(() => hash(page)).toContain('view=raia:feat_ent');
    expect(hash(page)).not.toContain('no=');
    await pronto(page);
    await expect(page.locator('[role="tab"][data-view="raia:feat_ent"]')).toHaveAttribute('aria-selected', 'true');
    expect(await mainInerte(page)).toBe(false);
    await page.goBack(); // back to the View from where the modal was opened, in a single step
    await expect.poll(() => page.url()).toBe(urlAntes);
  });
});

test.describe('histórico, voltar e links canônicos', () => {
  test('[6.5/6.6/6.7] empilha variável e produtor, mostra o botão voltar e desempilha item a item, com a URL seguindo o Nó do topo', async ({ page }) => {
    const erros = await abrirPagina(page, `${URL_BASE}#exp=feat_cls`);
    await clicarNo(page, 'feat_cls_t1');
    expect(hash(page)).toContain('no=feat_cls_t1');
    const tituloDoNo = (await titulo(page).textContent()) ?? '';
    expect(tituloDoNo).not.toBe('');
    const voltar = dialogo(page).locator('[data-flow-modal-voltar]');
    await expect(voltar).toBeHidden(); // 6.7: one item only
    await empilhar(page, secao(page, 'entradas').locator('button[data-flow-item="variavel"]', { hasText: 'Tipo de feature' }));
    await expect(titulo(page)).toHaveText('Tipo de feature');
    await expect(voltar).toBeVisible();
    expect(hash(page)).toContain('no=feat_cls_t1'); // an item that is not a Nó does not touch the URL
    await empilhar(page, secao(page, 'produtores').locator('button[data-flow-item="no"]', { hasText: 'Registrar a necessidade ou oportunidade' }).first());
    await expect(titulo(page)).toHaveText('Registrar a necessidade ou oportunidade');
    expect(hash(page)).toContain('no=feat_ent_t1'); // a Nó on the stack names the fragment
    await voltar.click();
    await expect(titulo(page)).toHaveText('Tipo de feature');
    expect(hash(page)).toContain('no=feat_cls_t1');
    await voltar.click();
    await expect(titulo(page)).toHaveText(tituloDoNo);
    await expect(voltar).toBeHidden();
    expect(hash(page)).toContain('no=feat_cls_t1');
    expect(erros).toEqual([]);
  });

  test('[6.5/6.6] técnica e pergunta-chave também empilham o item anterior e o voltar devolve o Nó', async ({ page }) => {
    await abrirPagina(page, `${URL_BASE}#exp=feat_ent`);
    await clicarNo(page, 'feat_ent_t1');
    const tituloDoNo = (await titulo(page).textContent()) ?? '';
    const voltar = dialogo(page).locator('[data-flow-modal-voltar]');
    const tecnica = secao(page, 'tecnicas').locator('button[data-flow-item="tecnica"]').first();
    const nomeTecnica = ((await tecnica.textContent()) ?? '').trim();
    await empilhar(page, tecnica);
    await expect(titulo(page)).toHaveText(nomeTecnica);
    await expect(voltar).toBeVisible();
    await voltar.click();
    await expect(titulo(page)).toHaveText(tituloDoNo);
    const pergunta = secao(page, 'perguntas').locator('button[data-flow-item="pergunta"]').first();
    await empilhar(page, pergunta);
    await expect(voltar).toBeVisible();
    await expect(titulo(page)).not.toHaveText(tituloDoNo);
    await voltar.click();
    await expect(titulo(page)).toHaveText(tituloDoNo);
    await expect(voltar).toBeHidden();
    expect(hash(page)).toContain('no=feat_ent_t1');
  });

  test('[6.5/6.8] rito citado pelo Nó: abre o detalhe com onde acontece e o link canônico', async ({ page }) => {
    await abrirPagina(page, `${URL_BASE}#exp=feat_lev`);
    await clicarNo(page, 'feat_lev_g1');
    await empilhar(page, secao(page, 'ritos').locator('button[data-flow-item="rito"]').first());
    await expect(titulo(page)).toHaveText('Refinement (refinamento do backlog)');
    await expect(dialogo(page).locator('.flow-modal__meta')).toContainText('rito');
    await expect(secao(page, 'acontece-em').locator('button[data-id="feat_lev_g1"]')).toBeVisible();
    const link = dialogo(page).locator('[data-flow-conteudo] > a.flow-modal__pagina');
    await expect(link).toHaveAttribute('href', '/pt-BR/flows/ritos/rito_refinamento/');
    await link.click();
    await expect.poll(() => new URL(page.url()).pathname).toBe('/pt-BR/flows/ritos/rito_refinamento/');
  });

  test('[6.5/6.8] papel: onde atua com a letra RACI e o link canônico', async ({ page }) => {
    await abrirPagina(page, `${URL_BASE}#exp=feat_ent`);
    await clicarNo(page, 'feat_ent_t1');
    await empilhar(page, secao(page, 'papeis').locator('button[data-flow-item="papel"]', { hasText: 'PM' }).first());
    await expect(titulo(page)).toHaveText('PM');
    await expect(secao(page, 'atua-em').locator('abbr[data-raci]').first()).toBeVisible();
    await expect(secao(page, 'atua-em').locator('button[data-id="feat_ent_t1"]')).toBeVisible();
    await expect(dialogo(page).locator('[data-flow-conteudo] > a.flow-modal__pagina')).toHaveAttribute('href', /\/pt-BR\/flows\/papeis\/pm\/$/);
  });

  test('[6.8] técnica: link para a Pagina_Canonica da técnica', async ({ page }) => {
    await abrirPagina(page, `${URL_BASE}#exp=feat_ent`);
    await clicarNo(page, 'feat_ent_t1');
    await empilhar(page, secao(page, 'tecnicas').locator('button[data-flow-item="tecnica"]').first());
    await expect(dialogo(page).locator('[data-flow-conteudo] > a.flow-modal__pagina')).toHaveAttribute('href', /^\/pt-BR\/fundamentals\/techniques\/[^/]+\/$/);
  });
});

test.describe('casca: foco, Esc e fragmento da URL', () => {
  test('[6.9/6.11] clique real no Nó abre o dialog nativo, escreve no= e isola o resto da página', async ({ page }) => {
    const erros = await abrirPagina(page, URL_NOS);
    const no = palco(page).locator(NO).first();
    await no.scrollIntoViewIfNeeded();
    const id = (await no.getAttribute('data-id')) as string;
    const urlAntes = page.url();
    await mouseClicar(page, no);
    await expect(dialogo(page)).toBeVisible();
    expect(await dialogo(page).evaluate((d: HTMLDialogElement) => d.matches(':modal'))).toBe(true);
    expect(hash(page)).toBe(`#no=${id}&exp=feat_orq`);
    expect(page.url()).not.toBe(urlAntes);
    await expect(dialogo(page)).toHaveAttribute('aria-modal', 'true');
    const rotulo = await dialogo(page).getAttribute('aria-labelledby');
    await expect(page.locator(`#${rotulo}`)).not.toBeEmpty();
    expect(await mainInerte(page)).toBe(true);
    expect(await dialogo(page).evaluate((d) => d === document.activeElement)).toBe(true);
    expect(erros).toEqual([]);
  });

  test('[6.9] foco preso: Tab percorre os focáveis do diálogo em loop e Shift+Tab volta ao último', async ({ page }) => {
    await abrirPagina(page, URL_NOS);
    await mouseClicar(page, palco(page).locator(NO).first());
    await expect(dialogo(page)).toBeVisible();
    await conteudoPronto(page);
    // Every Tab lands inside the dialog; the sequence repeats (a loop) and never leaves it.
    const marca = () =>
      page.evaluate(() => {
        const a = document.activeElement as HTMLElement | null;
        if (!a) return { dentro: false, chave: '' };
        if (!a.dataset.tabSeen) a.dataset.tabSeen = String(document.querySelectorAll('[data-tab-seen]').length);
        return { dentro: !!a.closest('dialog[data-flow-modal]'), chave: a.dataset.tabSeen };
      });
    const vistos: string[] = [];
    let voltou = false;
    for (let i = 0; i < 80 && !voltou; i++) {
      await page.keyboard.press('Tab');
      const { dentro, chave } = await marca();
      expect(dentro).toBe(true);
      if (vistos.includes(chave)) {
        expect(chave).toBe(vistos[0]); // the loop closes on the first focusable
        voltou = true;
      } else vistos.push(chave);
    }
    expect(voltou).toBe(true);
    expect(vistos.length).toBeGreaterThan(1);
    // We are on the first focusable again: Shift+Tab wraps to the last one.
    await page.keyboard.press('Shift+Tab');
    const ultimo = await marca();
    expect(ultimo.dentro).toBe(true);
    expect(ultimo.chave).toBe(vistos[vistos.length - 1]);
    // Pointer capture outside the dialog is impossible: the rest of the page stays inert.
    expect(await mainInerte(page)).toBe(true);
  });

  test('[6.10/6.11] Esc fecha, devolve o foco ao Nó de origem e a URL volta ao que era antes', async ({ page }) => {
    await abrirPagina(page, URL_NOS);
    const no = palco(page).locator(NO).first();
    await no.focus();
    const id = (await no.getAttribute('data-id')) as string;
    const urlAntes = page.url();
    await page.keyboard.press('Enter');
    await expect(dialogo(page)).toBeVisible();
    expect(hash(page)).toBe(`#no=${id}&exp=feat_orq`);
    await page.keyboard.press('Escape');
    await expect(dialogo(page)).toBeHidden();
    await expect.poll(() => page.url()).toBe(urlAntes);
    await pronto(page); // the Back that undoes the push redraws the Diagrama; the focus comes back to the Nó when it ends
    expect(await mainInerte(page)).toBe(false);
    expect(await focoNoId(page)).toBe(id);
  });

  test('[6.10/6.11] botão fechar devolve o foco; o Voltar e o Avançar do navegador fecham e reabrem', async ({ page }) => {
    await abrirPagina(page, URL_NOS);
    const no = palco(page).locator(NO).first();
    const id = (await no.getAttribute('data-id')) as string;
    await no.focus();
    await page.keyboard.press('Enter');
    await dialogo(page).locator('[data-flow-modal-fechar]').click();
    await expect(dialogo(page)).toBeHidden();
    await expect.poll(() => hash(page)).toBe('#exp=feat_orq');
    await pronto(page);
    expect(await focoNoId(page)).toBe(id);

    await page.keyboard.press('Enter');
    await expect(dialogo(page)).toBeVisible();
    expect(hash(page)).toBe(`#no=${id}&exp=feat_orq`);
    await page.goBack();
    await expect(dialogo(page)).toBeHidden();
    expect(hash(page)).toBe('#exp=feat_orq');
    await page.goForward();
    await expect(dialogo(page)).toBeVisible();
    expect(hash(page)).toBe(`#no=${id}&exp=feat_orq`);
  });

  test('[6.11] URL com no= reabre o modal; fechar remove o no= sem criar entrada; no inexistente é ignorado', async ({ page }) => {
    await abrirPagina(page, URL_NOS);
    const id = (await palco(page).locator(NO).first().getAttribute('data-id')) as string;
    await page.goto(`${URL_BASE}#no=${id}&exp=feat_orq`);
    await page.reload();
    await pronto(page);
    await expect(dialogo(page)).toBeVisible();
    expect(hash(page)).toBe(`#no=${id}&exp=feat_orq`);
    const entradas = await page.evaluate(() => history.length);
    await page.keyboard.press('Escape');
    await expect(dialogo(page)).toBeHidden();
    expect(hash(page)).toBe('#exp=feat_orq');
    expect(await page.evaluate(() => history.length)).toBe(entradas);

    await page.goto(`${URL_BASE}#no=nao_existe&exp=feat_orq`);
    await page.reload();
    await pronto(page);
    await expect(dialogo(page)).toBeHidden();
    expect(hash(page)).toBe('#exp=feat_orq');
  });
});

test('[6.12] em en o conteúdo do guia cai para pt-BR com o marcador visível; em pt-BR não há marcador', async ({ page }) => {
  await abrirPagina(page, `${URL_BASE}#no=feat_ent_t1&exp=feat_ent`);
  await expect(dialogo(page)).toBeVisible();
  await expect(secao(page, 'resumo')).toBeVisible();
  await expect(dialogo(page).locator('[data-fallback="true"]')).toHaveCount(0);
  await page.goto('/en/flows/feature/#no=feat_ent_t1&exp=feat_ent');
  await page.reload();
  await pronto(page);
  await expect(dialogo(page)).toBeVisible();
  await expect(secao(page, 'resumo')).toContainText('Registrar a necessidade ou oportunidade');
  await expect(dialogo(page).locator('[data-fallback="true"]')).toBeVisible();
  await expect(secao(page, 'fazer').locator('h3')).toHaveText('Do'); // the interface is in English, the guide text is the pt-BR fallback
  expect(hash(page)).toContain('no=feat_ent_t1');
});
