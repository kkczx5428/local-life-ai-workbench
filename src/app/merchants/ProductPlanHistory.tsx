import { listProductPlans } from "@/server/ai/product-plan";

export async function ProductPlanHistory({ merchantId }: { merchantId: string }) {
  const plans = await listProductPlans(merchantId);
  if (!plans.length) return null;
  return <div className="mt-3 rounded-lg bg-orange-50 p-3 text-xs text-slate-700"><p className="font-medium">已保存团购方案（{plans.length}）</p>{plans.slice(0, 6).map((plan) => <div key={plan.id} className="mt-2 flex justify-between"><span>{plan.type} · {plan.name}</span><span>¥{plan.dealPrice?.toString()}</span></div>)}</div>;
}
