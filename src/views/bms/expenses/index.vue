<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="费用编码" prop="busCode">
        <el-input v-model="queryParams.busCode" placeholder="请输入费用编码" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="订单ID" prop="orderId">
        <el-input v-model="queryParams.orderId" placeholder="请输入订单ID" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="仓库ID" prop="warehouseId">
        <el-input v-model="queryParams.warehouseId" placeholder="请输入仓库ID" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="费用发生日期" prop="amountTime">
        <el-date-picker clearable v-model="queryParams.amountTime" type="date" value-format="YYYY-MM-DD"
          placeholder="请选择费用发生日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="财务年" prop="amountYear">
        <el-input v-model="queryParams.amountYear" placeholder="请输入财务年" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="财务月" prop="amountMonth">
        <el-input v-model="queryParams.amountMonth" placeholder="请输入财务月" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="客户ID" prop="customerId">
        <el-input v-model="queryParams.customerId" placeholder="请输入客户ID" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="收付类型" prop="paymentType">
        <el-select v-model="queryParams.paymentType" placeholder="请选择收付类型" clearable>
          <el-option v-for="dict in base_expense_payment_type" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="付费方式" prop="paymentMethod">
        <el-input v-model="queryParams.paymentMethod" placeholder="请输入付费方式" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="来源系统" prop="sourceSys">
        <el-input v-model="queryParams.sourceSys" placeholder="请输入来源系统" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="费用项ID" prop="expenseItemId">
        <el-input v-model="queryParams.expenseItemId" placeholder="请输入费用项ID" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="费用类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择费用类型" clearable>
          <el-option v-for="dict in bms_expense_type" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="费用价格" prop="amountTotal">
        <el-input v-model="queryParams.amountTotal" placeholder="请输入费用价格" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="币种ID" prop="currencyId">
        <el-input v-model="queryParams.currencyId" placeholder="请输入币种ID" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="发票ID" prop="invoiceId">
        <el-input v-model="queryParams.invoiceId" placeholder="请输入发票ID" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="发票时间" prop="invoiceTime">
        <el-date-picker clearable v-model="queryParams.invoiceTime" type="date" value-format="YYYY-MM-DD"
          placeholder="请选择发票时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="账单ID" prop="billId">
        <el-input v-model="queryParams.billId" placeholder="请输入账单ID" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="部门ID" prop="deptId">
        <el-input v-model="queryParams.deptId" placeholder="请输入部门ID" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="扩展字段" prop="extendedField">
        <el-input v-model="queryParams.extendedField" placeholder="请输入扩展字段" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="扩展字段1" prop="extendedField1">
        <el-input v-model="queryParams.extendedField1" placeholder="请输入扩展字段1" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="扩展字段2" prop="extendedField2">
        <el-input v-model="queryParams.extendedField2" placeholder="请输入扩展字段2" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="是否创建账单" prop="isCreateBill">
        <el-input v-model="queryParams.isCreateBill" placeholder="请输入是否创建账单" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="是否开发票" prop="isInvoiced">
        <el-input v-model="queryParams.isInvoiced" placeholder="请输入是否开发票" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="是否挂账" prop="isAccounted">
        <el-input v-model="queryParams.isAccounted" placeholder="请输入是否挂账" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="是否审核" prop="isApproved">
        <el-input v-model="queryParams.isApproved" placeholder="请输入是否审核" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="是否锁定" prop="isLocked">
        <el-input v-model="queryParams.isLocked" placeholder="请输入是否锁定" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="是否提交" prop="isSubmit">
        <el-input v-model="queryParams.isSubmit" placeholder="请输入是否提交" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="费用状态" prop="expenseStatus">
        <el-select v-model="queryParams.expenseStatus" placeholder="请选择费用状态" clearable>
          <el-option v-for="dict in bms_expense_status" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['bms:expenses:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate"
          v-hasPermi="['bms:expenses:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['bms:expenses:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="Download" @click="handleExport"
          v-hasPermi="['bms:expenses:export']">导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="expensesList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="费用编码" align="center" prop="busCode" />
      <el-table-column label="订单ID" align="center" prop="orderId" />
      <el-table-column label="仓库ID" align="center" prop="warehouseId" />
      <el-table-column label="费用发生日期" align="center" prop="amountTime" width="180" />
      <el-table-column label="财务年" align="center" prop="amountYear" />
      <el-table-column label="财务月" align="center" prop="amountMonth" />
      <el-table-column label="客户ID" align="center" prop="customerId" />
      <el-table-column label="收付类型" align="center" prop="paymentType">
        <template #default="scope">
          <dict-tag :options="base_expense_payment_type" :value="scope.row.paymentType" />
        </template>
      </el-table-column>
      <el-table-column label="付费方式" align="center" prop="paymentMethod">
        <template #default="scope">
          <dict-tag :options="bms_payment_method" :value="scope.row.paymentMethod" />
        </template>
      </el-table-column>
      <el-table-column label="来源系统" align="center" prop="sourceSys">
        <template #default="scope">
          <dict-tag :options="bms_source_sys" :value="scope.row.sourceSys" />
        </template>
      </el-table-column>
      <el-table-column label="费用项ID" align="center" prop="expenseItemId" />
      <el-table-column label="费用类型" align="center" prop="type">
        <template #default="scope">
          <dict-tag :options="bms_expense_type" :value="scope.row.type" />
        </template>
      </el-table-column>
      <el-table-column label="费用价格" align="center" prop="amountTotal" />
      <el-table-column label="币种ID" align="center" prop="currencyId" />
      <el-table-column label="发票ID" align="center" prop="invoiceId" />
      <el-table-column label="发票时间" align="center" prop="invoiceTime" width="180" />
      <el-table-column label="账单ID" align="center" prop="billId" />
      <el-table-column label="部门ID" align="center" prop="deptId" />
      <el-table-column label="扩展字段" align="center" prop="extendedField" />
      <el-table-column label="扩展字段1" align="center" prop="extendedField1" />
      <el-table-column label="扩展字段2" align="center" prop="extendedField2" />
      <el-table-column label="是否创建账单" align="center" prop="isCreateBill">
        <template #default="scope">
          <dict-tag :options="base_currency_yes_no" :value="scope.row.isCreateBill" />
        </template>
      </el-table-column>
      <el-table-column label="是否开发票" align="center" prop="isInvoiced" />
      <el-table-column label="是否挂账" align="center" prop="isAccounted" />
      <el-table-column label="是否审核" align="center" prop="isApproved" />
      <el-table-column label="是否锁定" align="center" prop="isLocked" />
      <el-table-column label="是否提交" align="center" prop="isSubmit" />
      <el-table-column label="费用状态" align="center" prop="expenseStatus">
        <template #default="scope">
          <dict-tag :options="bms_expense_status" :value="scope.row.expenseStatus" />
        </template>
      </el-table-column>
      <el-table-column label="驳回信息" align="center" prop="rejectInfo" />
      <el-table-column label="备注信息" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['bms:expenses:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
            v-hasPermi="['bms:expenses:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改费用清单对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="expensesRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="费用编码" prop="busCode">
          <el-input v-model="form.busCode" placeholder="请输入费用编码" disabled/>
        </el-form-item>
        <el-form-item label="订单ID" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入订单ID" />
        </el-form-item>
        <el-form-item label="仓库ID" prop="warehouseId">
          <el-input v-model="form.warehouseId" placeholder="请输入仓库ID" />
        </el-form-item>
        <el-form-item label="费用发生日期" prop="amountTime">
          <el-date-picker clearable v-model="form.amountTime" type="date" value-format="YYYY-MM-DD"
            placeholder="请选择费用发生日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="财务年" prop="amountYear">
          <el-input v-model="form.amountYear" placeholder="请输入财务年" />
        </el-form-item>
        <el-form-item label="财务月" prop="amountMonth">
          <el-input v-model="form.amountMonth" placeholder="请输入财务月" />
        </el-form-item>
        <el-form-item label="客户ID" prop="customerId">
          <el-input v-model="form.customerId" placeholder="请输入客户ID" />
        </el-form-item>
        <el-form-item label="收付类型" prop="paymentType">
          <el-select v-model="form.paymentType" placeholder="请选择收付类型">
            <el-option v-for="dict in base_expense_payment_type" :key="dict.value" :label="dict.label"
              :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="付费方式" prop="paymentMethod">
          <el-input v-model="form.paymentMethod" placeholder="请输入付费方式" />
        </el-form-item>
        <el-form-item label="来源系统" prop="sourceSys">
          <el-input v-model="form.sourceSys" placeholder="请输入来源系统" />
        </el-form-item>
        <el-form-item label="费用项ID" prop="expenseItemId">
          <el-input v-model="form.expenseItemId" placeholder="请输入费用项ID" />
        </el-form-item>
        <el-form-item label="费用类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择费用类型">
            <el-option v-for="dict in bms_expense_type" :key="dict.value" :label="dict.label"
              :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="费用价格" prop="amountTotal">
          <el-input v-model="form.amountTotal" placeholder="请输入费用价格" />
        </el-form-item>
        <el-form-item label="币种ID" prop="currencyId">
          <el-input v-model="form.currencyId" placeholder="请输入币种ID" />
        </el-form-item>
        <el-form-item label="发票ID" prop="invoiceId">
          <el-input v-model="form.invoiceId" placeholder="请输入发票ID" />
        </el-form-item>
        <el-form-item label="发票时间" prop="invoiceTime">
          <el-date-picker clearable v-model="form.invoiceTime" type="date" value-format="YYYY-MM-DD"
            placeholder="请选择发票时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="账单ID" prop="billId">
          <el-input v-model="form.billId" placeholder="请输入账单ID" />
        </el-form-item>
        <el-form-item label="部门ID" prop="deptId">
          <el-input v-model="form.deptId" placeholder="请输入部门ID" />
        </el-form-item>
        <el-form-item label="扩展字段" prop="extendedField">
          <el-input v-model="form.extendedField" placeholder="请输入扩展字段" />
        </el-form-item>
        <el-form-item label="扩展字段1" prop="extendedField1">
          <el-input v-model="form.extendedField1" placeholder="请输入扩展字段1" />
        </el-form-item>
        <el-form-item label="扩展字段2" prop="extendedField2">
          <el-input v-model="form.extendedField2" placeholder="请输入扩展字段2" />
        </el-form-item>
        <el-form-item label="是否创建账单" prop="isCreateBill">
          <el-input v-model="form.isCreateBill" placeholder="请输入是否创建账单" />
        </el-form-item>
        <el-form-item label="是否开发票" prop="isInvoiced">
          <el-input v-model="form.isInvoiced" placeholder="请输入是否开发票" />
        </el-form-item>
        <el-form-item label="是否挂账" prop="isAccounted">
          <el-input v-model="form.isAccounted" placeholder="请输入是否挂账" />
        </el-form-item>
        <el-form-item label="是否审核" prop="isApproved">
          <el-input v-model="form.isApproved" placeholder="请输入是否审核" />
        </el-form-item>
        <el-form-item label="是否锁定" prop="isLocked">
          <el-input v-model="form.isLocked" placeholder="请输入是否锁定" />
        </el-form-item>
        <el-form-item label="是否提交" prop="isSubmit">
          <el-input v-model="form.isSubmit" placeholder="请输入是否提交" />
        </el-form-item>
        <el-form-item label="费用状态" prop="expenseStatus">
          <el-radio-group v-model="form.expenseStatus">
            <el-radio v-for="dict in bms_expense_status" :key="dict.value"
              :label="parseInt(dict.value)">{{ dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="驳回信息" prop="rejectInfo">
          <el-input v-model="form.rejectInfo" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Expenses">
import { listExpenses, getExpenses, delExpenses, addExpenses, updateExpenses, getCode } from "@/api/bms/expenses";

const { proxy } = getCurrentInstance();
const { base_expense_payment_type, bms_expense_type, bms_expense_status } = proxy.useDict('base_expense_payment_type', 'bms_expense_type', 'bms_expense_status');

const expensesList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    busCode: null,
    orderId: null,
    warehouseId: null,
    amountTime: null,
    amountYear: null,
    amountMonth: null,
    customerId: null,
    paymentType: null,
    paymentMethod: null,
    sourceSys: null,
    expenseItemId: null,
    type: null,
    amountTotal: null,
    currencyId: null,
    invoiceId: null,
    invoiceTime: null,
    billId: null,
    deptId: null,
    extendedField: null,
    extendedField1: null,
    extendedField2: null,
    isCreateBill: null,
    isInvoiced: null,
    isAccounted: null,
    isApproved: null,
    isLocked: null,
    isSubmit: null,
    expenseStatus: null,
    rejectInfo: null,
  },
  rules: {
    busCode: [
      { required: true, message: "费用编码不能为空", trigger: "blur" }
    ],
    orderId: [
      { required: true, message: "订单ID不能为空", trigger: "blur" }
    ],
    warehouseId: [
      { required: true, message: "仓库ID不能为空", trigger: "blur" }
    ],
    amountTime: [
      { required: true, message: "费用发生日期不能为空", trigger: "blur" }
    ],
    customerId: [
      { required: true, message: "客户ID不能为空", trigger: "blur" }
    ],
    paymentType: [
      { required: true, message: "收付类型不能为空", trigger: "change" }
    ],
    paymentMethod: [
      { required: true, message: "付费方式不能为空", trigger: "blur" }
    ],
    sourceSys: [
      { required: true, message: "来源系统不能为空", trigger: "blur" }
    ],
    type: [
      { required: true, message: "费用类型不能为空", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询费用清单列表 */
function getList() {
  loading.value = true;
  listExpenses(queryParams.value).then(response => {
    expensesList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    id: null,
    busCode: null,
    orderId: null,
    warehouseId: null,
    amountTime: null,
    amountYear: null,
    amountMonth: null,
    customerId: null,
    paymentType: null,
    paymentMethod: null,
    sourceSys: null,
    expenseItemId: null,
    type: null,
    amountTotal: null,
    currencyId: null,
    invoiceId: null,
    invoiceTime: null,
    billId: null,
    deptId: null,
    extendedField: null,
    extendedField1: null,
    extendedField2: null,
    isCreateBill: null,
    isInvoiced: null,
    isAccounted: null,
    isApproved: null,
    isLocked: null,
    isSubmit: null,
    expenseStatus: null,
    rejectInfo: null,
    remark: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null
  };
  proxy.resetForm("expensesRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加费用清单";
  getCode().then(response => {
    form.value.busCode = response.msg;
  });
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getExpenses(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改费用清单";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["expensesRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateExpenses(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addExpenses(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除费用清单编号为"' + _ids + '"的数据项？').then(function () {
    return delExpenses(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => { });
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('bms/expenses/export', {
    ...queryParams.value
  }, `expenses_${new Date().getTime()}.xlsx`)
}

getList();
</script>
