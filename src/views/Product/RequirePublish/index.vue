<!-- 需求广场 -->
<script setup lang="ts">
  import { onMounted } from "vue"
  import { useTitle } from "@vueuse/core"
  
  defineOptions({ name: "RequirePublish" })
  
  onMounted(() => {
    useTitle("渠道 - 需求广场")
  })
</script>

<template>

</template>

<style scoped lang="scss">

</style>
