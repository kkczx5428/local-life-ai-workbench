"use server";

import { revalidatePath } from "next/cache";
import { createStore } from "@/server/store/service";

export async function createStoreAction(formData: FormData) {
  await createStore({
    merchantId: String(formData.get("merchantId") || ""),
    name: String(formData.get("name") || ""),
    address: String(formData.get("address") || ""),
    phone: String(formData.get("phone") || ""),
  });
  revalidatePath("/merchants");
}
