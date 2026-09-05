"use client";
import { useState } from "react";

type Plan = { name: string; type: string; dealPrice: string | number; cost: string | number; description: string };
export function ProductPlanButton({ merchantId }: { merchantId: string }) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  async function generate() { setLoading(true); const response = await fetch("/api/ai/product-plans", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ merchantId }) }); const data = await response.json(); setPlans(data.plans || []); setLoading(false); }
  return <div className="mt-4"><button onClick={generate} disabled={loading} className="rounded-lg bg-orange-500 px-4 py-2 text-xs font-medium text-white disabled:opacity-50">{loading ? "生成中…" : "生成团购方案"}</button>{plans.length > 0 && <div className="mt-3 space-y-2">{plans.map((plan) => <div key={plan.name} className="rounded-lg bg-orange-50 p-3 text-sm"><div className="flex justify-between font-medium"><span>{plan.name}</span><span>¥{plan.dealPrice} · 毛利 ¥{Number(plan.dealPrice) - Number(plan.cost)}</span></div><p className="mt-1 text-xs text-slate-600">{plan.type}：{plan.description}</p></div>)}</div>}</div>;
}
