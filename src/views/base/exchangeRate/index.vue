<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="原币种" prop="sourceCurrency">
        <el-input
          v-model="queryParams.sourceCurrency"
          placeholder="请输入原币种"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="目标币种" prop="targetCurrency">
        <el-input
          v-model="queryParams.targetCurrency"
          placeholder="请输入目标币种"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="汇率" prop="rate">
        <el-input
          v-model="queryParams.rate"
          placeholder="请输入汇率"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="基数" prop="base">
        <el-input
          v-model="queryParams.base"
          placeholder="请输入基数"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="exchangeRateList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="原币种" align="center" prop="sourceCurrency" />
      <el-table-column label="目标币种" align="center" prop="targetCurrency" />
      <el-table-column label="汇率" align="center" prop="rate" />
      <el-table-column label="基数" align="center" prop="base" />
      <el-table-column label="备注" align="center" prop="remark" />
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
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" >修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改汇率对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="exchangeRateRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="原币种" prop="sourceCurrency">
          <el-input v-model="form.sourceCurrency" placeholder="请输入原币种" />
        </el-form-item>
        <el-form-item label="目标币种" prop="targetCurrency">
          <el-input v-model="form.targetCurrency" placeholder="请输入目标币种" />
        </el-form-item>
        <el-form-item label="汇率" prop="rate">
          <el-input v-model="form.rate" placeholder="请输入汇率" />
        </el-form-item>
        <el-form-item label="基数" prop="base">
          <el-input v-model="form.base" placeholder="请输入基数" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
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

<script setup name="ExchangeRate">
import { listExchangeRate, getExchangeRate, delExchangeRate, addExchangeRate, updateExchangeRate } from "@/api/base/exchangeRate";

const { proxy } = getCurrentInstance();

const exchangeRateList = ref([]);
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
    sourceCurrency: null,
    targetCurrency: null,
    rate: null,
    base: null,
  },
  rules: {
    sourceCurrency: [
      { required: true, message: "原币种不能为空", trigger: "blur" }
    ],
    targetCurrency: [
      { required: true, message: "目标币种不能为空", trigger: "blur" }
    ],
    rate: [
      { required: true, message: "汇率不能为空", trigger: "blur" }
    ],
    base: [
      { required: true, message: "基数不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询汇率列表 */
function getList() {
  loading.value = true;
  listExchangeRate(queryParams.value).then(response => {
    exchangeRateList.value = response.rows;
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
    sourceCurrency: null,
    targetCurrency: null,
    rate: null,
    base: null,
    remark: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null
  };
  proxy.resetForm("exchangeRateRef");
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
  title.value = "添加汇率";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getExchangeRate(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改汇率";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["exchangeRateRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateExchangeRate(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addExchangeRate(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除汇率编号为"' + _ids + '"的数据项？').then(function() {
    return delExchangeRate(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('base/exchangeRate/export', {
    ...queryParams.value
  }, `exchangeRate_${new Date().getTime()}.xlsx`)
}

getList();
</script>
