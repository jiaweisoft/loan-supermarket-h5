<template>
  <div class="item flexBox">
    <div class="leftIcon flexBox flexCol">
      <p class="flex1 text center">{{type==='name' ? "姓名" : type==='city' ? "城市" : type==='phone' ? "电话" : "验证码"}}</p>
      <div class="flex1 center">
        <img v-if="type==='name'" class="icon" :src="name" alt="name">
        <img v-if="type==='city'" class="icon" :src="city" alt="city">
        <img v-if="type==='phone'" class="icon" :src="phone" alt="phone">
        <img v-if="type==='code'" class="icon" :src="code" alt="code">
      </div>
    </div>
    <div class="flex1 flexBox flexCol marginLeft5">
      <p class="flex1 center"></p>
      <div class="flex1 flexBox">
        <input
          v-if="!isInput"
          class="flex1 inputStyle"
          :value="value"
          @input="$emit('input', $event.target.value)"
          type="text"
          :disabled="disabled"
          @focus="onfocus"
        >
        <span v-if="isInput" @click="onfocus" class="flex1 inputStyle">{{value}}</span>
        <span @click="sendEvent" class="center sendbtn" v-if="type==='phone'">{{ isSending ? time : "发送" }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import name from '@/assets/h5/name.png';
  import city from '@/assets/h5/city.png';
  import phone from '@/assets/h5/phone.png';
  import code from '@/assets/h5/code.png';
  export default {
    name: 'H5Item',
    data: function () {
      return {
        name,
        city,
        phone,
        code,
        time: 60,
        isSending: false
      };
    },
    props: {
      isInput: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'name'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      value: {
        type: String,
        default: ''
      },
      onfocus: {
        type: Function,
        default: function () {}
      },
      onSend: {
        type: Function,
        default: function () {}
      }
    },
    methods: {
      // 发送验证码的行为
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
      }
    }
  };
</script>

<style scoped>
  .item {
    box-sizing: border-box;
    height: 66px;
    margin: 0 15px;
    padding-bottom: 6px;
    border-bottom: 1px solid #e6e6e6;
  }

  .icon {
    width: 28px !important;
    height: 28px !important;
  }

  .leftIcon {
    width: 40px;
  }

  .inputStyle {
    outline: none;
    border: none 0;
    background: #ffffff;
    line-height: 30px;
    text-align: left;
  }
  .text {
    font-size: 12px;
    color: #aaa;
  }
  .sendbtn {
    background: #3c78ff;
    color: #fff;
    margin-right: 30px;
    padding: 0 20px;
    width: 35px;
    border-radius: 3px;
  }
</style>
