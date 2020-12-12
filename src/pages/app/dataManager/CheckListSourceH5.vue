<template>
  <div class="pageWidth">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dataManager/apiData' }">数据统计管理</el-breadcrumb-item>
      <el-breadcrumb-item >H5营收统计</el-breadcrumb-item>
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
        prop="accessTime"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="convergeName"
        label="H5甲方机构名称">
      </el-table-column>
      <el-table-column
        prop="listSource"
        label="名单来源名称">
      </el-table-column>
      <el-table-column
        prop="uvCounts"
        label="UV"
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
  import { convergeUvListDetail } from '@/services/AppServiceRequest';
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
        this.convergeUvListDetail();
      },
      methods: {
        convergeUvListDetail () {
          let data = Object.assign({
            accessTime: this.$route.query.accessTime,
            convergeCode: this.$route.query.convergeCode
          });
          convergeUvListDetail(data).then(res => {
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
