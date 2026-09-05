import { diagnoseMerchant, listMerchantDiagnoses } from "@/server/ai/diagnosis";

export async function GET(request: Request) {
  const merchantId = new URL(request.url).searchParams.get("merchantId");
  if (!merchantId) return Response.json({ error: "缺少 merchantId" }, { status: 400 });
  return Response.json({ diagnoses: await listMerchantDiagnoses(merchantId) });
}

export async function POST(request: Request) {
  try { const { merchantId } = await request.json(); return Response.json(await diagnoseMerchant(merchantId)); }
  catch (error) { return Response.json({ error: error instanceof Error ? error.message : "诊断失败" }, { status: 400 }); }
}
