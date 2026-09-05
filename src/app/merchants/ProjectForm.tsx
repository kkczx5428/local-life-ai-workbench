import { createProjectAction } from "./project-actions";

export function ProjectForm({ merchantId }: { merchantId: string }) {
  return (
    <form action={createProjectAction} className="mt-5 border-t border-slate-100 pt-5">
      <input type="hidden" name="merchantId" value={merchantId} />
      <div className="grid gap-3 md:grid-cols-3">
        <input name="name" required placeholder="项目名称，例如：五一团购策划" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-violet-500" />
        <input name="description" placeholder="项目目标" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-violet-500" />
        <input name="dueDate" type="date" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-violet-500" />
      </div>
      <button type="submit" className="mt-3 rounded-lg bg-violet-600 px-4 py-2 text-xs font-medium text-white hover:bg-violet-700">创建项目</button>
    </form>
  );
}
