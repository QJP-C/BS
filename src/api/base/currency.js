import request from '@/utils/request'

// 查询币种列表
export function listCurrency(query) {
  return request({
    url: '/base/currency/list',
    method: 'get',
    params: query
  })
}

// 查询币种详细
export function getCurrency(id) {
  return request({
    url: '/base/currency/' + id,
    method: 'get'
  })
}

// 新增币种
export function addCurrency(data) {
  return request({
    url: '/base/currency',
    method: 'post',
    data: data
  })
}

// 修改币种
export function updateCurrency(data) {
  return request({
    url: '/base/currency',
    method: 'put',
    data: data
  })
}

// 删除币种
export function delCurrency(id) {
  return request({
    url: '/base/currency/' + id,
    method: 'delete'
  })
}
