import request from '@/utils/request'

// 查询账单管理列表
export function listBl(query) {
  return request({
    url: '/bms/bl/list',
    method: 'get',
    params: query
  })
}

// 查询账单管理详细
export function getBl(id) {
  return request({
    url: '/bms/bl/' + id,
    method: 'get'
  })
}

// 新增账单管理
export function addBl(data) {
  return request({
    url: '/bms/bl',
    method: 'post',
    data: data
  })
}

// 修改账单管理
export function updateBl(data) {
  return request({
    url: '/bms/bl',
    method: 'put',
    data: data
  })
}

// 删除账单管理
export function delBl(id) {
  return request({
    url: '/bms/bl/' + id,
    method: 'delete'
  })
}

// 发送OA
export function sendOA(data) {
  return request({
    url: '/bms/bl/sendOA',
    method: 'put',
    data: data
  })
}