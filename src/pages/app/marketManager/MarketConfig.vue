<template>
  <div class="main-content pageWidth">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/marketManager/marketconfig' }">营销页管理</el-breadcrumb-item>
      <el-breadcrumb-item>营销页管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="formContainer">
      <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="ruleForm">
        <el-form-item label="选择展示选项" prop="checkedDatas">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
          </el-checkbox>
          <el-checkbox-group class="checkBoxGroupStyle" v-model="ruleForm.checkedDatas" @change="handleCheckedDatasChange">
            <el-checkbox class="checkBoxStyle" v-for="item in checkedItems" :label="item.label" :key="item.label">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <!--<el-button @click="resetForm('ruleForm')">取消</el-button>-->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import organizationConfig from './marketManagerData.js';
  import { MarketingPageUpdate, MarketingPageGetContent } from '@/services/AppServiceRequest.js';
  export default {
    name: 'MarketConfig',
    data: function () {
      return {
        ruleForm: {
          checkedDatas: []
        },
        pageContent: {
          id: '',
          key: '',
          value: []
        },
        checkAll: false,
        isIndeterminate: false,
        checkedItems: organizationConfig.checkedItems
      };
    },
    mounted () {
      this.MarketingPageGetContent();
    },
    methods: {
      handleCheckAllChange (val) {
        this.ruleForm.checkedDatas = val ? this.checkedItems.map(item => item.label) : [];
        this.isIndeterminate = false;
      },
      handleCheckedDatasChange (value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.checkedItems.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkedItems.length;
      },
      MarketingPageUpdate () {
        let data = {
          content: JSON.stringify({marketingPageContent: [...this.ruleForm.checkedDatas]})
        };
        // 如果有id，就是代表这个接口为编辑。
        if (this.pageContent.id) {
          data = {
            content: JSON.stringify({marketingPageContent: [...this.ruleForm.checkedDatas], id: this.pageContent.id})
          };
        }
        MarketingPageUpdate(data).then(res => {
          (res.code === 0) && this.$message.success('提交成功');
        });
      },
      MarketingPageGetContent () {
        MarketingPageGetContent().then(res => {
          if (res.code === 0) {
            this.pageContent = { ...this.pageContent, ...res.data };
            this.ruleForm.checkedDatas = JSON.parse(res.data.value);
            this.checkAll = this.ruleForm.checkedDatas.length === this.checkedItems.length;
            this.isIndeterminate = this.ruleForm.checkedDatas.length > 0 && this.ruleForm.checkedDatas.length < this.checkedItems.length;
          }
        });
      },
      submitForm: function () {
        this.MarketingPageUpdate();
      },
      resetForm (formName) {
        // this.$refs.ruleForm.resetFields();
        this.$router.back();
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
    width: 120px;
  }
  .checkBoxGroupStyle {
    margin-top: 10px;
    min-width: 560px;
    max-width: 600px;
  }
  .checkBoxStyle:nth-child(4n+1) {
    margin-left: 0;
  }
</style>
