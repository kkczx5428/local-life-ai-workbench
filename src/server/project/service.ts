import { prisma } from "@/server/db";

export async function createProject(input: { merchantId: string; name: string; description?: string; dueDate?: string }) {
  const name = input.name.trim();
  if (!input.merchantId || !name) throw new Error("商家和项目名称不能为空");
  return prisma.project.create({
    data: { merchantId: input.merchantId, name, description: input.description?.trim(), dueDate: input.dueDate ? new Date(input.dueDate) : undefined },
  });
}
