<!-- 领样订单 -->
<script setup lang="ts">
  import { onMounted } from "vue"
  import { useTitle } from "@vueuse/core"
  
  defineOptions({ name: "SampleOrder" })
  
  onMounted(() => {
    useTitle("渠道 - 领样订单")
  })
</script>

<template>

</template>

<style scoped lang="scss">

</style>
