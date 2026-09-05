"use server";

import { revalidatePath } from "next/cache";
import { createProject } from "@/server/project/service";
import { createTask } from "@/server/project/tasks";

export async function createProjectAction(formData: FormData) {
  await createProject({
    merchantId: String(formData.get("merchantId") || ""),
    name: String(formData.get("name") || ""),
    description: String(formData.get("description") || ""),
    dueDate: String(formData.get("dueDate") || ""),
  });
  revalidatePath("/merchants");
}

export async function createTaskAction(formData: FormData) {
  const projectId = String(formData.get("projectId") || "");
  await createTask({ projectId, title: String(formData.get("title") || ""), description: String(formData.get("description") || ""), dueDate: String(formData.get("dueDate") || "") });
  revalidatePath(`/projects/${projectId}`);
}
