<script lang="ts" setup>
import { useCenterPage } from "./tools/useCenterPage"

const { onTapBtn } = useCenterPage()

</script>
<template>
  <div class="liu-mc-container">
    <div class="liu-mc-box">
      <button class="liu-btn" @click.stop="onTapBtn">截止投票🗳️</button>
    </div>
  </div>

</template>
<style scoped lang="scss">

.liu-mc-box {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}


</style>