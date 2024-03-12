<!-- 个人资料 -->
<script setup lang="ts">
  import { onMounted } from "vue"
  import { useTitle } from "@vueuse/core"
  
  defineOptions({ name: "UserProfile" })
  
  onMounted(() => {
    useTitle("渠道 - 个人资料")
  })
</script>

<template>

</template>

<style scoped lang="scss">

</style>
