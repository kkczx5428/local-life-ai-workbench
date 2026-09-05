"use server";

import { revalidatePath } from "next/cache";
import { createMerchant } from "@/server/merchant/service";
import { demoOrganizationId } from "@/lib/demo-context";

export async function createMerchantAction(formData: FormData) {
  await createMerchant({
    organizationId: demoOrganizationId,
    name: String(formData.get("name") || ""),
    category: String(formData.get("category") || ""),
    description: String(formData.get("description") || ""),
  });
  revalidatePath("/merchants");
}
