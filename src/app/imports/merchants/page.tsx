"use client";

import { useState } from "react";

export default function MerchantImportPage() {
  const [result, setResult] = useState<{ rows: { name: string; category?: string }[]; errors: { row: number; message: string }[] } | null>(null);
  async function submit(formData: FormData) {
    const response = await fetch("/api/imports/merchants", { method: "POST", body: formData });
    setResult(await response.json());
  }
  return <main className="min-h-screen bg-slate-100 px-6 py-12"><div className="mx-auto max-w-4xl"><a href="/merchants" className="text-sm text-cyan-700">← 返回商家</a><h1 className="mt-4 text-3xl font-semibold">导入商家资料</h1><form action={submit} className="mt-8 rounded-2xl bg-white p-6 shadow-sm"><p className="text-sm text-slate-600">上传包含“商家名称 / 品类 / 描述”列的 CSV 或 Excel 文件。</p><input name="file" type="file" required accept=".csv,.xlsx,.xls" className="mt-5 block text-sm"/><button className="mt-5 rounded-lg bg-slate-950 px-5 py-2 text-sm text-white">解析预览</button></form>{result && <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm"><h2 className="font-semibold">解析结果：{result.rows.length} 行</h2>{result.errors.length > 0 && <div className="mt-4 space-y-2 text-sm text-red-600">{result.errors.map((error) => <p key={`${error.row}-${error.message}`}>第 {error.row} 行：{error.message}</p>)}</div>}<div className="mt-4 space-y-2">{result.rows.map((row, index) => <div key={`${row.name}-${index}`} className="rounded-lg bg-slate-50 px-3 py-2 text-sm">{row.name} · {row.category || "未分类"}</div>)}</div></section>}</div></main>;
}
