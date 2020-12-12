<template>
  <div class="pageWidth">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dataManager/apiData' }">数据统计管理</el-breadcrumb-item>
      <el-breadcrumb-item>API营收统计</el-breadcrumb-item>
      <el-breadcrumb-item>查看名单来源</el-breadcrumb-item>
    </el-breadcrumb>
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
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="companyName"
        label="API甲方机构名称">
      </el-table-column>
      <el-table-column
        prop="listSource"
        label="名单来源名称">
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
  import { apiRevenueDetail } from '@/services/DataManagerServiceRequest';
  export default {
      name: 'CheckListSource',
      data: function () {
        return {
          tableData: [],
          pageObject: {
            pageSize: 10,
            pageNum: 1
          },
          pageTotal: 0
        };
      },
      created () {
        this.apiRevenueDetail();
      },
      methods: {
        apiRevenueDetail () {
          let data = Object.assign({
            time: this.$route.query.time,
            companyCode: this.$route.query.companyCode
          });
          apiRevenueDetail(data).then(res => {
            if (res.code === 0) {
              this.tableData = res.data;
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
        }
      }
    };
</script>

<style scoped>

</style>
