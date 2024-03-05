import request from '@/utils/request'

// 查询汇率列表
export function listExchangeRate(query) {
  return request({
    url: '/base/exchangeRate/list',
    method: 'get',
    params: query
  })
}

// 查询汇率详细
export function getExchangeRate(id) {
  return request({
    url: '/base/exchangeRate/' + id,
    method: 'get'
  })
}

// 新增汇率
export function addExchangeRate(data) {
  return request({
    url: '/base/exchangeRate',
    method: 'post',
    data: data
  })
}

// 修改汇率
export function updateExchangeRate(data) {
  return request({
    url: '/base/exchangeRate',
    method: 'put',
    data: data
  })
}

// 删除汇率
export function delExchangeRate(id) {
  return request({
    url: '/base/exchangeRate/' + id,
    method: 'delete'
  })
}
