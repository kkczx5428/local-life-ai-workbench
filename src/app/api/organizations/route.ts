import { createOrganization } from "@/server/organization/service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await createOrganization(body);
    return Response.json(result, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "创建组织失败";
    return Response.json({ error: message }, { status: 400 });
  }
}
