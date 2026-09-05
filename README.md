# 本地生活团购 AI 工作台

面向本地生活代运营公司、团购服务商和探店机构的开源 AI 工作台。

> 商家资料 → AI 商家诊断 → 团购方案 → 内容协作 → 数据复盘

## 当前状态

项目正在开发中，当前已完成产品设计文档和 Next.js 项目基础骨架。

## 计划功能

- 服务商组织、成员、客户商家和项目管理
- 商家与门店档案及 Excel/CSV 导入
- AI 商家诊断与团购商品方案
- 短视频脚本、口播、分镜和发布排期
- 素材库、团队审核、评论、版本和任务协作
- 团购销量、核销、退款和内容表现复盘
- 七牛云 Kodo 与阿里云 OSS 对象存储
- 可替换的 AI Provider 和平台适配器

## 技术栈

Next.js、TypeScript、PostgreSQL、Prisma、Tailwind CSS、Docker Compose。

## 本地运行

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

导入商家资料：打开 `/imports/merchants`，上传 CSV 或 Excel 文件进行解析预览。

## 开发文档

- [产品设计](docs/superpowers/specs/2026-09-05-local-life-ai-workbench-design.md)
- [V0.1 实现计划](docs/superpowers/plans/2026-09-05-v01-foundation.md)

## 参与贡献

项目仍处于早期开发阶段，欢迎提交 Issue、功能建议和 Pull Request。

## 许可证

许可证方案尚在确认中。正式发布前会在仓库根目录补充完整许可证文件。
