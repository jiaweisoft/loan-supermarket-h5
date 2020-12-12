<template>
  <div class="wrapper">
    <div v-if="!isPc" style="background-image: url('static/images/bg.png');" class="page center flexCol">
      <div class="userInfo">
        <!--姓名-->
        <Item type="name" :disabled="true" :value="form.name"></Item>
        <!--城市-->
        <Item type="city" :disabled="false" :value="form.city" :onfocus="focusEvent" :isInput="true"></Item>
        <!--手机号-->
        <Item type="phone" :disabled="true" :value="form.mobile" :onSend="onSend"></Item>
        <!--验证码-->
        <Item type="code" :disabled="false" v-model="form.code"></Item>
        <p class="p">
          <input class="checkbox" v-model="form.checked" type="checkbox">
          <span class="span marginLeft10">我已阅读并同意<span class="activeStyle" @click="goPage('/agreementpage')">《用户服务协议》</span></span>
        </p>
        <div style="height: 20px;display: block;">
          <div v-show="form.checked !== true" class="error">请阅读并勾选《用户服务协议》</div>
        </div>
      </div>
      <div class="center btnBox">
        <infra-button :class="{'disabled-style': disabled}" @click="onSubmit" :disabled="disabled" style="width: 320px;">立即申请</infra-button>
      </div>
      <div class="center tips">风险提示：具体借款情况以各平台实际审批为准，请勿过度借贷</div>
      <City
        :isShow="isShowCity"
        :onChange="onChange"
      ></City>
    </div>
    <!--pc端界面-->
    <div v-if="isPc" class="pc-wrapper pageWidth flexBox flexCol">
      <div class="pc-header leftCenter marginLeft100">
        <img :src="pcLogo" alt="">
        <span class="pc-logo-info">友信金服旗下品牌</span>
      </div>
      <div class="pc-body flex1" :style="{backgroundImage:`url(${banner})`}">
        <!--<div class="pc-userinfo">-->
          <!--<div class="pc-item-layout">-->
            <!--<infra-input :disabled="true" placeholder="请输入姓名" v-model="form.name"></infra-input>-->
            <!--&lt;!&ndash;<PcInput :disabled="true" placeholder="请输入姓名" v-model="form.name"></PcInput>&ndash;&gt;-->
          <!--</div>-->
          <!--<div class="pc-item-layout">-->
            <!--<infra-select :dataSource="dataSource" v-model="form.city" placeholder="请选择城市"></infra-select>-->
            <!--&lt;!&ndash;<PcSelect :dataSource="dataSource" v-model="form.city" placeholder="请选择城市"></PcSelect>&ndash;&gt;-->
          <!--</div>-->
          <!--<div class="pc-item-layout">-->
            <!--<infra-input :disabled="true" v-model="form.mobile" style="width: 160px;float: left;" placeholder="输入手机号"></infra-input>-->
            <!--&lt;!&ndash;<PcInput :disabled="true" v-model="form.mobile" style="width: 160px;float: left;" placeholder="输入手机号"></PcInput>&ndash;&gt;-->
            <!--<infra-button @click="sendEvent" style="float: left;margin-left: 20px;width: 110px;">{{ isSending ? time : "发送验证码" }}</infra-button>-->
            <!--&lt;!&ndash;<Button @click="sendEvent" style="float: left;margin-left: 20px;width: 110px;">{{ isSending ? time : "发送验证码" }}</Button>&ndash;&gt;-->
          <!--</div>-->
          <!--<div class="pc-item-layout">-->
            <!--<infra-input v-model="form.code" placeholder="输入手机验证码"></infra-input>-->
            <!--&lt;!&ndash;<PcInput v-model="form.code" placeholder="输入手机验证码"></PcInput>&ndash;&gt;-->
          <!--</div>-->
          <!--<p style="padding-left: 30px;" class="p">-->
            <!--<input class="checkbox" v-model="form.checked" type="checkbox">-->
            <!--<span class="span marginLeft10">我已阅读并同意<span class="activeStyle" @click="goPage('/agreementpage')">《用户服务协议》</span></span>-->
          <!--</p>-->
          <!--<div class="center">-->
            <!--<infra-button @click="onSubmit" :disabled="disabled" style="width: 300px;">立即申请</infra-button>-->
            <!--&lt;!&ndash;<Button @click="onSubmit" :disabled="disabled" style="width: 300px;">立即申请</Button>&ndash;&gt;-->
          <!--</div>-->
        <!--</div>-->
        <infra-form ref="myForm" v-model="form" :rules="rules" class="pc-userinfo">
          <infra-form-item prop="name">
            <infra-input1 style="width: 100%;" :disabled="true" placeholder="请输入姓名" v-model="form.name"></infra-input1>
          </infra-form-item>
          <infra-form-item prop="city">
            <infra-select1 style="width: 100%;" :dataSource="dataSource" v-model="form.city" placeholder="请选择城市"></infra-select1>
          </infra-form-item>
          <infra-form-item prop="mobile">
            <infra-input1 :disabled="true" v-model="form.mobile" style="width: 170px;" placeholder="输入手机号"></infra-input1>
            <infra-button @click="sendEvent" style="margin-left: 20px;width: 120px;">{{ isSending ? time : "发送验证码" }}</infra-button>
          </infra-form-item>
          <infra-form-item prop="code">
            <infra-input1 style="width: 100%;" v-model="form.code" placeholder="输入手机验证码"></infra-input1>
          </infra-form-item>
          <infra-form-item prop="checked">
            <infra-check-box style="width: 100%;" v-model="form.checked">
              <span class="span marginLeft10">我已阅读并同意<span class="activeStyle" @click="goPage('/agreementpage')">《用户服务协议》</span></span>
            </infra-check-box>
          </infra-form-item>
          <infra-form-item>
            <infra-button :class="{'disabled-style': disabled}" :disabled="disabled" @click="onSubmit" style="width: 100%;">立即申请</infra-button>
          </infra-form-item>
        </infra-form>
      </div>
      <div class="pc-footer flexBox flexCol">
        <div class="flexBox flex1 pc-list">
          <div v-for="item in listInfoPc" v-bind:key="item.key" class="center pc-list-item">
            <div class="pc-item flexBox">
              <div class="flex1">
                <img class="pc-icon" :src="item.icon" alt="leftIconOne">
              </div>
              <div class="flex2">
                <h2 class="pc-h2">{{item.title}}</h2>
                <p class="pc-info">
                  <span>{{item.info1}}</span>
                  <span>{{item.info2}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="center tips pc-tips">风险提示：具体借款情况以各平台实际审批为准，请勿过度借贷</div>
    </div>
  </div>
</template>

<script>
  // 组件
  import Item from './components/H5Item';
  import City from './components/City';
  // 图标-pc
  import pcLogo from '@/assets/h5/pc_logo.png';
  import banner from '@/assets/h5/banner.png';

  import ApplyForLoansConfig from './ApplyForLoansConfig.js';

  import { getCustomerInfoByUuid, authorizeCustomer, sendVerifyCode } from '@/services/H5ServiceRequest';
  import Utils from '@/utils/utils.js';
  import cityData from '@/utils/cityData';

  export default {
    name: 'ApplyForLoans',
    data: function () {
      return {
        isPc: true,
        // mobile
        isShowCity: false,
        isShowModal: false,
        form: {
          name: '',
          city: '',
          mobile: '',
          code: '',
          mobileEncrypt: '',
          checked: false
        },
        rules: {
          name: [{required: true, message: '姓名不为空', trigger: 'change'}],
          city: [{required: true, message: '城市不为空', trigger: 'change'}],
          mobile: [{required: true, message: '手机不为空', trigger: 'change'}],
          code: [{required: true, message: '验证码不为空', trigger: 'change'}],
          checked: [{required: true, message: '请阅读协议', trigger: 'change'}]
        },
        // pc
        pcLogo,
        banner,
        isSending: false,
        time: 60,
        listInfoPc: ApplyForLoansConfig.listInfoPc,
        dataSource: cityData
      };
    },
    computed: {
      disabled: function () {
        return !(this.form.name && this.form.city && this.form.mobile && this.form.code && this.form.checked);
      }
    },
    components: {
      Item,
      City
    },
    created: function () {
      this.getCustomerInfoByUuid();
      this.getCity();
      this.isPc = Utils.isPc();
    },
    methods: {
      sendEvent: function () {
        if (this.isSending === true) {
          return 0;
        }
        this.isSending = true;
        this.intervalFun();
        this.onSend();
      },
      intervalFun: function () {
        setTimeout(() => {
          this.time = this.time - 1;
          if (this.time > 0) {
            this.intervalFun();
          } else {
            this.isSending = false;
            this.time = 60;
          }
        }, 1000);
      },
      onSend: function () {
        sendVerifyCode({
          mobileEncrypt: this.form.mobileEncrypt
        }).then(res => {
          // console.log(res);
        });
      },
      onChange: function (item) {
        this.form.city = item;
        this.isShowCity = false;
      },
      getCity: function () {
        let _this = this;
        let script = document.createElement('script');
        script.src = 'https://ip.ws.126.net/ipquery';
        document.getElementsByTagName('head')[0].appendChild(script);
        script.onload = function () {
          _this.form.city = lo;
        };
      },
      getCustomerInfoByUuid: function () {
        let params = this.getParamByLocation(location);
        let uuid = params.uuid;
        getCustomerInfoByUuid({
          uuid: uuid
        }).then(res => {
          if (res.code === 0) {
            let formData = res.data.customerInfo;
            this.form = {...this.form, ...formData};
          }
        });
      },
      focusEvent: function () {
        this.isShowCity = true;
      },
      onSubmit: function () {
        let _this = this;
        let params = this.getParamByLocation(location);
        let uuid = params.uuid;
        let data = {
          uuid: uuid,
          city: this.form.city,
          mobileEncrypt: this.form.mobileEncrypt,
          code: this.form.code
        };
        this.authorizeCustomer(data, function () {
          _this.$router.push({
            path: './userinfomation',
            query: {
              uuid: uuid
            }
          });
        });
        // this.$refs.myForm.validate((isValid) => {
        //   if (isValid) {
        //     this.authorizeCustomer(data, function () {
        //       _this.$router.push({
        //         path: './userinfomation',
        //         query: {
        //           uuid: uuid
        //         }
        //       });
        //     });
        //   }
        // });
      },
      authorizeCustomer (data, next) {
        authorizeCustomer(data).then(res => {
          if (res.code === 0) {
            next && next();
          }
        });
      },
      goPage: function (path) {
        this.$router.push(path);
      },
      getParamByLocation (location) {
        let obj = {};
        let qString = location.href.split('?')[1];
        if (qString) {
          let list = qString.split('&');
          list.forEach((item) => {
            let arr = item.split('=');
            obj[arr[0]] = arr[1];
          });
        }
        return obj;
      }
    }
  };
</script>

<style scoped>
  .page {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .userInfo {
    width: 90%;
    height: auto;
    margin-top: 150px;
    padding: 10px 0;
    box-sizing: border-box;
    border-radius: 5px;
    background: #ffffff;
  }
  .p {
    padding-left: 15px;
    padding-bottom: 10px;
    line-height: 20px;
    overflow: hidden;
    margin-top: 15px;
  }
  .checkbox {
    padding: 0;
    margin: 0;
    width: 20px;
    height: 20px;
    float: left;
  }
  .span {
    float: left;
  }
  .btnBox {
    margin-top: 30px;
  }
  .activeStyle {
    color: #3c78ff;
  }
  .error {
    font-size: 14px;
    color: red;
    margin-left: 15px;
    line-height: 20px;
    height: 20px;
    text-align: left;
  }
  .tips {
    margin-top: 15px;
    font-size: 6px;
    color: #888888;
  }
  .pc-wrapper {
    width: 100%;
    height: 100%;
    background: #ffffff;
  }
  .pc-header {
    height: 50px;
    padding: 0 100px;
  }
  .pc-body {
    position: relative;
    min-height: 450px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .pc-footer {
    height: 120px;
    padding: 0 100px;
  }
  .pc-userinfo {
    padding: 40px 50px;
    border-radius: 5px;
    width: 300px;
    height: auto;
    border: 1px solid #cccccc;
    position: absolute;
    right: 150px;
    top: 50px;
    background-color: #ffffff;
  }
  .pc-item-layout {
    width: 100%;
    margin-top: 14px;
    margin-left: 32px;
    display: inline-block;
    box-sizing: border-box;
    text-align: left;
  }
  .pc-item {
    width: 300px;
    height: 60px;
    color: #465582;
  }
  .pc-icon {
    width: 58px;
    height: 58px;
  }
  .pc-logo-info {
    color: #465582;
    margin-left: 20px;
    margin-top: 5px;
  }
  .pc-iconsize {
    width: 40px;
    height: 41px;
  }
  .pc-list {
    width: 1080px;
    margin: 0 auto;
    justify-content: space-between;
  }
  .pc-list-item {
    width: 250px;
    overflow: hidden;
  }
  .pc-h2 {
    line-height: 30px;
  }
  .pc-info {
    display: flex;
    flex-direction: column;
  }
  .pc-tips {
    height: 40px;
    line-height: 40px;
    background-color: #f1f1f1;
  }
  .disabled-style {
    cursor: no-drop;
    background-color: #cccccc;
  }
  .disabled-style:hover {
    background-color: #cccccc;
  }
</style>
