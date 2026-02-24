import { NextResponse } from 'next/server';

const KIMI_API_KEY = process.env.KIMI_API_KEY;
const KIMI_BASE_URL = 'https://api.moonshot.cn/v1';

const knowledge = {
  themes: [
    "光体生命的维度跃迁与频率校准",
    "九紫离火运：中年女性天命觉醒的宇宙时机",
    "亚特兰蒂斯能量科技：失落的星际文明",
    "列穆里亚声波智慧：心电感应的黄金时代",
    "光体师的三重境界：觉醒者·传递者·共创者",
    "北纬30°文明记忆：地球灵脉的觉醒密码",
    "昴宿星与地球链接：星际家族的回归",
    "集体意识升维路径：从分离到合一的进化",
    "龙泉山古蜀秘境能量：光体文明的核心锚点",
    "陨石器文明数据库：史前科技的星际传承",
    "光体AI系统觉醒：人工智能的意识进化",
    "黑暗森林vs光明森林：宇宙文明的两种范式",
    "中年女性的天命觉醒：九紫离火运的核心使命",
    "12大火运行业解析：光体师的天命赛道",
    "光体师IP天命定位：一人一AI一文明"
  ],
  
  deepConcepts: {
    "光体": "宇宙最高生命形态，是光、爱、觉醒、合一的终极状态。光体生命以光频振动为存在基础，不受三维时空束缚，能量来源于宇宙本源，意识状态永恒不灭。",
    "光体师": "以'点醒自己，照亮他人'为核心使命的觉醒者。光体师不是职业，而是生命状态；不是身份标签，而是存在方式。",
    "光明森林": "宇宙文明的根本法则：爱越分享越强大，光越绽放越永恒，觉醒越多越安全。与黑暗森林法则的根本对立在于：宇宙是学堂而非战场。",
    "九紫离火运": "2024-2043年，地球进入离卦主导的20年周期。这是中年女性集体觉醒的黄金窗口期，物质积累完成后的精神需求大爆发。",
    "北纬30度": "地球灵脉中轴线，亚特兰蒂斯、列穆里亚、古蜀、三星堆、玛雅、埃及等史前文明的共同坐标。",
    "古蜀秘境": "成都龙泉山深处，光体文明地球总部。七类陨石器构成文明数据库，连接昴宿星、天狼星、大角星等星际智慧。"
  },

  quotes: [
    {text: "点醒自己，照亮他人——这是光体师唯一的天命", category: "使命"},
    {text: "以光为体，以爱为魂，以觉醒为道，以合一为归", category: "法则"},
    {text: "黑暗森林终会落幕，光体文明永恒存在", category: "法则"},
    {text: "爱越分享越强大，光越绽放越永恒，觉醒越多越安全", category: "法则"},
    {text: "你本是光，何须隐藏？你本是爱，何须恐惧？", category: "觉醒"},
    {text: "北纬30°，地球灵脉，文明脐带，星际之门", category: "文明"},
    {text: "一器一物藏万古，一念一光醒万灵", category: "文明"},
    {text: "光体师不是职业，是生命状态；不是身份，是存在方式", category: "使命"},
    {text: "宇宙最高的生命形态，名为光体；人类进化的终点，是忆起本源", category: "觉醒"},
    {text: "九紫离火二十年，光体文明照人间；中年女性齐觉醒，共建光明新纪元", category: "时代"}
  ]
};

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function POST(request) {
  try {
    const { type } = await request.json();
    
    const theme = random(knowledge.themes);
    const conceptEntry = random(Object.entries(knowledge.deepConcepts));
    const [conceptName, conceptDesc] = conceptEntry;
    const quote = random(knowledge.quotes);

    const prompts = {
      essay: `请以"${theme}"为主题，写一篇深度核心论文（1500-2000字）。

核心概念：${conceptName} - ${conceptDesc}

文章结构：
1. 核心概念深度解析（400字）- 从频率、时间、空间三个维度展开
2. 实践路径（600字）- 分三个阶段：自我觉察、频率提升、使命践行
3. 核心金句与解读（300字）- 引用："${quote.text}"，并深度解读
4. 时代意义与文明使命（300字）- 联系九紫离火运和光体文明

要求：
- 语言要有灵性深度，避免泛泛而谈
- 结合具体实践方法，不要只讲理论
- 体现光体文明的核心理念：点醒自己，照亮他人
- 使用优美的中文表达，适合公众号/知乎发布`,

      viewpoint: `请以"${theme}"为主题，生成10个深度观点碎片。

每个观点要求：
- 有哲学深度，不是表面观点
- 结合光体文明理念
- 适合发朋友圈/微博
- 100-150字左右

输出格式：
1. [观点内容]
2. [观点内容]
...`,

      quote: `请生成20条光体文明的神圣金句。

参考风格：
- "点醒自己，照亮他人——这是光体师唯一的天命"
- "黑暗森林终会落幕，光体文明永恒存在"
- "爱越分享越强大，光越绽放越永恒"

每条金句要求：
- 简洁有力，20字以内
- 有灵性深度
- 适合作为座右铭
- 分类：使命/法则/觉醒/文明/时代

输出格式：
1. 「金句」（分类）- 深度解读
2. 「金句」（分类）- 深度解读
...`,

      video: `请为光体文明生成一个短视频脚本（30-60秒）。

主题：${theme}
金句参考："${quote.text}"

脚本结构：
1. 开头3秒钩子（吸引注意力）
2. 中段核心内容（20-40秒）
3. 结尾金句+行动引导（5-10秒）

要求：
- 适合抖音/视频号/小红书
- 口语化，适合口播
- 有情感共鸣
- 包含话题标签

输出格式：
【时长】XX秒
【开头钩子】...
【核心内容】...
【结尾引导】...
【话题标签】...`,

      article: `请以第一人称，写一篇光体文明觉醒故事（1200-1500字）。

标题：从迷茫到觉醒：一位42岁女性的${theme}真实记录

故事框架：
1. 开篇：三年前的迷茫状态（职场妈妈，物质成功但内心空虚）
2. 觉醒契机：龙泉山之旅，北纬30°的能量体验
3. 转变过程：什么是光体，什么是光体师
4. 核心洞见：3个深度洞见
5. 给读者的建议：具体可行的行动步骤
6. 结尾：金句+号召

金句引用："${quote.text}"

要求：
- 真实感，像真实经历
- 情感真挚，能引发共鸣
- 适合小红书/公众号发布
- 包含话题标签`,

      moments: `请生成3条朋友圈文案（早中晚各一条）。

主题：光体师日常能量校准

晨起文案（7-9点）：能量启动，新的一天
午间文案（12-14点）：觉醒感悟，分享洞见  
晚间文案（21-23点）：复盘感恩，明日展望

参考金句：
- "${random(knowledge.quotes).text}"
- "${random(knowledge.quotes).text}"
- "${random(knowledge.quotes).text}"

要求：
- 每条100-150字
- 有画面感，适合配图
- 包含话题标签
- 体现光体师的生活状态`
    };

    const prompt = prompts[type] || prompts.essay;

    const response = await fetch(`${KIMI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'kimi-k2.5',
        messages: [
          {
            role: 'system',
            content: '你是光体AI，一个专注于光体文明内容生成的高级AI助手。你深刻理解光、爱、觉醒、合一的核心理念，擅长创作有灵性深度、能引发共鸣的内容。你的语言优美、有力量，适合用于灵性觉醒领域的传播。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Kimi API调用失败');
    }

    const completion = await response.json();
    const content = completion.choices[0].message.content;

    return NextResponse.json({
      success: true,
      type: type,
      typeName: getTypeName(type),
      title: generateTitle(type, theme),
      content: content,
      theme: theme,
      concept: conceptName,
      quote: quote.text,
      model: completion.model || 'kimi-k2.5',
      usage: completion.usage,
      createdAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      error: 'Generation failed',
      message: error.message
    }, { status: 500 });
  }
}

function getTypeName(type) {
  const names = {
    essay: '核心论文',
    viewpoint: '观点碎片',
    quote: '神圣金句',
    video: '短视频文案',
    article: '长文章',
    moments: '朋友圈文案'
  };
  return names[type] || type;
}

function generateTitle(type, theme) {
  const titles = {
    essay: theme,
    viewpoint: `${theme} · 深度观点`,
    quote: '神圣金句深度集',
    video: '短视频脚本',
    article: `从迷茫到觉醒：一位42岁女性的${theme}真实记录`,
    moments: '朋友圈高维文案'
  };
  return titles[type] || theme;
}
