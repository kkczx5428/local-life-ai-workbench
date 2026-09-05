import { createMerchant, listMerchants } from "@/server/merchant/service";

export async function GET(request: Request) {
  const organizationId = new URL(request.url).searchParams.get("organizationId");
  if (!organizationId) return Response.json({ error: "缺少 organizationId" }, { status: 400 });
  return Response.json(await listMerchants(organizationId));
}

export async function POST(request: Request) {
  try { return Response.json(await createMerchant(await request.json()), { status: 201 }); }
  catch (error) { return Response.json({ error: error instanceof Error ? error.message : "创建商家失败" }, { status: 400 }); }
}
