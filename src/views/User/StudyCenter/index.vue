<!-- 学习中心 -->
<script setup lang="ts">
  import { onMounted } from "vue"
  import { useTitle } from "@vueuse/core"
  
  defineOptions({ name: "StudyCenter" })
  
  onMounted(() => {
    useTitle("渠道 - 学习中心")
  })
</script>

<template>

</template>

<style scoped lang="scss">

</style>
