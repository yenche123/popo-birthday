<script lang="ts" setup>
import LoadingPopup from "~/components/loading-popup/loading-popup.vue"
import { useResultPage } from "./tools/useResultPage";

const { rpData, onTapRefresh } = useResultPage()

const onTapSponsor = () => {
  window.open("https://mp.weixin.qq.com/s/WltAf-EGK5CHY6CTi3p24Q", "_blank")
}

</script>
<template>

  <div class="liu-mc-container">
    <div class="liu-no-user-select liu-mc-box" v-if="rpData.rs">

      <div class="rp-virtual"></div>

      <!--courses -->
      <div class="rp-box">
        <div class="rpb-item" v-for="item in rpData.rs.courses"
          :key="item.courseId"
        >
          <div class="rpbi-title">
            <span>{{ item.courseName }}</span>
            <span v-if="rpData.bestCourseId === item.courseId"
              class="rpbi-crown"
            >👑</span>
          </div>

          <div class="rpbi-desc">
            <span>总分: {{ item.totalScore }}</span>
          </div>

          <div class="rpbi-desc">
            <span>平均分: {{ item.avgScore }}</span>
          </div>

        </div>

      </div>

      <!-- best eater -->
      <div class="rp-box">
        <div class="rp-eater-title">
          <span>最佳品鉴官</span>
        </div>

        <div class="rp-eater-name">
          <span>{{ rpData.rs.bestEater.name }}</span>
        </div>

        <div class="rp-eater-diff">
          <span>总差值: {{ rpData.rs.bestEater.totalDiffScore }}<br></span>
        </div>
        <div class="rp-eater-diff-tip">
          <span>说明：总差值 = 该品鉴官的评分与每道菜平均分的差值加总；总差值越低越好。</span>
        </div>

        <div class="rp-courses-info">

          <div class="rpci-item" v-for="item in rpData.rs.bestEater.choiceScores"
            :key="item.courseId"
          >
            <span>{{ item.courseName }}: {{ item.score }}</span>
          </div>

        </div>

      </div>

      <!-- your data -->
      <div class="rp-box" v-if="rpData.rs.yourData">
        <div class="rp-eater-title">
          <span>你</span>
        </div>

        <div class="rp-eater-name">
          <span>{{ rpData.rs.yourData.name }}</span>
        </div>

        <div class="rp-eater-diff">
          <span>总差值: {{ rpData.rs.yourData.totalDiffScore }}</span>
        </div>

        <div class="rp-eater-virtual"></div>

        <div class="rp-courses-info">

          <div class="rpci-item" v-for="item in rpData.rs.yourData.choiceScores"
            :key="item.courseId"
          >
            <span>{{ item.courseName }}: {{ item.score }}</span>
          </div>

        </div>
      </div>

      <!-- sponsor -->
      <div class="rp-box">

        <div class="rp-eater-title">
          <span>赞助商</span>
        </div>

        <div class="rp-eater-name">
          <span>留白记事</span>
        </div>

        <div class="rp-eater-diff">
          <span>年轻人都在用的效率工具</span>
        </div>

        <div class="rp-btn" @click.stop="onTapSponsor">
          <span>点击查看</span>
        </div>

      </div>

      <div class="rp-virtual"></div>

    </div>

    <div class="liu-no-user-select liu-mc-box rp-waiting-result" v-else>
      <div class="rpw-title">已提交</div>
      <div class="rpw-desc">
        <span>等待金婆婆公布结果</span>
      </div>
      <button class="liu-btn rpw-refresh-btn" @click.stop="onTapRefresh">
        <div class="rpw-refresh">
          <img src="../../assets/refresh.svg" alt="刷新" class="rpw-refresh-icon">
        </div>
        <span>刷新</span>
      </button>
    </div>

  </div>

  <LoadingPopup :enable="rpData.loading"></LoadingPopup>

</template>
<style scoped lang="scss">

.rp-waiting-result {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.rpw-title {
  font-size: 36px;
  font-weight: 700;
  color: var(--main-text);
  margin-block-end: 12px;
  text-align: center;
}

.rpw-desc {
  font-size: var(--desc-font);
  color: var(--main-note);
  margin-block-end: 48px;
  text-align: center;
}

.rpw-refresh-btn {
  max-width: 200px;
}

.rpw-refresh {
  width: 24px;
  height: 24px;
  position: relative;
  margin-inline-end: 10px;
}

.rpw-refresh-icon {
  width: 100%;
  height: 100%;
  transition: .85s;
  transform: v-bind("'rotate(' + rpData.refreshRotateDeg + 'deg)'");
}


.rp-virtual {
  width: 100%;
  height: 32px;
}

.rp-box {
  width: 100%;
  padding: 24px 16px 16px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-block-end: 16px;
  background-color: var(--card-bg);
  box-sizing: border-box;
  position: relative;
  white-space: pre;
}

.rpb-item {
  padding-block-end: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.rpbi-title {
  font-weight: 700;
  color: var(--main-text);
  font-size: var(--btn-font);
  margin-block-end: 6px;
  text-wrap: pretty;
}

.rpbi-crown {
  margin-inline-start: 6px;
  font-size: var(--mini-font);
}

.rpbi-desc {
  font-size: var(--desc-font);
  color: var(--main-normal);
  margin-block-end: 4px;
}

.rp-eater-title {
  font-weight: 700;
  color: var(--main-normal);
  font-size: var(--desc-font);
  margin-block-end: 12px;
  text-align: center;
}

.rp-eater-name {
  font-size: 36px;
  color: var(--main-text);
  text-align: center;
  text-wrap: pretty;
  margin-block-end: 12px;
}

.rp-eater-diff {
  font-size: var(--desc-font);
  color: var(--main-note);
  text-align: center;
  text-wrap: pretty;
  margin-block-end: 4px;
}

.rp-eater-diff-tip {
  font-size: 12px;
  color: var(--main-note);
  text-align: center;
  text-wrap: balance;
  margin-block-end: 12px;
}

.rp-courses-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.rpci-item {
  font-size: var(--desc-font);
  color: var(--main-note);
  text-align: center;
  text-wrap: pretty;
  margin-block-end: 4px;
}

.rp-eater-virtual {
  width: 100%;
  height: 10px;
}

.rp-btn {
  margin-block-start: 12px;
  padding: 8px 24px;
  border-radius: 4px;
  background-color: var(--main-text);
  color: var(--card-bg);
  font-size: var(--mini-font);
  cursor: pointer;
  margin-block-end: 6px;
  transition: .15s;
}

@media (hover: hover) {
  .rp-btn:hover {
    opacity: .8;
  }
}

.rp-btn:active {
  opacity: .75;
}





</style>