<template>
  <div class="home">
    home page
    <p>vuex 示例: {{ test }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const test = computed(() => store.state.test.test);

const setTestDispatch = () => store.dispatch("test/setTest");
const setTestCommit = (val) => store.commit("test/setTest", val);

let timeoutInterval1, timeoutInterval2;
onMounted(() => {
  timeoutInterval1 = setTimeout(() => {
    setTestDispatch();
  }, 1000);

  timeoutInterval2 = setTimeout(() => {
    setTestCommit("test3");
  }, 2000);
});

onUnmounted(() => {
  timeoutInterval1 && clearTimeout(timeoutInterval1);
  timeoutInterval2 && clearTimeout(timeoutInterval2);
});
</script>

<style lang="scss" scoped>
.home {
  color: red;
}
</style>
