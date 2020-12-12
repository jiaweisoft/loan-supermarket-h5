<template>
  <div class="wrapper">
    <div v-if="!isPc" class="page">
      <div class="banner border">
        <div class="header">
          <TopBanner label="填写信息"></TopBanner>
        </div>
        <img class="image" :src="image" alt="友信普惠">
      </div>
      <!--表单信息-->
      <formItem v-for="(item, index) in formBaseData" :key="item.key" :label="item.label">
        <div class="flex1 flexBox">
          <div @click="selectedEvent(item, index)" class="flex1 center">
            <img v-show="form[item.key]===true" class="icon" :src="selectedImage" alt="">
            <img v-show="form[item.key]===false || form[item.key]===null" class="icon" :src="noselectedImage" alt="">
            <span class="marginLeft10">有</span>
          </div>
          <div @click="notSelectedEvent(item, index)" class="flex1 center">
            <img v-show="form[item.key]===false" class="icon" :src="selectedImage" alt="">
            <img v-show="form[item.key]===true || form[item.key]===null" class="icon" :src="noselectedImage" alt="">
            <span class="marginLeft10">无</span>
          </div>
        </div>
      </formItem>
      <formItem v-if="MarketingConfig.indexOf('ifHopeMoney') !== -1" label="期望借款金额（元）" :roles="roles.applyAmount">
        <input @blur="blueEvent" placeholder="请输入" class="input" type="text" v-model="form.applyAmount">
      </formItem>
      <formItem v-if="MarketingConfig.indexOf('ifSalary') !== -1" label="月收入（元）" :roles="roles.monthlyIncome">
        <input @blur="blueEvent" placeholder="请输入" class="input" type="text" v-model="form.monthlyIncome">
      </formItem>
      <formItem v-if="MarketingConfig.indexOf('ifIdNo') !== -1" label="身份证号码" :roles="roles.idNo">
        <input @blur="blueEvent" placeholder="请输入" class="input" type="text" v-model="form.idNo">
      </formItem>
      <formItem v-if="MarketingConfig.indexOf('ifCity') !== -1" label="城市">
        <!--<infra-select1 size="mini" :dataSource="dataSource" v-model="form.city" placeholder="请选择城市" class="input" @input="blueEvent"></infra-select1>-->
        <div style="height: 100%">
          <input type="hidden" placeholder="请选择" class="input" v-model="form.city">
          <div @click="focusEvent" :style="{color: form.city ? '#333' : '#999'}" class="input select-style">{{form.city || '请选择'}}</div>
        </div>
      </formItem>
      <div class="center marginBottom20 marginTop20">
        <infra-button :class="{'disabled-style': isDisabled}" @click="onSubmit" :disabled="isDisabled" style="width: 200px; ">提交资料</infra-button>
      </div>
      <div class="center tips">风险提示：具体借款情况以各平台实际审批为准，请勿过度借贷</div>
      <City
        :isShow="isShowCity"
        :onChange="onChange"
      ></City>
    </div>
    <div v-if="isPc" class="pc-wrapper flexBox flexCol pageWidth">
      <div class="pc-header leftCenter">
        <img class="pc-logo" :src="pcLogo" alt="">
        <span class="pc-logo-info">友信金服旗下品牌</span>
      </div>
      <div class="pc-body flex1">
        <p class="pc-title center">完整填写，助您借款</p>
        <div class="pc-form">
          <formItem
            v-for="(item, index) in formBaseData"
            class="pc-formItem"
            :key="item.key"
            :label="item.label"
            labelPosition="left"
            :style="{marginLeft: '150px'}"
          >
            <div class="flex1 flexBox">
              <div @click="selectedEvent(item, index)" class="flex1 center">
                <img v-show="form[item.key]===true" class="icon" :src="selectedImage" alt="">
                <img v-show="form[item.key]===false || form[item.key]===null" class="icon" :src="noselectedImage" alt="">
                <span class="marginLeft10">有</span>
              </div>
              <div @click="notSelectedEvent(item, index)" class="flex1 center">
                <img v-show="form[item.key]===false" class="icon" :src="selectedImage" alt="">
                <img v-show="form[item.key]===true || form[item.key]===null" class="icon" :src="noselectedImage" alt="">
                <span class="marginLeft10">无</span>
              </div>
            </div>
          </formItem>
          <formItem v-if="MarketingConfig.indexOf('ifHopeMoney') !== -1" style="margin-left: 150px" labelPosition="left" class="pc-formItem" label="期望借款金额（元）" :roles="roles.applyAmount">
            <infra-input1 size="mini" width="130px" @blur="blueEvent" placeholder="请输入" v-model="form.applyAmount" class="pc-input" />
            <!--<input @blur="blueEvent" placeholder="请输入" class="input" type="text" v-model="form.applyAmount">-->
          </formItem>
          <formItem v-if="MarketingConfig.indexOf('ifSalary') !== -1" style="margin-left: 150px" labelPosition="left" class="pc-formItem" label="月收入（元）" :roles="roles.monthlyIncome">
            <infra-input1 size="mini" width="130px" style="margin-left: 25px" @blur="blueEvent" placeholder="请输入" v-model="form.monthlyIncome" class="pc-input" />
            <!--<input @blur="blueEvent" placeholder="请输入" class="input" type="text" v-model="form.monthlyIncome">-->
          </formItem>
          <formItem v-if="MarketingConfig.indexOf('ifIdNo') !== -1" style="margin-left: 150px" labelPosition="left" class="pc-formItem" label="身份证号码" :roles="roles.idNo">
            <infra-input1 size="mini" width="130px" style="margin-left: 25px" @blur="blueEvent" placeholder="请输入" v-model="form.idNo" class="pc-input" />
            <!--<input @blur="blueEvent" placeholder="请输入" class="input" type="text" v-model="form.idNo">-->
          </formItem>
          <formItem v-if="MarketingConfig.indexOf('ifCity') !== -1" style="margin-left: 150px" labelPosition="left" class="pc-formItem" label="城市" :roles="roles.city">
            <!--<infra-input style="margin-left: 55px" :blueEvent="blueEvent" placeholder="请输入" v-model="form.city" class="pc-input" />-->
            <infra-select1 size="mini" width="130px" style="margin-left: 25px;" :dataSource="dataSource" v-model="form.city" placeholder="请选择城市" class="pc-input" @input="blueEvent"></infra-select1>
          </formItem>
          <div class="clear"></div>
        </div>
        <div class="center marginBottom20 marginTop20">
          <infra-button :class="{'disabled-style': isDisabled}" @click="onSubmit" :disabled="isDisabled" style="width: 200px;">提交资料</infra-button>
        </div>
      </div>
      <div class="center pc-tips">风险提示：具体借款情况以各平台实际审批为准，请勿过度借贷</div>
    </div>
  </div>
