<template>
  <div class="menu-bar">
    <div class="menu-item" v-for="item in options" v-bind:key="item.key">
      <div class="icon" :class="item.key"></div>
      <router-link :to="`/${item.key}`">{{ item.lable }}</router-link>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";

const options = reactive([
  { key: "home", lable: "首页" },
  { key: "sale", lable: "销售" },
  { key: "college", lable: "学院" },
  { key: "education", lable: "教务" },
  { key: "homeSchool", lable: "家校" },
  { key: "data", lable: "数据" },
  { key: "setting", lable: "设置" },
]);
</script>

<style lang="scss" scoped>
.menu-bar {
  display: flex;
  .menu-item {
    display: flex;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
    .icon {
      width: 20px;
      height: 20px;
      background-color: aquamarine;
    }
    a {
      margin-left: 10px;
      font-size: 14px;
      line-height: 14px;
      text-decoration: none;
    }
  }
}
</style>
