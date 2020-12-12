<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/loan/loanuser' }">借款用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>借款用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search-box">
      <el-form label-position="right" size="mini" label-width="140px" :inline="true" :model="pageObject" :rules="rules"
               ref="loanForm">
        <el-form-item label="API甲方机构名称" class="sel-item" prop="companyCode">
          <el-select v-model="pageObject.companyCode" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.companyCode"
              :label="item.name"
              :value="item.companyCode">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="接收时间" label-width="70px" class="start-time">
          <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" v-model="pageObject.startTime"
                          style="width:100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="-" label-width="20px" class="time-label">
          <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" v-model="pageObject.endTime"
                          style="width:100%;"></el-date-picker>
        </el-form-item>
        <el-form-item class="btn-margin">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="query('loanForm')">查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button icon="el-icon-plus" size="small" type="primary" plain @click="sendTo">发送给甲方</el-button>
    <el-button icon="el-icon-plus" :disabled="ifDisabled" size="small" type="primary" plain @click="sendToAll">全部发送
    </el-button>
    <el-table
      :data="tableData"
      style="width: 100%;overflow: auto;"
      :max-height="tableHeight"
      size="mini"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection">
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
        prop="mobile"
        label="手机号码"
        width="130">
      </el-table-column>
      <el-table-column
        prop="city"
        label="城市">
      </el-table-column>
      <el-table-column
        prop="applyAmount"
        label="期望借款金额(元)"
        width="130">
      </el-table-column>
      <el-table-column
        prop="possessCar"
        label="是否有车">
        <template slot-scope="scope">
          <span v-if="scope.row.possessCar == 1">是</span>
          <span v-else-if="scope.row.possessCar == 0">否</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="possessHouse"
        label="是否有房">
        <template slot-scope="scope">
          <span v-if="scope.row.possessHouse == 1">是</span>
          <span v-else-if="scope.row.possessHouse == 0">否</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="possessLifeInsurance"
        label="是否有人寿保单"
        width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.possessLifeInsurance == 1">是</span>
          <span v-else-if="scope.row.possessLifeInsurance == 0">否</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="possessSoins"
        label="是否有社保"
        width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.possessSoins == 1">是</span>
          <span v-else-if="scope.row.possessSoins == 0">否</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="possessFunds"
        label="是否有公积金"
        width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.possessFunds == 1">是</span>
          <span v-else-if="scope.row.possessFunds == 0">否</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="possessBorrow"
        label="是否有借呗"
        width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.possessBorrow == 1">是</span>
          <span v-else-if="scope.row.possessBorrow == 0">否</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="possessMoteLoan"
        label="是否有微粒贷"
        width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.possessMoteLoan == 1">是</span>
          <span v-else-if="scope.row.possessMoteLoan == 0">否</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sesameCreditLegal"
        label="芝麻信用是否超过600">
        <template slot-scope="scope">
          <span v-if="scope.row.sesameCreditLegal == 1">是</span>
          <span v-else-if="scope.row.sesameCreditLegal == 0">否</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="monthlyIncome"
        label="月收入(元)"
        width="100">
      </el-table-column>
      <el-table-column
        prop="count"
        label="被发送次数"
        width="100">
      </el-table-column>
      <el-table-column
        prop="listSource"
        width="150"
        label="名单来源">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="seatJobNumber"-->
        <!--label="客服座席号"-->
        <!--width="100">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="receiveTime"
        label="接收时间"
        width="220">
      </el-table-column>
    </el-table>
    <el-dialog class="el-dialog-box" title="确认发送" :visible.sync="dialogFormVisible">
      <el-form class="dialog-form" style="padding-left:30px;">
        <el-form-item label="机构名称：">
          {{origanizationName}}
        </el-form-item>
        <el-form-item label="发送数量：">
          {{dataNum}}
        </el-form-item>
        <el-form-item label="数据接收时间范围：">
          {{dataTimeRange}}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-box">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :disabled="btnControl" type="primary" @click="submitSend">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog class="el-dialog-box" title="确认发送" :visible.sync="dialogAllFormVisible">
      <el-form class="dialog-form" style="padding-left:30px;">
        <el-form-item label="机构名称：">
          {{allOriganizationName}}
        </el-form-item>
        <el-form-item label="发送数量：">
          {{allDataNum}}
        </el-form-item>
        <el-form-item label="数据接收时间范围：">
          {{allDataTimeRange}}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-box">
        <el-button @click="dialogAllFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendToAllSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      background
      :current-page.sync="pageObject.pageNum"
      :page-size="pageObject.pageSize"
      @size-change="handleSizeChange"
      :page-sizes="[10, 20, 50]"
      @current-change="handleCurrentChange"
      layout="slot, total, prev, pager, sizes, next, jumper"
      :total="pageTotal">
      <span class="el-pagination__total">当前页{{tableData.length}}条</span>

    </el-pagination>
  </div>
