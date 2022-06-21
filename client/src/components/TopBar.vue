<template>
  <div class="top-bar">
    <div class="logo">
      <img src="../assets/img/logo.png" />
      <span>{{ title }}</span>
    </div>

    <div class="top-bar-right">
      <MenuBar />
      <UserInfo :info="userInfo" />
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import MenuBar from "./MenuBar.vue";
import UserInfo from "./UserInfo.vue";

const title = "阳关艺术美术教育";
const userInfo = reactive({ userName: "***", userAvatar: "" });

onMounted(() => {
  setTimeout(() => {
    userInfo.userName = "222";
    userInfo.userAvatar = "333";
  }, 1000);
});
</script>

<style lang="scss" scoped>
.top-bar {
  padding: 0 20px;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;

  .logo {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
    }
    span {
      margin-left: 10px;
    }
  }

  .top-bar-right {
    display: flex;
    align-items: center;
  }
}
</style>
