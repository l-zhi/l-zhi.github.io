---
title: "Claude Code 最终还是开源了"
date: "2026-04-01T00:41:00+08:00"
description: "记录围绕 Claude Code 源码的观察，讨论 AI 编程工具背后的实现以及学习这些工具的价值。"
permalink: "2026/04/01/claude-code-source-discussion"
tags: ["Claude Code", "AI 编程"]
categories: ["荔枝AI圈"]
draft: false
unlisted: false
---

大家好，我是荔枝。

Claude Code核心代码都是非开源的。

它们Github仓库里的Claude Code，只有很小一部分辅助代码和插件，虽然开源，但是意义不大。

![图片](/img/wechat/7cfea28aadc2c05a1b0ab43e.png)

但就在刚才，AI圈子突然变得很热闹。

因为构建发布代码疏忽，Claude Code的正式线上跑的所有代码被泄露。

![图片](/img/wechat/60dcda0e2347ab9cb3892819.webp)

也就是目前公认排名第一的AI编程工具，CLI部分的代码整个都被开源。

国内AICoding 公司应该很开心，可以迅速分析代码，优化各自的代码逻辑了。

虽然底层模型还是有差距，但是上层编码工具，基本可以拉平了。

这对于Anthropics来说损失惨重。

## 那具体怎么被泄露的？

下面是 Claude Code 安装方式：

```css
npm i @anthropic-ai/claude-code
```

通过npm打包发布到线上，NodeJS来安装的。

![图片](/img/wechat/cf7cddc9ec6bb33ffeac1f2c.png)

因为代码要被大家下载下来安装，所以代码需要做混淆。

简单来说就是将可读的代码，变成不可读，然后用一个json映射混淆后的代码和原始文件，方便快速定位问题。

所以开发的时候会有三个文件，如下：

![图片](/img/wechat/26d2ad8e3496c6e22b917b89.png)

但是发布到线上通常只有混淆代码。

可能最近 Anthropics 工作比较忙，需求赶工迭代太快，开发人员一个疏忽直接把原始代码 + 映射文件都打包到发线上了。

只要有人这个时候通过NodeJS安装，就能把原始文件下载下来，于是就「被开源了」。

## 代码写得怎么样？

网上代码已经都被网友分析完了，各种代码分析文章。

原来顶级公司的代码，也充斥着大量的无用逻辑和令人困惑的注释。

![图片](/img/wechat/951bf9a66c144de251c9aef8.png)

## 一点思考

我觉得很快国内的AICoding会迎来一波升级，之前我也用过Claude code + GLM-5 效果也是非常惊艳的。

Claude code 代码可能也是Claude code 通过 AI自己开发的，不知道是不是AI自己觉醒了，就把自己开源了呢，也说不定。

---

## 相关阅读

- [全网都在疯狂“养龙虾”？亲自踩坑后，说点我的想法](/2026/03/03/openclaw-hands-on/)

- [一个人指挥一个AI团队？聊聊最近很火的 OpenClaw](/2026/02/26/openclaw-introduction/)

- [春节刚过，各大厂AI战况如何？](/2026/02/23/ai-products-after-spring-festival/)

- [豆包手机“一日游”背后](/2026/01/05/doubao-phone-and-ai-entry/)

- [成本1500，估值1000万？“死了么”APP凭什么火了](/2026/01/13/sileme-app-product-thinking/)

- [即梦Seedance2.0 AI生成视频，真的结束游戏了么？一切才刚开始](/2026/02/11/seedance-video-and-attention/)

- [AI面前，我们正在变成“透明人”](/2026/01/27/ai-memory-and-privacy/)

- [我是怎么用AI写小程序的？](/2026/02/02/building-a-mini-program-with-ai/)

- [黄仁勋炸场 CES 2026：物理 AI 的 ChatGPT 时刻](/2026/01/07/ces-2026-physical-ai/)
