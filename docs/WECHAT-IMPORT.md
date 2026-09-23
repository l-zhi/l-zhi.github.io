# 荔枝AI圈文章导入记录

本文保留首次导入的检查记录；后续排版修复见“排版优化记录”，最新来源说明及日期更正见文末。

整理日期：2026-09-23。来源为用户指定 Obsidian 知识库中的 `荔枝AI圈/线上文章`。本次复制整理到博客，原笔记未修改，未提交、推送或部署。

## 交付结果

- 导入 34 篇文章至 `src/content/blog/wechat/`，统一归入“荔枝AI圈”分类，补齐摘要、标签和稳定的英文永久链接。
- 33 篇沿用笔记首行的原发布日期、时分，时区为北京时间。1 篇首次导入时使用整理日期；现已根据用户确认更正为 2026-08-10，移除整理日期说明。
- 下载原文全部 257 处图片引用，按文件内容去重后保留 256 个文件，共 55,095,253 字节，存放于 `public/img/wechat/`。文件扩展名按实际文件格式识别，正文不再依赖微信图片服务器。
- 93 处相关文章链接改为本次导入的站内地址；从文章间的相互引用中匹配到 14 篇原文链接，保留在对应文章末尾。其他外部参考链接沿用原笔记。
- 原有 20 篇公开文章保留，现有列表、搜索与 RSS 共 54 篇；6 篇原有不列出文章仍保留各自页面。

## 整理规则

1. 使用笔记文件名作为标题，保留原文观点、段落、图片顺序、参考资料和作者提示。
2. 首次导入时添加的来源、原署名说明已按用户要求移除；原始来源元数据仍保留在导入清单中。博客页头继续使用站点既有作者“立之”。
3. 将导出时扁平化的编号章节恢复为二级标题，合并拆开的编号与标题；保留原有章节编号。
4. 清理“微信扫一扫赞赏作者”“AI 实践 · 目录”等平台界面残留。逐篇清理行、图片映射、链接映射、原文件及导入文件 SHA-256 均记录在 [导入清单](wechat-import-manifest.json)。
5. 原始正文去除已记录的界面残留、格式符号和链接地址后，与整理后的正文逐篇核对一致。Markdown 格式和地址变更不等于原文重写。

## 待补充

- 《我用即梦 seedance 2.0 复现了理想i6，后视镜破碎现场》含一段微信视频。请求该地址返回 HTTP 403，尚未获取视频文件；文章对应位置显示“视频待补充”，需要原视频文件或可访问的播放地址。
- 本次未逐项验证外部参考网页，未对文章观点、引用新闻和时效性进行事实核查。
- 原站迁移记录中的 24 处外链图片、90 处缺失路径及 PHP demo 等历史限制仍在，本次未扩大范围处理。

## 验收标准与实际自检

| 标准 | 结果 |
| --- | --- |
| 34 篇文章逐篇导入，保留原始笔记 | 通过：34 个源文件 SHA-256 与导入前快照完全一致 |
| 正文及图片顺序完整，日期有明确依据 | 通过：34 篇正文规范化比较一致；257 处图片引用全部保留；缺失日期已说明 |
| 图片本地可用，失败媒体明确标注 | 通过：256 个媒体文件与构建产物哈希一致；Chromium 中 257 处图片引用全部解码加载成功；1 段视频 403 已标注 |
| 新文章出现在文章列表及关联入口 | 通过：逐篇验证归档、分类、搜索索引、RSS 与 sitemap 收录；共 54 篇公开文章 |
| 构建及站内引用检查通过 | `npm run verify` 通过：0 errors、0 warnings；147 个静态页面；3683 处站内引用检查通过 |
| 桌面及手机阅读可用 | 34 篇文章分别在 1280、390、320px 下检查，共 102 次，无横向溢出；浏览器运行错误为 0；搜索“Claude Code”可找到新增文章 |

已查看首页桌面及新文章手机截图。浏览器验证使用 Chromium 模拟视口，未进行手机真机验证。以上为实现方自检，不代表用户或孔明已验收。

## 文章清单

