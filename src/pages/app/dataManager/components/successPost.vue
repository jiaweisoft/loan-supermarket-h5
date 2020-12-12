<template>
  <div>
    <el-form style="padding-left:100px;">
      <el-form-item label="">
        <span class="fontStyle">发送成功</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirmEvent">确 定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'successPost',
    methods: {
      confirmEvent () {
        this.$root.Bus.$emit('dialogCloseListener');
        this.$root.Bus.$emit('refreshPage');
      }
    }
  };
</script>

<style scoped>
  .fontStyle {
    font-size: 16px;
  }
</style>
