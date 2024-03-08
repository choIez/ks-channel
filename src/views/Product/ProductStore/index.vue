<!-- 选品库 -->
<script setup lang="ts">
  import { onMounted } from "vue"
  import { useTitle } from "@vueuse/core"
  
  defineOptions({ name: "ProductStore" })
  
  onMounted(() => {
    useTitle("渠道 - 选品库")
  })
</script>

<template>

</template>

<style scoped lang="scss">

</style>