</template>

<script>
  import formItem from '@/components/FormItem.vue';
  import TopBanner from '@/components/TopBanner.vue';
  import finishInfoImage from '@/assets/h5/finishInfo.png';
  import selectedImage from '@/assets/h5/selected.png';
  import noselectedImage from '@/assets/h5/noselected.png';
  import { getCustomerInfoByUuid, saveCustomerInfoByUuid, MarketingPageGetContent } from '@/services/H5ServiceRequest';
  import Utils from '@/utils/utils.js';
  import cityData from '@/utils/cityData';
  import City from './components/City';
  import InfraVueUi from 'infra-vue-ui';

  import pcLogo from '@/assets/h5/pc_logo2.png';
  export default {
    name: 'UserInfomation',
    data: function () {
      return {
        isPc: true,
        // mobile
        image: finishInfoImage,
        selectedImage,
        noselectedImage,
        form: {
          possessCar: null,
          possessHouse: null,
          possessLifeInsurance: null,
          possessSoins: null,
          possessFunds: null,
          possessBorrow: null,
          possessMoteLoan: null,
          sesameCreditLegal: null,
          applyAmount: '',
          monthlyIncome: '',
          idNo: '',
          city: ''
        },
        roles: {
          idNo: {
            isShow: false,
            message: '身份证号码格式不正确'
          },
          applyAmount: {
            isShow: false,
            message: '期望借款金额应该填写为整数'
          },
          monthlyIncome: {
            isShow: false,
            message: '月收入应该填写为整数'
          }
        },
        formBaseData: [
          {label: '是否有车', key: 'possessCar', type: 'possessCar', showKey: 'ifCar'},
          {label: '是否有房', key: 'possessHouse', type: 'possessHouse', showKey: 'ifHouse'},
          {label: '是否有人寿保险', key: 'possessLifeInsurance', type: 'possessLifeInsurance', showKey: 'ifInsurance'},
          {label: '是否有社保', key: 'possessSoins', type: 'possessSoins', showKey: 'ifSociety'},
          {label: '是否有公积金', key: 'possessFunds', type: 'possessFunds', showKey: 'ifFunds'},
          {label: '是否有借呗', key: 'possessBorrow', type: 'possessBorrow', showKey: 'ifBorrow'},
          {label: '是否有微粒贷', key: 'possessMoteLoan', type: 'possessMoteLoan', showKey: 'ifSmallLoan'},
          {label: '芝麻信用是否超过600', key: 'sesameCreditLegal', type: 'sesameCreditLegal', showKey: 'ifCredit'}
        ],
        MarketingConfig: [],
        dataSource: cityData,
        isShowCity: false,
        // mobile
        pcLogo
      };
    },
    components: {
      formItem,
      TopBanner,
      City
    },
    computed: {
      isDisabled: function () {
        let tag = true;
        for (let k in this.form) {
          let currentKeyItem = this.formBaseData.find(item => item.key === k);
          let currentKey = '';
          if (currentKeyItem) {
            currentKey = currentKeyItem.showKey;
          }
          if (k === 'applyAmount') {
            currentKey = 'ifHopeMoney';
          }
          if (k === 'monthlyIncome') {
            currentKey = 'ifSalary';
          }
          if (k === 'idNo') {
            currentKey = 'ifIdNo';
          }
          if (k === 'city') {
            currentKey = 'ifCity';
          }
          if (this.MarketingConfig.indexOf(currentKey) === -1) {
            continue;
          }
          if (k === 'applyAmount' || k === 'monthlyIncome' || k === 'idNo' || k === 'city') {
            if (!this.form[k]) {
              tag = false;
              break;
            }
          } else {
            if (typeof this.form[k] !== 'boolean') {
              tag = false;
              break;
            }
          }
        }
        return !tag;
      }
    },
    created () {
      this.isPc = Utils.isPc();
      this.MarketingPageGetContent();
    },
    methods: {
      focusEvent () {
        this.isShowCity = true;
      },
      onChange: function (item) {
        this.form.city = item;
        this.isShowCity = false;
        this.blueEvent();
      },
      getCustomerInfoByUuid (uuid) {
        getCustomerInfoByUuid({
          uuid: uuid
        }).then(res => {
        });
      },
      MarketingPageGetContent () {
        MarketingPageGetContent().then(res => {
          if (res.code === 0) {
            this.MarketingConfig = JSON.parse(res.data.value);
            let arr = JSON.parse(JSON.stringify(this.formBaseData));
            this.formBaseData = arr.filter(item => {
              return this.MarketingConfig.includes(item.showKey);
            });
          }
        });
      },
      selectedEvent (item, index) {
        this.form[item.key] = true;
        this.saveCustomerInfoByUuid();
      },
      notSelectedEvent (item, index) {
        this.form[item.key] = false;
        this.saveCustomerInfoByUuid();
      },
      blueEvent (e) {
        this.saveCustomerInfoByUuid();
      },
      saveCustomerInfoByUuid (next) {
        let result = this.validIdNo();// 进行身份证格式验证
        let validApplyAmount = this.validApplyAmount(); // 进行借款额度校验
        let validMonthlyIncome = this.validMonthlyIncome(); // 进行月收入校验
        if (!result || !validApplyAmount || !validMonthlyIncome) return false;
        let form = {};
        for (let i in this.form) {
          form[i] = this.form[i] === true ? 1 : this.form[i] === false ? 0 : '';
          // 把applyAmount和monthlyIncome和idNo添加到form上面
          if (i === 'applyAmount' || i === 'monthlyIncome' || i === 'idNo') {
            form[i] = this.form[i];
          }
          if (i === 'city') {
            form.city = this.form.city;
          }
        }
        let data = Object.assign({ uuid: this.$route.query.uuid }, form);
        saveCustomerInfoByUuid(data).then(res => {
          if (res.code === 0) {
            next && next();
          }
        });
      },
      onSubmit: function () {
        this.saveCustomerInfoByUuid(() => {
          // 给一个提示，用户信息提交成功！
          let message = '恭喜您申请成功！请保持手机畅通，您的专属客户经理会在24小时内给您回电！';
          if (Utils.isPc()) {
            InfraVueUi.MessageBox.alert(message);
          } else {
            InfraVueUi.MobileMessageBox.alert(message);
          }
        });
      },
      validApplyAmount: function () {
        this.roles.applyAmount.isShow = false;
        let applyAmount = this.form.applyAmount;
        if (!applyAmount) return true;
        if (/^[0-9]+$/.test(applyAmount)) {
          return true;
        } else {
          this.roles.applyAmount.isShow = true;
          return false;
        }
      },
      validMonthlyIncome: function () {
        this.roles.monthlyIncome.isShow = false;
        let monthlyIncome = this.form.monthlyIncome;
        if (!monthlyIncome) return true;
        if (/^[0-9]+$/.test(monthlyIncome)) {
          return true;
        } else {
          this.roles.monthlyIncome.isShow = true;
          return false;
        }
      },
      validIdNo: function () {
        this.roles.idNo.isShow = false;
        let idNo = this.form.idNo;
        if (!idNo) return true;
        // 身份证正则表达式(15位)
        let isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        // 身份证正则表达式(18位)
        let isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
        let isType1 = isIDCard1.test(idNo);
        let isType2 = isIDCard2.test(idNo);
        if (!(isType1 || isType2)) {
          this.roles.idNo.isShow = true;
          return false;
        }
        return true;
      }
    }
  };
