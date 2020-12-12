<template>
  <div class="pageWidth">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dataManager/apiData' }">数据统计管理</el-breadcrumb-item>
      <el-breadcrumb-item>API数据统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="formStyle" ref="form" :model="form" label-position="left" label-width="100px" size="mini"
             :inline="true">
      <el-form-item label-width="40px" label="搜索">
        <el-select class="width100" v-model="searchKey" placeholder="搜索">
          <el-option label="姓名" value="name"></el-option>
          <el-option label="手机号码" value="mobile"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchValue" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label-width="120px" label="API甲方机构名称">
        <el-select class="width100" v-model="form.companyCode" placeholder="请选择">
          <el-option label="请选择" value=""></el-option>
          <el-option :key="item.companyCode" v-for="item in companyList" :label="item.name" :value="item.companyCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="70px" label="发送状态">
        <el-select class="width100" v-model="form.ifReceived" placeholder="请选择">
          <el-option label="请选择" value=""></el-option>
          <el-option label="发送成功" :value="1"></el-option>
          <el-option label="发送失败" :value="0"></el-option>
          <el-option label="发送中" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否入网成功">
        <el-select class="width100" v-model="form.ifEntered" placeholder="搜索">
          <el-option label="请选择" value=""></el-option>
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="70px" label="发送时间">
        <el-row class="width300">
          <el-col :span="11">
            <el-date-picker class="pickerStyle" type="date" placeholder="选择日期" v-model="form.startTime"
                            style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line center" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker class="pickerStyle" type="date" placeholder="选择日期" v-model="form.endTime"
                            style="width: 100%;"></el-date-picker>
          </el-col>
        </el-row>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="onSelectEvent">查询</el-button>
      </el-form-item>
    </el-form>

    <!--按钮操作：重新发送，查看手机号码！-->
    <div>
      <el-button :disabled="!idList.length" icon="el-icon-plus" class="el-button-top" size="small" type="primary" plain @click="rePost">
        重新发送
      </el-button>
      <el-button icon="el-icon-plus" class="el-button-top" size="small" type="primary" plain @click="allPost">
        全部发送
      </el-button>
      <el-button
        v-if="ifLookMobile"
        :disabled="!idList.length"
        icon="el-icon-plus"
        class="el-button-top"
        size="small"
        type="primary"
        plain
        @click="checkPhone"
      >
        查看手机号码
      </el-button>
    </div>
    <!--table表格-->
    <el-table
      :data="tableData"
      :style="{width: '100%', maxHeight: tableHeight + 'px', overflow: 'auto'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="companyName"
        label="机构名称">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        width="120"
        prop="mobile"
        label="手机号码">
      </el-table-column>
      <el-table-column
        prop="city"
        label="城市">
      </el-table-column>
      <el-table-column
        prop="listSource"
        label="名单来源">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="seatJobNumber"-->
        <!--label="座席号">-->
      <!--</el-table-column>-->
      <el-table-column
        width="160"
        prop="receiveTime"
        label="接收时间">
      </el-table-column>
      <el-table-column
        width="160"
        prop="sendTime"
        label="发送时间">
      </el-table-column>
      <el-table-column
        prop="ifReceived"
        label="发送状态">
      </el-table-column>
      <el-table-column
        prop="ifEntered"
        label="是否入网成功">
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
  import {
    loanUserList,
    companySelectCompany
  } from '@/services/ApiServiceRequest';
  import moment from 'moment';

  export default {
    data () {
      return {
        searchKey: '',
        searchValue: '',
        form: {
          companyCode: '',
          startTime: '',
          endTime: '',
          ifReceived: 0,
          ifEntered: ''
        },
        tableData: [],
        companyList: [],
        pageObject: {
          pageSize: 10,
          pageNum: 1
        },
        pageTotal: 0,
        idList: [],
        ids: '',
        loanUserIds: '',
        ifLookMobile: localStorage.getItem('ifLookMobile') === '1',
        tableHeight: 0
      };
    },
    created () {
      this.companySelectCompany();
      this.loanUserList();
      this.$root.Bus.$on('refreshPage', this.loanUserList);

      const clientHeight = document.documentElement.clientHeight;
      const tableHeight = clientHeight - 320;
      this.tableHeight = tableHeight;
    },
    beforeDestroy () {
      this.$root.Bus.$off('refreshPage');
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
      handleSelectionChange (val) {
        let idList = val.map(item => item.id);
        let loanUserIdList = val.map(item => item.loanUserId);
        let ids = idList.join(',');
        let loanUserIds = loanUserIdList.join(',');
        this.idList = idList;
        this.ids = ids;
        this.loanUserIds = loanUserIds;
      },
      loanUserList () {
        let data = Object.assign({}, this.pageObject, this.form, this.timeData);
        if (this.searchKey && this.searchValue) {
          data[this.searchKey] = this.searchValue;
        }
        loanUserList(data).then(res => {
          if (res.code === 0) {
            this.tableData = res.data.list.map(item => {
              // item.ifReceived = item.ifReceived ? '是' : '失败';
              if (item.ifReceived === 2) {
                item.ifReceived = '发送中';
              } else if (item.ifReceived === 1) {
                item.ifReceived = '发送成功';
              } else {
                item.ifReceived = '发送失败';
              };
              item.ifEntered = item.ifEntered ? '是' : '否';
              return item;
            });
            // this.pageObject.pageNum = res.data.pageNum;
            // this.pageObject.pageSize = res.data.pageSize;
            this.pageTotal = res.data.total;
          }
        });
      },
      companySelectCompany () {
        companySelectCompany().then(res => {
          this.companyList = res.data;
        });
      },
      onSelectEvent () {
        this.loanUserList();
      },
      handleCurrentChange (val) {
        this.loanUserList();
      },
      handleSizeChange (val) {
        this.pageObject.pageSize = val;
        this.pageObject.pageNum = 1;
        this.loanUserList();
      },
      rePost: function () {
        this.$root.Bus.$emit('dialogOpenListener', {
          currentView: 'rePost',
          dialogFormVisible: true,
          title: '重新发送',
          isClose: true,
          data: {
            idList: this.idList,
            ids: this.ids
          }
        });
      },
      allPost: function () {
        let data = {
          ifReceived: 0,
          total: this.pageTotal
        };
        if (this.searchKey && this.searchValue) {
          data[this.searchKey] = this.searchValue;
        }
        this.$root.Bus.$emit('dialogOpenListener', {
          currentView: 'allPost',
          dialogFormVisible: true,
          title: '全部发送',
          isClose: true,
          data: data
        });
      },
      checkPhone: function () {
        this.$root.Bus.$emit('dialogOpenListener', {
          currentView: 'CheckPhoneNumbers',
          dialogFormVisible: true,
          title: '查看手机号码',
          isClose: true,
          data: {
            idList: this.idList,
            ids: this.loanUserIds
          }
        });
      }
    }
  };
</script>

<style>
  .formStyle {
    margin: 20px 0;
    background-color: #ffffff;
    padding: 20px;
  }

  .width100 {
    width: 100px;
  }

  .width300 {
    width: 300px;
  }
</style>
