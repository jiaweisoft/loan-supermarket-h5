<template>
  <div :style="{width: isCollapse ? '65px' : '200px'}" class="aside-style">
    <div class="icon-container">
      <i v-show="isCollapse" @click="collapseEvent" class="el-icon-zoom-in my-icon"></i>
      <i v-show="!isCollapse" @click="collapseEvent" class="el-icon-zoom-out my-icon"></i>
    </div>
    <el-menu
      :default-openeds="openeds"
      :default-active="$route.path"
      :unique-opened='true'
      router
      :collapse="isCollapse"
      text-color="#95a0aa"
      active-text-color="#6392fe">
      <template v-for="(item,index) in menuList">
        <el-submenu class="submenu" :index="index+''" v-if="item.childList" :key="index + 1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item class="menu-item" v-for="(child,idx) in item.childList" :index="child.href" :key="idx + 1">{{child.name}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item class="menu-item" :index="item.href" v-if="!item.childList || !item.childList.length" :key="index + 1">
          <i class="el-icon-menu"></i>
          <span slot="title">
        <el-badge :value="item.count">
          {{item.name}}
        </el-badge>
      </span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import {menuList} from '@/services/AppServiceRequest';
  export default {
    data () {
      return {
        openeds: [],
        menuList: [],
        isCollapse: false
      };
    },
    mounted () {
      this.getAsideData();
    },
    methods: {
      collapseEvent () {
        this.isCollapse = !this.isCollapse;
      },
      getAsideData () {
        menuList().then(res => {
          if (!res) return;
          if (res.code === 0) {
            this.menuList = res.data.childList;
          }
        });
      }
    }
  };
</script>
<style scoped lang="scss">
  $blue-color: #6392fe;
  .aside-style {
    background-color: #ffffff;
    width: 260px;
    height: 100%;
  }

  .submenu {
    width: 100%;
    text-align: left;
  }
  .menu-item {
    text-align: left;
    padding-left: 60px !important;
  }
  .icon-container {
    position: relative;
    height: 40px;
    line-height: 30px;
  }
  .my-icon {
    position: absolute;
    left: 23px;
    top: 20px;
    font-size: 20px;
  }
</style>
