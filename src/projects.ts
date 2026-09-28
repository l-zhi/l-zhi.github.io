export interface Project {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  image: { src: string; alt: string; width: number; height: number; position?: string };
  motivation: string;
  audience: string;
  features: string[];
  experience: string;
  github?: string;
  related: { title: string; href: string }[];
}

const makingArticle = {
  title: 'AI时代的「虚」与「实」',
  href: '/2026/07/16/ai-uncertainty-and-making/',
};

// 首页顺序和项目列表共用此数组。只填写确认过的公开入口；不填写 github 则不显示仓库标签。
// 文案与截图依据 makingArticle；荔枝头像界面来自其开发记录。
export const projects: Project[] = [
  {
    slug: 'ai-rss', name: 'ai-rss', category: 'Chrome 插件',
    summary: '用中文读一手 AI 动态',
    description: '把关注的信息源订阅到一起，用 AI 翻译和总结，降低阅读海外资讯的门槛。',
    image: { src: '/img/wechat/74fca8579ee78a8e5e63e56e.png', alt: 'ai-rss 的订阅列表、Hacker News 文章和模型设置界面', width: 1080, height: 574 },
    motivation: '以前读一篇英文文章要花很长时间。为了更直接地跟进海外 AI 动态，我做了这个 Chrome 插件，把订阅、翻译和总结放到同一处。',
    audience: '关注海外 AI 资讯，希望用中文快速了解原始信息的读者。',
    features: ['集中订阅 AI 博主、产品动态、Hacker News 和 GitHub 等信息源。', '在阅读过程中增加 AI 翻译与总结。', '在插件中配置使用的模型。'],
    experience: '目前展示个人使用实践，尚未提供公开安装入口。可以先阅读制作记录，了解它的使用场景。',
    related: [makingArticle],
  },
  {
    slug: 'pith-wiki', name: 'pith-wiki', category: '开源工具',
    summary: '让本地资料成为知识网络',
    description: '把散落的本地文件、对话和笔记整理起来，积累自己的知识库，也让日常总结更轻松。',
    image: { src: '/img/wechat/ae6c11825d77ba42e37d3a13.png', alt: 'pith-wiki 的文档输出、知识图谱和定时任务界面', width: 1080, height: 417 },
    motivation: '每天做过的事情散在 AI 对话、读书笔记和工作文档里。我希望把这些碎片自动收集整理，不再为了写日、周、月报反复翻找。',
    audience: '积累了大量本地资料，希望重新找到旧知识，并整理日常工作记录的人。',
    features: ['监听本地资料变化，整理文件与日常记录。', '生成可阅读的 Markdown 知识条目，建立资料之间的联系。', '基于积累的记录整理总结，减少重复收集信息的工作。'],
    experience: '项目已公开在 GitHub，可前往仓库查看使用说明与安装方式。',
    github: 'https://github.com/l-zhi/pith-wiki',
    related: [makingArticle, { title: '硬盘里那些舍不得删的文件，被AI整理之后……', href: '/2026/06/02/pith-wiki-personal-knowledge/' }],
  },
  {
    slug: 'mcc', name: 'mcc', category: '开源学习项目',
    summary: '拆开一个 Coding Agent 学习',
    description: '从好奇 AI 为什么能写代码出发，参考 Claude Code 的思路，动手实现一个用于学习的编码 Agent。',
    image: { src: '/img/wechat/75c23983b283f79f7752eaf5.png', alt: 'mcc 的 LLM 调用过程监控，以及生成的坦克大战游戏', width: 1080, height: 475 },
    motivation: 'AI 能写代码让我感到好奇，也让我对自己不理解的部分有些没底。我尝试亲手做一套编码 Agent，用实现过程理解它如何工作。',
    audience: '想通过代码和实际运行过程，学习 Coding Agent 原理的开发者。',
    features: ['以学习为目的，逐步实现编码 Agent。', '监控 LLM 调用步骤，观察任务的执行过程。', '用生成坦克大战等小项目，检验 Agent 的工作流程。'],
    experience: '代码已公开在 GitHub。它是学习项目，使用方法以仓库说明为准。',
    github: 'https://github.com/l-zhi/mcc',
    related: [makingArticle],
  },
  {
    slug: 'lizhi-avatar', name: '荔枝头像', category: '微信小程序',
    summary: '证件照与创意头像的小工具',
    description: '从给孩子拍登记照的实际需求出发，把证件照、AI 合图和趣味头像做成一个小程序。',
    image: { src: '/img/wechat/156287cb157d440d0eceb80a.png', alt: '荔枝头像的相框、AI 合图和个人中心界面', width: 1080, height: 668 },
    motivation: '给小孩子拍一张合适的登记照并不容易。我把这个生活里的小问题当作起点，借助 AI 开发了荔枝头像。',
    audience: '需要处理证件照，或想尝试创意合图、趣味头像的人。',
    features: ['围绕登记照需求处理尺寸与底色。', '尝试艺术照、新年照、素描等 AI 合图效果。', '提供相框、国旗头像等趣味功能。'],
    experience: '在微信中搜索「荔枝头像」。具体可用功能以小程序内展示为准。',
    related: [makingArticle, { title: '我是怎么用AI写小程序的？', href: '/2026/02/02/building-a-mini-program-with-ai/' }],
  },
  {
    slug: 'lizhi-shifts', name: '荔枝排班', category: '微信小程序',
    summary: '为家人的日常排班省点心',
    description: '为家人复杂的班次安排做一个轻量工具，把每天上什么班、什么时候休息放在日历里。',
    image: { src: '/img/wechat/bc007972f4b8f6373724d255.png', alt: '荔枝排班的早班、晚班、休息日历和显示设置', width: 1080, height: 713 },
    motivation: '家人的排班规则比较复杂。我想为身边具体的人认真做一个小工具，让反复确认班次这件事简单一点。',
    audience: '有轮班安排，需要经常查看班次与休息日的人。',
    features: ['用日历展示早班、晚班和休息日。', '查看月份内的上班与休息安排。', '提供周起始日、农历与节气等日历显示设置。'],
    experience: '目前展示为家人制作的排班实践，暂未提供可核实的公开体验入口。',
    related: [makingArticle],
  },
];

export const projectUrl = (project: Project) => `/projects/${project.slug}/`;
