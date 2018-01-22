/**
 * 接口定义
 */
/**
 * api接口列表
 */
//自有接口


const URL_API_ROOT = "http://192.168.0.171:8082/api";  // development开发环境
// const URL_API_ROOT = "http://ss.api.imi78.com/api"; // production生产环境

//构建接口地址
function interfaceUrl(interfaceName) {
  return URL_API_ROOT + "/" + interfaceName;
}


const selfInterface = {
  checkdata: interfaceUrl("checkdata"), //检查手机号是否注册过
  getwebcode: interfaceUrl("getwebcode"), //操作频繁验证码
  getmobilecode: interfaceUrl("getmobilecode"), //获取验证码
  registerss: interfaceUrl("registerss"), //注册账号
  login: interfaceUrl("login"), //登陆
  addss: interfaceUrl("addss"), //成为推广员
  getuser: interfaceUrl("getuser"), //获取用户信息
  getsplist: interfaceUrl("getsplist"), //服务商列表
  getspinfo: interfaceUrl("getspinfo"), //服务商详情
  addsp: interfaceUrl("addsp"), //添加服务商
  delsp: interfaceUrl("delsp"), //删除服务商
  setspassets: interfaceUrl("setspassets"), //修改服务商
  getsslist: interfaceUrl("getsslist"), //推广员列表
  getssinfo: interfaceUrl("getssinfo"), //推广员详情
  addss: interfaceUrl("addss"), //添加推广员
  delss: interfaceUrl("delss"), //删除推广员
  getuserlist: interfaceUrl("getuserlist"), //推广用户列表
  setssassets: interfaceUrl("setssassets"), //修改推广员
  getdividedinto: interfaceUrl("getdividedinto"), //分成信息
  cashlist: interfaceUrl("cashlist"), //提现列表信息
  getorderlist: interfaceUrl("getorderlist"), //进货列表
  setorderinfo: interfaceUrl("setorderinfo"), //进货审核
  fortune: interfaceUrl("fortune"), //财富总览
  withdrawalslist: interfaceUrl("withdrawalslist"), //提现列表
  askcash: interfaceUrl("askcash"), //申请提现
  withdrawals: interfaceUrl("withdrawals"), //申请提现下一步
  manual_withdrawals: interfaceUrl("manual_withdrawals"), //提款批复
  purchase: interfaceUrl("purchase"), //进货
  setpurchase: interfaceUrl("setpurchase"), //申请进货
  purchaselist: interfaceUrl("purchaselist"), //进货记录
  sellers: interfaceUrl("sellers"), //卖货
  sellerslist: interfaceUrl("sellerslist"), //卖货记录
  set_sell_card_config: interfaceUrl("set_sell_card_config"), //设置卖卡配置
  get_sell_card_config: interfaceUrl("get_sell_card_config"), //获取卖卡配置
  spread_get_materiel: interfaceUrl("spread_get_materiel"), //物料制作
  like_user: interfaceUrl("like_user"), //模糊搜索用户昵称或ID
};

export default selfInterface
