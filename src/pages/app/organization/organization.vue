<template>
  <div class="main-content pageWidth">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/organization/organization' }">甲方机构管理</el-breadcrumb-item>
        <el-breadcrumb-item>API机构管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="formStyle" ref="form" :model="form" label-position="left" size="mini" :inline="true">
      <el-form-item label="API机构名称">
        <el-input
          v-model="form.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="center" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button icon="el-icon-plus" class="el-button-top" size="small" type="primary" plain @click="add">添加机构</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="API机构中文名称">
      </el-table-column>
      <el-table-column
        prop="companyCode"
        label="API机构英文名称">
      </el-table-column>
      <el-table-column
        prop="url"
        label="机构地址">
      </el-table-column>
      <el-table-column
        prop="enabled"
        label="机构状态">
      </el-table-column>
      <el-table-column
        prop="createTime"
        width="160"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="150">
        <template slot-scope="scope">
          <el-button
            plain
            type="primary"
            size="mini"
            @click="edit(scope.$index, scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page.sync="pageObject.pageNum"
      :page-size="pageObject.pageSize"
      @size-change="handleSizeChange"
      :page-sizes="[10, 20, 50]"
      @current-change="handleCurrentChange"
      layout="slot, total, prev, pager, next, jumper"
      :total="pageTotal">
      <span class="el-pagination__total">当前页{{tableData.length}}条</span>
    </el-pagination>
  </div>
</template>

<script>
import { companySelectCompany, companyList } from '@/services/AppServiceRequest.js';
import moment from 'moment';

export default {
  data () {
    return {
      companySelectCompanyList: [],
      form: {
        name: '',
        startTime: '',
        endTime: ''
      },
      tableData: [],
      pageObject: {
        pageSize: 5,
        pageNum: 1
      },
      pageTotal: 0
    };
  },
  created () {
    // this.getSelectCompany();
    this.getCompanyList();
  },
  computed: {
    timeData: function () {
      let timeData = {};
      if (this.form.startTime) timeData.startTime = moment(this.form.startTime).format('YYYY-MM-DD');
      if (this.form.endTime) timeData.endTime = moment(this.form.endTime).format('YYYY-MM-DD');
      return timeData;
    }
  },
  methods: {
    getSelectCompany () {
      companySelectCompany().then(res => {
        if (res && (res.code === 0)) {
          this.companySelectCompanyList = res.data;
        }
      });
    },
    getCompanyList () {
      let mydata = Object.assign({}, this.pageObject, this.form, this.timeData);
      companyList(mydata).then(res => {
        if (res && (res.code === 0)) {
          this.tableData = res.data.list.map(item => {
            item.enabled = item.enabled ? '开启' : '关闭';
            return item;
          });
          this.pageTotal = res.data.total;
          this.pageObject.pageSize = res.data.pageSize;
          this.pageObject.pageNum = res.data.pageNum;
        }
      });
    },
    handleCurrentChange (val) {
      this.getCompanyList();
    },
    handleSizeChange (val) {
      this.pageObject.pageSize = val;
      this.pageObject.pageNum = 1;
      this.getCompanyList();
    },

    add () {
      this.$router.push('/organization/addorganization');
    },
    edit (index, row) {
      let id = row.id;
      this.$router.push({
        path: '/organization/editorganization',
        query: {
          id
        }
      });
    },
    onSubmit () {
      this.getCompanyList();
    }
  }
};
</script>

<style>
  .formStyle {
    margin-top: 20px;
  }
</style>
