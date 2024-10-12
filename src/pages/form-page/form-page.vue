<script lang="ts" setup>
import { useFormPage } from "./tools/useFormPage";

const { fpData } = useFormPage()

</script>
<template>
  <div class="liu-mc-container">
    <div class="liu-mc-box" v-if="fpData.myChoices.length > 0">

      <div class="fp-item" v-for="item in fpData.myChoices" :key="item.courseId">
        <div class="fp-item-name">
          <span>{{ item.courseName }}</span>
        </div>
        <div class="fp-item-author" v-if="item.courseAuthor">
          <span>{{ item.courseAuthor }}</span>
        </div>
        
      </div>


    </div>
  </div>

</template>
<style scoped lang="scss">


</style>