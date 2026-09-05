import { listMerchants } from "@/server/merchant/service";

const demoOrganizationId = "cmto2ij4y0001ut0k5wqw06xw";

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
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
