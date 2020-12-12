/**
 * Created by mapbar_front on 2019-01-07.
 */
import Request from './request';

export function getData (data = {}) {
  return Request.get('/ping', data);
}

// 获取列表
export function loanUserList (data = {}) {
  return Request.get('/statistic/loanUser/list', data);
}

// 公司管理-获得API机构名称列表
export function companySelectCompany (data = {}) {
  return Request.get('/company/select', data);
}

// 选择发送
export function loanUserSend (data = {}) {
  return Request.post('/statistic/loanUser/send', data);
}

// 全部发送
export function loanUserSendAll (data = {}) {
  return Request.post('/statistic/loanUser/sendAll', data);
}

// 获取电话信息 /statistic/loanUser/details
export function loanUserDetails (data = {}) {
  return Request.get('/statistic/loanUser/details', data);
}
