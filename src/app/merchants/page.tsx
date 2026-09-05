import { listMerchants } from "@/server/merchant/service";
import { MerchantForm } from "./MerchantForm";
import { StoreForm } from "./StoreForm";
import { ProjectForm } from "./ProjectForm";
import { demoOrganizationId } from "@/lib/demo-context";
import { DiagnosisButton } from "./DiagnosisButton";
import { ProductPlanButton } from "./ProductPlanButton";

export default async function MerchantsPage() {
  const merchants = await listMerchants(demoOrganizationId);

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12 text-slate-950">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-700">服务商工作台</p>
            <h1 className="mt-2 text-3xl font-semibold">客户商家</h1>
          </div>
          <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">{merchants.length} 家商家</span>
        </div>
        <MerchantForm />
        {merchants.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">暂无商家，请通过 API 创建第一家商家。</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {merchants.map((merchant) => (
              <article key={merchant.id} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{merchant.name}</h2>
                    <p className="mt-2 text-sm text-slate-500">{merchant.category || "未设置品类"}</p>
                  </div>
                  <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs text-cyan-700">{merchant.stores.length} 家门店</span>
                </div>
                {merchant.description && <p className="mt-5 text-sm leading-6 text-slate-600">{merchant.description}</p>}
                <div className="mt-5 space-y-2">
                  {merchant.stores.map((store) => (
                    <div key={store.id} className="rounded-lg bg-slate-50 px-3 py-2 text-sm">
                      <p className="font-medium">{store.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{store.address || "未填写地址"}{store.phone ? ` · ${store.phone}` : ""}</p>
                    </div>
                  ))}
                </div>
                <StoreForm merchantId={merchant.id} />
                <ProjectForm merchantId={merchant.id} />
                <DiagnosisButton merchantId={merchant.id} />
                <ProductPlanButton merchantId={merchant.id} />
                {merchant.projects.length > 0 && <div className="mt-5 border-t border-slate-100 pt-5"><p className="text-xs font-medium text-slate-500">运营项目</p>{merchant.projects.map((project) => <a href={`/projects/${project.id}`} key={project.id} className="mt-2 flex items-center justify-between rounded-lg bg-violet-50 px-3 py-2 text-sm hover:bg-violet-100"><span>{project.name}</span><span className="text-xs text-violet-700">查看详情 →</span></a>)}</div>}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
