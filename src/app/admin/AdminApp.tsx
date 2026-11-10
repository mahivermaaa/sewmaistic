"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useCallback, useEffect, useMemo, useState } from "react";

interface Photo {
  ref: string;
  url: string;
}
interface AdminProduct {
  _id: string;
  title: string;
  price: number;
  category: string;
  description?: string;
  outOfStock?: boolean;
  isNewArrival?: boolean;
  isFanFavourite?: boolean;
  images: Photo[];
}

interface CatRow {
  _id: string;
  slug: string;
  title: string;
  count: number;
  image?: Photo | null;
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const thumb = (url: string, w = 300) => `${url}?w=${w}&auto=format`;

const inputCls =
  "w-full border border-[#D5CEC2] bg-white rounded-md px-3 py-2.5 text-[14px] text-[#2E3A42] outline-none focus:border-black";
const btnBlack =
  "bg-black hover:bg-[#262626] active:bg-[#404040] disabled:opacity-60 text-white rounded-full px-5 py-2.5 text-[14px] font-medium transition-colors";
const btnLight =
  "border border-black text-black hover:bg-[#F2ECE1] disabled:opacity-60 rounded-full px-5 py-2.5 text-[14px] transition-colors";

async function call(url: string, method = "GET", body?: unknown) {
  const res = await fetch(url, {
    method,
    headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  return { ok: res.ok, status: res.status, data };
}

// Phone photos are huge: shrink to max 1600px JPEG before uploading.
async function compress(file: File): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * scale);
  const h = Math.round(bmp.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Your browser can't process photos.");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(bmp, 0, 0, w, h);
  bmp.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Could not process the photo."))), "image/jpeg", 0.86)
  );
}

export function AdminApp() {
  const [state, setState] = useState<"loading" | "login" | "ready" | "error">("loading");
  const [errMsg, setErrMsg] = useState("");
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<CatRow[]>([]);
  const [tab, setTab] = useState<"products" | "categories">("products");
  const [editing, setEditing] = useState<AdminProduct | "new" | null>(null);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [toast, setToast] = useState("");

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  const load = useCallback(async () => {
    const [r, c] = await Promise.all([call("/api/admin/products"), call("/api/admin/categories")]);
    if (r.status === 401 || c.status === 401) return setState("login");
    if (!r.ok || !c.ok) {
      setErrMsg(String((!r.ok ? r.data.error : c.data.error) ?? "Something went wrong."));
      return setState("error");
    }
    setProducts(r.data.products as AdminProduct[]);
    setCategories(c.data.categories as CatRow[]);
    setState("ready");
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const catTitles = useMemo(() => categories.map((c) => c.title), [categories]);
  const orphans = useMemo(() => products.filter((p) => !catTitles.includes(p.category)).length, [products, catTitles]);

  const visible = useMemo(() => {
    const s = q.trim().toLowerCase();
    return products.filter((p) => {
      const inCat = cat === "All" ? true : cat === "__none" ? !catTitles.includes(p.category) : p.category === cat;
      return inCat && (!s || p.title.toLowerCase().includes(s));
    });
  }, [products, q, cat, catTitles]);

  async function toggleStock(p: AdminProduct) {
    const next = !p.outOfStock;
    const r = await call(`/api/admin/products/${encodeURIComponent(p._id)}`, "PUT", { outOfStock: next });
    if (!r.ok) return flash(String(r.data.error ?? "Could not update."));
    setProducts((list) => list.map((x) => (x._id === p._id ? { ...x, outOfStock: next } : x)));
    flash(next ? "Marked as out of stock" : "Marked as in stock");
  }

  async function remove(p: AdminProduct) {
    if (!window.confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    const r = await call(`/api/admin/products/${encodeURIComponent(p._id)}`, "DELETE");
    if (!r.ok) return flash(String(r.data.error ?? "Could not delete."));
    setProducts((list) => list.filter((x) => x._id !== p._id));
    flash("Product deleted");
  }

  async function logout() {
    await call("/api/admin/logout", "POST");
    setProducts([]);
    setState("login");
  }

  if (state === "loading") {
    return <Shell><p className="text-center text-[#7A878B] py-24 font-sans">Loading…</p></Shell>;
  }
  if (state === "login") {
    return <Shell><Login onDone={load} /></Shell>;
  }
  if (state === "error") {
    return (
      <Shell>
        <div className="max-w-md mx-auto mt-24 bg-white border border-[#EBE6DD] rounded-lg p-6 text-center font-sans">
          <p className="text-[#DC2626] text-[14px]">{errMsg}</p>
          <button className={`${btnBlack} mt-4`} onClick={() => { setState("loading"); void load(); }}>Try again</button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell onLogout={logout}>
      <div className="max-w-5xl mx-auto px-4 py-6 font-sans">
        <div className="flex gap-6 border-b border-[#E3DED4] mb-5 text-[14px]">
          {(["products", "categories"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-2 -mb-px border-b-2 capitalize ${tab === t ? "border-black text-black" : "border-transparent text-[#7A878B] hover:text-black"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "categories" ? (
          <CategoriesPanel categories={categories} reload={() => void load()} flash={flash} />
        ) : (
          <>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
          <div>
            <h1 className="font-serif text-[30px] text-black leading-none">Products</h1>
            <p className="text-[13px] text-[#7A878B] mt-1">{products.length} in your shop</p>
          </div>
          <button className={btnBlack} onClick={() => setEditing("new")}>+ Add product</button>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <input className={inputCls} placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} />
          <select className={`${inputCls} sm:max-w-[220px]`} value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="All">All categories</option>
            {categories.map((c) => <option key={c._id} value={c.title}>{c.title}</option>)}
            {orphans > 0 && <option value="__none">⚠ Needs a category ({orphans})</option>}
          </select>
        </div>

        {visible.length === 0 ? (
          <p className="text-center text-[#7A878B] py-16 text-[14px]">
            {products.length === 0 ? "No products yet. Click “Add product” to create your first one." : "No products match your search."}
          </p>
        ) : (
          <ul className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
            {visible.map((p) => (
              <li key={p._id} className="flex gap-3 p-3 bg-white border border-[#EBE6DD] rounded-lg">
                <img src={thumb(p.images[0].url, 240)} alt="" className="w-24 h-24 rounded-md object-cover bg-[#F5F2EB] shrink-0" />
                <div className="flex-1 min-w-0 flex flex-col">
                  <p className="text-[15px] text-[#2E3A42] font-medium leading-snug line-clamp-1">{p.title}</p>
                  <p className="text-[14px] text-[#DC2626]">{inr(p.price)}</p>
                  <p className="text-[12px] text-[#7A878B] line-clamp-1">
                    {catTitles.includes(p.category) ? p.category : <span className="text-[#DC2626]">Needs a category</span>}
                    {p.isNewArrival ? " · New arrival" : ""}
                    {p.isFanFavourite ? " · Fan favourite" : ""}
                  </p>
                  <div className="mt-auto pt-2 flex items-center gap-3 flex-wrap">
                    <button
                      role="switch"
                      aria-checked={!p.outOfStock}
                      onClick={() => toggleStock(p)}
                      className="flex items-center gap-2 text-[12px] text-[#4F5A5E]"
                      title="Click to change stock status"
                    >
                      <span className={`relative inline-block w-9 h-5 rounded-full transition-colors ${p.outOfStock ? "bg-[#C9C4BA]" : "bg-black"}`}>
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${p.outOfStock ? "left-0.5" : "left-[18px]"}`} />
                      </span>
                      {p.outOfStock ? "Out of stock" : "In stock"}
                    </button>
                    <button className="text-[13px] text-black underline ml-auto" onClick={() => setEditing(p)}>Edit</button>
                    <button className="text-[13px] text-[#DC2626] underline" onClick={() => remove(p)}>Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
          </>
        )}
      </div>

      {editing && (
        <ProductForm
          key={editing === "new" ? "new" : editing._id}
          initial={editing === "new" ? undefined : editing}
          categories={catTitles}
          onClose={() => setEditing(null)}
          onSaved={(msg) => { setEditing(null); flash(msg); void load(); }}
        />
      )}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] bg-black text-white text-[13px] font-sans px-5 py-2.5 rounded-full shadow-lg">
          {toast}
        </div>
      )}
    </Shell>
  );
}

function Shell({ children, onLogout }: { children: React.ReactNode; onLogout?: () => void }) {
  return (
    <div className="min-h-screen bg-[#FBF9F4]">
      <header className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-serif text-[22px]">Sewmaistic <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-white/60 ml-1">Admin</span></span>
          <div className="flex items-center gap-4 font-sans text-[13px]">
            <a href="/" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white">View shop</a>
            {onLogout && <button onClick={onLogout} className="text-white/80 hover:text-white">Log out</button>}
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

function Login({ onDone }: { onDone: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const r = await call("/api/admin/login", "POST", { username, password });
    setBusy(false);
    if (!r.ok) return setErr(String(r.data.error ?? "Could not sign in."));
    onDone();
  }

  return (
    <form onSubmit={submit} className="w-[calc(100%-2rem)] max-w-sm mx-auto mt-16 sm:mt-24 bg-white border border-[#EBE6DD] rounded-lg p-6 font-sans shadow-sm">
      <h1 className="font-serif text-[28px] text-black">Sign in</h1>
      <p className="text-[13px] text-[#7A878B] mb-4">Manage your Sewmaistic products.</p>
      <label className="block text-[12px] text-[#4F5A5E] mb-1">ID</label>
      <input className={inputCls} value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" autoFocus />
      <label className="block text-[12px] text-[#4F5A5E] mb-1 mt-3">Password</label>
      <input className={inputCls} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
      {err && <p className="mt-3 text-[13px] text-[#DC2626]">{err}</p>}
      <button className={`${btnBlack} w-full mt-5`} disabled={busy || !username || !password}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

function ProductForm({
  initial,
  categories,
  onClose,
  onSaved,
}: {
  initial?: AdminProduct;
  categories: string[];
  onClose: () => void;
  onSaved: (msg: string) => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [price, setPrice] = useState(initial ? String(initial.price) : "");
  const [category, setCategory] = useState(initial && categories.includes(initial.category) ? initial.category : "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [outOfStock, setOutOfStock] = useState(!!initial?.outOfStock);
  const [isNewArrival, setIsNewArrival] = useState(!!initial?.isNewArrival);
  const [isFanFavourite, setIsFanFavourite] = useState(!!initial?.isFanFavourite);
  const [photos, setPhotos] = useState<Photo[]>(initial?.images ?? []);
  const [uploading, setUploading] = useState(0);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  async function addFiles(files: File[]) {
    let room = 8 - photos.length;
    if (room <= 0) return setErr("You can add up to 8 photos.");
    setErr("");
    for (const f of files) {
      if (room <= 0) break;
      room--;
      setUploading((n) => n + 1);
      try {
        const blob = await compress(f);
        const res = await fetch("/api/admin/upload", { method: "POST", headers: { "Content-Type": "image/jpeg" }, body: blob });
        const data = (await res.json().catch(() => ({}))) as { ref?: string; url?: string; error?: string };
        if (!res.ok || !data.ref || !data.url) throw new Error(data.error || "Upload failed.");
        const added = { ref: data.ref, url: data.url };
        setPhotos((p) => [...p, added]);
      } catch (e) {
        setErr(`Could not add ${f.name}: ${e instanceof Error ? e.message : "try a JPG or PNG photo."}`);
      } finally {
        setUploading((n) => n - 1);
      }
    }
  }

  const makeMain = (i: number) => setPhotos((p) => [p[i], ...p.filter((_, j) => j !== i)]);
  const removePhoto = (i: number) => setPhotos((p) => p.filter((_, j) => j !== i));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (uploading > 0) return;
    if (!title.trim()) return setErr("Please enter a product name.");
    if (!/^\d+$/.test(price) || Number(price) < 1) return setErr("Please enter the price as a number, for example 849.");
    if (!category) return setErr("Please choose a category.");
    if (photos.length === 0) return setErr("Please add at least one photo.");
    setSaving(true);
    setErr("");
    const payload = {
      title: title.trim(),
      price: Number(price),
      category,
      description,
      outOfStock,
      isNewArrival,
      isFanFavourite,
      images: photos.map((p) => p.ref),
    };
    const r = initial
      ? await call(`/api/admin/products/${encodeURIComponent(initial._id)}`, "PUT", payload)
      : await call("/api/admin/products", "POST", payload);
    setSaving(false);
    if (!r.ok) return setErr(String(r.data.error ?? "Could not save. Please try again."));
    onSaved(initial ? "Changes saved" : "Product added");
  }

  const toggle = (label: string, hint: string, value: boolean, set: (v: boolean) => void) => (
    <label className="flex items-start gap-3 cursor-pointer py-1.5">
      <input type="checkbox" checked={value} onChange={(e) => set(e.target.checked)} className="mt-1 w-4 h-4 accent-black" />
      <span>
        <span className="block text-[14px] text-[#2E3A42]">{label}</span>
        <span className="block text-[12px] text-[#7A878B]">{hint}</span>
      </span>
    </label>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4">
      <div className="absolute inset-0 bg-black/50" onClick={saving ? undefined : onClose} />
      <form
        onSubmit={save}
        className="relative w-full max-w-xl max-h-[94vh] overflow-y-auto bg-[#FBF9F4] rounded-lg shadow-2xl border border-[#EBE6DD] p-5 sm:p-7 font-sans"
      >
        <h2 className="font-serif text-[26px] text-black">{initial ? "Edit product" : "Add product"}</h2>

        <label className="block text-[12px] text-[#4F5A5E] mb-1 mt-4">Product name</label>
        <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div>
            <label className="block text-[12px] text-[#4F5A5E] mb-1">Price (₹)</label>
            <input className={inputCls} inputMode="numeric" placeholder="849" value={price} onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))} />
          </div>
          <div>
            <label className="block text-[12px] text-[#4F5A5E] mb-1">Category</label>
            <select className={inputCls} value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Choose a category</option>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <label className="block text-[12px] text-[#4F5A5E] mb-1 mt-3">Description (optional)</label>
        <textarea className={inputCls} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={2000} />

        <label className="block text-[12px] text-[#4F5A5E] mb-1 mt-3">
          Photos <span className="text-[#7A878B]">(first one is the main photo, up to 8)</span>
        </label>
        <div className="grid grid-cols-4 gap-2">
          {photos.map((p, i) => (
            <div key={p.ref + i} className="relative aspect-square rounded-md overflow-hidden bg-[#F5F2EB] border border-[#EBE6DD]">
              <img src={thumb(p.url, 240)} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(i)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/80 text-white text-[12px] leading-none"
                aria-label="Remove photo"
              >
                ×
              </button>
              {i === 0 ? (
                <span className="absolute bottom-0 inset-x-0 bg-black/80 text-white text-[10px] text-center py-0.5">Main</span>
              ) : (
                <button
                  type="button"
                  onClick={() => makeMain(i)}
                  className="absolute bottom-0 inset-x-0 bg-white/90 text-black text-[10px] text-center py-0.5"
                >
                  Make main
                </button>
              )}
            </div>
          ))}
          {Array.from({ length: uploading }).map((_, i) => (
            <div key={`u${i}`} className="aspect-square rounded-md bg-[#F5F2EB] border border-[#EBE6DD] flex items-center justify-center text-[11px] text-[#7A878B]">
              Uploading…
            </div>
          ))}
          {photos.length + uploading < 8 && (
            <label className="aspect-square rounded-md border border-dashed border-[#A9A398] flex flex-col items-center justify-center text-[12px] text-[#4F5A5E] cursor-pointer hover:bg-white">
              <span className="text-[22px] leading-none">+</span>
              Add photos
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  const list = Array.from(e.target.files ?? []);
                  e.target.value = "";
                  void addFiles(list);
                }}
              />
            </label>
          )}
        </div>

        <div className="mt-4 border-t border-[#EBE6DD] pt-3">
          {toggle("Out of stock", "Shows an “Out of Stock” label and blocks ordering.", outOfStock, setOutOfStock)}
          {toggle("Show in New Arrivals", "Appears in the New Arrivals row on the home page.", isNewArrival, setIsNewArrival)}
          {toggle("Fan favourite", "Appears in the Fan Favourites row on the home page.", isFanFavourite, setIsFanFavourite)}
        </div>

        {err && <p className="mt-3 text-[13px] text-[#DC2626]">{err}</p>}

        <div className="mt-5 flex gap-3 justify-end">
          <button type="button" className={btnLight} onClick={onClose} disabled={saving}>Cancel</button>
          <button className={btnBlack} disabled={saving || uploading > 0}>
            {saving ? "Saving…" : uploading > 0 ? "Uploading photos…" : initial ? "Save changes" : "Add product"}
          </button>
        </div>
      </form>
    </div>
  );
}

function CategoriesPanel({
  categories,
  reload,
  flash,
}: {
  categories: CatRow[];
  reload: () => void;
  flash: (m: string) => void;
}) {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const r = await call("/api/admin/categories", "POST", { title: name });
    setBusy(false);
    if (!r.ok) return setErr(String(r.data.error ?? "Could not add the category."));
    setName("");
    flash("Category added");
    reload();
  }

  async function rename(c: CatRow) {
    setBusy(true);
    setErr("");
    const r = await call(`/api/admin/categories/${encodeURIComponent(c._id)}`, "PUT", { title: editName });
    setBusy(false);
    if (!r.ok) return setErr(String(r.data.error ?? "Could not rename."));
    setEditId(null);
    flash("Category renamed");
    reload();
  }

  async function remove(c: CatRow) {
    if (!window.confirm(`Delete the category "${c.title}"?`)) return;
    setErr("");
    const r = await call(`/api/admin/categories/${encodeURIComponent(c._id)}`, "DELETE");
    if (!r.ok) return setErr(String(r.data.error ?? "Could not delete."));
    flash("Category deleted");
    reload();
  }

  async function uploadCover(c: CatRow, file: File) {
    setErr("");
    try {
      const blob = await compress(file);
      const res = await fetch("/api/admin/upload", { method: "POST", headers: { "Content-Type": "image/jpeg" }, body: blob });
      const data = (await res.json().catch(() => ({}))) as { ref?: string; url?: string; error?: string };
      if (!res.ok || !data.ref) throw new Error(data.error || "Upload failed.");
      const r = await call(`/api/admin/categories/${encodeURIComponent(c._id)}`, "PUT", { title: c.title, image: data.ref });
      if (!r.ok) throw new Error(String(r.data.error ?? "Could not save the cover photo."));
      flash("Cover photo updated");
      reload();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not add that photo.");
    }
  }

  async function removeCover(c: CatRow) {
    setErr("");
    const r = await call(`/api/admin/categories/${encodeURIComponent(c._id)}`, "PUT", { title: c.title, image: null });
    if (!r.ok) return setErr(String(r.data.error ?? "Could not remove the cover photo."));
    flash("Cover photo removed");
    reload();
  }

  return (
    <div>
      <h1 className="font-serif text-[30px] text-black leading-none">Categories</h1>
      <p className="text-[13px] text-[#7A878B] mt-1">
        Each category gets its own page on the shop. Renaming a category also renames it on all its products.
      </p>

      <form onSubmit={add} className="mt-4 flex gap-3">
        <input className={inputCls} placeholder="New category name, e.g. Earrings" value={name} maxLength={40} onChange={(e) => setName(e.target.value)} />
        <button className={`${btnBlack} whitespace-nowrap`} disabled={busy || !name.trim()}>Add category</button>
      </form>
      {err && <p className="mt-3 text-[13px] text-[#DC2626]">{err}</p>}

      <ul className="mt-4 flex flex-col gap-2">
        {categories.map((c) => (
          <li key={c._id} className="flex items-center gap-3 p-3 bg-white border border-[#EBE6DD] rounded-lg flex-wrap">
            {editId === c._id ? (
              <>
                <input className={inputCls} value={editName} maxLength={40} autoFocus onChange={(e) => setEditName(e.target.value)} />
                <button className="text-[13px] text-black underline" disabled={busy} onClick={() => rename(c)}>Save</button>
                <button className="text-[13px] text-[#7A878B] underline" onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <div className="relative w-14 h-14 rounded-md overflow-hidden bg-[#F5F2EB] border border-[#EBE6DD] shrink-0">
                  {c.image?.url ? (
                    <img src={thumb(c.image.url, 160)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[9px] text-[#A9A398] text-center leading-tight px-1">No photo</div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[15px] text-[#2E3A42] line-clamp-1">{c.title}</p>
                  <p className="text-[12px] text-[#7A878B]">
                    {c.count} product{c.count === 1 ? "" : "s"} · /category/{c.slug}
                  </p>
                </div>

                <label className="text-[13px] text-black underline cursor-pointer whitespace-nowrap">
                  {c.image?.url ? "Change photo" : "Add photo"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      e.target.value = "";
                      if (f) void uploadCover(c, f);
                    }}
                  />
                </label>
                {c.image?.url && (
                  <button className="text-[13px] text-[#7A878B] underline whitespace-nowrap" onClick={() => removeCover(c)}>Remove</button>
                )}

                <button className="text-[13px] text-black underline" onClick={() => { setEditId(c._id); setEditName(c.title); setErr(""); }}>Rename</button>
                <button className="text-[13px] text-[#DC2626] underline" onClick={() => remove(c)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
