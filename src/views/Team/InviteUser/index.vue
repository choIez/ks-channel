<!-- 邀请用户 -->
<script setup lang="ts">
  import { onMounted } from "vue"
  import { useTitle } from "@vueuse/core"
  
  defineOptions({ name: "InviteUser" })
  
  onMounted(() => {
    useTitle("渠道 - 邀请用户")
  })
</script>

<template>

</template>

<style scoped lang="scss">

</style>
