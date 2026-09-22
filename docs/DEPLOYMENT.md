# 部署记录

2026-09-22 已完成代码推送和线上替换。用户明确授权：“代码推送，并部署，替换线上”。以下为实施代理自检，不代表用户或孔明已验收。

## 发布结果

- 线上地址：[https://ai-build.cn/](https://ai-build.cn/)
- 仓库与分支：`l-zhi/l-zhi.github.io` / `master`
- 应用发布提交：[`72ec5ddc5851504f0ca01100dbae2ee18472ab59`](https://github.com/l-zhi/l-zhi.github.io/commit/72ec5ddc5851504f0ca01100dbae2ee18472ab59)
- GitHub Actions：[运行 35712642869](https://github.com/l-zhi/l-zhi.github.io/actions/runs/35712642869)，`build`、`deploy` 均成功，运行结论为 `success`。
- Pages 已由 `legacy`（`master:/`）切换为 `workflow`，继续使用 `ai-build.cn`，`https_enforced: true`，最终状态 `built`。
- 线上首页已从旧 NexT 页面替换为 Astro 7.3.3 页面。

## 验收标准与实际结果

| 标准 | 检查与结果 |
| --- | --- |
| 本地构建与资源验证通过 | `npm run verify`、`npm run verify:migration` 通过；类型检查零错误、零警告；构建 73 个静态页面；26 个文章地址、522 个资源、41 个旧列表地址、1339 个站内引用通过检查 |
| 浏览器功能正常 | 本地 3 项 Playwright 测试通过；线上 Chromium 验证首页、明暗切换、Docker 搜索（2 条结果），无页面 JavaScript 错误 |
| 源码与资源完整推送 | 提交前核对 Git 暂存区，26 个 Markdown 源文件和全部 522 个历史资源均被纳入；修正根目录产物忽略规则，并显式保留被全局规则忽略的旧 demo ZIP 与两个 vendor 脚本 |
| 远端自动构建部署成功 | `git push origin master` 成功；Actions 安装依赖、构建校验、上传产物及 Pages 部署均成功 |
| 线上确实为新版且内容正常 | 完成 41 次线上 HTTP 检查：26 个文章页面正文与迁移基线一致；首页含 Astro 标识；样式、脚本、归档、标签、搜索、sitemap、robots 可访问；搜索索引和 RSS 各包含 20 篇公开文章 |
| 线上资源与错误页面正常 | 5 个代表性图片、脚本、ZIP 文件 SHA-256 与本地相同；不存在地址返回 HTTP 404 并显示新版自定义错误页 |

批量核验最初使用 Node fetch / curl 时遇到连接超时和 TLS 连接错误；后续通过 Chromium 浏览器连接完成了上述全部检查。机器可读结果见 [deployment-verification.json](deployment-verification.json)，线上截图见 [live-home-desktop.png](screenshots/live-home-desktop.png)。

本记录及截图属于发布后的文档补充，使用 `[skip ci]` 提交，避免仅为更新报告重复发布相同站点。

## 后续更新与回退

日常写作、预览和发布步骤见根目录 [README](../README.md)。合并或推送文章到默认分支后，工作流将自动检查和部署；没有 `draft: false` 的草稿不会进入正式站点。

迁移前的 Git 基线为 `5a3cfdd98dfaef9afdafe88ce2fe44dc7214b932`。若需要回退，应单独执行并验证回退操作；本次没有进行回退或改写历史。

## 保留的已知限制

本次上线不改变 [迁移报告](MIGRATION.md) 已记录的遗留限制：24 次外链图片引用、90 次指向仓库未收录路径的引用未修复；PHP demo 不能由 GitHub Pages 执行；未逐项验证所有历史 demo 的交互和外部依赖。这些不计为已解决。

Pages 设置接口参考：[GitHub Pages REST API](https://docs.github.com/en/rest/pages/pages#update-information-about-a-github-pages-site)。
