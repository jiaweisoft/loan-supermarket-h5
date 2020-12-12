<template>
  <div style="text-align: left;">
    <p class="error">{{ isValid ? "" : message }}</p>
  </div>
</template>

<script>
  export default {
    name: 'ErrorTips',
    data: function () {
      return {
        isValid: true
      };
    },
    props: {
      message: {
        type: String,
        default: ''
      },
      data: {
        default: null
      },
      testFun: {
        type: Function,
        default: null
      }
    },
    watch: {
      'data': function (n, o) {
        if (this.testFun) {
          this.isValid = this.testFun(n);
          return 0;
        }
        this.isValid = Boolean(this.data);
      }
    }
  };
</script>

<style scoped>
  .error {
    font-size: 14px;
    color: red;
    margin-left: 25px;
    line-height: 20px;
    height: 20px;
    text-align: left;
  }
</style>
