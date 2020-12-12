<template>
  <div class="wrapper flexBox flexCol">
    <div style="height: 60px;">
      <Header />
    </div>
    <div class="flex1 flexBox">
      <Aside/>
      <div class="flex1 main-style">
        <router-view></router-view>
        <Dialog/>
      </div>
    </div>
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
  }
};
//
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
.el-table{
  margin: 15px 0;
}
.el-pagination{
  text-align: right;
}
  .main-style {
    overflow: auto;
    padding: 20px;
    text-align: left;
  }
</style>
