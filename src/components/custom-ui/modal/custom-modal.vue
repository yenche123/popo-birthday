<script setup lang="ts">
// 该组件不得改成用路由参数来控制 展示或隐藏 该组件
// 因为可能会放在导航守卫里去触发 showModal 这就会产生冲突
// 比如：导航守卫里阻断了本次的路由跳转然后展示 modal，结果 showModal 又触发路由变化
// 就会进入死循环
import { computed } from "vue";
import { initModal } from "./tools/useCustomModal"

const {
  enable: modalEnable,
  show: modalShow,
  modalData,
  onTapConfirm: onTapModalConfirm,
  onTapCancel: onTapModalCancel,
  TRANSITION_DURATION: modalTranMs,
} = initModal()
const iconUrl = computed(() => modalData.iconUrl)

</script>
<template>

  <div 
    v-if="modalEnable" 
    class="liu-no-user-select cui-modal-container" 
    :class="{ 'cui-modal-container_show': modalShow }"
  >
    <div class="cui-modal-bg"></div>
    <div class="cui-modal-box"
      :class="{ 'cui-model-box_emoji': modalData.isTitleEqualToEmoji }"
    >

      <h1 v-if="modalData.title">{{ modalData.title }}</h1>
      <div v-else-if="modalData.iconUrl"
        class="cui-modal-icon cui-modal-pic"
      ></div>

      <p v-if="modalData.content">{{ modalData.content }}</p>

      <div class="cui-modal-btns">
        <div 
          v-if="modalData.showCancel" 
          class="cui-modal-btn"
          @click="onTapModalCancel"
        >
          <span v-if="modalData.cancelText">{{ modalData.cancelText }}</span>
          <span v-else>取消</span>
        </div>
        <div 
          class="cui-modal-btn cui-modal-confirm"
          :class="{ 'cui-modal-btn_red': modalData.modalType === 'warning' }"
          @click="onTapModalConfirm"
        >
          <span v-if="modalData.confirmText">{{ modalData.confirmText }}</span>
          <span v-else>确认</span>
        </div>
      </div>
    </div>
  </div>


</template>
<style scoped lang="scss">

.cui-modal-container {
  width: 100%;
  height: 100vh;
  height: 100dvh;
  position: fixed;
  z-index: 5100;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: v-bind("modalTranMs + 'ms'");
  opacity: 0;

  &.cui-modal-container_show {
    opacity: 1;
  }

  .cui-modal-bg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: var(--popup-bg);
    z-index: 5105;
  }

  .cui-modal-box {
    width: 92%;
    max-width: var(--standard-max-px);
    box-sizing: border-box;
    padding: 28px 6% 18px;
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 5110;
    position: relative;
    overflow: hidden;

    &::before {
      background-color: var(--cui-modal);
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      -webkit-backdrop-filter: blur(2px);
      backdrop-filter: blur(2px);
    }
    
    .cui-modal-icon {
      width: 60px;
      height: 60px;
      margin-block-end: 20px;
      z-index: 5112;
    }

    .cui-modal-pic {
      background-image: v-bind("'url(' + iconUrl + ')'");
      background-size: contain;
    }


    h1 {
      font-size: var(--title-font);
      font-weight: 700;
      color: var(--main-text);
      line-height: 1.5;
      margin-block-start: 0;
      margin-block-end: 20px;
      z-index: 5112;

      // see https://developer.chrome.com/blog/new-in-web-ui-io-2024?hl=zh-cn#text-wrap_balance_and_pretty
      text-wrap: pretty;
    }

    p {
      font-size: var(--desc-font);
      color: var(--main-text);
      line-height: 1.5;
      margin-block-start: 0;
      margin-block-end: 30px;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow-wrap: break-word;
      user-select: text;
      -webkit-user-select: text;
      cursor: auto;
      z-index: 5112;
      text-wrap: pretty;
    }

    p::selection {
      color: var(--on-primary);
      background-color: var(--primary-active);
    }

    .cui-modal-tip {
      display: flex;
      max-width: 100%;
      z-index: 5112;
      margin-block-end: 30px;
      cursor: pointer;

      .cui-checkbox {
        margin-block-start: 1px;
        margin-inline-end: 8px;
      }

      .cui-modal-tip-text {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        line-height: 22px;
        font-size: var(--mini-font);
        color: var(--main-code);
        text-align: left;
      }

    }

    .cui-modal-btns {
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      position: relative;

      @media(hover: hover) {
        .cui-modal-btn:hover {
          background-color: var(--cui-modal-other-btn-hover);
        }

        .cui-modal-confirm:hover {
          background-color: var(--primary-hover);
        }

        .cui-btn_disabled:hover {
          background-color: var(--primary-color);
        }

        .cui-modal-btn_red:hover {
          background-color: #c61d2e;
        }
      }

      .cui-modal-btn {
        padding: 10px 16px;
        border-radius: 24px;
        font-size: var(--btn-font);
        color: var(--other-btn-text);
        background-color: var(--cui-modal-other-btn-bg);
        transition: .15s;
        max-width: 45%;
        min-width: 30%;
        text-align: center;
        margin-bottom: 10px;
        cursor: pointer;

        &:active {
          background-color: var(--cui-modal-other-btn-hover);
        }
      }

      .cui-modal-confirm {
        color: var(--on-primary);
        background-color: var(--primary-color);

        &:active {
          background-color: var(--primary-active);
        }
      }

      .cui-btn_disabled {
        opacity: .6;
        cursor: auto;

        &:active {
          background-color: var(--primary-color);
        }
      }

      .cui-modal-btn_red {
        color: white;
        background-color: #dc1e30;

        &:active {
          background-color: #c61d2e;
        }
      }

    }
  }

  .cui-model-box_emoji {
    h1 {
      font-size: 42px;
      margin-block-end: 10px;
    }
  }

}

</style>