</template>
<script>
  import {companySelect, loanList, sendToAll, send} from '@/services/AppServiceRequest';

  export default {
    data () {
      return {
        btnControl: false,
        options: [
          {companyCode: '', name: '请选择'}
        ],
        tableHeight: window.innerHeight - 330,
        tableData: [],
        ifDisabled: true,
        pageObject: {
          companyCode: '',
          pageSize: 20,
          pageNum: 1,
          startTime: '',
          endTime: ''
        },
        tempPageObject: {},
        pageTotal: 0,
        dialogFormVisible: false,
        dialogAllFormVisible: false,
        origanizationName: '',
        multipleSelection: [],
        dataNum: 0,
        allDataNum: 0,
        allOriganizationName: '',
        dataTimeRange: '',
        allDataTimeRange: '',
        form: {
          ids: '',
          companyCode: ''
        },
        tempIds: [],
        baseData: {},
        rules: {
          companyCode: [{required: true, message: '请选择API甲方机构', trigger: 'blur'}]
        }

      };
    },
    mounted () {
      this.getAPI();
    },
    methods: {
      getAPI () {
        companySelect().then(res => {
          if (!res) return;
          if (res.code === 0) {
            res.data.map(el => {
              this.options.push({companyCode: el.companyCode, name: el.name});
            });
          }
        });
      },
      getLoanList () {
        loanList(this.pageObject).then(res => {
          if (!res) return;
          if (res.code === 0) {
            this.tableData = res.data.list;
            this.pageTotal = res.data.total;
            this.allDataNum = res.data.total;
            this.baseData = Object.assign({}, this.pageObject);
            if (this.baseData.companyCode) {
              this.ifDisabled = false;
            } else {
              this.ifDisabled = true;
            }
          }
        });
      },
      sendTo () {
        if (Object.keys(this.baseData).length !== 0) {
          this.origanizationName = this.options.find(el => el.companyCode === this.baseData.companyCode).name;
          this.form.companyCode = this.baseData.companyCode;
        }
        if (this.pageObject.companyCode && this.pageObject.companyCode !== '') {
          if (this.multipleSelection.length > 0 && this.baseData) {
            this.dataTimeRange = (this.baseData.startTime ? this.baseData.startTime : '') + '—' + (this.baseData.endTime ? this.baseData.endTime : '');
            this.dialogFormVisible = true;
          } else {
            this.$message.error('请选择操作的数据');
          }
        } else {
          this.$message.error('请选择API甲方机构');
        }
      },
      submitSend () {
        this.btnControl = true;
        this.multipleSelection.map(el => {
          if (!this.tempIds.includes(el.id)) {
            this.tempIds.push(el.id);
          }
        });
        this.form.ids = this.tempIds.join(',');
        if (this.origanizationName !== '请选择') {
          send(this.form).then(res => {
            if (!res) return;
            if (res.code === 0) {
              this.$message.success('操作成功');
              this.dialogFormVisible = false;
              this.tempIds.splice(0, this.tempIds.length);
              this.btnControl = false;
              this.getLoanList();
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          this.$message.error('请选择API甲方机构');
        }
      },
      sendToAll () {
        if (this.tableData.length > 0) {
          if (this.baseData) {
            this.allOriganizationName = this.options.find(el => el.companyCode == this.baseData.companyCode).name;
            this.allDataTimeRange = (this.baseData.startTime ? this.baseData.startTime : '') + '——' + (this.baseData.endTime ? this.baseData.endTime : '');
            this.dialogAllFormVisible = true;
          }
        } else {
          this.$message.error('请先进行查询出有效数据');
        }
      },
      sendToAllSubmit () {
        if (this.pageObject.companyCode && this.pageObject.companyCode != '') {
          sendToAll(this.baseData).then(res => {
            if (res.code === 0) {
              this.dialogAllFormVisible = false;
              this.$message.success('全部发送成功');
              this.getLoanList();
            }
          });
        } else {
          this.$message.error('请选择API甲方机构');
        }
      },
      query (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getLoanList();
          } else {
            return false;
          }
        });
      },
      handleSizeChange (val) {
        this.pageObject.pageSize = val;
        this.pageObject.pageNum = 1;
        this.getLoanList();
      },
      handleCurrentChange (val) {
        this.getLoanList();
      },
      handleSelectionChange (val) {
        this.multipleSelection = val;
        this.dataNum = this.multipleSelection.length;
      }

    }
  };
</script>
<style lang="scss">
  .search-box {
    margin: 20px 0;
    width: 100%;
    padding: 20px 5px 5px 5px;
    background-color: #fff;
  }
  .dialog-footer-box{
    text-align: right;
  }
  .el-dialog-box{
    .dialog-form {
      width: 80%;
    }
    .dialog-select,.dialog-input{
      width: 100%;
    }
  }
</style>
