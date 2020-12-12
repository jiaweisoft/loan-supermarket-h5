<template>
  <div>
    <el-form style="padding-left:100px;">
      <el-form-item label="">
        <span class="fontStyle">发送数量：{{ total }}</span>
      </el-form-item>
      <el-form-item label="">
        <span class="fontStyle">是否全部发送？</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelEvent">取 消</el-button>
      <el-button type="primary" @click="submitAssign">确 定</el-button>
    </div>
  </div>
</template>

<script>
  import { loanUserSendAll, loanUserList } from '@/services/ApiServiceRequest';
  export default {
    name: 'allPost',
    data: function () {
      return {
        total: 0
      };
    },
    props: ['model'],
    created: function () {
      let data = {
        ifReceived: this.model.ifReceived
      };
      loanUserList(data).then(res => {
        if (res.code === 0) {
          this.total = res.data.total;
        };
      });
    },
    methods: {
      submitAssign: function () {
        this.loanUserSendAll();
      },
      cancelEvent () {
        this.$root.Bus.$emit('dialogCloseListener');
      },
      loanUserSendAll () {
        let data = this.model;
        loanUserSendAll(data).then(res => {
          this.$root.Bus.$emit('dialogCloseListener');
          if (res.code === 0) {
            setTimeout(() => {
              this.openSendSucessDioalog();
            }, 500);
          }
        });
      },
      openSendSucessDioalog () {
        this.$root.Bus.$emit('dialogOpenListener', {
          currentView: 'successPost',
          dialogFormVisible: true,
          title: '发送成功',
          isClose: true
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
