import request from '@/utils/request'

// 获取费用编码
export function getCode() {
  return request({
    url: '/bms/expenses/getCode',
    method: 'get'
  })
}

// 查询费用清单列表
export function listExpenses(query) {
  return request({
    url: '/bms/expenses/list',
    method: 'get',
    params: query
  })
}

// 查询费用清单详细
export function getExpenses(id) {
  return request({
    url: '/bms/expenses/' + id,
    method: 'get'
  })
}

// 新增费用清单
export function addExpenses(data) {
  return request({
    url: '/bms/expenses',
    method: 'post',
    data: data
  })
}

// 修改费用清单
export function updateExpenses(data) {
  return request({
    url: '/bms/expenses',
    method: 'put',
    data: data
  })
}

// 删除费用清单
export function delExpenses(id) {
  return request({
    url: '/bms/expenses/' + id,
    method: 'delete'
  })
}

// 费用提交审核
export function submitExpense(data) {
  return request({
    url: '/bms/expenses/submit',
    method: 'post',
    data: data
  })
}

// 获取计费工具列表
export function getBillingList() {
  return request({
    url: '/bms/expenses/billingList',
    method: 'get'
  })
}

// 获取财务计费工具列表
export function getFinanceBillingList() { 
  return request({
    url: '/bms/expenses/fBillingList',
    method: 'get'
  })
}

// 审核通过
export function approvedExpense(data) {
  return request({
    url: '/bms/expenses/approved',
    method: 'post',
    data: data
  })
}