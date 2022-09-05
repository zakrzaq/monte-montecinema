<template>
  <div class="slogan">
    <p>
      Developed with
      <span class="slogan--emoji">❤️</span>
      by Monterail
    </p>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.slogan {
  @include flex-vcenter-hcenter;
  padding-right: 30px;
  text-transform: uppercase;
  @include roboto-mono(normal, 500);
  font-size: 1.1rem;
  line-height: 1.1;
  letter-spacing: 0.03em;
  color: $tuna;
  &--emoji {
    font-size: 0.9rem;
  }
}
</style>
