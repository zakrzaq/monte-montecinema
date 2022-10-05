<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const t = useI18n();

const locales = computed(() => {
  return ["en", "pl"].map((locale) => {
    return {
      id: locale,
      name: locale.toUpperCase(),
    };
  });
});

const handleLocaleChange = () => {
  localStorage.setItem("LOCALE", t.locale.value);
};
</script>

<template>
  <select
    v-model="$i18n.locale"
    @change="handleLocaleChange"
    class="locale-picker"
  >
    <option v-for="locale in locales" :key="locale.id" :value="locale.id">
      {{ locale.name }}
    </option>
  </select>
</template>

<style scoped lang="scss">
.locale-picker {
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  text-align: center;
  width: 36px;
  height: 36px;
  background-color: $cosmos;
  color: $totem-pole;
  border-radius: 50%;
  @include roboto(normal, 600);
}
</style>