</script>

<style scoped>

  .page {
    width: 100%;
    height: 100%;
    background: #ffffff;
    font-size: 16px;
    overflow: auto;
  }

  .banner {
    height: 200px;
    overflow: hidden;
  }

  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 10000;
  }

  .image {
    width: 100%;
    height: 100%;
  }
  .bannerItem > div {
    height: 100% !important;
    width: 100%;
  }
  .icon {
    width: 20px;
    height: 20px;
  }
  .marginBottom20 {
    margin-bottom: 20px;
  }
  .input {
    display: inline-block;
    width: 180px;
    border: none;
    outline: none;
    line-height: 20px;
    font-size: 16px;
  }
  .tips {
    font-size: 6px;
    color: #888888;
    margin-bottom: 20px;
  }

  .pc-wrapper {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }
  .pc-header {
    height: 50px;
    padding: 0 100px;
    background-color: #15325F;
  }
  .pc-body {
    overflow: auto;
  }
  .pc-form {
    width: 1000px;
    margin: 0 auto;
  }
  .clear{ clear:both}
  .pc-formItem {
    display: inline-block;
    width: 300px;
    float: left;
    margin-left: 40px;
    box-sizing: border-box;
  }
  .pc-logo-info {
    color: #ffffff;
    margin-left: 20px;
    margin-top: 5px;
  }
  .pc-tips {
    height: 40px;
    line-height: 40px;
    background-color: #f1f1f1;
    margin-top: 15px;
    font-size: 6px;
    color: #888888;
  }
  .pc-title {
    min-width: 1080px;
    height: 68px;
    font-size: 20px;
    color: #15325F;
  }
  .pc-input {
    width: 100px;
    line-height: 30px;
  }
  .disabled-style {
    cursor: no-drop;
    background-color: #cccccc;
  }
  .disabled-style:hover {
    background-color: #cccccc;
  }
  .select-style {
    background-color: #f6f6f6;
    height: 100%;
    line-height: 38px;
  }
</style>
