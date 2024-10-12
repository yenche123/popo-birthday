<script setup lang="ts">
import GlobalLoading from "./components/global-loading/global-loading.vue"
import { defineAsyncComponent } from "vue"
import { useApp } from "./hooks/useApp";

const CustomUi = defineAsyncComponent(() => {
  return import("./components/custom-ui/custom-ui.vue")
})

useApp()

</script>
<template>

  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
    
  <CustomUi></CustomUi>
  <GlobalLoading></GlobalLoading>
  
</template>
<style scoped>

</style>
