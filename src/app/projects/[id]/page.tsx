import { getProject } from "@/server/project/tasks";
import { createTaskAction } from "@/app/merchants/project-actions";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const project = await getProject((await params).id);
  if (!project) return <main className="p-12">项目不存在</main>;
  return <main className="min-h-screen bg-slate-100 px-6 py-12"><div className="mx-auto max-w-4xl"><a href="/merchants" className="text-sm text-cyan-700">← 返回商家</a><h1 className="mt-4 text-3xl font-semibold">{project.name}</h1><p className="mt-2 text-slate-600">{project.merchant.name} · {project.description || "暂无项目描述"}</p><form action={createTaskAction} className="mt-8 rounded-2xl bg-white p-6 shadow-sm"><input type="hidden" name="projectId" value={project.id}/><h2 className="font-semibold">新增任务</h2><div className="mt-4 flex gap-3"><input required name="title" placeholder="任务标题" className="flex-1 rounded-lg border px-3 py-2 text-sm"/><input name="description" placeholder="任务说明" className="flex-1 rounded-lg border px-3 py-2 text-sm"/><button className="rounded-lg bg-violet-600 px-4 py-2 text-sm text-white">添加</button></div></form><div className="mt-6 space-y-3">{project.tasks.map(task => <div key={task.id} className="rounded-xl bg-white p-4 shadow-sm"><p className="font-medium">{task.title}</p><p className="mt-1 text-sm text-slate-500">{task.description || "暂无说明"} · {task.status === "TODO" ? "待处理" : task.status === "IN_PROGRESS" ? "进行中" : "已完成"}</p></div>)}</div></div></main>;
}
