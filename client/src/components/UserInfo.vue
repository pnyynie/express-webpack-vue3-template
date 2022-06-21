<template>
  <div class="user-info">
    <img class="user-avatar" :src="info.userAvatar" />
    <span class="user-name">{{ info.userName }}</span>
  </div>
</template>

<script setup>
import { toRefs } from "vue";

let props = defineProps({
  info: {
    userName: String,
    userAvatar: String,
  },
});

const { info } = toRefs(props);
</script>

<style lang="scss" scoped>
.user-info {
	position: relative;
	width: 160px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 40px;
  }
  .user-name {
    margin-left: 6px;
    font-size: 14px;
  }
  &::before {
		position: absolute;
    content: "";
    height: 30px;
		top: 5px;
		left: 0;

    border-left: 1px solid #e0e0e0;
  }
}
</style>