| 日期 | 文章源文件 | 图片引用 |
| --- | --- |
| 2026-09-22 | [Anthropic 团队自述：过去一年，我们如何亲手“埋葬”传统的软件工程？](../src/content/blog/wechat/2026-09-22-anthropic-engineering-reflections.md) | 2 |
| 2026-09-13 | [明天重置额度，今晚必须榨干它，Tibo 按完那个按钮后，到底发生了什么？](../src/content/blog/wechat/2026-09-13-ai-quota-reset-engineering.md) | 7 |
| 2026-08-27 | [别再拿 Token 当产能：现在最廉价的东西就是“更多产出”](../src/content/blog/wechat/2026-08-27-tokens-are-not-productivity.md) | 8 |
| 2026-08-13 | [AI为什么会让我们越来越累？](../src/content/blog/wechat/2026-08-13-ai-work-fatigue.md) | 5 |
| 2026-08-10 | [现在基本的共识是：大语言模型，至少相当于计算机级别的发明](../src/content/blog/wechat/2026-09-23-llm-and-computer-invention.md) | 1 |
| 2026-08-08 | [AI时代，还需要敏捷开发么？](../src/content/blog/wechat/2026-08-08-agile-development-with-ai.md) | 8 |
| 2026-07-30 | [最强AI画《蒙娜丽莎》](../src/content/blog/wechat/2026-07-30-ai-mona-lisa-harness.md) | 11 |
| 2026-07-24 | [Claude Code 学习「一」—— 大脑+循环](../src/content/blog/wechat/2026-07-24-claude-code-brain-and-loop.md) | 11 |
| 2026-07-16 | [AI时代的「虚」与「实」](../src/content/blog/wechat/2026-07-16-ai-uncertainty-and-making.md) | 6 |
| 2026-07-09 | [有了AI，所有人都能写代码么？](../src/content/blog/wechat/2026-07-09-can-everyone-code-with-ai.md) | 10 |
| 2026-06-30 | [AI 不会推翻程序员,它会熬死你](../src/content/blog/wechat/2026-06-30-ai-coding-long-game.md) | 14 |
| 2026-06-24 | [AI时代HTML又火了](../src/content/blog/wechat/2026-06-24-html-in-the-ai-era.md) | 14 |
| 2026-06-10 | [我把微信读书9年的笔记翻了出来,然后我明白了一件事](../src/content/blog/wechat/2026-06-10-weread-notes-and-mcp.md) | 11 |
| 2026-06-02 | [硬盘里那些舍不得删的文件，被AI整理之后......](../src/content/blog/wechat/2026-06-02-pith-wiki-personal-knowledge.md) | 8 |
| 2026-05-09 | [后程序员时代](../src/content/blog/wechat/2026-05-09-post-programmer-era.md) | 5 |
| 2026-05-07 | [人怎么做，AI Agent就可以怎么做](../src/content/blog/wechat/2026-05-07-agent-tools-and-human-workflows.md) | 3 |
| 2026-05-04 | [AI时代：别再用前朝的剑，去斩本朝的官了](../src/content/blog/wechat/2026-05-04-rethinking-engineering-for-ai.md) | 9 |
| 2026-04-30 | [个人效率翻100倍，团队协作却“崩”了：聊聊 AI Coding 踩过的深坑](../src/content/blog/wechat/2026-04-30-ai-coding-team-collaboration.md) | 7 |
| 2026-04-01 | [Claude Code 最终还是开源了](../src/content/blog/wechat/2026-04-01-claude-code-source-discussion.md) | 5 |
| 2026-03-13 | [跟人类比还是太嫩了，5分钟套出Openclaw的API密钥](../src/content/blog/wechat/2026-03-13-openclaw-security-lessons.md) | 9 |
| 2026-03-05 | [算力的尽头是电力：大模型“吃电”狂飙，中美的底牌究竟在哪？](../src/content/blog/wechat/2026-03-05-ai-compute-and-electricity.md) | 11 |
| 2026-03-04 | [AI 写的代码出了事，谁来背锅？](../src/content/blog/wechat/2026-03-04-ai-code-accountability.md) | 6 |
| 2026-03-03 | [全网都在疯狂“养龙虾”？亲自踩坑后，说点我的想法](../src/content/blog/wechat/2026-03-03-openclaw-hands-on.md) | 10 |
| 2026-02-26 | [一个人指挥一个AI团队？聊聊最近很火的 OpenClaw](../src/content/blog/wechat/2026-02-26-openclaw-introduction.md) | 5 |
| 2026-02-23 | [春节刚过，各大厂AI战况如何？](../src/content/blog/wechat/2026-02-23-ai-products-after-spring-festival.md) | 8 |
| 2026-02-13 | [我用即梦 seedance 2.0 复现了理想i6，后视镜破碎现场](../src/content/blog/wechat/2026-02-13-seedance-li-auto-i6-recreation.md) | 9 |
| 2026-02-11 | [即梦Seedance2.0 AI生成视频，真的结束游戏了么？一切才刚开始](../src/content/blog/wechat/2026-02-11-seedance-video-and-attention.md) | 8 |
| 2026-02-02 | [我是怎么用AI写小程序的？](../src/content/blog/wechat/2026-02-02-building-a-mini-program-with-ai.md) | 7 |
| 2026-01-27 | [AI面前，我们正在变成“透明人”](../src/content/blog/wechat/2026-01-27-ai-memory-and-privacy.md) | 6 |
| 2026-01-16 | [聊聊关于“AI技术平权”，普通人想写代码，可行么？](../src/content/blog/wechat/2026-01-16-ai-coding-for-everyone.md) | 7 |
| 2026-01-13 | [成本1500，估值1000万？“死了么”APP凭什么火了](../src/content/blog/wechat/2026-01-13-sileme-app-product-thinking.md) | 4 |
| 2026-01-09 | [为什么互联网公司市值都在涨，却还在裁员？](../src/content/blog/wechat/2026-01-09-tech-growth-and-layoffs.md) | 4 |
| 2026-01-07 | [黄仁勋炸场 CES 2026：物理 AI 的 ChatGPT 时刻](../src/content/blog/wechat/2026-01-07-ces-2026-physical-ai.md) | 7 |
| 2026-01-05 | [豆包手机“一日游”背后：大厂AI入口之争](../src/content/blog/wechat/2026-01-05-doubao-phone-and-ai-entry.md) | 11 |

