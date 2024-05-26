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
      <el-form-item label="客户" prop="customerId">
        <el-select v-model="queryParams.customerId" placeholder="请选择客户">
          <el-option
            v-for="item in customerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="币种" prop="currencyId">
        <el-select v-model="queryParams.currencyId" placeholder="请选择币种">
          <el-option
            v-for="item in currencyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="仓库" prop="warehouseId">
        <el-select v-model="queryParams.warehouseId" placeholder="请选择仓库">
          <el-option
            v-for="item in warehouseOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="来源系统" prop="sourceSys">
        <el-select
          v-model="queryParams.sourceSys"
          placeholder="请选择来源系统"
          clearable
        >
          <el-option
            v-for="dict in bms_source_sys"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="金额" prop="amount">
        <el-input
          v-model="queryParams.amount"
          placeholder="请输入金额"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['bms:bl:add']">新增</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="Download" @click="handleExport"
          >导出</el-button
        >
      </el-col>

      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="blList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="账单编号" align="center" prop="blCode" />
      <el-table-column label="收付类型" align="center" prop="paymentType">
        <template #default="scope">
          <dict-tag
            :options="base_expense_payment_type"
            :value="scope.row.paymentType"
          />
        </template>
      </el-table-column>
      <el-table-column label="是否发送OA" align="center" prop="isOa">
        <template #default="scope">
          <dict-tag :options="business_yes_no" :value="scope.row.isOa" />
        </template>
      </el-table-column>
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
      <el-table-column label="币种" align="center" prop="currencyId">
        <template #default="scope">
          <dict-tag :options="currencyOptions" :value="scope.row.currencyId" />
        </template>
      </el-table-column>
      <el-table-column label="仓库" align="center" prop="warehouseId">
        <template #default="scope">
          <dict-tag
            :options="warehouseOptions"
            :value="scope.row.warehouseId"
          />
        </template>
      </el-table-column>

      <el-table-column label="来源系统" align="center" prop="sourceSys">
        <template #default="scope">
          <dict-tag :options="bms_source_sys" :value="scope.row.sourceSys" />
        </template>
      </el-table-column>
      <el-table-column label="总金额" align="center" prop="amount" />
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改账单管理对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="blRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="收付类型" prop="paymentType">
          <el-select v-model="form.paymentType" placeholder="请选择收付类型">
            <el-option
              v-for="dict in base_expense_payment_type"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户ID" prop="customerId">
          <el-input v-model="form.customerId" placeholder="请输入客户ID" />
        </el-form-item>
        <el-form-item label="币种ID" prop="currencyId">
          <el-input v-model="form.currencyId" placeholder="请输入币种ID" />
        </el-form-item>
        <el-form-item label="仓库ID" prop="warehouseId">
          <el-input v-model="form.warehouseId" placeholder="请输入仓库ID" />
        </el-form-item>
        <el-form-item label="部门ID" prop="deptId">
          <el-input v-model="form.deptId" placeholder="请输入部门ID" />
        </el-form-item>
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
        <el-form-item label="金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入金额" />
        </el-form-item>
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

<script setup name="fbl">
import { listBl, getBl, delBl, addBl, updateBl } from "@/api/bms/bl";
import { getAllWarehouse } from "@/api/base/warehouse";
import { getAllCustomer } from "@/api/base/customer";
import { getAllCurrency } from "@/api/base/currency";
import { getAllExpense } from "@/api/base/expense";
const { proxy } = getCurrentInstance();
const { bms_source_sys, base_expense_payment_type, business_yes_no } =
  proxy.useDict(
    "bms_source_sys",
    "base_expense_payment_type",
    "business_yes_no"
  );

const blList = ref([]);
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
    paymentType: null,
    customerId: null,
    currencyId: null,
    warehouseId: null,
    deptId: null,
    sourceSys: null,
    amount: null,
  },
  rules: {},
});

const { queryParams, form, rules } = toRefs(data);

/** 查询账单管理列表 */
function getList() {
  loading.value = true;
  listBl(queryParams.value).then((response) => {
    blList.value = response.rows;
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
    paymentType: null,
    customerId: null,
    currencyId: null,
    warehouseId: null,
    deptId: null,
    sourceSys: null,
    amount: null,
    remark: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
  };
  proxy.resetForm("blRef");
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
  title.value = "添加账单管理";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value;
  getBl(_id).then((response) => {
    form.value = response.data;
    open.value = true;
    title.value = "修改账单管理";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["blRef"].validate((valid) => {
    if (valid) {
      if (form.value.id != null) {
        updateBl(form.value).then((response) => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addBl(form.value).then((response) => {
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
  proxy.$modal
    .confirm('是否确认删除账单管理编号为"' + _ids + '"的数据项？')
    .then(function () {
      return delBl(_ids);
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
    "bms/bl/export",
    {
      ...queryParams.value,
    },
    `bl_${new Date().getTime()}.xlsx`
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
