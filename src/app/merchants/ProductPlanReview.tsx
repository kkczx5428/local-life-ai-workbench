"use client";
import { useState } from "react";

type Plan = { id: string; name: string; description: string | null; rules: string | null; reviewStatus: string; dealPrice: string | number | null };
export function ProductPlanReview({ plans }: { plans: Plan[] }) {
  const [items, setItems] = useState(plans);
  async function save(plan: Plan, reviewStatus: string) {
    const response = await fetch("/api/ai/product-plans", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: plan.id, name: plan.name, description: plan.description, rules: plan.rules, reviewStatus }) });
    if (response.ok) setItems((current) => current.map((item) => item.id === plan.id ? { ...item, reviewStatus } : item));
  }
  return <div className="mt-4 space-y-3">{items.map((plan) => <div key={plan.id} className="rounded-lg border border-orange-100 bg-white p-4"><div className="flex items-center justify-between"><input value={plan.name} onChange={(event) => setItems((current) => current.map((item) => item.id === plan.id ? { ...item, name: event.target.value } : item))} className="w-2/3 border-b border-slate-200 text-sm font-medium outline-none"/><span className="text-xs text-orange-700">¥{plan.dealPrice?.toString()}</span></div><textarea value={plan.description || ""} onChange={(event) => setItems((current) => current.map((item) => item.id === plan.id ? { ...item, description: event.target.value } : item))} placeholder="方案描述" className="mt-3 w-full rounded border p-2 text-xs"/><textarea value={plan.rules || ""} onChange={(event) => setItems((current) => current.map((item) => item.id === plan.id ? { ...item, rules: event.target.value } : item))} placeholder="使用规则" className="mt-2 w-full rounded border p-2 text-xs"/><div className="mt-3 flex gap-2"><button onClick={() => save(plan, "PENDING_REVIEW")} className="rounded bg-amber-500 px-3 py-1 text-xs text-white">提交审核</button><button onClick={() => save(plan, "APPROVED")} className="rounded bg-emerald-600 px-3 py-1 text-xs text-white">通过</button><span className="px-2 py-1 text-xs text-slate-500">{plan.reviewStatus}</span></div></div>)}</div>;
}
