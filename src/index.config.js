let proxyUrl = location.origin + '/api';
// proxyUrl = 'http://10.255.4.80:8080';
let ssoUrl = '';
let tempUrl = location.origin + '/#/temp';
let redirectUrl = location.origin;

/* eslint-disable */
if (isProd) {
  ssoUrl = (location.origin.indexOf("test") >= 0) ? 'http://36.110.68.146:8443/' : 'https://sso.youxin.com/';
} else {
  ssoUrl = 'http://36.110.68.146:8443/'
}
/* eslint-enable */
export default {
  proxyUrl,
  tempUrl,
  redirectUrl,
  ssoUrl
};
