"use server";

import { revalidatePath } from "next/cache";
import { createProject } from "@/server/project/service";

export async function createProjectAction(formData: FormData) {
  await createProject({
    merchantId: String(formData.get("merchantId") || ""),
    name: String(formData.get("name") || ""),
    description: String(formData.get("description") || ""),
    dueDate: String(formData.get("dueDate") || ""),
  });
  revalidatePath("/merchants");
}
