<script lang="ts" setup>
import ChoiceWidget from "./choice-widget/choice-widget.vue";
import { useFormPage } from "./tools/useFormPage";

const { fpData, onTapSubmit } = useFormPage()

</script>
<template>
  <div class="liu-mc-container">
    <div class="liu-mc-box" v-if="fpData.myChoices.length > 0">

      <div class="fp-virtual"></div>

      <div class="liu-no-user-select fp-item" v-for="item in fpData.myChoices" :key="item.courseId">
        <div class="fp-item-name">
          <span>{{ item.courseName }}</span>
        </div>
        <div class="fp-item-author" v-if="item.courseAuthor">
          <span>主厨: {{ item.courseAuthor }}</span>
        </div>
        <div class="fp-item-virtual"></div>
        <ChoiceWidget :score="item.score"
          @tapscore="(newScore) => item.score = newScore"
        ></ChoiceWidget>
      </div>

      <div class="fp-btn-box">
        <button class="fp-btn" @click.stop="onTapSubmit">提交</button>
      </div>

    </div>
  </div>

</template>
<style scoped lang="scss">

.fp-virtual {
  width: 100%;
  height: 30px;
}

.fp-item {
  width: 100%;
  position: relative;
  margin-block-end: 30px;
}

.fp-item-name {
  font-size: var(--title-font);
  color: var(--main-normal);
  font-weight: 700;
}

.fp-item-author {
  font-size: var(--desc-font);
  color: var(--main-note);
  margin-block-start: 5px;
  white-space: pre;
}

.fp-item-virtual {
  width: 100%;
  height: 10px;
}

.fp-btn-box {
  width: 100%;
  padding-block: 30px 50px;
  display: flex;
  justify-content: center;
}

.fp-btn {
  width: 100%;
  padding: 12px 24px;
  box-sizing: border-box;
  text-align: center;
  max-width: 300px;
  border-radius: 8px;
  background-color: var(--primary-color);
  color: var(--on-primary);
  font-size: var(--btn-font);
  font-weight: 700;
  cursor: pointer;
  transition: .1s;
}

@media(hover: hover) {
  .fp-btn:hover {
    background-color: var(--primary-hover);
  }
}

.fp-btn:active {
  background-color: var(--primary-active);
}




</style>