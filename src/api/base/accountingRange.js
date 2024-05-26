import request from '@/utils/request'

// 查询会计期间列表
export function listAccountingRange(query) {
  return request({
    url: '/base/accountingRange/list',
    method: 'get',
    params: query
  })
}

// 查询会计期间详细
export function getAccountingRange(id) {
  return request({
    url: '/base/accountingRange/' + id,
    method: 'get'
  })
}

// 新增会计期间
export function addAccountingRange(data) {
  return request({
    url: '/base/accountingRange',
    method: 'post',
    data: data
  })
}

// 修改会计期间
export function updateAccountingRange(data) {
  return request({
    url: '/base/accountingRange',
    method: 'put',
    data: data
  })
}

// 删除会计期间
export function delAccountingRange(id) {
  return request({
    url: '/base/accountingRange/' + id,
    method: 'delete'
  })
}
