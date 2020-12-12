<template>
  <div>
    <el-container>
      <el-header>
        <Header :isBaseHeader="false" />
      </el-header>
      <div class="message">{{message || '请联系管理员开通账号权限'}}</div>
    </el-container>
  </div>
</template>

<script>
  import Header from '@/components/Header';
  import Aside from '@/components/Aside';
  import Dialog from '@/components/Dialog';
  export default {
    name: 'Main',
    components: {
      Header,
      Aside,
      Dialog
    },
    data: function () {
      return {
        message: this.$route.query.message
      };
    }
  };
</script>
<style scoped lang="scss">
  .message {
    margin-top: 300px;
    text-align: center;
    font-size: 20px;
  }
</style>
