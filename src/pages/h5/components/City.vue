<template>
  <ul v-if="isShow" class="cityList">
    <li @click="changeEvent(item)" v-for="item in cityList" :key="item">{{item}}</li>
  </ul>
</template>

<script>
  import cityList from '@/utils/cityData';
  export default {
    name: 'City',
    data: function () {
      return {
        cityList
      };
    },
    props: {
      isShow: {
        type: Boolean,
        default: true
      },
      onChange: {
        type: Function,
        default: function () {}
      }
    },
    methods: {
      changeEvent: function (item) {
        this.onChange(item);
      }
    }
  };
</script>

<style scoped>
  .cityList {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 70%;
    overflow: auto;
    border-top: 1px solid #cccccc;
    background: #ffffff;
  }

  .cityList li {
    border-bottom: 1px solid #cccccc;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .cityList li:active {
    background: #aaaaaa;
  }
</style>