## 本地查看

```sh
npm run dev
```

打开终端输出的本地地址，访问首页或 `/archives/`；本次新增文章也可集中从 `/categories/荔枝AI圈/` 查看。生产构建使用 `npm run verify`。

## 排版优化记录（2026-09-23）

基于用户截图和逐篇检查，修复前一轮导入保留的排版结构问题。检查范围为全部 34 篇，实际调整 33 篇：包含此前列出的 21 篇结构问题、4 篇轻度优化，以及其他文章重复的 END / 作者推广 / 推荐列表排版清理。无日期的短文未改动。

### 本次验收标准

1. 消除纯数字标题、空列表项和分离编号；编号章节连续，子标题层级正确。
2. 保留文章元数据、原有内容和链接；新增描述性标题及删除的装饰信息逐篇可追溯。
3. 所有图片引用、顺序、文件内容不变；原 Obsidian 文件不变。
4. 正式构建、站内链接、归档收录正常；桌面与手机布局无横向溢出。

### 调整说明

- Anthropic 文章：删除刊号 `NO. / 33`、重复封面标题和英文装饰；“Claude Code · Thariq 访谈”副标题保留；恢复 3 项研发流程及 4 条金句列表。
- 春节战况恢复 6 个章节，OpenClaw 介绍恢复 7 个章节；i6 复现文章补充 4 个描述性标题并修正重复编号。
- 51 行转义编号中，48 行恢复为真实列表，3 行改为方案的三级标题；保留并缩进属于条目的图片和解释段落。
- 恢复竖线式标题、遗漏标题及三级标题；修正跳号、重号与编号空格；操作说明降级为正文，Bash / PowerShell 命令分别设置代码块。
- 清理重复 END 和作者推广，保留开头原署名、作者提示、所有参考链接和原文链接；旧推荐列表统一为“相关阅读”。
- 仅调整正文列表的缩进和条目间距，普通正文段距保持原设置。
- `wechat-import-manifest.json` 保留首次导入的哈希作为历史基线；新增 `formatting` 字段记录本次前后哈希、删除装饰、补充标题及调整说明。首次导入的 `importedSha256` 不代表排版修复后的当前文件哈希。

### 实际检查结果

- 34 篇文章的标题、日期、摘要、标签、分类、permalink、draft、unlisted 均未改变；全部 Markdown 链接目标与顺序未改变。
- 排除清单中明确记录的装饰删除、描述性标题新增及格式/编号变化后，34 篇正文规范化文字逐篇一致。
- 257 处图片引用及顺序保留；256 个本地媒体文件的 SHA-256 与导入基线一致；原 Obsidian 的 34 个 Markdown 文件 SHA-256 未变。
- 构建后的 34 篇文章：空列表项 0，孤立数字段落/标题 0，转义编号行 0，装饰竖线标题 0；所有带编号的二级章节均从 01 连续编号。
- `npm run verify` 通过：0 错误、0 警告，147 个静态页面，3732 处站内引用检查通过。
- Playwright Chromium：34 篇 × 1280/390/320px，共 102 次布局检查无横向溢出；257 处图片引用全部加载；归档仍为 54 篇；目录跳转正常；浏览器运行错误 0。另抽查 2 篇旧文章在 320px 下无横向溢出。
- 已查看修复后的桌面与手机截图：[桌面效果](screenshots/wechat-format-desktop.png)、[手机效果](screenshots/wechat-format-mobile.png)。

