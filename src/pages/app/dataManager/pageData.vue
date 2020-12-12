<template>
  <div class="pageWidth">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dataManager/apiData' }">数据统计管理</el-breadcrumb-item>
      <el-breadcrumb-item>聚合页数据统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="formStyle" ref="form" :model="form" label-position="left" label-width="100px" size="mini"
             :inline="true">
      <el-form-item label="API机构名称">
        <el-select v-model="form.convergeCode" placeholder="请选择">
          <el-option label="请选择" value=""></el-option>
          <el-option v-for="item in convergeList" :key="item.convergeCode" :label="item.convergeName" :value="item.convergeCode"></el-option>
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
    <p>UV总量：{{uvTotal}}</p>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="convergeName"
        label="聚合页机构名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="accessTime"
        label="访问时间">
      </el-table-column>
      <el-table-column
        prop="uvCounts"
        label="UV">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button
            plain
            type="primary"
            size="mini"
            @click="exportData(scope.$index, scope.row)"
          >导出数据详情
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
  import Config from '@/index.config.js';
  import moment from 'moment';
  import { convergeH5List, convergeUvList } from '@/services/AppServiceRequest.js';
  export default {
    name: 'pageData',
    data: function () {
      return {
        form: {
          convergeCode: '',
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
        uvTotal: 0
      };
    },
    created () {
      this.convergeH5List();
      this.convergeUvList();
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
      convergeH5List () {
        convergeH5List().then(res => {
          this.convergeList = res.data;
        });
      },
      convergeUvList () {
        let data = Object.assign({}, this.pageObject, this.form, this.timeData);
        convergeUvList(data).then(res => {
          if (res.code === 0) {
            this.tableData = res.data.list.list.map(item => {
              item.accessTime = moment(item.accessTime).format('YYYY-MM-DD');
              return item;
            });
            this.uvTotal = res.data.count;
            this.pageTotal = res.data.list.total;
          }
        });
      },
      exportData: function (index, row) {
        let a = document.createElement('a');
        a.href = `${Config.proxyUrl}/converge/export?convergeCode=${row.convergeCode}&accessTime=${row.accessTime}&Authorization=${localStorage.getItem('Authorization')}`;
        document.body.appendChild(a);
        a.click();
      },
      handleCurrentChange (val) {
        this.convergeUvList();
      },
      handleSizeChange (val) {
        this.pageObject.pageSize = val;
        this.pageObject.pageNum = 1;
        this.convergeUvList();
      },
      onSubmit: function () {
        this.convergeUvList();
      }
    }
  };
</script>

<style scoped>
  .formStyle {
    margin-top: 12px;
  }
</style>
