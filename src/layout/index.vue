<script setup lang="ts">
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
  
  </div>
</template>

<style scoped lang="scss">
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>

