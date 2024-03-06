<script setup lang="ts">
  defineOptions({ name: "Icon" })
  
  defineProps<{
    name: string
  }>()
</script>

<template>
  <el-icon>
    <component :is="name" />
  </el-icon>
</template>
