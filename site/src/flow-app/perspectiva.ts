// SPDX-License-Identifier: MIT
// Seletor de Perspectiva (Requirement 19.1, 19.3, 19.4, 19.5). Lists the registered Perspectivas (open registry, so a new one shows up
// without touching this file), keeps the choice in the Fragmento_de_Estado (`persp`) and in `localStorage`.
// Precedence: valid `persp` in the URL, then the stored choice, then the default. An unknown `persp` in the URL falls to the default.
import { PERSPECTIVAS, PERSPECTIVA_PADRAO } from './renderer';

/** Namespaced key: other pages of the same origin never read or clash with it. */
export const CHAVE_PERSPECTIVA = 'software-engineer-kit:flow:perspectiva';

type Armazenamento = Pick<Storage, 'getItem' | 'setItem'>;

/** `localStorage`, or undefined when the browser blocks it (private mode, disabled storage). Never throws. */
function armazenamento(win: Window): Armazenamento | undefined {
  try {
    return win.localStorage ?? undefined;
  } catch {
    return undefined;
  }
}

/** Stored Perspectiva id, only when it is registered now. Never throws. */
export function lerPerspectivaGuardada(win: Window = window): string | undefined {
  try {
    const v = armazenamento(win)?.getItem(CHAVE_PERSPECTIVA);
    return v && v in PERSPECTIVAS ? v : undefined;
  } catch {
    return undefined;
  }
}

/** Stores the choice. Returns false when the storage is unavailable (the choice then lives only in the URL). */
export function guardarPerspectiva(id: string, win: Window = window): boolean {
  try {
    const a = armazenamento(win);
    if (!a) return false;
    a.setItem(CHAVE_PERSPECTIVA, id);
    return true;
  } catch {
    return false;
  }
}

/** True when the fragment carries a `persp` key at all (valid or not). */
export function fragmentoTemPersp(hash: string): boolean {
  const texto = hash.startsWith('#') ? hash.slice(1) : hash;
  return texto.split('&').some((p) => p.startsWith('persp=') && p.length > 'persp='.length);
}

/**
 * Perspectiva in force. `doEstado` is the (normalized) `persp` of the URL state. When the URL named a Perspectiva (`urlNomeou`) that is
 * not known, the default applies and the stored choice is ignored.
 */
export function perspectivaEfetiva(doEstado: string | undefined, urlNomeou: boolean, win: Window = window): string {
  if (doEstado && doEstado in PERSPECTIVAS) return doEstado;
  if (urlNomeou) return PERSPECTIVA_PADRAO;
  return lerPerspectivaGuardada(win) ?? PERSPECTIVA_PADRAO;
}

export interface SeletorDePerspectiva {
  elemento: HTMLElement;
  atualizar(id: string): void;
  destruir(): void;
}

/**
 * `<label>` + `<select>` with every registered Perspectiva. It stays visible with a single option (Requirement 19.1 asks for the
 * selector with `mermaid`). Native select: Tab focuses it, arrows change the option.
 */
export function criarSeletorDePerspectiva(
  doc: Document,
  t: (chave: string) => string,
  aoEscolher: (id: string) => void,
): SeletorDePerspectiva {
  const raiz = doc.createElement('div');
  raiz.className = 'flow-persp';
  raiz.dataset.flowPersp = '';
  const rotulo = doc.createElement('label');
  rotulo.htmlFor = 'flow-perspectiva';
  rotulo.textContent = t('flow.persp.label');
  const select = doc.createElement('select');
  select.id = 'flow-perspectiva';
  select.dataset.flowPerspSelect = '';
  for (const id of Object.keys(PERSPECTIVAS)) {
    const o = doc.createElement('option');
    o.value = id;
    const nome = t(`flow.persp.${id}`);
    o.textContent = nome === `flow.persp.${id}` ? id : nome;
    select.appendChild(o);
  }
  const aoMudar = (): void => aoEscolher(select.value);
  select.addEventListener('change', aoMudar);
  raiz.append(rotulo, select);
  return {
    elemento: raiz,
    atualizar(id) {
      select.value = id;
    },
    destruir() {
      select.removeEventListener('change', aoMudar);
      raiz.remove();
    },
  };
}
