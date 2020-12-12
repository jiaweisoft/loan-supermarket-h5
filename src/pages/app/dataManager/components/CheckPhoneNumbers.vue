<template>
  <div>
    <el-form>
      <el-form-item label="">
        <p class="p">
          <span class="fontStyle">数据条数：{{list.length}}</span>
        </p>
      </el-form-item>
      <el-form-item :key="item.mobile" v-for="item in list" label="">
        <p class="p">
          <span class="fontStyle">姓名：{{item.name}}</span>
          <span class="fontStyle">手机号码：{{item.mobile}}</span>
        </p>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitAssign">确 定</el-button>
    </div>
  </div>
</template>

<script>
  import { loanUserDetails } from '@/services/ApiServiceRequest';
  export default {
    name: 'CheckPhoneNumbers',
    data: function () {
      return {
        list: []
      };
    },
    props: ['model'],
    created: function () {
      this.loanUserDetails();
    },
    methods: {
      loanUserDetails: function () {
        let ids = this.model.ids;
        loanUserDetails({ ids }).then(res => {
          if (res.code === 0) {
            this.list = res.data;
          };
        });
      },
      submitAssign: function () {
        this.$root.Bus.$emit('dialogCloseListener');
      },
      cancelEvent: function () {
        this.$root.Bus.$emit('dialogCloseListener');
      }
    }
  };
</script>

<style scoped>
  .p {
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .fontStyle {
    font-size: 16px;
    width: 180px;
  }
</style>
