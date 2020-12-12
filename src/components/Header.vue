<template>
  <div class="inner-header">
    <span class="header-right">
      <span @click="logoutPro" style="cursor:pointer">退出</span>
      <img src="../assets/admin.png" alt="">
      <span v-if="isBaseHeader">您好，{{name}}</span>
    </span>
  </div>
</template>

<script>
  import {logout} from '@/services/AppServiceRequest';
  import Config from '@/index.config';
  export default {
    data () {
      return {
        name: localStorage.getItem('siteName')
      };
    },
    props: {
      isBaseHeader: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      logoutPro () {
        if (!this.isBaseHeader) {
          window.location.href = `${Config.ssoUrl}logout?service=${Config.redirectUrl}`;
          return;
        }
        logout().then(res => {
          if (res.code === 0) {
            localStorage.clear();
            // this.$router.push('/');
            window.location.href = `${Config.ssoUrl}logout?service=${Config.redirectUrl}`;
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    }
  };
</script>

<style lang="scss">
  .inner-header {
    color: #ffffff;
    height: 60px;
    line-height: 60px;
    background: #6392fe url('../assets/newlogo.png') no-repeat 30px;
    overflow: hidden;

    .header-right {
      float: right;
      margin-right: 30px;
      img {
        display: inline-block;
        vertical-align: middle;
        margin: 0 20px;
      }
    }
  }
</style>
