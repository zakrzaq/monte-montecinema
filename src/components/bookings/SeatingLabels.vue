<script setup lang="ts">
defineProps<{
  letters: string[];
}>();
</script>

<template>
  <div class="rows-letters">
    <div v-for="letter in letters" :key="letter" class="rows-letters__letter">
      {{ letter }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.rows-letters {
  @include flex-vcenter-hcenter;
  flex-direction: column;
  gap: 10px;

  &__letter {
    @include flex-vcenter-hcenter;
    width: 32px;
    height: 32px;
    @include roboto-mono(normal, 500);
    font-size: 16px;
    line-height: 100%;
    color: $tuna;
    border: none;
    cursor: pointer;
  }
}
</style>
