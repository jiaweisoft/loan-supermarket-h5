<template>
  <div class="wrapper">
    <div v-if="!isPc" class="page">
      <div class="header center">为您推荐借款平台</div>
      <div class="banner">
        <img class="imageHeader" :src="image" alt="友信普惠">
      </div>
      <div class="listContainer">
        <h2 class="leftCenter title">其他热门贷款平台</h2>
        <div v-for="platform in platformList" @click="itemEvent(platform)" :key="platform.key" class="item flexBox">
          <div class="itemImage center">
            <!--<img v-if="platform.convergeCode === 'code1'" class="image" :src='imageRenrendai' alt="">-->
            <!--<img v-if="platform.convergeCode === 'HFQ'" class="image" :src='imageHFQ' alt="">-->
            <img :src="platform.iconUrl" class="image" alt="">
          </div>
          <div class="flex1 flexBox flexCol">
            <div class="flex1 leftCenter">{{ platform.convergeName }}</div>
            <div class="left oneLine flex1 width230">{{ platform.describeH5 }}</div>
          </div>
          <div class="itemIcon center">
            <span class="el-icon-arrow-right"></span>
          </div>
        </div>
      </div>
      <div class="center tips">风险提示：具体借款情况以各平台实际审批为准，请勿过度借贷</div>
    </div>
    <div v-if="isPc" class="pc-wrapper flexBox flexCol pageWidth">
      <div class="pc-header leftCenter">
        <img class="pc-logo" :src="pcLogo" alt="">
        <span class="pc-logo-info">友信金服旗下品牌</span>
      </div>
      <div class="pc-body flex1">
        <div class="center">
          <p class="pc-title center">为您推荐更多借款服务平台</p>
        </div>
        <div class="center flexCol flexBox">
          <div v-for="platform in platformList" :key="platform.key" class="pc-item flexBox">
            <div class="itemImage center">
              <!--<img v-if="platform.convergeCode === 'code1'" class="image" :src='imageRenrendai' alt="">-->
              <!--<img v-if="platform.convergeCode === 'HFQ'" class="image" :src='imageHFQ' alt="">-->

              <img :src="platform.iconUrl" class="image" alt="">
            </div>
            <div class="flexBox flexCol pc-explain">
              <div class="flex1 pc-itemData" style="text-align: left;">{{ platform.convergeName }}</div>
              <div class="left oneLine flex1 width200 pc-determiner" style="text-align: left;">{{ platform.describePc }}</div>
            </div>
            <div class="flexBox flexCol pc-money-rate">
              <p class="flex1 pc-itemData" style="color: #FF7220;">{{platform.yearRate}}</p>
              <p class="flex1 oneLine pc-determiner">最低综合年化费率</p>
            </div>
            <div class="flexBox flexCol pc-term">
              <p class="flex1 pc-itemData">{{platform.fastAccount}}</p>
              <p class="flex1 oneLine pc-determiner">最快到账</p>
            </div>
            <div class="flexBox flexCol pc-loan-amount">
              <p class="flex1 pc-itemData">{{platform.mostAmount}}</p>
              <p class="flex1 oneLine pc-determiner">最高可借金额</p>
            </div>
            <div class="pc-itemIcon center">
              <infra-button @click="itemEvent(platform)">查看详情</infra-button>
              <!--<span class="el-icon-arrow-right"></span>-->
            </div>
          </div>
        </div>
      </div>
      <div class="center pc-tips">风险提示：具体借款情况以各平台实际审批为准，请勿过度借贷</div>
    </div>
  </div>
</template>

<script>
  // 图标
  import image from '@/assets/h5/recomand.png';
  import pcLogo from '@/assets/h5/pc_logo2.png';
  import { convergeH5List, convergeInsert } from '@/services/H5ServiceRequest';
  import Utils from '@/utils/utils.js';
  export default {
    name: 'RecommendPage',
    data: function () {
      return {
        image,
        pcLogo,
        platformList: [],
        isPc: true
      };
    },
    created: function () {
      this.convergeH5List();
      this.isPc = Utils.isPc();
    },
    methods: {
      goPage: function (path) {
        this.$router.push(path);
      },
      itemEvent (item) {
        let data = {
          uuid: this.$route.query.uuid,
          convergeName: item.convergeName,
          convergeCode: item.convergeCode
        };
        convergeInsert(data).then(res => {
          if (res.code === 0) {
            window.location.href = item.url;
          }
        });
      },
      convergeH5List () {
        convergeH5List().then(res => {
          this.platformList = res.data;
        });
      }
    }
  };
</script>

<style scoped>
  .banner {
    height: 220px;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  .page {
    width: 100%;
    height: 100%;
    background: #ffffff;
    font-size: 16px;
    overflow: auto;
  }
  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background: #1C3368;
    z-index: 10000;
    color: #ffffff;
    font-size: 20px;
    height: 60px;
  }
  .listContainer {
    padding: 15px;
    margin-bottom: 40px;
    box-sizing: border-box;
  }
  .item {
    height: 100px;
  }
  .itemImage {
    width: 80px;
    margin-right: 20px;
  }
  .image {
    width: 80px;
    height: 80px;
  }
  .imageHeader {
    width: 100%;
    height: 100%;
  }
  .itemIcon {
    width: 50px;
  }
  .width200{
    width: 200px;
  }
  .width230 {
    width: 230px;
  }
  .tips {
    font-size: 6px;
    color: #888888;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: #f1f1f1;
  }
  .left {
    text-align: left;
  }
  .pc-wrapper {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }
  .pc-header {
    height: 50px;
    padding: 0 100px;
    background-color: #15325F;
  }
  .pc-body {
    overflow: auto;
  }
  .pc-logo-info {
    color: #ffffff;
    margin-left: 20px;
    margin-top: 5px;
  }
  .pc-title {
    border-bottom: 1px solid #DFE3E6;
    width: 800px;
    height: 68px;
    color: #15325F;
  }
  .pc-tips {
    height: 40px;
    line-height: 40px;
    background-color: #f1f1f1;
    margin-top: 15px;
    font-size: 6px;
    color: #888888;
  }
  .pc-item {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    height: 120px;
    width: 800px;
    border-bottom: 1px solid #DFE3E6;
  }
  .pc-itemIcon {
    width: 100px;
  }
  .pc-explain {
    width: 200px;
    height: 80px;
    margin: auto 0;
  }
  .pc-money-rate {
    width: 130px;
    height: 80px;
    margin: auto 0;
  }
  .pc-term {
    width: 120px;
    height: 80px;
    margin: auto 0;
  }
  .pc-loan-amount {
    width: 150px;
    height: 80px;
    margin: auto 0;
  }
  .pc-itemData {
    font-size: 20px;
    text-align: center;
  }
  .pc-determiner {
    text-align: center;
    color: #333333;
    font-size: 14px;
  }
</style>
