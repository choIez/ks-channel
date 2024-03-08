<script setup lang="ts">
  import { RouterView } from "vue-router"
  import { storeToRefs } from "pinia"
  import { useLogInfoStore } from "@/stores/logInfo"
  import Header from "./components/Header.vue"
  
  defineOptions({ name: "Layout" })
  
  const { logInfo } = storeToRefs(useLogInfoStore())
  
  const openDocs = () => {
    window.open("https://e0obk0fof4k.feishu.cn/docx/ZsxDdVwM3o9cOXxSWDecP1x2nsm?from=from_copylink", "_blank")
  }
</script>

<template>
  <div class="relative">
    <Header />
    
    <div class="back" />
    
    <div class="main">
      <RouterView />
      
      <transition>
        <div v-show="!logInfo" class="docs-container">
          <button class="docs" @click="openDocs">使用文档</button>
        </div>
      </transition>
      
      <transition>
        <div v-if="logInfo" class="log-container">
          <div class="log">
            <header class="log-header">
              <div class="text-[15px] font-semibold">安全信息</div>
              <div class="text-[14px] cursor-pointer" @click="logInfo = null">关闭</div>
            </header>
            <main class="log-main">
              <div>登录位置：{{ logInfo[0].ip }} - {{ logInfo[0].content }}</div>
              <div v-if="logInfo?.length > 1">上次登录位置 {{ logInfo[1].ip }} - {{ logInfo[1].content }}</div>
              <div v-if="logInfo?.length > 1">上次登录时间 {{ logInfo[1].created_at }}</div>
            </main>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .back {
    position: fixed;
    top: 80px;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 185px;
    background: url(https://xingshanonline.oss-cn-shanghai.aliyuncs.com/web/bg_2.png) 0 0 no-repeat;
    background-size: 100% 100%;
  }
  
  .main {
    position: relative;
    z-index: 1;
    overflow: hidden;
    width: 1200px;
    margin: 80px auto 0;
    border-radius: 12px;
    
    .docs-container {
      position: fixed;
      bottom: 104px;
      z-index: 50;
      transform: translateX(1215px);
      
      .docs {
        box-sizing: border-box;
        width: 45px;
        height: 120px;
        padding: 0 6px;
        border: none;
        color: #fff;
        background-image: linear-gradient(30deg, #409eff, #5884f5);
        border-radius: 5px;
        background-size: 100% auto;
        font-family: inherit;
        font-size: 17px;
        line-height: 22px;
      }
      
      .docs:hover {
        cursor: pointer;
        background-position: right center;
        background-size: 200% auto;
        -webkit-animation: pulse 2s infinite;
        animation: pulse512 1.5s infinite;
      }
      
      @keyframes pulse512 {
        0% {
          box-shadow: 0 0 0 0 #05bada66;
        }
        
        70% {
          box-shadow: 0 0 0 10px rgb(218 103 68 / 0%);
        }
        
        100% {
          box-shadow: 0 0 0 0 rgb(218 103 68 / 0%);
        }
      }
    }
    
    .log-container {
      position: fixed;
      bottom: 5px;
      right: 5px;
      z-index: 50;
      box-sizing: border-box;
      width: 360px;
      height: 200px;
      padding: 14px;
      background-color: #eaeaea;
      
      .log {
        width: 100%;
        height: 100%;
        border: 2px solid #c0c0c0;
        
        .log-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          width: 100%;
          height: 25%;
          padding: 5px 8px;
          border-bottom: 2px solid #c0c0c0;
        }
        
        .log-main {
          box-sizing: border-box;
          width: 100%;
          height: 75%;
          padding: 10px 8px;
          background-color: #f7f7f7;
        }
      }
    }
  }
  
  .v-enter-active, .v-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .v-enter-from, .v-leave-to {
    opacity: 0;
  }
</style>
