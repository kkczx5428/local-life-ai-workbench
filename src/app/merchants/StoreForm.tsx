import { createStoreAction } from "./store-actions";

export function StoreForm({ merchantId }: { merchantId: string }) {
  return (
    <form action={createStoreAction} className="mt-5 border-t border-slate-100 pt-5">
      <input type="hidden" name="merchantId" value={merchantId} />
      <div className="grid gap-3 md:grid-cols-3">
        <input name="name" required placeholder="门店名称" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-cyan-500" />
        <input name="address" placeholder="门店地址" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-cyan-500" />
        <input name="phone" placeholder="联系电话" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-cyan-500" />
      </div>
      <button type="submit" className="mt-3 rounded-lg bg-cyan-600 px-4 py-2 text-xs font-medium text-white hover:bg-cyan-700">添加门店</button>
    </form>
  );
}
