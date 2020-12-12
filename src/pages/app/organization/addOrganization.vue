<template>
  <div class="main-content pageWidth">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/organization/organization' }">甲方机构管理</el-breadcrumb-item>
      <el-breadcrumb-item>API机构管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="formContainer">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="ruleForm">
        <el-form-item label="机构中文名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="机构英文名称" prop="companyCode">
          <el-input v-model="ruleForm.companyCode"></el-input>
        </el-form-item>
        <el-form-item label="机构主体名称" prop="companySubject">
          <el-input v-model="ruleForm.companySubject"></el-input>
        </el-form-item>
        <el-form-item label="机构地址" prop="url">
          <el-input v-model="ruleForm.url"></el-input>
        </el-form-item>
        <el-form-item label="机构状态" prop="enabled">
          <el-select v-model="ruleForm.enabled" placeholder="请选择机构状态">
            <el-option label="开启" value="1"></el-option>
            <el-option label="关闭" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据范围" prop="checkedDatas">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
          </el-checkbox>
          <el-checkbox-group class="checkBoxGroup" v-model="ruleForm.items" @change="handleCheckedDatasChange">
            <el-checkbox :key="item.label" v-for="item in checkedItems" class="checkBoxStyle" :label="item.label">{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <!--城市-->
          <el-checkbox v-model="ruleForm.ifCity" @change="cityChangeEvent" class="checkBoxStyle" label="ifCity">城市</el-checkbox>
          <div>
            <el-input v-if="ruleForm.ifCity" v-model="ruleForm.cityNames"></el-input>
          </div>
          <!--期望借款金额-->
          <el-checkbox v-model="ruleForm.ifHopeMoney" @change="hopeMoneyChangeEvent" class="checkBoxStyle" label="ifHopeMoney">期望借款金额</el-checkbox>
          <div v-if="ruleForm.ifHopeMoney">
            <el-input @blur="blurStart" v-model="ruleForm.hopeMoneyBegin" class="input-style"></el-input>
            -
            <el-input @blur="blurEnd" v-model="ruleForm.hopeMoneyEnd" class="input-style"></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import organizationConfig from './organizationConfig';
  import { companyUpdate } from '@/services/AppServiceRequest.js';
  export default {
    name: 'addOrganization',
    data: function () {
      return {
        ruleForm: {
          name: '',
          companyCode: '',
          companySubject: '',
          url: '',
          enabled: '',
          items: [],
          cityNames: '',
          hopeMoneyBegin: '',
          hopeMoneyEnd: '',
          ifCity: false,
          ifHopeMoney: false,
          checkedDatas: []
        },
        rules: organizationConfig.rules,
        checkAll: false,
        isIndeterminate: false,
        checkedItems: organizationConfig.checkedItems
      };
    },
    watch: {
      'ruleForm.items': function () {
        this.getCheckedDatas();
      },
      'ruleForm.ifCity': function () {
        this.getCheckedDatas();
      },
      'ruleForm.ifHopeMoney': function () {
        this.getCheckedDatas();
      }
    },
    methods: {
      // 根据items、ifCity、ifHopeMoney获取checkedDatas。
      getCheckedDatas () {
        let arr = [...this.ruleForm.items];
        if (this.ruleForm.ifCity) {
          arr.push('ifCity');
        }
        if (this.ruleForm.ifHopeMoney) {
          arr.push('ifHopeMoney');
        }
        this.ruleForm.checkedDatas = arr;
        this.checkAllFun();
      },
      cityChangeEvent (val) {
        if (!val) {
          this.ruleForm.cityNames = '';
        }
      },
      hopeMoneyChangeEvent (val) {
        if (!val) {
          this.ruleForm.hopeMoneyBegin = '';
          this.ruleForm.hopeMoneyEnd = '';
        }
      },
      handleCheckAllChange (val) {
        this.ruleForm.items = val ? this.checkedItems.map(item => item.label) : [];
        this.ruleForm.ifCity = val;
        this.ruleForm.ifHopeMoney = val;
        this.isIndeterminate = false;
      },
      // 全选功能变化监听
      checkAllFun () {
        let checkedCount = this.ruleForm.checkedDatas.length;
        this.checkAll = checkedCount === this.checkedItems.length + 2;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkedItems.length + 2;
      },
      dealData (form) {
        let data = {};
        for (let i in form) {
          // 对form中的ifCity和ifHopeMoney不作处理，checkedDatas中，自动会处理。
          if (i === 'ifCity' || i === 'ifHopeMoney') {
            continue;
          }
          if ((i === 'checkedDatas') && (form.checkedDatas.length > 0)) {
            for (let j = 0; j < form.checkedDatas.length; j++) {
              data[form.checkedDatas[j]] = 1;
            }
          }
          data[i] = form[i];
        }
        return data;
      },
      checkData () {
        let tag = true;
        let begin = Number(this.ruleForm.hopeMoneyBegin);
        let end = Number(this.ruleForm.hopeMoneyEnd);
        if (!this.isNumber(begin) || !this.isNumber(end)) {
          this.$message.error('请输入数字');
          tag = false;
        } else {
          if (begin > end) {
            this.$message.error('请正确填写金额数');
            tag = false;
          }
        }
        return tag;
      },
      submitForm: function () {
        if (!this.checkData()) {
          return;
        }
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let data = this.dealData(this.ruleForm);
            companyUpdate(data).then(res => {
              if (res.code === 0) {
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                this.$router.push('/organization/organization');
              }
            });
          }
        });
      },
      resetForm (formName) {
        // this.$refs.ruleForm.resetFields();
        this.$router.back();
      },
      blurStart (e) {
        let val = e.target.value;
        if (!val) {
          return;
        }
        if (!this.isNumber(val)) {
          this.$message.error('请输入数字');
        } else if (this.ruleForm.hopeMoneyEnd) {
          let begin = Number(this.ruleForm.hopeMoneyBegin);
          let end = Number(this.ruleForm.hopeMoneyEnd);
          if (begin > end) {
            this.$message.error('请正确填写金额数');
          }
        }
      },
      blurEnd (e) {
        let val = e.target.value;
        if (!val) {
          return;
        }
        if (!this.isNumber(val)) {
          this.$message.error('请输入数字');
        } else if (this.ruleForm.hopeMoneyBegin) {
          let begin = Number(this.ruleForm.hopeMoneyBegin);
          let end = Number(this.ruleForm.hopeMoneyEnd);
          if (begin > end) {
            this.$message.error('请正确填写金额数');
          }
        }
      },
      isNumber: function (val) {
        var regPos = /^\d+(\.\d+)?$/; // 非负浮点数
        if (regPos.test(val)) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
</script>

<style scoped>
  .formContainer {
    margin: 0 auto;
    padding: 30px;
  }

  .ruleForm {
    width: 80%;
  }
  .checkBoxGroup {
    min-width: 560px;
    max-width: 600px;
  }

  .checkBoxStyle {
    width: 140px;
  }

  .checkBoxStyle:nth-child(4n+1) {
    margin-left: 0;
  }
  .input-style {
    width: 100px;
  }
</style>
