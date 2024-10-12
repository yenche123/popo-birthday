<script lang="ts" setup>
import { ref } from 'vue';
import { useLandingPage } from './tools/useLandingPage';
import LoadingPopup from "~/components/loading-popup/loading-popup.vue";

const {
  onTapBtn,
} = useLandingPage()

const loading = ref(true)

let loadTimeout = setTimeout(() => {
  if(loading.value) loading.value = false
}, 6000)

const onBgLoaded = () => {
  clearTimeout(loadTimeout)
  loading.value = false
}

</script>
<template>

  <div class="liu-mc-container">
    <div class="liu-no-user-select liu-mc-box">

      <!-- content box -->
      <div class="lp-box">
        <div class="lp-bg"></div>
        <img class="lp-poster1" src="/poster1.jpg" @load="onBgLoaded" draggable="false" />

        <!-- button -->
        <div class="lp-btn" @click.stop="onTapBtn">
          <div class="lp-btn-img" />
        </div>

      </div>

    </div>
  </div>

  <LoadingPopup :enable="loading"></LoadingPopup>

</template>
<style scoped lang="scss">

.liu-mc-container {
  background-color: #C7E7F0;
}

.liu-mc-box {
  width: 100%;
}

.lp-box {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.lp-bg {
  width: 100%;
  padding-bottom: 186%;
}

.lp-poster1 {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

.lp-btn {
  width: 140px;
  height: 60px;
  position: absolute;
  top: 72%;
  left: 12%;
  cursor: pointer;
  animation: fireworks 3s infinite;
}

.lp-btn-img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("/go.png");
}

@keyframes fireworks {
  0% {
    transform: scale(1);
  }

  25% {
    transform: scale(1.1);
  }

  50% {
    transform: scale(1);
  }

  75% {
    transform: scale(1.1);
  }
}


</style>