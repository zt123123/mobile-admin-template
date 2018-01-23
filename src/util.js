/**
 * 工具函数库
 */

const reqStyle = "background:#ff0";
const resStyle = "background:#0f0";
const errStyle = "background:#f00";

let util = util || {};
// let debugMode = true;
let debugMode = false;
let strPassHelper = "abcdefghijklmnopqrstuvwxyz0123456789";
let strChineseSuperName =
  [
    "赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
    "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
    "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦", "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
    "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺", "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
    "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余", "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹",
    "姚", "邵", "湛", "汪", "祁", "毛", "禹", "狄", "米", "贝", "明", "臧", "计", "伏", "成", "戴", "谈", "宋", "茅", "庞",
    "熊", "纪", "舒", "屈", "项", "祝", "董", "梁", "杜", "阮", "蓝", "闵", "席", "季", "麻", "强", "贾", "路", "娄", "危",
    "江", "童", "颜", "郭", "梅", "盛", "林", "刁", "钟", "徐", "邱", "骆", "高", "夏", "蔡", "田", "樊", "胡", "凌", "霍",
    "虞", "万", "支", "柯", "昝", "管", "卢", "莫", "经", "房", "裘", "缪", "干", "解", "应", "宗", "丁", "宣", "贲", "邓",
    "郁", "单", "杭", "洪", "包", "诸", "左", "石", "崔", "吉", "钮", "龚", "程", "嵇", "邢", "滑", "裴", "陆", "荣", "翁",
    "荀", "羊", "于", "惠", "甄", "曲", "家", "封", "芮", "羿", "储", "靳", "汲", "邴", "糜", "松", "井", "段", "富", "巫",
    "乌", "焦", "巴", "弓", "牧", "隗", "山", "谷", "车", "侯", "宓", "蓬", "全", "郗", "班", "仰", "秋", "仲", "伊", "宫",
    "宁", "仇", "栾", "暴", "甘", "钭", "厉", "戎", "祖", "武", "符", "刘", "景", "詹", "束", "龙", "叶", "幸", "司", "韶",
    "郜", "黎", "蓟", "溥", "印", "宿", "白", "怀", "蒲", "邰", "从", "鄂", "索", "咸", "籍", "赖", "卓", "蔺", "屠", "蒙",
    "池", "乔", "阴", "郁", "胥", "能", "苍", "双", "闻", "莘", "党", "翟", "谭", "贡", "劳", "逄", "姬", "申", "扶", "堵",
    "冉", "宰", "郦", "雍", "却", "璩", "桑", "桂", "濮", "牛", "寿", "通", "边", "扈", "燕", "冀", "浦", "尚", "农", "温",
    "别", "庄", "晏", "柴", "瞿", "阎", "充", "慕", "连", "茹", "习", "宦", "艾", "鱼", "容", "向", "古", "易", "慎", "戈",
    "廖", "庾", "终", "暨", "居", "衡", "步", "都", "耿", "满", "弘", "匡", "国", "文", "寇", "广", "禄", "阙", "东", "欧",
    "殳", "沃", "利", "蔚", "越", "夔", "隆", "师", "巩", "厍", "聂", "晁", "勾", "敖", "融", "冷", "訾", "辛", "阚", "那",
    "简", "饶", "空", "曾", "毋", "沙", "乜", "养", "鞠", "须", "丰", "巢", "关", "蒯", "相", "查", "后", "荆", "红", "游",
    "郏", "竺", "权", "逯", "盖", "益", "桓", "公", "仉", "督", "岳", "帅", "缑", "亢", "况", "有", "琴", "归", "海", "晋",
    "楚", "闫", "法", "汝", "鄢", "涂", "钦", "商", "牟", "佘", "佴", "伯", "赏", "墨", "哈", "谯", "篁", "年", "爱", "阳",
    "佟", "言", "福", "南", "火", "铁", "迟", "漆", "官", "冼", "真", "展", "繁", "檀", "祭", "密", "敬", "揭", "舜", "楼",
    "疏", "冒", "浑", "挚", "胶", "随", "高", "皋", "原", "种", "练", "弥", "仓", "眭", "蹇", "覃", "阿", "门", "恽", "来",
    "綦", "召", "仪", "风", "介", "巨", "木", "京", "狐", "郇", "虎", "枚", "抗", "达", "杞", "苌", "折", "麦", "庆", "过",
    "竹", "端", "鲜", "皇", "亓", "老", "是", "秘", "畅", "邝", "还", "宾", "闾", "辜", "纵",
    "万俟", "司马", "上官", "欧阳", "夏侯", "诸葛", "闻人", "东方", "赫连", "皇甫",
    "羊舌", "尉迟", "公羊", "澹台", "公冶", "宗正", "濮阳", "淳于", "单于", "太叔",
    "申屠", "公孙", "仲孙", "轩辕", "令狐", "钟离", "宇文", "长孙", "慕容", "鲜于",
    "闾丘", "司徒", "司空", "兀官", "司寇", "南门", "呼延", "子车", "颛孙", "端木",
    "巫马", "公西", "漆雕", "车正", "壤驷", "公良", "拓跋", "夹谷", "宰父", "谷梁",
    "段干", "百里", "东郭", "微生", "梁丘", "左丘", "东门", "西门", "南宫", "第五",
    "公仪", "公乘", "太史", "仲长", "叔孙", "屈突", "尔朱", "东乡", "相里", "胡母",
    "司城", "张廖", "雍门", "毋丘", "贺兰", "綦毋", "屋庐", "独孤", "南郭", "北宫",
    "王孙",
  ];

