<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="项目编码" prop="code">
        <el-input v-model="queryParams.code" placeholder="请输入费用项目编码" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="queryParams.name" placeholder="请输入费用项目名称" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="收付类型" prop="paymentType">
        <el-select v-model="queryParams.paymentType" placeholder="请选择收付类型" clearable>
          <el-option v-for="dict in base_expense_payment_type" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="税率" prop="taxRate">
        <el-input v-model="queryParams.taxRate" placeholder="请输入税率" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd" >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate"
          >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete"
          >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="Download" @click="handleExport"
          >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="expenseList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="费用项目编码" align="center" prop="code" />
      <el-table-column label="费用项目名称" align="center" prop="name" />
      <el-table-column label="收付类型" align="center" prop="paymentType">
        <template #default="scope">
          <dict-tag :options="base_expense_payment_type" :value="scope.row.paymentType" />
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center" prop="description" />
      <el-table-column label="税率" align="center" prop="taxRate" />
      <el-table-column label="创建者" align="center" prop="createBy" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">

        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新者" align="center" prop="updateBy" />
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">

        <template #default="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">

        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
            >修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
            >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize" @pagination="getList" />

    <!-- 添加或修改费用项目对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="expenseRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="项目编码" prop="code">
          <el-input v-model="form.code" placeholder="请输入费用项目编码" disabled />
        </el-form-item>
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入费用项目名称" />
        </el-form-item>
        <el-form-item label="收付类型" prop="paymentType">
          <el-select v-model="form.paymentType" placeholder="请选择收付类型">
            <el-option v-for="dict in base_expense_payment_type" :key="dict.value" :label="dict.label"
              :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="税率" prop="taxRate">
          <el-input-number v-model="form.taxRate" :precision="4" :step="0.01" :max="1" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入内容" />
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

<script setup name="Expense">
import { listExpense, getExpense, delExpense, addExpense, updateExpense, getCode } from "@/api/base/expense";

const { proxy } = getCurrentInstance();
const { base_expense_payment_type } = proxy.useDict('base_expense_payment_type');

const expenseList = ref([]);
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
    name: null,
    paymentType: null,
    description: null,
    taxRate: null,
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询费用项目列表 */
function getList() {
  loading.value = true;
  listExpense(queryParams.value).then(response => {
    expenseList.value = response.rows;
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
    name: null,
    paymentType: null,
    description: null,
    taxRate: 0,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null
  };
  proxy.resetForm("expenseRef");
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
  title.value = "添加费用项目";
  getCode().then(response => {
    form.value.code = response.msg;
  });
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getExpense(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改费用项目";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["expenseRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateExpense(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addExpense(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除费用项目编号为"' + _ids + '"的数据项？').then(function () {
    return delExpense(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => { });
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('base/expense/export', {
    ...queryParams.value
  }, `expense_${new Date().getTime()}.xlsx`)
}

getList();
</script>
