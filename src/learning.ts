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
];

export const courseUrl = (course: { slug: string }) => `/learning/${course.slug}/`;
