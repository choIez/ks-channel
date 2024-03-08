<!-- 二级团列表 -->
<script setup lang="ts">
  import { onMounted } from "vue"
  import { useTitle } from "@vueuse/core"
  
  defineOptions({ name: "SampleGroup" })
  
  onMounted(() => {
    useTitle("渠道 - 二级团列表")
  })
</script>

<template>

</template>

<style scoped lang="scss">

</style>
