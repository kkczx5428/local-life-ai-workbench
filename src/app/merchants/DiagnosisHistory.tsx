import { listMerchantDiagnoses } from "@/server/ai/diagnosis";

export async function DiagnosisHistory({ merchantId }: { merchantId: string }) {
  const diagnoses = await listMerchantDiagnoses(merchantId);
  if (!diagnoses.length) return null;
  return <div className="mt-3 rounded-lg bg-slate-50 p-3 text-xs text-slate-600"><p className="font-medium text-slate-700">诊断历史</p>{diagnoses.slice(0, 3).map((diagnosis) => <div key={diagnosis.id} className="mt-2 flex justify-between"><span>版本 {diagnosis.version}</span><span>{diagnosis.createdAt.toLocaleString("zh-CN")}</span></div>)}</div>;
}
