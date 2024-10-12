<script lang="ts" setup>

defineProps({
  score: Number,
})

interface CwEmit {
  (evt: "tapscore", score: number): void
}

defineEmits<CwEmit>()

const innerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

</script>
<template>

  <div class="cw-container">

    <template v-for="item in innerList" :key="item">
      <div class="cw-item" @click.stop="$emit('tapscore', item)"
        :class="{ 'cw-active': score && score >= item }"
      >
        <div class="cw-bg"></div>
        <div class="cw-score">
          <span>{{ item }}</span>
        </div>
      </div>
    </template>

  </div>

</template>
<style scoped lang="scss">

.cw-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.cw-item {
  width: 9%;
  position: relative;
}

.cw-bg {
  width: 100%;
  padding-bottom: 100%;
  background-color: #f1f1f1;
  border-radius: 10px;
  transition: .15s;
}

.cw-active .cw-bg {
  background-color: var(--primary-color);
  opacity: .3;
}

.cw-score {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--mini-font);
  color: var(--main-normal);
}




</style>