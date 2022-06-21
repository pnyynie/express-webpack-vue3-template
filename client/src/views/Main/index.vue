<template>
  <div class="about">
    main page
    <el-calendar v-model="value" />
    {{value}}
  </div>
</template>

<script setup>
import { ref } from "vue";
const value = ref(new Date());
</script>
