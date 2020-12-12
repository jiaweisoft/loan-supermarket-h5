<template>
  <div v-loading="true" id="login"></div>
</template>

<script>
  import Config from '@/index.config.js';

  export default {
    name: 'Login',
    mounted () {
      let obj = this.getParamsByUrl();
      if (obj.tgtId) {
        this.$router.push('/temp');
        return;
      }
      if (!localStorage.getItem('Authorization')) {
        window.location.href = `${Config.ssoUrl}login?service=${Config.tempUrl}`;
      } else {
        this.$router.replace('/home');
      }
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
      }
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  $blue-color: #6392fe;
  #login {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    overflow: hidden;
    background: #d2d6de;
    display: flex;
    justify-content: center;
  }

</style>
