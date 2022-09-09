<script setup lang="ts">
defineProps<{
  letter: string;
}>();
</script>

<template>
  <div class="row">
    <slot :letter="letter" />
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
