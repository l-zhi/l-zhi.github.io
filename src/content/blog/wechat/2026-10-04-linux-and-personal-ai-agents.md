---
title: "AI 时代，Linux 又杀回来了"
date: "2026-10-03T20:52:00+08:00"
description: "从云端个人 Agent 到本地运行的孔明，聊聊 Linux 为什么重新走到台前，以及便利、成本与数据隐私之间的取舍。"
permalink: "2026/10/04/linux-and-personal-ai-agents"
tags: ["AI Agent", "Linux", "隐私", "孔明"]
categories: ["荔枝AI圈"]
draft: false
unlisted: false
---

<!-- 原始发布时间依据用户提供的微信文章截图核对；保留整理时确定的永久地址。原文：https://mp.weixin.qq.com/s/00gafVk7vXENkHgL5P3JSg -->

**线上版小龙虾，和它背后的系统。**

最近打开科技新闻，几乎每天都有一个新的“个人 Agent”上线。

## 01. 换了个地方的小龙虾

马斯克有 Grok Bot，Anthropic 有 Claude Tag，Meta 有 Muse，OpenAI 有 Dot。

<img src="/img/2026/linux-and-personal-ai-agents/ai-agents-official-sketch-3x1.png" alt="Grok Bot、Claude Tag、Muse、Dot 与 Cue 的手绘形象" width="2172" height="724" decoding="async" />

我挨个看了一圈介绍，越看越觉得眼熟。“整理邮件”“写日报”“写 PPT”，这不就是好久不见的小龙虾吗？

<img src="/img/2026/linux-and-personal-ai-agents/openclaw-official-sketch-3x1.png" alt="OpenClaw 小龙虾的红色手绘形象" width="2172" height="724" loading="lazy" decoding="async" />

只不过，小龙虾装在你自己的电脑上，它们装在云上。在我看来，技术方案、架构、能干的事，基本都差不多。

那我就好奇了：小龙虾去年就火过，大厂为什么憋到现在才做呢？

## 02. 小龙虾的三道坎

我自己装过小龙虾，大概能说说原因。

### 第一，太折腾

小龙虾是奥地利程序员彼得·斯坦伯格一个人写的项目。火了以后，Bug 多，更新也特别猛，几乎一天一个版本。

<img src="/img/2026/linux-and-personal-ai-agents/openclaw-story.png" alt="第一批尝鲜 OpenClaw 的人，如今已开始清醒：原文报道配图" width="1076" height="537" loading="lazy" decoding="async" />

我装上之后，差不多每周都得升级一次，有时候升完还运行不起来。

我记得有一次配置飞书聊天，配置了一整天。好不容易配置完了，第二天升级新版本后又报错了。

我是程序员，都觉得累。换成我爸妈，估计第一步就放弃了。

### 第二，没设备

小龙虾得装在电脑上，最好 24 小时开着。

可现在多少人家里有一台配置还行、又愿意一直开着的电脑？

<img src="/img/2026/linux-and-personal-ai-agents/airport-vibe-coding.png" alt="原文配图：机场里使用电脑的场景" width="688" height="290" loading="lazy" decoding="async" />

*（据说胡彦斌机场 vibe coding）*

### 第三，手机不适合长时间执行任务

你可能要问，那为什么不直接装在手机上？

手机确实最适合当私人秘书，人人都有，随身带着。但让 Agent 在手机本地持续干活，就没那么容易了。

Agent 干一个活经常要跑很久，手机电量未必顶得住；为了省电，手机系统也会限制后台程序持续运行。

更要命的是，AI Agent 干活经常要执行命令（Bash）、读写文件，而手机系统出于安全考虑，对这些权限有严格限制。

别说跑命令，让它帮你点一下别的 App 都费劲。

电脑不普及，手机上又限制多，于是一个更容易推广的方案就出现了：在云上给每个人提供一套运行环境。

前期成本高也没有办法，大厂要快速抢占市场。听说字节国庆也在加班研发自己的 AI 助理。

