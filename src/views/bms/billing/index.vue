<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
      class="baseForm"
    >
      <el-row>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="费用编码" prop="code">
            <el-input
              v-model="queryParams.code"
              placeholder="请输入费用编码"
              clearable
              @keyup.enter="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="费用名称" prop="name">
            <el-input
              v-model="queryParams.name"
              placeholder="请输入费用名称"
              clearable
              @keyup.enter="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="订单ID" prop="orderId">
            <el-input
              v-model="queryParams.orderId"
              placeholder="请输入订单ID"
              clearable
              @keyup.enter="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="仓库" prop="warehouseId">
            <el-select
              v-model="queryParams.warehouseId"
              placeholder="请选择仓库"
              clearable
            >
              <el-option
                v-for="item in warehouseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="发生日期" prop="amountTime">
            <el-date-picker
              clearable
              v-model="queryParams.amountTime"
              type="datetime"
              value-format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择费用发生日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="客户" prop="customerId">
            <el-select
              v-model="queryParams.customerId"
              placeholder="请选择客户"
              clearable
            >
              <el-option
                v-for="item in customerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="收付类型" prop="paymentType">
            <el-select
              v-model="queryParams.paymentType"
              placeholder="请选择收付类型"
              clearable
            >
              <el-option
                v-for="dict in base_expense_payment_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="付费方式" prop="paymentMethod">
            <el-select
              v-model="queryParams.paymentMethod"
              placeholder="请选择付费方式"
              clearable
            >
              <el-option
                v-for="dict in bms_payment_method"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="来源系统" prop="sourceSys">
            <el-select
              v-model="queryParams.sourceSys"
              placeholder="请选择来源系统"
            >
              <el-option
                v-for="dict in bms_source_sys"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="费用项目" prop="expenseItemId">
            <el-select
              v-model="queryParams.expenseItemId"
              placeholder="请选择费用项目"
              clearable
            >
              <el-option
                v-for="item in expenseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="费用类型" prop="type">
            <el-select
              v-model="queryParams.type"
              placeholder="请选择费用类型"
              clearable
            >
              <el-option
                v-for="dict in bms_expense_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="币种" prop="currencyId">
            <el-select
              v-model="queryParams.currencyId"
              placeholder="请选择币种"
              clearable
            >
              <el-option
                v-for="item in currencyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="创建账单" prop="isCreateBill">
            <el-select
              v-model="queryParams.isCreateBill"
              placeholder="请选择是否创建账单"
              clearable
            >
              <el-option
                v-for="dict in business_yes_no"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="开发票" prop="isInvoiced">
            <el-select
              v-model="queryParams.isInvoiced"
              placeholder="请选择是否开发票"
              clearable
            >
              <el-option
                v-for="dict in business_yes_no"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="是否挂账" prop="isAccounted">
            <el-select
              v-model="queryParams.isAccounted"
              placeholder="请选择是否挂账"
              clearable
            >
              <el-option
                v-for="dict in business_yes_no"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="是否审核" prop="isApproved">
            <el-select
              v-model="queryParams.isApproved"
              placeholder="请选择是否审核"
              clearable
            >
              <el-option
                v-for="dict in business_yes_no"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="是否锁定" prop="isLocked">
            <el-select
              v-model="queryParams.isLocked"
              placeholder="请选择是否锁定"
              clearable
            >
              <el-option
                v-for="dict in business_yes_no"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item label="是否提交" prop="isSubmit">
            <el-select
              v-model="queryParams.isSubmit"
              placeholder="请选择是否提交"
              clearable
            >
              <el-option
                v-for="dict in business_yes_no"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <!-- <el-form-item label="费用状态" prop="expenseStatus">
            <el-select v-model="queryParams.expenseStatus" placeholder="请选择费用状态" clearable>
              <el-option v-for="dict in bms_expense_status" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item> -->
        </el-col>
        <el-col :xs="8" :sm="8" :md="6">
          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery"
              >搜索</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['bms:expenses:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate"
          v-hasPermi="['bms:expenses:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['bms:expenses:remove']">删除</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button type="warning" plain icon="Download" @click="handleExport"
          v-hasPermi="['bms:expenses:export']">导出</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Upload" @click="handleSubmit"
          >提交审核</el-button
        >
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="expensesList"
      @selection-change="handleSelectionChange"
      height="680px"
      border
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
        fixed="left"
      />
      <el-table-column
        label="费用名称"
        align="center"
        prop="name"
        width="140"
      />
      <el-table-column
        label="费用编码"
        align="center"
        prop="code"
        width="160"
      />
      <el-table-column label="订单ID" align="center" prop="orderId" />
      <el-table-column label="仓库" align="center" prop="warehouseId">
        <template #default="scope">
          <dict-tag
            :options="warehouseOptions"
            :value="scope.row.warehouseId"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="费用发生日期"
        align="center"
        prop="amountTime"
        width="180"
      />
      <el-table-column
        label="客户"
        align="center"
        prop="customerId"
        width="100"
      >
        <template #default="scope">
          <dict-tag :options="customerOptions" :value="scope.row.customerId" />
        </template>
      </el-table-column>
      <el-table-column label="收付类型" align="center" prop="paymentType">
        <template #default="scope">
          <dict-tag
            :options="base_expense_payment_type"
            :value="scope.row.paymentType"
          />
        </template>
      </el-table-column>
      <el-table-column label="付费方式" align="center" prop="paymentMethod">
        <template #default="scope">
          <dict-tag
            :options="bms_payment_method"
            :value="scope.row.paymentMethod"
          />
        </template>
      </el-table-column>
      <el-table-column label="驳回信息" align="center" prop="rejectInfo" />
      <el-table-column
        label="费用项目"
        align="center"
        prop="expenseItemId"
        width="100"
      >
        <template #default="scope">
          <dict-tag
            :options="expenseOptions"
            :value="scope.row.expenseItemId"
          />
        </template>
      </el-table-column>
      <el-table-column label="费用类型" align="center" prop="type">
        <template #default="scope">
          <dict-tag :options="bms_expense_type" :value="scope.row.type" />
        </template>
      </el-table-column>
      <el-table-column
        label="费用状态"
        align="center"
        prop="expenseStatus"
        width="100"
      >
        <template #default="scope">
          <dict-tag
            :options="bms_expense_status"
            :value="scope.row.expenseStatus"
          />
        </template>
      </el-table-column>
      <el-table-column label="费用价格" align="center" prop="amountTotal" />
      <el-table-column label="币种" align="center" prop="currencyId">
        <template #default="scope">
          <dict-tag :options="currencyOptions" :value="scope.row.currencyId" />
        </template>
      </el-table-column>
      <el-table-column label="创建账单" align="center" prop="isCreateBill">
        <template #default="scope">
          <dict-tag
            :options="business_yes_no"
            :value="scope.row.isCreateBill"
          />
        </template>
      </el-table-column>
      <el-table-column label="开发票" align="center" prop="isInvoiced">
        <template #default="scope">
          <dict-tag :options="business_yes_no" :value="scope.row.isInvoiced" />
        </template>
      </el-table-column>
      <el-table-column label="是否挂账" align="center" prop="isAccounted">
        <template #default="scope">
          <dict-tag :options="business_yes_no" :value="scope.row.isAccounted" />
        </template>
      </el-table-column>
      <el-table-column label="是否审核" align="center" prop="isApproved">
        <template #default="scope">
          <dict-tag :options="business_yes_no" :value="scope.row.isApproved" />
        </template>
      </el-table-column>
      <el-table-column label="是否锁定" align="center" prop="isLocked">
        <template #default="scope">
          <dict-tag :options="business_yes_no" :value="scope.row.isLocked" />
        </template>
      </el-table-column>
      <el-table-column label="是否提交" align="center" prop="isSubmit">
        <template #default="scope">
          <dict-tag :options="business_yes_no" :value="scope.row.isSubmit" />
        </template>
      </el-table-column>
      <el-table-column label="来源系统" align="center" prop="sourceSys">
        <template #default="scope">
          <dict-tag :options="bms_source_sys" :value="scope.row.sourceSys" />
        </template>
      </el-table-column>
      <el-table-column label="备注信息" align="center" prop="remark" />
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改费用清单对话框 -->
    <el-dialog :title="title" v-model="open" width="660px" append-to-body>
      <el-form
        ref="expensesRef"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="费用编码" prop="code">
              <el-input
                v-model="form.code"
                placeholder="请输入费用编码"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单ID" prop="orderId">
              <el-input v-model="form.orderId" placeholder="请输入订单ID" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="费用名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入费用名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发生日期" prop="amountTime">
              <el-date-picker
                clearable
                v-model="form.amountTime"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="请选择发生日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户" prop="customerId">
              <el-select v-model="form.customerId" placeholder="请选择客户">
                <el-option
                  v-for="item in customerOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收付类型" prop="paymentType">
              <el-select
                v-model="form.paymentType"
                placeholder="请选择收付类型"
              >
                <el-option
                  v-for="dict in base_expense_payment_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="parseInt(dict.value)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="付费方式" prop="paymentMethod">
              <el-select
                v-model="form.paymentMethod"
                placeholder="请选择付费方式"
              >
                <el-option
                  v-for="dict in bms_payment_method"
                  :key="dict.value"
                  :label="dict.label"
                  :value="parseInt(dict.value)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="来源系统" prop="sourceSys">
              <el-select v-model="form.sourceSys" placeholder="请选择来源系统">
                <el-option
                  v-for="dict in bms_source_sys"
                  :key="dict.value"
                  :label="dict.label"
                  :value="parseInt(dict.value)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="费用项目" prop="expenseItemId">
              <el-select
                v-model="form.expenseItemId"
                placeholder="请选择费用项目"
              >
                <el-option
                  v-for="item in expenseOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="费用类型" prop="type">
              <el-select v-model="form.type" placeholder="请选择费用类型">
                <el-option
                  v-for="dict in bms_expense_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="parseInt(dict.value)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="费用价格" prop="amountTotal">
              <el-input
                v-model="form.amountTotal"
                placeholder="请输入费用价格"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="币种" prop="currencyId">
              <el-select v-model="form.currencyId" placeholder="请选择币种">
                <el-option
                  v-for="item in currencyOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="12">
          <el-col :span="12">
            <el-form-item label="仓库" prop="warehouseId">
              <el-select v-model="form.warehouseId" placeholder="请选择仓库">
                <el-option
                  v-for="item in warehouseOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注信息" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          />
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
import {
  getExpenses,
  delExpenses,
  addExpenses,
  updateExpenses,
  getCode,
  submitExpense,
  getBillingList,
} from "@/api/bms/expenses";
import { getAllWarehouse } from "@/api/base/warehouse";
import { getAllCustomer } from "@/api/base/customer";
import { getAllCurrency } from "@/api/base/currency";
import { getAllExpense } from "@/api/base/expense";
const { proxy } = getCurrentInstance();
const {
  base_expense_payment_type,
  bms_expense_type,
  bms_expense_status,
  bms_payment_method,
  bms_source_sys,
  business_yes_no,
} = proxy.useDict(
  "base_expense_payment_type",
  "bms_expense_type",
  "bms_expense_status",
  "bms_payment_method",
  "bms_source_sys",
  "business_yes_no"
);

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
  },
  rules: {
    code: [{ required: true, message: "费用编码不能为空", trigger: "blur" }],
    orderId: [{ required: true, message: "订单ID不能为空", trigger: "blur" }],
    warehouseId: [{ required: true, message: "仓库不能为空", trigger: "blur" }],
    amountTime: [
      { required: true, message: "费用发生日期不能为空", trigger: "blur" },
    ],
    customerId: [
      { required: true, message: "客户ID不能为空", trigger: "blur" },
    ],
    paymentType: [
      { required: true, message: "收付类型不能为空", trigger: "change" },
    ],
    paymentMethod: [
      { required: true, message: "付费方式不能为空", trigger: "blur" },
    ],
    sourceSys: [
      { required: true, message: "来源系统不能为空", trigger: "blur" },
    ],
    type: [{ required: true, message: "费用类型不能为空", trigger: "change" }],
    amountTotal: [
      { required: true, message: "费用价格不能为空", trigger: "blur" },
    ],
  },
});

