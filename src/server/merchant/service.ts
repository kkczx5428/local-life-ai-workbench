import { prisma } from "@/server/db";

export async function createMerchant(input: { organizationId: string; name: string; category?: string; description?: string }) {
  const name = input.name.trim();
  if (!input.organizationId || !name) throw new Error("组织和商家名称不能为空");
  return prisma.merchant.create({ data: { organizationId: input.organizationId, name, category: input.category?.trim(), description: input.description?.trim() } });
}

export async function listMerchants(organizationId: string) {
  return prisma.merchant.findMany({ where: { organizationId }, include: { stores: true, projects: true }, orderBy: { createdAt: "desc" } });
}
