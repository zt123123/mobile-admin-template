/**
 * ajax封装
 */

import axios from "axios";
import util from "./util";

let imi = imi || {};

const errorInfo = {
  success: {
    errorcode: 0,
    errordesc: "请求成功",
  },
  token: {
    errorcode: 99999,
    errordesc: "令牌错误，请重新登录",
  },
};

let doAjaxResponse = function (data, successCallback, errorCallback, uniHandle) {





  //令牌错误，直接处理
  if (data.errorcode == errorInfo.token.errorcode) {
    util.showModal(null, errorInfo.token.errordesc, util.jumpToLogin);
    return false;
  }

  //一般错误，判断是否统一处理
  if (data.errorcode != errorInfo.success.errorcode &&
    uniHandle == true) {
    util.showModal(null,data.errordesc);
    return false;
  }

  //成功或自定义处理
  successCallback && successCallback(data);
  return true;
};

imi.doAjaxRequest = function (url, data = {}, successCallback, errorCallback, uniHandle = true, method = "post") {

  util.requestLog(url, method, data);
  let token = $storage.get("token");

  axios({
    method,
    url,
    data,
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then(data => {
    $loading.hide();
    util.responseLog(data.data);
    doAjaxResponse(data.data, successCallback, errorCallback, uniHandle);
  }).catch(error => {
    $loading.hide();
    util.errorLog(error);
    util.showModal(error);
    errorCallback && errorCallback(error);
  });

  $loading.show();
};
export default imi;
