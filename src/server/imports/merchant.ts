import * as XLSX from "xlsx";

export type MerchantImportRow = { name: string; category?: string; description?: string };
export type ImportPreview = { rows: MerchantImportRow[]; errors: { row: number; message: string }[] };

export function parseMerchantFile(buffer: Buffer, filename: string): ImportPreview {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  if (!sheet) return { rows: [], errors: [{ row: 0, message: "文件没有工作表" }] };
  const records = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });
  const rows: MerchantImportRow[] = [];
  const errors: ImportPreview["errors"] = [];
  records.forEach((record, index) => {
    const name = String(record.name || record["商家名称"] || "").trim();
    if (!name) errors.push({ row: index + 2, message: "缺少商家名称" });
    else rows.push({ name, category: String(record.category || record["品类"] || "").trim() || undefined, description: String(record.description || record["描述"] || "").trim() || undefined });
  });
  if (!filename.match(/\.(csv|xlsx|xls)$/i)) errors.push({ row: 0, message: "仅支持 CSV、XLSX、XLS 文件" });
  return { rows, errors };
}
