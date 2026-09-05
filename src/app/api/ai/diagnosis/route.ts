import { diagnoseMerchant } from "@/server/ai/diagnosis";

export async function POST(request: Request) {
  try { const { merchantId } = await request.json(); return Response.json(await diagnoseMerchant(merchantId)); }
  catch (error) { return Response.json({ error: error instanceof Error ? error.message : "诊断失败" }, { status: 400 }); }
}
