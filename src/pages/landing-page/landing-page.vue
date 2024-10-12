<script lang="ts" setup>
import { useLandingPage } from './tools/useLandingPage';

const {
  onTapBtn,
} = useLandingPage()

</script>
<template>

  <div class="liu-mc-container">
    <div class="liu-mc-box">

      <!-- content box -->
      <div class="lp-box">
        <div class="lp-bg"></div>
        <div class="lp-poster1" />

        <!-- button -->
        <div class="lp-btn" @click.stop="onTapBtn">
          <div class="lp-btn-img" />
        </div>

      </div>

    </div>
  </div>

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
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("/poster1.jpg");
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