<template>
  <div class="base-card"><slot /></div>
</template>

<style scoped lang="scss">
.base-card {
  width: 600px;
  background: $snow-white;
  box-shadow: $card-box-shadow;
  border-radius: 24px;
  padding: 64px;
}
</style>
