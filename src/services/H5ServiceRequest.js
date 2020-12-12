import Request from './h5request.js';

export function getData (data = {}) {
  return Request.get('/ping', data);
}

export function saveCustomerInfoByUuid (data = {}) {
  return Request.post('/customer/H5/saveCustomerInfoByUuid', data);
}

export function getCustomerInfoByUuid (data = {}) {
  return Request.post('/customer/H5/getCustomerInfoByUuid', data);
}

// 用户授权接口 /customer/H5/authorizeCustomer
export function authorizeCustomer (data = {}) {
  return Request.post('/customer/H5/authorizeCustomer', data);
}

// H5获得列表 /converge/h5List
export function convergeH5List (data = {}) {
  return Request.get('/converge/h5List', data);
}

// H5插入一条记录 /converge/insert
export function convergeInsert (data = {}) {
  return Request.post('/converge/insert', data);
}

// 发送验证码接口 /customer/sendVerifyCode
export function sendVerifyCode (data = {}) {
  return Request.post('/customer/sendVerifyCode', data);
}

// 获取定位https://ip.ws.126.net/ipquery
export function getCity () {
  return new Promise(function (resolve) {
    let Xhr = new XMLHttpRequest();
    Xhr.open('get', 'https://ip.ws.126.net/ipquery', true);
    Xhr.onreadystatechange = function () {
      if (Xhr.readyState === 4) {
        let data = Xhr.responseText;
        resolve(data);
      }
    };
    Xhr.send();
  });
}

// 公司管理-获取动态修改时间
export function companyGetAgreeTime (data) {
  return Request.get('/company/getAgreeTime', data);
}

// 公司管理-获得API机构名称列表
export function companySelectCompany (data = {}) {
  return Request.get('/company/select', data);
}

// 获取公司列表/company/getAgreeList
export function companyGetAgreeList (data) {
  return Request.get('/company/getAgreeList', data);
}

// /globalVariable/MarketingPage/getContent
export function MarketingPageGetContent (data) {
  return Request.get('/globalVariable/MarketingPage/getContent', data);
}
