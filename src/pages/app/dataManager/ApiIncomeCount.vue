<template>
  <div class="pageWidth">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dataManager/apiincomecount' }">数据统计管理</el-breadcrumb-item>
      <el-breadcrumb-item>API营收统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="formStyle" ref="form" :model="form" label-position="left" label-width="100px" size="mini"
             :inline="true">
      <el-form-item label="API机构名称">
        <el-select v-model="form.companyCode" placeholder="请选择">
          <el-option label="请选择" value=""></el-option>
          <el-option v-for="item in convergeList" :key="item.companyCode" :label="item.name" :value="item.companyCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="访问时间">
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
    <p>总量：{{sumCount}}</p>
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
        prop="companyName"
        label="API甲方机构名称"
        width="180">
      </el-table-column>

      <el-table-column
        prop="receivedCount"
        label="发送成功数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="enteredCount"
        label="入网成功数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button
            plain
            type="primary"
            size="mini"
            @click="checkSource(scope.$index, scope.row)"
          >查看名单来源
          </el-button>
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
  import moment from 'moment';
  import { apiRevenue } from '@/services/DataManagerServiceRequest';
  import { convergeH5List, companySelectCompany } from '@/services/AppServiceRequest.js';
  export default {
      name: 'ApiIncomeCount',
      data: function () {
        return {
          form: {
            companyCode: '',
            startTime: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
            endTime: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
          },
          convergeList: [],
          tableData: [],
          pageObject: {
            pageSize: 10,
            pageNum: 1
          },
          pageTotal: 0,
          sumCount: 0
        };
      },
      created () {
        this.companySelectCompany();
        this.apiRevenue();
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
        companySelectCompany () {
          companySelectCompany().then(res => {
            this.convergeList = res.data;
          });
        },
        apiRevenue () {
          let data = Object.assign({}, this.pageObject, this.form, this.timeData);
          apiRevenue(data).then(res => {
            if (res.code === 0) {
              this.tableData = res.data.list.list;
              this.pageTotal = res.data.list.total;
              this.sumCount = res.data.sumCount;
            };
          });
        },
        checkSource: function (index, row) {
          this.$router.push({
            path: '/dataManager/apiincomecount/checklistsourceapi',
            query: {
              time: row.time,
              companyCode: row.companyCode
            }
          });
        },
        handleCurrentChange (val) {
          this.apiRevenue();
        },
        handleSizeChange (val) {
          this.pageObject.pageSize = val;
          this.pageObject.pageNum = 1;
          this.apiRevenue();
        },
        onSubmit: function () {
          this.apiRevenue();
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
