<!-- 选品收藏 -->
<script setup lang="ts">
  import { onMounted } from "vue"
  import { useTitle } from "@vueuse/core"
  
  defineOptions({ name: "ProductCollect" })
  
  onMounted(() => {
    useTitle("渠道 - 选品收藏")
  })
</script>

<template>

</template>

<style scoped lang="scss">

</style>
