import axios from 'axios';
import Config from '../index.config';
import { Message } from 'element-ui';
import router from '../router/index';

let proxyUrl = Config.proxyUrl;

// 服务端异常码处理
function AbnormalCodeProcessing (data) {
  if (data.code === 0) {
    return 0;
  }
  if (data.code === 10039) {
    router.push({
      path: '/tips',
      query: {
        message: data.msg
      }
    });
  } else if (data.code === 10030) {
    Message.error(data.msg);
    localStorage.clear();
    router.push('/');
  } else if (data.code) {
    Message.error(data.msg);
  }
}

// 为空数据清洗
function dataDeal (config) {
  if (!config.data || isEmptyObj(config.data)) {
    delete config.data;
  } else {
    config.data = isFormData(config.data) ? config.data : jsonFilter(config.data);
  }
  if (!config.params || isEmptyObj(config.params)) {
    delete config.params;
  } else {
    config.params = isFormData(config.params) ? config.params : jsonFilter(config.params);
  }
  return config;
}

function jsonFilter (obj) {
  for (let i in obj) {
    if (obj[i] === null || obj[i] === undefined || obj[i] === '') {
      delete obj[i];
    }
  }
  return obj;
}

function isEmptyObj (obj) {
  let isEmpty = true;
  for (let i in obj) {
    isEmpty = false;
    break;
  }
  return isEmpty;
}

function isFormData (obj) {
  return obj instanceof FormData;
}

function request (options) {
  const opts = {
    withCredentials: true,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': localStorage.getItem('Authorization')
    }
  };
  opts.url = /^(http|https):\/\//.test(options.url) ? options.url : proxyUrl + options.url;
  if (options.method.toLowerCase() === 'post') {
    opts.method = 'post';
    opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    if (options.data instanceof FormData) {
      opts.data = options.data;
    } else {
      let formdata = new FormData();
      Object.keys(options.data).forEach(item => {
        if (options.data[item] !== '') {
          formdata.append(item, options.data[item]);
        }
      });
      opts.data = formdata;
    }
  } else {
    opts.method = 'get';
    opts.params = options.data;
  }
  let config = dataDeal(opts);
  return axios.request(config).then(res => {
    // @todo:后面这个进行前后台项目的分离，就可以放在拦截器中
    AbnormalCodeProcessing(res.data);
    return res.data;
  }).catch(err => {
    Message.error({
      message: err
    });
  });
}

export default {
  get: function (url, data) {
    return request({
      method: 'GET',
      url,
      data: Object.assign({}, data)
    });
  },
  post: function (url, data) {
    return request({
      url,
      data,
      method: 'POST'
    });
  },
  request
};

// axios.interceptors.response.use(function (response) {
//   if (response.status === 200) {
//     // @todo: 按理说，异常码捕获，应该放在拦截器中，但是因为现在前后台写在一起，两个拦截器都会起作用，暂时不放在这里。
//     // AbnormalCodeProcessing(response.data);
//     return response;
//   } else {
//     Message.error('error code ' + response.status);
//   }
//   return response;
// }, function (error) {
//   Message.error(error.toString());
//   return Promise.reject(error);
// });
//
// axios.interceptors.request.use(function (config) {
//   config = dataDeal(config);
//   return config;
// }, function (error) {
//   Message.error(error.toString());
//   return Promise.reject(error);
// });
