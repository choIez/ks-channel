<!-- 团队数据 -->
<script setup lang="ts">
  import { onMounted } from "vue"
  import { useTitle } from "@vueuse/core"
  
  defineOptions({ name: "TeamData" })
  
  onMounted(() => {
    useTitle("渠道 - 团队数据")
  })
</script>

<template>

</template>

<style scoped lang="scss">

</style>