这些是实现方本地自检，不代表用户或孔明已验收。该轮未推送或部署；视频缺失及历史资产限制仍保留，原发布日期已在后续更正中确认。

### 本轮逐篇调整

| 文章 | 主要调整 |
| --- | --- |
| [Anthropic 团队自述：过去一年，我们如何亲手“埋葬”传统的软件工程？](../src/content/blog/wechat/2026-09-22-anthropic-engineering-reflections.md) | 删除封面重复信息、刊号和英文装饰；合并两组分离编号为有序列表；清理重复装饰/推广信息 |
| [明天重置额度，今晚必须榨干它，Tibo 按完那个按钮后，到底发生了什么？](../src/content/blog/wechat/2026-09-13-ai-quota-reset-engineering.md) | 恢复第一、第五节标题；统一章节编号空格；清理重复装饰/推广信息 |
| [别再拿 Token 当产能：现在最廉价的东西就是“更多产出”](../src/content/blog/wechat/2026-08-27-tokens-are-not-productivity.md) | 清理重复装饰/推广信息 |
| [AI为什么会让我们越来越累？](../src/content/blog/wechat/2026-08-13-ai-work-fatigue.md) | 清理重复装饰/推广信息 |
| [AI时代，还需要敏捷开发么？](../src/content/blog/wechat/2026-08-08-agile-development-with-ai.md) | 子主题改为三级标题；修正重复的第五节编号；恢复 12 个列表编号及对应内容缩进；清理重复装饰/推广信息 |
| [最强AI画《蒙娜丽莎》](../src/content/blog/wechat/2026-07-30-ai-mona-lisa-harness.md) | 子主题改为三级标题；清理重复装饰/推广信息 |
| [Claude Code 学习「一」—— 大脑+循环](../src/content/blog/wechat/2026-07-24-claude-code-brain-and-loop.md) | 清理重复装饰/推广信息 |
| [AI时代的「虚」与「实」](../src/content/blog/wechat/2026-07-16-ai-uncertainty-and-making.md) | 子主题改为三级标题；清理重复装饰/推广信息 |
| [有了AI，所有人都能写代码么？](../src/content/blog/wechat/2026-07-09-can-everyone-code-with-ai.md) | 清理重复装饰/推广信息 |
| [AI 不会推翻程序员,它会熬死你](../src/content/blog/wechat/2026-06-30-ai-coding-long-game.md) | 清理重复装饰/推广信息 |
| [AI时代HTML又火了](../src/content/blog/wechat/2026-06-24-html-in-the-ai-era.md) | 章节连续编号，保留全部现有内容；清理重复装饰/推广信息 |
| [我把微信读书9年的笔记翻了出来,然后我明白了一件事](../src/content/blog/wechat/2026-06-10-weread-notes-and-mcp.md) | 清理重复装饰/推广信息 |
| [硬盘里那些舍不得删的文件，被AI整理之后......](../src/content/blog/wechat/2026-06-02-pith-wiki-personal-knowledge.md) | 统一章节编号空格；清理重复装饰/推广信息 |
| [后程序员时代](../src/content/blog/wechat/2026-05-09-post-programmer-era.md) | 统一竖线式小标题为二级标题；清理重复装饰/推广信息 |
| [人怎么做，AI Agent就可以怎么做](../src/content/blog/wechat/2026-05-07-agent-tools-and-human-workflows.md) | 统一竖线式小标题为二级标题；清理重复装饰/推广信息 |
| [AI时代：别再用前朝的剑，去斩本朝的官了](../src/content/blog/wechat/2026-05-04-rethinking-engineering-for-ai.md) | 统一竖线式小标题为二级标题；清理重复装饰/推广信息 |
| [个人效率翻100倍，团队协作却“崩”了：聊聊 AI Coding 踩过的深坑](../src/content/blog/wechat/2026-04-30-ai-coding-team-collaboration.md) | 统一竖线式小标题为二级标题；恢复 6 个列表编号及对应内容缩进；清理重复装饰/推广信息 |
| [Claude Code 最终还是开源了](../src/content/blog/wechat/2026-04-01-claude-code-source-discussion.md) | 统一竖线式小标题为二级标题；清理重复装饰/推广信息 |
| [跟人类比还是太嫩了，5分钟套出Openclaw的API密钥](../src/content/blog/wechat/2026-03-13-openclaw-security-lessons.md) | 将最后一节粘连的三个观点拆为三个列表项；恢复 7 个列表编号及对应内容缩进；清理重复装饰/推广信息 |
| [算力的尽头是电力：大模型“吃电”狂飙，中美的底牌究竟在哪？](../src/content/blog/wechat/2026-03-05-ai-compute-and-electricity.md) | 章节连续编号，保留全部现有内容；清理重复装饰/推广信息 |
| [AI 写的代码出了事，谁来背锅？](../src/content/blog/wechat/2026-03-04-ai-code-accountability.md) | 优化方案的三个子主题改为三级标题；清理重复装饰/推广信息 |
| [全网都在疯狂“养龙虾”？亲自踩坑后，说点我的想法](../src/content/blog/wechat/2026-03-03-openclaw-hands-on.md) | 恢复 3 个列表编号及对应内容缩进；清理重复装饰/推广信息 |
| [一个人指挥一个AI团队？聊聊最近很火的 OpenClaw](../src/content/blog/wechat/2026-02-26-openclaw-introduction.md) | 合并章节编号；操作说明降为正文；安装命令分为 Bash、PowerShell 代码块；恢复 3 个列表编号及对应内容缩进；清理重复装饰/推广信息 |
| [春节刚过，各大厂AI战况如何？](../src/content/blog/wechat/2026-02-23-ai-products-after-spring-festival.md) | 恢复六个章节标题；恢复 3 个列表编号及对应内容缩进；清理重复装饰/推广信息 |
| [我用即梦 seedance 2.0 复现了理想i6，后视镜破碎现场](../src/content/blog/wechat/2026-02-13-seedance-li-auto-i6-recreation.md) | 补齐四个描述性标题；修正重复编号；视频时长合入提示；清理重复装饰/推广信息 |
| [即梦Seedance2.0 AI生成视频，真的结束游戏了么？一切才刚开始](../src/content/blog/wechat/2026-02-11-seedance-video-and-attention.md) | 清理重复装饰/推广信息 |
| [我是怎么用AI写小程序的？](../src/content/blog/wechat/2026-02-02-building-a-mini-program-with-ai.md) | 恢复 4 个列表编号及对应内容缩进 |
| [AI面前，我们正在变成“透明人”](../src/content/blog/wechat/2026-01-27-ai-memory-and-privacy.md) | 问候语降为正文；清理重复装饰/推广信息 |
| [聊聊关于“AI技术平权”，普通人想写代码，可行么？](../src/content/blog/wechat/2026-01-16-ai-coding-for-everyone.md) | 恢复 2 个列表编号及对应内容缩进；清理重复装饰/推广信息 |
| [成本1500，估值1000万？“死了么”APP凭什么火了](../src/content/blog/wechat/2026-01-13-sileme-app-product-thinking.md) | 清理重复装饰/推广信息 |
| [为什么互联网公司市值都在涨，却还在裁员？](../src/content/blog/wechat/2026-01-09-tech-growth-and-layoffs.md) | 统一章节编号空格；清理重复装饰/推广信息 |
| [黄仁勋炸场 CES 2026：物理 AI 的 ChatGPT 时刻](../src/content/blog/wechat/2026-01-07-ces-2026-physical-ai.md) | 恢复 8 个列表编号及对应内容缩进；清理重复装饰/推广信息 |
| [豆包手机“一日游”背后：大厂AI入口之争](../src/content/blog/wechat/2026-01-05-doubao-phone-and-ai-entry.md) | 清理重复装饰/推广信息 |

## 来源说明及日期更正（2026-09-23）

- 移除 33 篇文章开头的来源、原署名说明，以及 1 篇文章的整理日期提示。
- 根据用户确认，将《现在基本的共识是：大语言模型，至少相当于计算机级别的发明》的发布日期改为 2026-08-10；未提供具体时分，沿用午夜。文件名及永久链接保持不变，列表依据新日期排序。
- 导入清单 `metadataCorrection` 记录本次前后哈希及日期依据，首次导入和排版优化记录保留为历史基线。
- 本次实际自检：34 篇源文件与修改前快照逐篇比较，仅删除指定说明及修改上述日期；34 个构建页面均无对应说明。日期显示、RSS、搜索、归档和分类排序、8 月归档收录检查通过，公开文章仍为 54 篇，永久链接不变。
- `npm run verify` 通过：0 错误、0 警告，147 个静态页面，3732 处站内引用通过。未执行新的浏览器视觉检查；本次未提交、推送或部署。以上均为实现方自检。