let strChineseName =
  [
    "梦琪", "忆柳", "之桃", "慕青", "问兰", "尔岚", "元香", "初夏", "沛菡", "傲珊",
    "曼文", "乐菱", "痴珊", "恨玉", "惜文", "香寒", "新柔", "语蓉", "海安", "夜蓉",
    "涵柏", "水桃", "醉蓝", "春儿", "语琴", "从彤", "傲晴", "语兰", "又菱", "碧彤",
    "元霜", "怜梦", "紫寒", "妙彤", "曼易", "南莲", "紫翠", "雨寒", "易烟", "如萱",
    "若南", "寻真", "晓亦", "向珊", "慕灵", "以蕊", "寻雁", "映易", "雪柳", "孤岚",
    "笑霜", "海云", "凝天", "沛珊", "寒云", "冰旋", "宛儿", "绿真", "盼儿", "晓霜",
    "碧凡", "夏菡", "曼香", "若烟", "半梦", "雅绿", "冰蓝", "灵槐", "平安", "书翠",
    "翠风", "香巧", "代云", "梦曼", "幼翠", "友巧", "听寒", "梦柏", "醉易", "访旋",
    "亦玉", "凌萱", "访卉", "怀亦", "笑蓝", "春翠", "靖柏", "夜蕾", "冰夏", "梦松",
    "书雪", "乐枫", "念薇", "靖雁", "寻春", "恨山", "从寒", "忆香", "觅波", "静曼",
    "凡旋", "以亦", "念露", "芷蕾", "千兰", "新波", "代真", "新蕾", "雁玉", "冷卉",
    "紫山", "千琴", "恨天", "傲芙", "盼山", "怀蝶", "冰兰", "山柏", "翠萱", "乐丹",
    "翠柔", "谷山", "之瑶", "冰露", "尔珍", "谷雪", "乐萱", "涵菡", "海莲", "傲蕾",
    "青槐", "冬儿", "易梦", "惜雪", "宛海", "之柔", "夏青", "亦瑶", "妙菡", "春竹",
    "紫蓝", "晓巧", "幻柏", "访蕊", "南春", "芷蕊", "凡蕾", "凡柔", "安蕾", "天荷",
    "含玉", "书兰", "雅琴", "书瑶", "春雁", "从安", "夏槐", "念芹", "怀萍", "代曼",
    "幻珊", "谷丝", "秋翠", "白晴", "海露", "代荷", "含玉", "书蕾", "听白", "访琴",
    "灵雁", "秋春", "雪青", "乐瑶", "含烟", "涵双", "平蝶", "雅蕊", "傲之", "灵薇",
    "绿春", "含蕾", "从梦", "从蓉", "初丹", "听兰", "听蓉", "语芙", "夏彤", "凌瑶",
    "忆翠", "幻灵", "怜菡", "紫南", "依珊", "妙竹", "访烟", "怜蕾", "映寒", "友绿",
    "冰萍", "惜霜", "凌香", "芷蕾", "雁卉", "迎梦", "元柏", "代萱", "紫真", "千青",
    "凌寒", "紫安", "寒安", "怀蕊", "秋荷", "涵雁", "以山", "凡梅", "盼曼", "翠彤",
    "谷冬", "新巧", "冷安", "千萍", "冰烟", "雅阳", "友绿", "南松", "诗云", "书芹",
    "曼荷", "笑珊", "寒珊", "谷南", "慕儿", "夏岚", "友儿", "小萱", "紫青", "妙菱",
    "冬寒", "曼柔", "语蝶", "青筠", "夜安", "觅海", "问安", "晓槐", "雅山", "访云",
    "翠容", "寒凡", "晓绿", "以菱", "冬云", "含玉", "访枫", "含卉", "夜白", "灵竹",
    "醉薇", "元珊", "幻波", "盼夏", "元瑶", "迎曼", "水云", "访琴", "谷波", "乐之",
    "笑白", "之山", "妙海", "紫霜", "平夏", "凌旋", "孤丝", "怜寒", "向萍", "凡松",
    "白薇", "梦菡", "飞绿", "如波", "又晴", "友易", "香菱", "冬亦", "问雁", "妙春",
    "海冬", "半安", "平春", "幼柏", "秋灵", "凝芙", "念烟", "白山", "从灵", "尔芙",
    "澄邈", "德泽", "海超", "海阳", "海荣", "海逸", "海昌", "瀚钰", "瀚文", "涵亮",
    "涵煦", "涵蓄", "涵衍", "浩波", "浩博", "浩初", "浩宕", "浩歌", "浩广", "浩瀚",
    "浩慨", "浩阔", "浩邈", "浩气", "浩然", "浩思", "浩言", "鸿宝", "鸿波", "鸿博",
    "鸿才", "鸿畅", "鸿畴", "鸿达", "鸿德", "鸿飞", "鸿风", "鸿福", "鸿光", "鸿晖",
    "鸿朗", "鸿文", "鸿熙", "鸿羲", "鸿禧", "鸿信", "鸿轩", "鸿煊", "鸿骞", "鸿远",
    "鸿云", "鸿运", "鸿哲", "鸿祯", "鸿志", "鸿卓", "嘉澍", "光济", "澎湃", "彭泽",
    "鹏池", "鹏海", "浦和", "浦泽", "瑞渊", "越泽", "泽洋", "泽雨", "泽民", "哲瀚",
    "博耘", "德运", "辰宇", "辰皓", "辰钊", "辰铭", "辰锟", "辰阳", "辰龙", "辰韦",
    "辰良", "辰沛", "晨轩", "晨涛", "晨濡", "晨潍", "鸿振", "吉星", "铭晨", "起运",
    "胤运", "佑运", "允晨", "运恒", "运凡", "运凯", "运鹏", "运浩", "运诚", "运良",
    "运鸿", "运锋", "运盛", "运升", "运杰", "运珹", "运珧", "运骏", "运凯", "运乾",
    "维运", "运晟", "运莱", "运华", "运发", "云天", "耘志", "耘涛", "耘豪", "星爵",
    "星腾", "星睿", "星泽", "星鹏", "星然", "震轩", "震博", "康震", "震博", "振强",
    "振博", "振华", "振宇", "振锐", "振凯", "振海", "振国", "振平", "振荣", "振翱",
    "中震", "子辰", "昂然", "昂雄", "昂杰", "昂熙", "昌勋", "昌盛", "昌淼", "昌茂",
    "昌黎", "昌燎", "昌翰", "晨朗", "德明", "德昌", "德曜", "范明", "飞昂", "高朗",
    "瀚彭", "昊然", "昊天", "昊苍", "昊英", "昊宇", "昊嘉", "昊明", "昊伟", "昊硕",
    "昊磊", "昊东", "鸿晖", "鸿朗", "华晖", "金鹏", "晋鹏", "敬曦", "景明", "景天",
    "景浩", "景行", "景中", "景逸", "景彰", "景平", "俊晖", "君昊", "昆琦", "昆纬",
    "昆宇", "昆锐", "昆卉", "昆峰", "昆颉", "昆谊", "昆皓", "昆鹏", "昆明", "昆杰",
    "昆雄", "昆纶", "鹏涛", "鹏煊", "绍晖", "文昂", "文景", "曦哲", "曦晨", "曦之",
    "新曦", "鑫鹏", "旭彬", "旭尧", "旭鹏", "旭东", "旭炎", "炫明", "宣朗", "学智",
    "轩昂", "彦昌", "曜坤", "曜栋", "曜文", "曜曦", "曜灿", "曜瑞", "永昌", "子昂",
    "智宇", "智晖", "智伟", "智杰", "智刚", "智阳", "晗日", "晗昱", "瀚昂",

  ];


