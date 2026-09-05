"use client";
import { useState } from "react";

export function DiagnosisButton({ merchantId }: { merchantId: string }) {
  const [result, setResult] = useState<{ positioning: string; targetAudience: string[]; actions: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  async function diagnose() { setLoading(true); const response = await fetch("/api/ai/diagnosis", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ merchantId }) }); const data = await response.json(); setResult(data.diagnosis?.result || null); setLoading(false); }
  return <div className="mt-5 border-t border-slate-100 pt-5"><button onClick={diagnose} disabled={loading} className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white disabled:opacity-50">{loading ? "诊断中…" : "生成 AI 商家诊断"}</button>{result && <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm"><p className="font-medium">{result.positioning}</p><p className="mt-3">目标客群：{result.targetAudience.join("、")}</p><p className="mt-2">下一步：{result.actions.join("；")}</p></div>}</div>;
}
