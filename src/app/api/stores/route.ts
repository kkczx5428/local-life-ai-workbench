import { createStore } from "@/server/store/service";

export async function POST(request: Request) {
  try { return Response.json(await createStore(await request.json()), { status: 201 }); }
  catch (error) { return Response.json({ error: error instanceof Error ? error.message : "创建门店失败" }, { status: 400 }); }
}
