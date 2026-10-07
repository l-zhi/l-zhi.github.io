# 荔枝说 · l-zhi

使用 Astro 生成的个人静态博客。页面以 [AstroPaper](https://github.com/satnaing/astro-paper) 的极简排版为设计参考，自行实现轻量组件与 CSS，没有引入完整主题及其依赖。所有文章预生成 HTML；明暗切换和搜索使用少量原生 JavaScript，无 React/Vue 运行时，也不需要应用服务器。

## 开发

需要 Node.js 22.12+，推荐使用仓库 `.nvmrc` 的版本。

```sh
nvm use
npm ci
npm run dev
```

打开命令输出的本地地址。开发模式可预览草稿。

```sh
npm run verify          # 类型检查、正式构建、静态链接与资源检查
npm run preview         # 预览 dist/ 中的正式产物
```

浏览器检查可运行 `npx playwright install chromium` 后执行 `npm run test:ui`；`npm run verify:writing` 会创建临时文章，检查草稿预览、发布收录和覆盖保护，然后自动清理并重建。

`dist/`、`.astro/`、`node_modules/` 不提交。`public/` 是需要版本管理的原始图片和 demo，不是构建产物。

## 写文章

```sh
npm run new:post -- my-first-post 我的新文章
```

命令以北京时间创建 Markdown 文件，默认 `draft: true`。在 `src/content/blog/` 编辑正文和 frontmatter：

```yaml
title: "我的新文章"
date: "2026-09-22T10:00:00+08:00"
description: "一句简洁的文章摘要。"
permalink: "2026/09/22/my-first-post"
tags: ["前端"]
categories: ["前端技术"]
draft: true
```

- 图片放在 `public/img/年份/文章名/`，正文引用 `![说明](/img/年份/文章名/example.png)`。
- 代码使用带语言名称的 fenced code block，构建时由 Shiki 高亮。
- `permalink` 决定永久地址，不带首尾斜线；发布后保持不变。日期使用 ISO 格式并明确时区。
- 本地审阅后改为 `draft: false`。生产构建不会生成草稿页面，也不会将草稿加入归档、标签、搜索、RSS 和 sitemap。
- 不要在草稿中放机密内容：Markdown 本身仍属于 Git 仓库，公开仓库的源码可见。
- 支持 GitHub 网页直接编辑 Markdown，然后通过 PR 审阅和合并发布。
- `unlisted: true` 用于保留旧版本地址：页面仍生成，但不出现在列表、搜索和订阅中，并标记 `noindex`。正常新文章不需要填写此字段。

## 调整 UI

首页“最近做什么”展示紧凑的项目横栏：桌面封面为 160×110px，手机为 148×102px，空间不足时可通过滑动、方向键或箭头按钮浏览。导航“AI项目”进入 `/projects/`，每个项目有独立的静态介绍页。

项目内容在 `src/projects.ts` 维护，数组顺序就是首页和列表的顺序。每项包含 `slug`、名称、分类、短介绍、详细介绍、图片、功能、体验方式和相关文章；`github` 只填写已确认的公开仓库完整地址，留空时不显示 GitHub 标签。图片路径引用 `public/` 中的资源，不需要复制到多个目录。修改 `slug` 会改变详情页地址，已有项目应保持稳定。添加项目后运行 `npm run verify` 检查页面与链接。

现有五个项目依据《AI时代的「虚」与「实」》及其配图整理；pith-wiki、mcc 的公开仓库地址已核实。ai-rss 暂无确认的公开安装入口，荔枝排班暂无确认的公开体验入口，不生成虚构下载链接。荔枝头像的界面截图及功能补充来自《我是怎么用AI写小程序的？》。

项目可选填 `video: { bvid, title, duration }` 嵌入 B 站视频。详情页在介绍右侧显示 16:9 播放器，手机上排列在介绍下方；默认不自动播放，并保留“在 B 站观看”链接。原截图移至“能做什么”下方。未配置视频的项目保持原有布局；播放器与清晰度由 B 站提供，视频不可用时可尝试原站链接。

交互检查：`npm run test:ui`。如默认端口已被占用，可指定 `PLAYWRIGHT_PORT=4326 npm run test:ui`；浏览器自检会屏蔽百度统计请求，避免写入生产访问数据。

| 文件 | 用途 |
| --- | --- |
| `src/config.ts` | 站名、简介、域名、GitHub、分页大小 |
| `src/styles/global.css` | 色彩变量、明暗配色、布局与正文样式 |
| `src/layouts/Layout.astro` | 页头导航、SEO、页脚、主题切换 |
| `src/components/PostList.astro` | 文章列表 |
| `src/pages/index.astro` | 首页项目与文章列表 |
| `src/projects.ts` | 项目内容、封面、GitHub 地址和相关文章 |
| `src/components/RecentProjects.astro` | 首页小图横栏及滚动交互 |
| `src/pages/projects/` | AI 项目列表和静态详情页 |
| `src/pages/[...path].astro` | 文章详情、归档、标签结果、历史地址 |

字体使用本机字体栈，无远程字体请求。禁用 JavaScript 后文章仍可阅读，主题跟随系统；搜索页提供归档入口。

## 学习栏目

顶部导航“学习”进入 `/learning/`。课程目录在 `src/learning.ts` 维护，列表页面位于 `src/pages/learning/index.astro`，目录中的课程地址同时加入 sitemap。

Pocket 4P 摄影课程位于 `public/learning/pocket-4p/index.html`，保留原课程的 24 课、互动动画、测验、打印和本机学习进度。它是包含脚本、样式和教学照片的独立 HTML，通过 `/learning/pocket-4p/` 访问；页头和页脚可返回学习栏目。列表封面位于 `public/img/learning/pocket-4p.jpg`，图片署名和来源链接保留在列表与课程内。

AI 论文简史课程位于 `public/learning/ai-papers/`：`index.html` 是 50 篇论文的时间线和快速解读，`reader/index.html` 是 17 篇核心论文的对照精读页（地址 `/learning/ai-papers/reader/?p=transformer`），`zh/*.js` 是逐页中文讲解数据，每篇一个文件。精读页的页码按链接中固定版本号的 arXiv PDF 核对；论文 PDF 一律链接 arXiv、会议或作者公开版本，不转存到仓库。NeurIPS 站点禁止嵌入，AlexNet 改为新窗口打开。列表封面为原创 SVG `public/img/learning/ai-papers.svg`。

修改课程时编辑上述 HTML，运行 `npm run verify` 后通过仓库现有工作流发布。课程进度只保存在访问者当前浏览器，不跨设备同步，也不会随课程发布上传。

## CI/CD 与 GitHub Pages

`.github/workflows/deploy.yml` 在 PR 上执行 `npm ci`、类型检查、生产构建及静态检查，并保留构建产物供下载。推送到 `master` 或 `main` 时同样检查，只有仓库默认分支可部署。手动触发也只允许默认分支进入部署任务。

首次上线需要仓库维护者在 GitHub **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。如环境保护要求审批，按仓库已有规则进行。工作流使用 GitHub 内置 token，不需要配置个人访问令牌。

当前保留原仓库的自定义域名 `ai-build.cn`（`public/CNAME`），Astro `site`、canonical、RSS 和 sitemap 同样使用该域名。维护者需确认 Pages 自定义域名、DNS 和 HTTPS 状态。切换域名时同时修改 `src/config.ts`、`public/CNAME` 以及验证脚本中的站点基准；使用默认 `l-zhi.github.io` 时删除 CNAME 并更新域名配置和相应检查。

推荐发布步骤：新建分支 → 编写文章/修改页面 → `npm run verify` → 提交 PR → 检查 Actions 产物 → 审阅合并 → 默认分支自动部署。回滚可通过 GitHub revert 对应提交，重新运行工作流部署。不要手动提交 `dist/`。

部署操作及线上验证记录见 [部署记录](docs/DEPLOYMENT.md)。

## 历史迁移

迁移来源、验收标准和已知限制见 [迁移说明](docs/MIGRATION.md)。原始 HTML 可从 Git 提交 `5a3cfdd98dfaef9afdafe88ce2fe44dc7214b932` 恢复。

`npm run verify:migration` 在构建后对比首次迁移基线，适合审阅本次改造。日常编辑旧文章后基线差异是正常的；常规 CI 的 `npm run verify` 不锁死文章正文，继续检查路径、资源和站内链接。

实现参考：[Astro 内容集合](https://docs.astro.build/en/guides/content-collections/)、[GitHub Pages 部署](https://docs.astro.build/en/guides/deploy/github/)。