//中文名带数字后缀
util.genChineseName = function (nSuffixCount) {
  nSuffixCount = nSuffixCount || 4;

  let nSuperNameCount = strChineseSuperName.length;
  let nSuperIndex = parseInt(Math.random() * nSuperNameCount);
  let strSuperName = strChineseSuperName[nSuperIndex];

  let nNameCount = strChineseName.length;
  let nNameIndex = parseInt(Math.random() * nNameCount);
  let strName = strChineseName[nNameIndex];


  let strSuffix = "";
  for (let i = 0; i < nSuffixCount; i++) {
    strSuffix += parseInt(Math.random() * 10);
  }

  return (strSuperName + strName + strSuffix);
};

//去除字符串首尾空白
util.myTrim = function (data) {
  if (!data) return;
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      data[key] = data[key].trim();
    }
  }
  return data;
};

util.resize = function (selector, target) {
  let height = queryElement(selector).offsetHeight;
  queryElement(target).style.height = height + "px";
};

util.isValidParameter = function (param) {
  return !(param === undefined || param === null);
};

util.buildClassString = function (_class) {
  return "." + _class;
};

util.buildIDString = function (id) {
  return "#" + id;
};

//获取元素
util.getElement = function (elementID) {
  return $(elementID);
};

//元素是否存在
util.isElementExists = function (element) {
  return (element.length > 0);
};

