<script setup lang="ts">
import { defineAsyncComponent } from "vue"
import CustomLoading from "./loading/custom-loading.vue";
const CustomModal = defineAsyncComponent(() => import("./modal/custom-modal.vue"))
const TextEditor = defineAsyncComponent(() => import("./text-editor/text-editor.vue"))

</script>
<template>

  <!-- 弹窗 -->
  <CustomModal></CustomModal>

  <!-- 文字输入框 -->
  <TextEditor></TextEditor>

  <!-- 加载 loading 框 -->
  <CustomLoading></CustomLoading>
  
</template>
<style scoped lang="scss">


</style>