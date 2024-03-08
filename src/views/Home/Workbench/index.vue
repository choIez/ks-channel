<!-- 工作台 -->
<script setup lang="ts">
  import { onMounted } from "vue"
  import { useTitle } from "@vueuse/core"
  
  defineOptions({ name: "Workbench" })
  
  onMounted(() => {
    useTitle("渠道 - 工作台")
  })
</script>

<template>

</template>

<style scoped lang="scss">

</style>
