<!-- 文章详情 -->
<script setup lang="ts">
  import { onMounted } from "vue"
  import { useTitle } from "@vueuse/core"
  
  defineOptions({ name: "ArticleDetails" })
  
  onMounted(() => {
    useTitle("渠道 - 文章详情")
  })
</script>

<template>

</template>

<style scoped lang="scss">

</style>
