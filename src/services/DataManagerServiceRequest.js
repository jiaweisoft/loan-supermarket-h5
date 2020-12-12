/**
 * Created by mapbar_front on 2019-03-12.
 */
import Request from './request';

export function getData (data = {}) {
  return Request.get('/ping', data);
}

// API营收统计 /statistic/api/revenue
export function apiRevenue (data = {}) {
  return Request.get('/statistic/api/revenue', data);
}

// 查看名单来源 /statistic/api/revenueDetail
export function apiRevenueDetail (data = {}) {
  return Request.get('/statistic/api/revenueDetail', data);
}

// 名单来源列表/statistic/listSource
export function listSource (data = {}) {
  return Request.get('/statistic/listSource', data);
}

// 新增用户数据统计/statistic/newUser
export function newUser (data = {}) {
  return Request.get('/statistic/newUser', data);
}
