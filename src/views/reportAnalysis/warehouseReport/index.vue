<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-row>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="订单ID" prop="orderId">
            <el-input v-model="queryParams.orderId" placeholder="请输入订单ID" clearable @keyup.enter="handleQuery" />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="客户" prop="customerId">
            <el-select v-model="queryParams.customerId" placeholder="请选择客户" clearable>
              <el-option v-for="item in customerOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="费用名称" prop="name">
            <el-input v-model="queryParams.name" placeholder="请输入费用名称" clearable @keyup.enter="handleQuery" />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="会计期间" prop="amountTime" style="width: 95%;">
            <el-date-picker
                end-placeholder="开始时间"
                start-placeholder="截止时间"
                range-separator="To"
                type="daterange"
                v-model="queryParams.amountTime"
                value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6"/>
        <el-col :xs="8" :sm="8" :md="6"/>
        <el-col :xs="8" :sm="8" :md="6"/>
        <el-col :xs="8" :sm="8" :md="6" >
          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table v-loading="loading" :data="expensesList" @selection-change="handleSelectionChange" height="680px" border>
      <el-table-column label="费用名称" align="center" prop="name" />
      <el-table-column label="订单ID" align="center" prop="orderId" />
      <el-table-column label="客户名称" align="center" prop="customerName" />
      <el-table-column label="会计期间" align="center" prop="accountingTime" />
      <el-table-column label="业务量" align="center" prop="businessVolume" />
      <el-table-column label="收入" align="center" prop="revenue" />
      <el-table-column label="成本" align="center" prop="cost" />
      <el-table-column label="毛利" align="center" prop="grossProfit" />
    </el-table>

    <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize" @pagination="getList" />

  </div>
</template>

<script setup name="Expenses">
import { selectWarehouseReportList } from "@/api/bms/expenses";
import { getAllWarehouse } from "@/api/base/warehouse";
import { getAllCustomer } from "@/api/base/customer";
import { getAllCurrency } from "@/api/base/currency";
import { getAllExpense } from "@/api/base/expense";
const { proxy } = getCurrentInstance();

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
    code: null,
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
    amountTime: null,
  },
  rules: {
    name: [
      { required: true, message: "费用名称不能为空", trigger: "blur" }
    ],
    code: [
      { required: true, message: "费用编码不能为空", trigger: "blur" }
    ],
    orderId: [
      { required: true, message: "订单ID不能为空", trigger: "blur" }
    ],
    warehouseId: [
      { required: true, message: "仓库不能为空", trigger: "blur" }
    ],
    amountTime: [
      { required: true, message: "费用发生日期不能为空", trigger: "blur" }
    ],
    customerId: [
      { required: true, message: "客户不能为空", trigger: "blur" }
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
    amountTotal: [
      { required: true, message: "费用价格不能为空", trigger: "blur" }
    ],
    currencyId: [
      { required: true, message: "币种不能为空", trigger: "change" }
    ],
    expenseItemId: [
      { required: true, message: "费用项目不能为空", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询费用清单列表 */
function getList() {
  loading.value = true;
  selectWarehouseReportList(queryParams.value).then(response => {
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
    code: null,
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


// 仓库下拉框
const warehouseOptions = ref([]);
// 客户下拉框
const customerOptions = ref([]);
// 币种下拉框
const currencyOptions = ref([]);
// 费用项下拉框
const expenseOptions = ref([]);
onMounted(() => {
  //获取所有仓库
  getAllWarehouse().then(response => {
    response.rows.forEach(item => {
      warehouseOptions.value.push({
        value: item.id,
        label: item.name
      });
    });
  });
  //获取所有客户
  getAllCustomer().then(response => {
    response.rows.forEach(item => {
      customerOptions.value.push({
        value: item.id,
        label: item.name
      });
    });
  });
  //获取所有币种
  getAllCurrency().then(response => {
    response.rows.forEach(item => {
      currencyOptions.value.push({
        value: item.id,
        label: item.name
      });
    });
  });
  //获取所有费用项
  getAllExpense().then(response => {
    response.rows.forEach(item => {
      expenseOptions.value.push({
        value: item.id,
        label: item.name
      });
    });
  });
});
getList();
</script>
