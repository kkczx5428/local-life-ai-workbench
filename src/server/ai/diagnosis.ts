import { prisma } from "@/server/db";
import { getAiProvider } from "./provider";

export async function diagnoseMerchant(merchantId: string) {
  const merchant = await prisma.merchant.findUnique({ where: { id: merchantId } });
  if (!merchant) throw new Error("商家不存在");
  const result = await getAiProvider().diagnose(merchant);
  const latest = await prisma.merchantDiagnosis.findFirst({ where: { merchantId }, orderBy: { version: "desc" } });
  const diagnosis = await prisma.merchantDiagnosis.create({ data: { merchantId, version: (latest?.version || 0) + 1, result } });
  return { merchant, diagnosis };
}

export async function listMerchantDiagnoses(merchantId: string) {
  return prisma.merchantDiagnosis.findMany({ where: { merchantId }, orderBy: { version: "desc" }, take: 10 });
}
