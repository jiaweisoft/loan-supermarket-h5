<template>
  <div class="header center">
    <img @click="backEvent" class="icon" :src="leftArrow" alt="左箭头">
    {{label}}
  </div>
</template>

<script>
  import leftArrow from '@/assets/h5/leftArrow.png';
  export default {
    name: 'TopBanner',
    props: {
      label: {
        type: String,
        default: '标题'
      }
    },
    data: function () {
      return {
        leftArrow
      };
    },
    methods: {
      backEvent: function () {
        this.$router.back();
      }
    }
  };
</script>

<style scoped>
  .header {
    background: #1C3368;
    color: #ffffff;
    font-size: 20px;
    height: 64px;
    position: relative;
  }
  .icon {
    position: absolute;
    left: 15px;
    top: 20px;
    width: 10px;
    height: 20px;
  }
</style>
