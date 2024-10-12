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
        <div class="cw-bg">
          <div class="cw-bg2"></div>
        </div>
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
  cursor: pointer;
}

.cw-bg {
  width: 100%;
  padding-bottom: 100%;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.cw-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--card-bg);
  transition: .15s;
}

.cw-bg2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--primary-color);
  opacity: 0;
  transition: .15s;
}

.cw-active .cw-bg::before {
  opacity: 0;
}

.cw-active .cw-bg2 {
  opacity: .2;
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