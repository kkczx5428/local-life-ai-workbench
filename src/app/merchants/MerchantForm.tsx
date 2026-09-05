import { createMerchantAction } from "./actions";

export function MerchantForm() {
  return (
    <form action={createMerchantAction} className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">新增商家</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <input name="name" required placeholder="商家名称" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-cyan-500" />
        <input name="category" placeholder="所属品类，例如：餐饮" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-cyan-500" />
        <input name="description" placeholder="一句话描述" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-cyan-500" />
      </div>
      <button type="submit" className="mt-4 rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800">保存商家</button>
    </form>
  );
}
