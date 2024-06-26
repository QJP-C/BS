import request from '@/utils/request'

// 获取客户编码
export function getCode() {
  return request({
    url: '/base/customer/getCode',
    method: 'get'
  })
}

// 查询客户列表
export function listCustomer(query) {
  return request({
    url: '/base/customer/list',
    method: 'get',
    params: query
  })
}

// 查询客户详细
export function getCustomer(id) {
  return request({
    url: '/base/customer/' + id,
    method: 'get'
  })
}

// 新增客户
export function addCustomer(data) {
  return request({
    url: '/base/customer',
    method: 'post',
    data: data
  })
}

// 修改客户
export function updateCustomer(data) {
  return request({
    url: '/base/customer',
    method: 'put',
    data: data
  })
}

// 删除客户
export function delCustomer(id) {
  return request({
    url: '/base/customer/' + id,
    method: 'delete'
  })
}

// 获取所有客户
export function getAllCustomer() {
  return request({
    url: '/base/customer/getAll',
    method: 'get'
  })
}