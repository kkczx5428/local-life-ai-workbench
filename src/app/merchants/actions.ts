"use server";

import { revalidatePath } from "next/cache";
import { createMerchant } from "@/server/merchant/service";

export async function createMerchantAction(formData: FormData) {
  await createMerchant({
    organizationId: "cmto2ij4y0001ut0k5wqw06xw",
    name: String(formData.get("name") || ""),
    category: String(formData.get("category") || ""),
    description: String(formData.get("description") || ""),
  });
  revalidatePath("/merchants");
}