util.queryElement = function (ele) {
  return document.querySelector(ele);
};

//绑定跳转事件
util.bindClicked = function (ele, url, paramObj) {
  let isExist = queryElement(ele);
  if (isExist) {
    isExist.onclick = function () {
      jumpToPage(url, paramObj);
    }
  }
};


//加密
util.encryptParamString = function (paramString) {
  return paramString;
  return CryptoJS.AES.encrypt(paramString, cryptKey);
};
//解密
util.decryptParamString = function (encryptString) {
  return encryptString;
  let bytes = CryptoJS.AES.decrypt(encryptString, cryptKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

util.getQueryObj = function () {
  let reg = new RegExp("(^|&)" + "data" + "=([^&]*)(&|$)", "i");
  let r = window.location.search.substr(1).match(reg);
  if (r === null) return null;
  //获取密文
  let encryptString = decodeURI(r[2]);
  //解密
  let decryptString = decryptParamString(encryptString);
  //返回参数对象
  return JSON.parse(decryptString);
};

util.jumpToPage = function (url, paramObj) {
  let encryptString = null;
  if (paramObj !== null) {
    let paramString = JSON.stringify(paramObj);
    encryptString = encryptParamString(paramString);
  }

  let oriUrl = url + ((paramObj === null) ? "" : ("?data=" + encryptString));
  window.location.href = encodeURI(oriUrl);
};

//正则相关
util.checkNum = function (value) {
  let reg = /^(-)?\d+(\.\d+)?$/;
  if (reg.exec(value) === null || value === "") return false;
  return true;
};

//电话验证
util.checkPhone = function (value) {
  let phone = value;
  if (!(/^1[34578]\d{9}$/.test(phone))) return false;
  return true;
};
//身份证验证
util.checkIdCard = function (value) {
  let idCard = value;
  let reg15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/; //15位
  let reg18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; //18位
  if (!(reg15.test(idCard) || (reg18.test(idCard)))) return false;
  return true;
};

// -------- ajax请求相关 -------

util.jumpToLogin = function () {
  $router.forward("/login");
};

util.imiLog = function (str, style = "color:#000;") {
  if (debugMode) return;
  console.log(`%c ${str}`, style);
};

util.showModal = function (title = "请求错误", content = "网络错误，请重试", callback) {
  $dialog.alert({
    theme: 'ios',
    title: title,
    content: content,
    okText: '好'
  }).then(() => {
    callback && callback();
  });
};

util.requestLog = function (url, type, data) {
  this.imiLog("-----http请求开始----------------------------------------", reqStyle);
  this.imiLog(`| url:${url} |`, reqStyle);
  this.imiLog(`| type:${type} |`, reqStyle);
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      this.imiLog(`| ${key}:${data[key]} |`, reqStyle);
    }
  }
  this.imiLog("-----http请求结束----------------------------------------", reqStyle);
};

util.responseLog = function (data) {
  this.imiLog("-----http响应，成功返回-----", resStyle);
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      this.imiLog(`| ${key}:${data[key]} |`, resStyle);
    }
  }
  this.imiLog("-----http响应end--------------------------------------", resStyle);
};

util.errorLog = function (error) {
  this.imiLog("-----http响应，网络异常-----", errStyle);
  this.imiLog(`网络请求失败,错误描述:${error.message}`, errStyle);
};

export default util;
