import { prisma } from "@/server/db";

export async function createStore(input: { merchantId: string; name: string; address?: string; phone?: string }) {
  const name = input.name.trim();
  if (!input.merchantId || !name) throw new Error("商家和门店名称不能为空");
  return prisma.store.create({ data: { merchantId: input.merchantId, name, address: input.address?.trim(), phone: input.phone?.trim() } });
}
