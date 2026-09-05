import { generateProductPlans } from "@/server/ai/product-plan";

export async function POST(request: Request) {
  try { const { merchantId } = await request.json(); return Response.json({ plans: await generateProductPlans(merchantId) }, { status: 201 }); }
  catch (error) { return Response.json({ error: error instanceof Error ? error.message : "生成团购方案失败" }, { status: 400 }); }
}
