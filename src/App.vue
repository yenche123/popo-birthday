<script setup lang="ts">
import { defineAsyncComponent } from "vue"

const CustomUi = defineAsyncComponent(() => {
  return import("./components/custom-ui/custom-ui.vue")
})

</script>
<template>

  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
    
  <CustomUi></CustomUi>
  
</template>
<style scoped>

</style>
