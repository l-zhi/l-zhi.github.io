---
title: "电脑里住了十几个AI，我请了个「孔明」来管它们"
date: "2026-10-11T20:48:00+08:00"
description: "从菜单栏监工到任务调度，再到手机远程派活：我如何开发孔明，管理电脑里十几个 AI 的任务、额度和交付。"
permalink: "2026/10/11/kongming-ai-agent-manager"
tags: ["AI Agent", "孔明", "AI 编程"]
categories: ["荔枝AI圈"]
draft: false
unlisted: false
---

<!-- 同步自用户提供的同名 Markdown 原稿；发布时间依据原稿署名行，配图取自原稿微信图片链接。 -->

## 01. 起因：我电脑里住了十几个AI

我是个写代码的人。

去年 AI Coding Agent 火起来之后，出一个 CLI 我就装一个:Claude Code、Gemini、Codex、Pi、Antigravity、Grok、WorkBuddy、Qcode、Zcode……

装到最后，我电脑里像住了一屋子员工：有的能力强，有的便宜，有的反应快，有的文章写得好，各有所长。

<img src="/img/2026/kongming-ai-agent-manager/01-ai-household.webp" alt="电脑里各有所长的 AI 员工" width="1080" height="608" decoding="async" />

听起来炫酷，用起来残酷。

我每天的日常变成了这样：

<img src="/img/2026/kongming-ai-agent-manager/02-memory-fragments.webp" alt="多个 AI 窗口与分散的任务记忆" width="1080" height="608" loading="lazy" decoding="async" />

- 切到第一个窗口，看看跑完没有；
- 切到第二个窗口，哦，它在等我确认权限；
- 切到第三个窗口，它十分钟前就跑完了，我完全不知道；
- 切到第四个窗口，Token 额度用光了，任务停在一半。

我不是在用 AI 干活，而是在给 AI 当保姆，而且我还是个记性很差的保姆。

<img src="/img/2026/kongming-ai-agent-manager/03-ai-babysitter.jpg" alt="原文配图：一名男子困惑地看着自己的双手" width="1080" height="608" loading="lazy" decoding="async" />

更尴尬的是，我经常忘了“哪件事交给了谁”。

同一个项目被两个 AI 同时改，互相覆盖对方的代码，我对着 git diff 一脸茫然——这种事不止发生过一次。

还有Token额度分配的问题。

按理说，写代码我更想用 Claude Code，画流程图Codex比较强，写文章还得是 Gemini。

但因为懒得切工具，有时候干脆全让 Claude Code 干了。

结果 token 消耗一边倒，到周三额度就见底，后半周基本写不了代码了。

<img src="/img/2026/kongming-ai-agent-manager/04-token-quota.jpg" alt="AI 工具的 Token 额度使用困境" width="1080" height="432" loading="lazy" decoding="async" />

所以我想要这样一个东西：它不干活，只负责知道大家在干什么——哪个 AI 在忙、哪些任务在跑、谁的额度快用完了。

> “孔明”这个名字就是这么来的： 他不冲锋陷阵，只坐在后方，手摇羽扇，纵观全局。

<img src="/img/2026/kongming-ai-agent-manager/05-menubar-feather.png" alt="孔明菜单栏面板与羽扇图标的设计插画" width="1080" height="608" loading="lazy" decoding="async" />

于是基于我的痛点，我开始开发我自己的 AI Agent。

## 02. 第一版：菜单栏里的一把羽扇

最早的孔明非常朴素：macOS 菜单栏上一个单色羽扇图标，安安静静地待着。

有任务在跑，图标旁就冒出一个数字。

<img src="/img/2026/kongming-ai-agent-manager/06-menubar-panel.jpg" alt="孔明第一版的菜单栏状态面板" width="724" height="637" loading="lazy" decoding="async" />

点开面板，可以看到：

- 本机装了哪些 AI，哪个在执行，哪个空闲；
- 每个 AI 在干什么，进行到哪一步；
- Claude Code、Codex、Antigravity 各自还剩多少额度。

这一版我刻意做成只读：孔明不碰任何 CLI 的配置，只是趴在本地会话文件上看一眼。

它就是我的眼睛，让我随时知道哪些任务在哪个 AI 里跑着。

还有一个很小、却非常实用的功能：锁屏后继续运行。

以前我锁屏去吃饭，回来发现任务在系统睡眠时集体阵亡。

之前我靠单独装一个防休眠软件解决，后来发现这么小的功能直接集成进孔明就行：

它会阻止 macOS 进入空闲睡眠——屏幕照常黑，活照常干（我叫他“黑灯工厂”）。

到这一步，孔明算是成了称职的“监工”。

## 03. 第二版：既然你都看见了，不如你来派活

三国里的孔明，最擅长的是知人善任、调兵遣将。

<img src="/img/2026/kongming-ai-agent-manager/07-kongming-dispatch.png" alt="孔明为不同 AI 调兵遣将" width="1080" height="608" loading="lazy" decoding="async" />

我觉得不能只让他干看着。

