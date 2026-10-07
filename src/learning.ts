export const courses = [
  {
    slug: 'pocket-4p',
    title: 'Pocket 4P 摄影与视频课程',
    description: '从相机操作、曝光和构图开始，练习旅行照片、自然人像、云台运镜、录音与剪辑。用一条熟悉的街，完成一组照片和一支短片。',
    category: '摄影与影像',
    duration: '8 周 · 24 课 · 约 32 小时',
    audience: '从新手到独立创作',
    format: '图文讲解 · 6 个互动实验 · 实拍作业',
    outcome: '8 张主题组照 + 一支 60–90 秒短片',
    image: {
      src: '/img/learning/pocket-4p.jpg',
      alt: '巴黎街道上的行人与建筑，课程中用于练习构图和裁切的摄影示例',
      credit: 'Amin Zabardast / Unsplash · 教学示例，非 Pocket 4P 实拍',
      source: 'https://unsplash.com/photos/a-city-street-filled-with-lots-of-traffic-6-m9u2uoDs4',
    },
  },
  {
    slug: 'ai-papers',
    title: 'AI 论文简史：50 篇论文读懂 AI 发展',
    description: '从图灵测试到 Transformer、ChatGPT 和 DeepSeek-R1，按时间串起 50 篇关键论文。每篇用大白话讲清它解决的问题，17 篇核心论文可以对照原文逐页精读。',
    category: 'AI 与论文',
    duration: '6 个阶段 · 50 篇论文 · 17 篇精读',
    audience: '想系统了解 AI 的非技术读者',
    format: '时间线 · 快速解读 · 对照原文的逐页中文讲解',
    outcome: '一条能讲给别人听的 AI 发展主线',
    image: {
      src: '/img/learning/ai-papers.svg',
      alt: '深色背景上一条从 1943 年延伸到 2025 年的上升时间线，标注 AI 论文的关键年份',
      credit: '课程原创封面',
      source: '/learning/ai-papers/',
    },
  },
];

export const courseUrl = (course: { slug: string }) => `/learning/${course.slug}/`;
