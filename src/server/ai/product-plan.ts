import { prisma } from "@/server/db";

export async function generateProductPlans(merchantId: string) {
  const merchant = await prisma.merchant.findUnique({ where: { id: merchantId } });
  if (!merchant) throw new Error("商家不存在");
  const plans = [
    { name: `${merchant.name}新客体验团`, type: "引流款", originalPrice: 99, dealPrice: 59, cost: 35, description: "降低首次消费决策门槛，突出核心体验。", rules: "每位新客限购一份，使用前请提前预约。" },
    { name: `${merchant.name}招牌双人套餐`, type: "主推款", originalPrice: 198, dealPrice: 139, cost: 82, description: "适合情侣、朋友和周末消费场景。", rules: "两人使用，节假日按商家规则预约。" },
    { name: `${merchant.name}高阶尊享套餐`, type: "利润款", originalPrice: 398, dealPrice: 299, cost: 175, description: "增加服务内容和客单价，承接高意向客户。", rules: "有效期内使用，具体服务以门店确认结果为准。" },
  ];
  return prisma.$transaction(plans.map((plan) => prisma.productPlan.create({ data: { merchantId, ...plan } })));
}

export async function listProductPlans(merchantId: string) {
  return prisma.productPlan.findMany({ where: { merchantId }, orderBy: { createdAt: "desc" } });
}

export async function updateProductPlan(id: string, input: { name?: string; description?: string; rules?: string; reviewStatus?: "DRAFT" | "PENDING_REVIEW" | "APPROVED" | "REJECTED" }) {
  return prisma.productPlan.update({ where: { id }, data: { name: input.name?.trim(), description: input.description?.trim(), rules: input.rules?.trim(), reviewStatus: input.reviewStatus } });
}
