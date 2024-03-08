<!-- 选品专辑 -->
<script setup lang="ts">
  import { onMounted } from "vue"
  import { useTitle } from "@vueuse/core"
  
  defineOptions({ name: "ProductAlbum" })
  
  onMounted(() => {
    useTitle("渠道 - 选品专辑")
  })
</script>

<template>

</template>

<style scoped lang="scss">

</style>
