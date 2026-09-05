import { parseMerchantFile } from "@/server/imports/merchant";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return Response.json({ error: "请上传文件" }, { status: 400 });
  const preview = parseMerchantFile(Buffer.from(await file.arrayBuffer()), file.name);
  return Response.json(preview, { status: preview.errors.length ? 422 : 200 });
}
