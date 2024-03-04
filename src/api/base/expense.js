import request from '@/utils/request'

// 获取费用项目代码
export function getCode() {
  return request({
    url: '/base/expense/getCode',
    method: 'get'
  })
}

// 查询费用项目列表
export function listExpense(query) {
  return request({
    url: '/base/expense/list',
    method: 'get',
    params: query
  })
}

// 查询费用项目详细
export function getExpense(id) {
  return request({
    url: '/base/expense/' + id,
    method: 'get'
  })
}

// 新增费用项目
export function addExpense(data) {
  return request({
    url: '/base/expense',
    method: 'post',
    data: data
  })
}

// 修改费用项目
export function updateExpense(data) {
  return request({
    url: '/base/expense',
    method: 'put',
    data: data
  })
}

// 删除费用项目
export function delExpense(id) {
  return request({
    url: '/base/expense/' + id,
    method: 'delete'
  })
}
