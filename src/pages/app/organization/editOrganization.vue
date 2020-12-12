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
            <el-option label="开启" :value="1"></el-option>
            <el-option label="关闭" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据范围" prop="checkedDatas">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
          </el-checkbox>
          <el-checkbox-group style="min-width: 560px; max-width: 700px;" v-model="ruleForm.items" @change="handleCheckedDatasChange">
            <el-checkbox class="checkBoxStyle" v-for="item in checkedItems" :label="item.label" :key="item.label">{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <!--城市-->
          <el-checkbox v-model="ruleForm.ifCity" @change="cityChangeEvent" class="checkBoxStyle" label="ifCity">城市</el-checkbox>
          <div>
            <el-input placeholder="请填写城市（多个城市名以,分开）" v-if="ruleForm.ifCity" v-model="ruleForm.cityNames"></el-input>
          </div>
          <!--期望借款金额-->
          <el-checkbox v-model="ruleForm.ifHopeMoney" @change="hopeMoneyChangeEvent" class="checkBoxStyle" label="ifHopeMoney">期望借款金额</el-checkbox>
          <div v-if="ruleForm.ifHopeMoney">
            <el-input placeholder="最小金额" @blur="blurStart" v-model="ruleForm.hopeMoneyBegin" class="input-style"></el-input>
            -
            <el-input placeholder="最大金额" @blur="blurEnd" v-model="ruleForm.hopeMoneyEnd" class="input-style"></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="cancelForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { companyToUpdate, companyUpdate } from '@/services/AppServiceRequest.js';
  import organizationConfig from './organizationConfig';
  export default {
    name: 'editOrganization',
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
    created: function () {
      let id = this.$route.query.id;
      this.fetchData(id);
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
      fetchData: function (id) {
        let data = { id };
        companyToUpdate(data).then(res => {
          if (res.code === 0) {
            this.ruleForm.name = res.data.company.name;
            this.ruleForm.companySubject = res.data.company.companySubject;
            this.ruleForm.companyCode = res.data.company.companyCode;
            this.ruleForm.url = res.data.company.url;
            this.ruleForm.enabled = res.data.company.enabled;
            // this.ruleForm.checkedDatas = this.getCheckedDatasByCompany(res.data.company);
            this.ruleForm.items = this.getCheckedDatasByCompany(res.data.company);
            this.ruleForm.ifCity = (res.data.company.ifCity === 1);
            this.ruleForm.ifHopeMoney = (res.data.company.ifHopeMoney === 1);
            this.ruleForm.cityNames = res.data.company.cityNames || '';
            this.ruleForm.hopeMoneyBegin = res.data.company.hopeMoneyBegin || '';
            this.ruleForm.hopeMoneyEnd = res.data.company.hopeMoneyEnd || '';
          }
        });
      },
      getCheckedDatasByCompany (company) {
        let myArr = [];
        let arr = this.checkedItems.map(item => item.label);
        for (let i in company) {
          if (arr.includes(i) && (company[i] === 1)) {
            myArr.push(i);
          }
        }
        return myArr;
      },
      handleCheckAllChange (val) {
        this.ruleForm.items = val ? this.checkedItems.map(item => item.label) : [];
        this.ruleForm.ifCity = val;
        this.ruleForm.ifHopeMoney = val;
        this.isIndeterminate = false;
      },
      checkAllFun () {
        let checkedCount = this.ruleForm.checkedDatas.length;
        this.checkAll = checkedCount === this.checkedItems.length + 2;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkedItems.length + 2;
      },
      dealData (form) {
        let data = {
          id: this.$route.query.id
        };
        for (let i in form) {
          if ((i === 'checkedDatas') && (form.checkedDatas.length > 0)) {
            for (let j = 0; j < form.checkedDatas.length; j++) {
              data[form.checkedDatas[j]] = 1;
            }
          }
          if (i === 'ifCity' || i === 'ifHopeMoney') {
            data[i] = form[i] ? 1 : 0;
            continue;
          }
          data[i] = form[i];
        }
        return data;
      },
      companyUpdate () {
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
      },
      submitForm: function () {
        if (!this.checkData()) {
          return;
        }
        this.$refs['ruleForm'].validate((valid) => {
          valid && this.companyUpdate();
        });
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
      cancelForm (formName) {
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
