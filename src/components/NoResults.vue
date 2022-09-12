<template>
  <div class="no-results">
    <h3>
      <slot />
    </h3>
  </div>
</template>

<style scoped lang="scss">
.no-results {
  width: 100%;
  min-height: 50px;
  @include flex-vcenter-hcenter;
}
</style>