const { queryParams, form, rules } = toRefs(data);

/** 查询费用清单列表 */
function getList() {
  loading.value = true;
  getBillingList(queryParams.value).then((response) => {
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
    updateTime: null,
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
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加费用清单";
  getCode().then((response) => {
    form.value.code = response.msg;
  });
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value;
  getExpenses(_id).then((response) => {
    form.value = response.data;
    open.value = true;
    title.value = "修改费用清单";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["expensesRef"].validate((valid) => {
    if (valid) {
      if (form.value.id != null) {
        updateExpenses(form.value).then((response) => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addExpenses(form.value).then((response) => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

// 提交审核
function handleSubmit() {
  const _ids = ids.value;
  proxy.$modal
    .confirm('是否确认提交审核费用清单编号为"' + _ids + '"的数据项？')
    .then(function () {
      return submitExpense(_ids);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess("提交成功");
    })
    .catch(() => {});
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal
    .confirm('是否确认删除费用清单编号为"' + _ids + '"的数据项？')
    .then(function () {
      return delExpenses(_ids);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
    })
    .catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download(
    "bms/expenses/export",
    {
      ...queryParams.value,
    },
    `expenses_${new Date().getTime()}.xlsx`
  );
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
  getAllWarehouse().then((response) => {
    response.rows.forEach((item) => {
      warehouseOptions.value.push({
        value: item.id,
        label: item.name,
      });
    });
  });
  //获取所有客户
  getAllCustomer().then((response) => {
    response.rows.forEach((item) => {
      customerOptions.value.push({
        value: item.id,
        label: item.name,
      });
    });
  });
  //获取所有币种
  getAllCurrency().then((response) => {
    response.rows.forEach((item) => {
      currencyOptions.value.push({
        value: item.id,
        label: item.name,
      });
    });
  });
  //获取所有费用项
  getAllExpense().then((response) => {
    response.rows.forEach((item) => {
      expenseOptions.value.push({
        value: item.id,
        label: item.name,
      });
    });
  });
});
getList();
</script>
