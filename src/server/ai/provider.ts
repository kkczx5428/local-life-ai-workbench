export type DiagnosisResult = { positioning: string; targetAudience: string[]; productDirections: string[]; priceAdvice: string; sellingPoints: string[]; risks: string[]; actions: string[] };

export interface AiProvider { diagnose(input: { name: string; category?: string | null; description?: string | null }): Promise<DiagnosisResult>; }

export class DeterministicAiProvider implements AiProvider {
  async diagnose(input: { name: string; category?: string | null; description?: string | null }): Promise<DiagnosisResult> {
    const category = input.category || "本地生活服务";
    return { positioning: `${input.name}是一家面向本地客群的${category}门店，建议围绕高频消费场景建立团购入口。`, targetAudience: ["周边3-5公里居民", "周末休闲客群", "短视频平台新客"], productDirections: ["低门槛引流套餐", "高毛利核心套餐", "节日或周末限定套餐"], priceAdvice: "建议形成引流款、主推款、利润款三级价格结构，并先用小规模活动验证转化。", sellingPoints: ["距离近、决策成本低", "套餐规则清晰", "突出真实体验与服务差异"], risks: ["低价套餐可能挤压毛利", "服务承载能力不足会影响核销体验"], actions: ["补充成本与历史销量", "拍摄环境和产品真实素材", "上线前人工审核团购规则"] };
  }
}

export class OpenAiCompatibleProvider implements AiProvider {
  constructor(private readonly baseUrl: string, private readonly apiKey: string, private readonly model: string) {}
  async diagnose(input: { name: string; category?: string | null; description?: string | null }): Promise<DiagnosisResult> {
    const response = await fetch(`${this.baseUrl.replace(/\/$/, "")}/chat/completions`, { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${this.apiKey}` }, body: JSON.stringify({ model: this.model, temperature: 0.2, messages: [{ role: "system", content: "你是本地生活团购运营顾问。只返回严格 JSON，字段为 positioning(string), targetAudience(string[]), productDirections(string[]), priceAdvice(string), sellingPoints(string[]), risks(string[]), actions(string[])." }, { role: "user", content: JSON.stringify(input) }] }), signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`AI 服务请求失败（HTTP ${response.status}）`);
    const payload = await response.json() as { choices?: { message?: { content?: string } }[] };
    const content = payload.choices?.[0]?.message?.content;
    if (!content) throw new Error("AI 服务返回内容为空");
    try { return JSON.parse(content.replace(/^```json\s*|\s*```$/g, "")) as DiagnosisResult; }
    catch { throw new Error("AI 服务返回的诊断结果不是有效 JSON"); }
  }
}

export function getAiProvider(): AiProvider {
  if (process.env.AI_BASE_URL && process.env.AI_API_KEY && process.env.AI_MODEL) return new OpenAiCompatibleProvider(process.env.AI_BASE_URL, process.env.AI_API_KEY, process.env.AI_MODEL);
  return new DeterministicAiProvider();
}
