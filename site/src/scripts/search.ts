// SPDX-License-Identifier: MIT
// Pagefind search page script. Loads the index from the built files, no server needed.
type PagefindResult = { url: string; excerpt: string; meta: { title?: string } };
type PagefindApi = {
  options: (o: Record<string, unknown>) => Promise<void>;
  search: (q: string, o?: Record<string, unknown>) => Promise<{ results: Array<{ data: () => Promise<PagefindResult> }> }>;
};

const form = document.getElementById('search-form') as HTMLFormElement | null;
if (form) {
  const base = form.dataset.base ?? '';
  const status = document.getElementById('search-status') as HTMLElement;
  const list = document.getElementById('search-results') as HTMLOListElement;
  const input = document.getElementById('search-q') as HTMLInputElement;
  const layerSel = document.getElementById('search-layer') as HTMLSelectElement;
  let api: Promise<PagefindApi> | undefined;

  const load = () =>
    (api ??= (async () => {
      const url = `${base}/pagefind/pagefind.js`;
      const mod = (await import(/* @vite-ignore */ url)) as PagefindApi;
      await mod.options({ baseUrl: `${base}/` });
      return mod;
    })());

  const withBase = (u: string) => (base && !u.startsWith(`${base}/`) ? `${base}${u}` : u);

  async function run() {
    const q = input.value.trim();
    list.textContent = '';
    if (!q) {
      status.textContent = '';
      return;
    }
    status.textContent = form!.dataset.msgLoading ?? '';
    try {
      const pf = await load();
      const layer = layerSel.value;
      const res = await pf.search(q, layer ? { filters: { layer } } : {});
      const items = await Promise.all(res.results.slice(0, 50).map((r) => r.data()));
      status.textContent = items.length === 0 ? (form!.dataset.msgNone ?? '') : (form!.dataset.msgCount ?? '').replace('{n}', String(res.results.length));
      for (const it of items) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = withBase(it.url);
        a.textContent = it.meta.title ?? it.url;
        const p = document.createElement('p');
        p.innerHTML = it.excerpt;
        li.append(a, p);
        list.append(li);
      }
    } catch {
      status.textContent = form!.dataset.msgError ?? '';
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = new URL(location.href);
    if (input.value.trim()) u.searchParams.set('q', input.value.trim());
    else u.searchParams.delete('q');
    history.replaceState(null, '', u);
    void run();
  });
  input.value = new URLSearchParams(location.search).get('q') ?? '';
  if (input.value) void run();
}
