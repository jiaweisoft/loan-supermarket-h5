<template>
  <div>
    <el-form style="padding-left:100px;">
      <el-form-item label="">
        <span class="fontStyle">发送数量：{{ model.idList.length }}</span>
      </el-form-item>
      <el-form-item label="">
        <span class="fontStyle">是否重新发送？</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelEvent">取 消</el-button>
      <el-button type="primary" @click="submitAssign">确 定</el-button>
    </div>
  </div>
</template>

<script>
  import { loanUserSend } from '@/services/ApiServiceRequest';
  export default {
    name: 'rePost',
    props: ['model'],
    created: function () {
    },
    methods: {
      submitAssign: function () {
        this.loanUserSend();
      },
      cancelEvent () {
        this.$root.Bus.$emit('dialogCloseListener');
      },
      loanUserSend () {
        let data = {
          ids: this.model.ids
        };
        loanUserSend(data).then(res => {
          if (res.code === 0) {
            this.$root.Bus.$emit('dialogCloseListener');
            this.$root.Bus.$emit('refreshPage');
          }
        });
      }
    }
  };
</script>

<style scoped>
  .fontStyle {
    font-size: 16px;
  }
</style>
