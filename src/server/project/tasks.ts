import { prisma } from "@/server/db";

export async function getProject(id: string) {
  return prisma.project.findUnique({ where: { id }, include: { merchant: true, tasks: { orderBy: { createdAt: "desc" } } } });
}

export async function createTask(input: { projectId: string; title: string; description?: string; dueDate?: string }) {
  const title = input.title.trim();
  if (!input.projectId || !title) throw new Error("项目和任务标题不能为空");
  return prisma.task.create({ data: { projectId: input.projectId, title, description: input.description?.trim(), dueDate: input.dueDate ? new Date(input.dueDate) : undefined } });
}