## 03. Linux 杀回来了

服务器上跑什么系统？

Linux 自然是一个合适的选择：它免费、开源，对命令行工具友好，也早已广泛用于服务器。

其实，Linux 离我们并不远：[Android 的底层就使用 Linux 内核](https://developer.android.com/guide/platform/index.html)。不过，苹果电脑的 macOS 使用的是基于 Mach 和 BSD 的 [Darwin](https://developer.apple.com/library/archive/documentation/Darwin/Conceptual/KernelProgramming/Architecture/Architecture.html)，并不是 Linux。

Agent 不需要复杂的界面，它需要的是一个能执行命令、读写文件、调用工具的地方。

所以我说，Linux 又杀回来了。

以前 Linux 很难成为普通人的日常桌面系统，一个原因是命令行门槛高，界面不熟悉，也没人愿意背命令。

但现在，背命令的不是人了，是 AI。

对于电脑这种复杂的东西，很多操作本来就可以交给 AI Agent 去完成，又快又省事。对于用户来说，只要动动嘴就可以了。

其实小龙虾刚火的时候，腾讯、阿里、字节的云都出过一键部署的版本：给用户分配一台服务器，就能启动小龙虾。

但那更像是给极客准备的。小龙虾一升级，还需要自己调试、优化，不是一个打开就能用的 App，所以并没有真正普及起来。

这一波个人助理 Agent 的创业成本太高，我觉得留给初创公司的空间很小。

服务器要钱，运维要人，用户还得信你。

那为什么 Manus 作为小公司能入局做 Cues 呢？

我觉得，是因为它很早就在走云端 AI Agent 这条路，有一定的技术积累。我甚至觉得，之前 Meta 收购 Manus，看中的就包括这部分积累。

## 04. 我最纠结的事

说到“信你”，这正是我现在最纠结的地方。

用云上的 Agent，就意味着我的聊天记录、文件、日程，都可能要传到别人的服务器上。

最近一年，一些 AI 公司在数据上的做法，说实话，让人很难放心。

最近看到的 Zcode 上传用户代码、AI 请求转发和信息泄露等争议，以及 Anthropic 收集用户数据的问题，都让我对上传个人数据心存顾虑。

### 我现在的方案

我心里真正想要的，其实是一台 Linux 手机：Agent 就跑在本地，24 小时陪着我，数据哪儿也不去。这样最好。

但是这样的手机，估计一时半会儿还等不到。

所以，目前我自己手搓了一套每天工作、生活都在用的 AI Harness——孔明。除了有些大模型 API 还要用在线服务，其他文件、数据库都放在本地。

<img src="/img/2026/linux-and-personal-ai-agents/kongming-desktop.png" alt="孔明桌面工作空间：在本地管理 AI Agent 并制作文章配图" width="1076" height="634" loading="lazy" decoding="async" />

我把自己的 Mac 电脑 24 小时开着，上下文记忆、文件数据都保存在本地。

外出的时候，我就用手机连接电脑，使用自己的 AI。所以目前，我对其他个人助理产品的需求不大。

我先尽量自己接入各家基础服务的 CLI，自己管理自己的 AI Agent。

<img src="/img/2026/linux-and-personal-ai-agents/kongming-mobile.png" alt="孔明手机连接界面：输入配对码连接电脑上的孔明" width="416" height="410" loading="lazy" decoding="async" />

但是，我觉得自己应该扛不了太久，因为个人助理未来可以接入的场景，想象空间太大了。

比如，梳理我的飞书、微信、钉钉聊天记录；定期整理微信、支付宝和银行的消费账单；优化话费套餐；帮我交水电费，等等。

大公司更有能力打通这些基础服务的 CLI。所以为了便利，我最终可能还是会让渡一部分隐私。

在那之前，如果非要选一家，我倒希望腾讯快点出一个。

如果数据都要上传，比起别家，我可能更愿意相信它。

你呢？你愿意把自己的数据交给云上的 AI Agent 吗？