既然孔明已经掌握了所有 AI 的状态，为什么还要我手动分配工作？

于是孔明长出了一个桌面工作空间和一套任务引擎（下图是我的使用界面）：

<img src="/img/2026/kongming-ai-agent-manager/08-desktop-workspace.png" alt="孔明桌面工作空间与任务列表" width="1080" height="644" loading="lazy" decoding="async" />

- 自动路由：我丢一句“检查一下系统的登录逻辑”，孔明自己判断这是哪个项目、该交给谁来做。派活时也会兼顾各家token额度，不再让某一个 AI 被榨干。
- 项目互斥：同一个项目的写任务，同一时间只交给一个 AI；读任务可以并行。开头那种“两个 AI 互相覆盖代码”的事故，从此不再发生。
- 别名：有了孔明，其他人也得安排上：给每个 AI 起个三国名字，比如【关羽 = Claude code，张飞 = Pi】，派活时直接点将。我的三国梦，就这么实现了。(下面是我的核心团队配置)

  <img src="/img/2026/kongming-ai-agent-manager/09-agent-team.png" alt="以三国人物命名的 AI 团队配置" width="468" height="790" loading="lazy" decoding="async" />

- 交付验收：AI 说“我做完了”不算完。孔明会检查文件是否真的改了、跑一遍项目配置的验证命令，拿到证据才告诉我完成。

到这里，孔明才算成了真正的孔明，他是一个运筹帷幄，帮我打江山的军师。

### 优化孔明过程中，我发现「快」比什么都重要

一开始我用 Claude Code 当孔明背后的“大脑”，但它太过谨慎，执行偏慢，账号也不稳定。

后来我换成了 Grok 和 Gemini，速度快了很多。

<img src="/img/2026/kongming-ai-agent-manager/10-routing-performance.png" alt="任务路由的速度与性能对比插画" width="1080" height="608" loading="lazy" decoding="async" />

在公司待过的人都知道：干活的人通常很快，慢的往往是沟通 + 层层审批。

孔明负责上传下达，他的反应速度成了我最在意的指标。

最近出了个 Jev（一个用于判断的大模型），出来第二天，我赶紧申请了内测，这个模型正中我的心头好：它专门做“这个任务该交给谁”的判断，速度非常快，这就是为孔明而生的。

<img src="/img/2026/kongming-ai-agent-manager/11-jev-model.png" alt="传统决策与 Jev 决策的任务路由耗时对比" width="1080" height="558" loading="lazy" decoding="async" />

我已经把它接进孔明做对比测试，在路由决策这一步，耗时只有原来gemini-flash的 1/10，而且用了 10 来天了，才用了 0.05 美金，新用户注册每人 5 美金，我感觉根本用不完。

<img src="/img/2026/kongming-ai-agent-manager/12-jev-usage.png" alt="Jev 路由测试的用量与费用截图" width="1080" height="565" loading="lazy" decoding="async" />

## 04. 第三版：离不开了，就随时在线

我不仅是个程序员，周末还需要带娃。

带过娃的人都懂：小孩能在屁股大的小水池里玩一整天，大人在旁边陪着，非常无聊，但又得看着。这时候手痒想写点东西怎么办？

<img src="/img/2026/kongming-ai-agent-manager/13-mobile-poolside.png" alt="泳池旁通过手机使用孔明的场景" width="1080" height="608" loading="lazy" decoding="async" />

于是我想在“闲者”时间的时候，找下我的孔明（这个场景感觉像老板有事儿没事儿，发条消息给下属干活）。

我给孔明做了内网穿透和手机网页端，相当于给他配了一部“专线电话”。

无论在哪儿，掏出手机就能派活、看进度、验收结果，下面是我手机端的截图。

<img src="/img/2026/kongming-ai-agent-manager/14-mobile-workspace.png" alt="孔明手机网页端界面" width="868" height="756" loading="lazy" decoding="async" />

## 05. 一点思考

当我的所有 AI 的上下文和任务都汇集到一个应用里，很多事突然变简单了：最近做了哪些事、和 AI 对话了多少次、哪个 AI 干哪类活最高效，一目了然。

下面就是我最近用孔明的对话频率（随着功能的优化，干活的数量指数上升，每天基本能稳定在50次对话）。

<img src="/img/2026/kongming-ai-agent-manager/15-conversation-frequency.png" alt="使用孔明的对话频率统计" width="1080" height="409" loading="lazy" decoding="async" />

孔明的需求非常私人。

但我猜，如果你的电脑里也住着一屋子 AI，你大概懂我在说什么。

我越来越觉得，以后每个人都会有专属于自己的Agent，甚至是专属的操作系统，想怎么改就怎么改。

过去我们觉得推荐算法的“千人千面”很高级；

而往后，软件也可以做到千人千面，根据每类人群，甚至每个人定制属于他的个人软件，你也需要这样一个“孔明”么？

\- END -

---

关于作者：荔枝AI圈，关注我，带你深度洞察大模型时代下的技术变迁与生存指南。

作者提示: 个人观点，仅供参考