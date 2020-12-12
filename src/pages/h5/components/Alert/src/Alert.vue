<template>
  <div class="my-modal-bg center">
    <div class="flexBox flexCol my-modal">
      <div class="flex1 center">{{message || '消息提示文本'}}</div>
      <div @click="click" class="flex1 center btn">我知道了</div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'Alert',
      data: function () {
        return {
          message: null,
          onClose: null
        };
      },
      methods: {
          click: function () {
            if (typeof this.onClose === 'function') {
              this.onClose(this);
            };
            this.$destroy();
            this.$el.parentNode.removeChild(this.$el);
          }
      }
    };
</script>

<style scoped>
  .my-modal-bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.9);
  }

  .my-modal {
    width: 300px;
    height: 120px;
    border-radius: 5px;
    box-shadow: 1px 1px 20px #888888;
    background-color: #ffffff;
    font-size: 16px;
  }

  .btn {
    border-top: 1px solid #cccccc;
    color: #3c78ff;
    cursor: pointer;
  }
</style>
