<!-- 专辑详情 -->
<script setup lang="ts">
  import { onMounted } from "vue"
  import { useTitle } from "@vueuse/core"
  
  defineOptions({ name: "AlbumDetails" })
  
  onMounted(() => {
    useTitle("渠道 - 专辑详情")
  })
</script>

<template>

</template>

<style scoped lang="scss">

</style>
