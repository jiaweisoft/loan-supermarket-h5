<template>
  <div class="pageWidth">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dataManager/newusercount' }">数据统计管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增用户数据统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="formStyle" ref="form" :model="form" label-position="left" label-width="100px" size="mini"
             :inline="true">
      <el-form-item label="名单来源名称">
        <el-select v-model="form.listSource" placeholder="请选择">
          <el-option label="请选择" value=""></el-option>
          <el-option v-for="item in namesList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="center" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime"
                          style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <p>总量：{{uvTotal}}</p>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="time"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="listSource"
        label="名单来源名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="newUserCount"
        label="新增H5来源用户数量">
      </el-table-column>
      <el-table-column
        prop="msgCount"
        label="新增短信激活用户数量">
      </el-table-column>
      <el-table-column
        prop="totalCount"
        label="数据总量">
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
  import moment from 'moment';
  import { listSource, newUser } from '@/services/DataManagerServiceRequest.js';
  export default {
    name: 'NewUserCount',
    data: function () {
      return {
        form: {
          listSource: '',
          startTime: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
          endTime: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
        },
        namesList: [],
        tableData: [],
        pageObject: {
          pageSize: 10,
          pageNum: 1
        },
        pageTotal: 0,
        uvTotal: 0
      };
    },
    created () {
      this.listSource();
      this.newUser();
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
      listSource () {
        listSource().then(res => {
          this.namesList = res.data;
        });
      },
      newUser () {
        let data = Object.assign({}, this.pageObject, this.form, this.timeData);
        newUser(data).then(res => {
          if (res.code === 0) {
            this.tableData = res.data.list.list.map(item => {
              item.msgCount = item.totalCount - item.newUserCount;
              return item;
            });
            this.pageTotal = res.data.list.total;
            this.uvTotal = res.data.sumCount;
            // this.pageTotal = res.data.list.total;
          }
        });
      },
      handleCurrentChange (val) {
        this.newUser();
      },
      handleSizeChange (val) {
        this.pageObject.pageSize = val;
        this.pageObject.pageNum = 1;
        this.newUser();
      },
      onSubmit: function () {
        this.newUser();
      }
    }
  };
</script>

<style scoped>
  .formStyle {
    margin: 20px 0;
    background-color: #ffffff;
    padding: 20px;
  }
</style>
