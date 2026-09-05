# V0.1 基础工作台 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 交付可用 Docker 启动的服务商基础工作台，支持组织、商家、门店、项目、任务、文件和 CSV/Excel 导入。

**Architecture:** 采用 Next.js 模块化单体，领域模块按业务边界组织；PostgreSQL 保存业务数据，统一 StorageProvider 隔离本地、七牛云 Kodo 和阿里云 OSS。首版使用数据库任务表，不引入独立微服务。

**Tech Stack:** Next.js、TypeScript、PostgreSQL、Prisma、Tailwind CSS、Vitest、Playwright、Docker Compose。

## Global Constraints

- 首版不接入抖音官方 API，不实现自动发布。
- AI 和对象存储凭证只在服务端使用。
- 上传失败、导入失败和重复请求必须返回可识别错误状态。
- 开发环境支持本地对象存储；生产环境支持七牛云 Kodo 与阿里云 OSS。
- 每个任务完成后运行针对性测试并提交独立 Git commit。

---

### Task 1: 初始化应用与开发环境

**Files:**
- Create: `package.json`, `src/app/`, `src/lib/env.ts`, `docker-compose.yml`, `.env.example`, `README.md`
- Test: `tests/smoke/app.spec.ts`

**Interfaces:**
- Produces: 本地 `npm run dev`、Docker Compose PostgreSQL 和 `/api/health`。

- [ ] **Step 1: 创建 Next.js TypeScript 应用和基础脚本**
- [ ] **Step 2: 配置 Docker Compose PostgreSQL 与环境变量校验**
- [ ] **Step 3: 添加 `/api/health` 返回 `{ status: "ok" }`**
- [ ] **Step 4: 编写启动冒烟测试并运行 `npm test`**
- [ ] **Step 5: 提交 `chore: initialize v01 application`**

### Task 2: 数据库与身份组织模型

**Files:**
- Create: `prisma/schema.prisma`, `prisma/seed.ts`, `src/server/auth/`, `src/server/organization/`
- Test: `tests/unit/organization.test.ts`

**Interfaces:**
- Produces: `Organization`, `User`, `Membership`, `Role` 模型；服务端 `createOrganization()`、`addMember()`。

- [ ] **Step 1: 先写组织创建、成员角色和重复成员失败测试**
- [ ] **Step 2: 定义 Prisma 模型、唯一约束和时间字段**
- [ ] **Step 3: 实现服务函数与数据库迁移**
- [ ] **Step 4: 写 Demo seed 并运行单元测试与迁移验证**
- [ ] **Step 5: 提交 `feat: add organization foundation`**

### Task 3: 商家、门店与项目管理

**Files:**
- Create: `src/server/merchant/`, `src/server/store/`, `src/server/project/`, `src/app/(workspace)/`
- Modify: `prisma/schema.prisma`
- Test: `tests/unit/merchant.test.ts`, `tests/e2e/workspace.spec.ts`

**Interfaces:**
- Produces: `createMerchant(input)`, `createStore(input)`, `createProject(input)`；列表接口按组织隔离数据。

- [ ] **Step 1: 写跨组织访问、必填字段和项目归属测试**
- [ ] **Step 2: 添加商家、门店、项目和状态枚举模型**
- [ ] **Step 3: 实现服务层与表单/API 校验**
- [ ] **Step 4: 实现工作台列表、详情、新建和编辑页面**
- [ ] **Step 5: 运行单元与 Playwright 测试并提交 `feat: add merchant workspace`**

### Task 4: CSV/Excel 导入与校验

**Files:**
- Create: `src/server/imports/`, `src/app/(workspace)/imports/`, `tests/fixtures/merchant-valid.csv`, `tests/fixtures/merchant-invalid.csv`
- Test: `tests/unit/imports.test.ts`, `tests/e2e/import.spec.ts`

**Interfaces:**
- Produces: `parseMerchantFile(buffer, filename) -> ImportPreview`；`commitMerchantImport(previewId) -> ImportResult`。

- [ ] **Step 1: 写正常导入、缺列、类型错误、重复行和空文件测试**
- [ ] **Step 2: 集成 CSV 与 XLSX 解析库，定义标准字段映射**
- [ ] **Step 3: 实现预览、逐行错误和提交事务**
- [ ] **Step 4: 实现上传、预览、修正和确认页面**
- [ ] **Step 5: 运行导入测试并提交 `feat: add merchant import pipeline`**

### Task 5: StorageProvider 与对象存储

**Files:**
- Create: `src/server/storage/provider.ts`, `src/server/storage/local.ts`, `src/server/storage/qiniu.ts`, `src/server/storage/aliyun-oss.ts`, `src/server/storage/index.ts`
- Test: `tests/unit/storage.test.ts`

**Interfaces:**
- `StorageProvider.put(input): Promise<StoredObject>`
- `StorageProvider.getSignedUrl(key, expiresIn): Promise<string>`
- `StorageProvider.delete(key): Promise<void>`
- `StorageProvider.stat(key): Promise<ObjectMetadata>`

- [ ] **Step 1: 写 Provider 契约、本地实现和失败状态测试**
- [ ] **Step 2: 实现七牛云 Kodo 适配器**
- [ ] **Step 3: 实现阿里云 OSS 适配器**
- [ ] **Step 4: 按 `STORAGE_PROVIDER` 注入实现并限制凭证只在服务端读取**
- [ ] **Step 5: 运行适配器 mock 测试并提交 `feat: add object storage providers`**

### Task 6: 文件、任务与验收闭环

**Files:**
- Create: `src/server/assets/`, `src/server/tasks/`, `src/app/(workspace)/assets/`, `src/app/(workspace)/tasks/`, `tests/e2e/v01-acceptance.spec.ts`
- Modify: `README.md`, `.env.example`

**Interfaces:**
- Produces: 文件归属商家/项目；任务状态 `pending|running|succeeded|failed`；重复请求使用幂等键。

- [ ] **Step 1: 写上传、列表、删除、失败重试和刷新恢复测试**
- [ ] **Step 2: 实现文件记录、任务记录和幂等约束**
- [ ] **Step 3: 实现基础资产页、任务页和错误提示**
- [ ] **Step 4: 用 Demo CSV 完成端到端验收并运行完整测试集**
- [ ] **Step 5: 更新 Docker/安装文档并提交 `feat: complete v01 foundation`**
