import { prisma } from "@/server/db";
import { getAiProvider } from "./provider";

export async function diagnoseMerchant(merchantId: string) {
  const merchant = await prisma.merchant.findUnique({ where: { id: merchantId } });
  if (!merchant) throw new Error("商家不存在");
  const result = await getAiProvider().diagnose(merchant);
  return { merchant, result };
}
