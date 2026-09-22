# 部署记录

检查日期：2026-09-22。此记录为实施代理自检，不代表用户或孔明验收。

## 本次验收标准

1. 当前源码通过类型检查、静态构建及站内资源检查。
2. 确认 GitHub 身份、仓库权限、默认分支和 Pages 当前发布方式。
3. 确认部署域名与 HTTPS 当前可访问。
4. 在发布授权明确后，完成推送、Actions 部署，并验证线上为新版 Astro 页面。

## 已完成的检查

- `npm run verify` 成功：类型检查通过，生成 73 个 Astro 静态页面。
- 26 个历史文章地址、522 个资源文件、41 个历史列表地址和 1339 个站内引用检查通过。原站已有缺失引用仍按迁移清单单独记录。
- GitHub CLI 已登录 `l-zhi`；`l-zhi/l-zhi.github.io` 仓库具备管理及推送权限。
- 本地及远端默认分支为 `master`；本地 HEAD 为 `5a3cfdd98dfaef9afdafe88ce2fe44dc7214b932`，Astro 改造仍是未提交变更。
- Pages API 返回 `build_type: legacy`、来源 `master:/`、域名 `ai-build.cn`、`https_enforced: true`、状态 `built`。
- HTTPS HEAD 请求：`https://ai-build.cn/` 返回 200；`https://l-zhi.github.io/` 返回 301，指向前述自定义域名。
- 以上线上响应证明现有站点可访问，不代表新版已发布。

## 本次发布

用户已明确要求“代码推送，并部署，替换线上”。本次发布目标是将当前 Astro 改造推送到 `master`，并替换 `https://ai-build.cn/` 的旧版站点。

发布步骤：

1. 提交并推送当前 Astro 改造至 `l-zhi/l-zhi.github.io` 的 `master`。
2. 将 Pages 发布方式从分支根目录切换为 GitHub Actions，继续使用 `ai-build.cn`。
3. 等待 `.github/workflows/deploy.yml` 构建和部署成功。
4. 请求线上首页、文章、样式资源及订阅地址，确认响应成功且首页具有新版 Astro 内容。

发布前检查已通过；执行结果和线上核验将在发布完成后补记。

Pages 设置接口参考：[GitHub Pages REST API](https://docs.github.com/en/rest/pages/pages#update-information-about-a-github-pages-site)。
