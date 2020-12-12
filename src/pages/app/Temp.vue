<template>
  <div v-loading="true" class="wrapper"></div>
</template>

<script>
  import {
    login
  } from '@/services/AppServiceRequest';
  export default {
    name: 'Temp',
    created () {
      this.login();
    },
    methods: {
      getParamsByUrl () {
        let obj = {};
        let arr = location.search.substr(1).split('&');
        arr.forEach(item => {
          let thisArr = item.split('=');
          obj[thisArr[0]] = thisArr[1];
        });
        return obj;
      },
      login () {
        let obj = this.getParamsByUrl();
        if (!obj.tgtId) {
          this.$router.push('/');
          return;
        }
        login(obj).then(res => {
          if (res.code === 0) {
            // @todo: 当前为本地存储的解决方式，以后换为vuex。
            localStorage.setItem('ifLookMobile', res.data.ifLookMobile);
            localStorage.setItem('Authorization', `Bearer ${res.data.token}`);
            localStorage.setItem('siteName', res.data.userName);
            // this.$router.push('/home');
            // url路径优化，把携带参数的方式，改为正常的路由。
            window.location.href = window.location.origin + '/#/home';
            // this.changeCode();
            if (res.data.firstLogin) {
              this.$message.success('首次登陆，建议修改密码！');
            }
          }
        });
      }
    }
  };
</script>

<style scoped>

</style>
