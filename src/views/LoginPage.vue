<script setup lang="ts">
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/component/base/BaseButton.vue";
</script>

<template>
  <div>
    <h1>Hi there!<br />Care to log in/</h1>
    <div>
      <form action="">
        <BaseInput>Email</BaseInput>
        <BaseInput>Password</BaseInput>
        <div>
          <BaseButton button-size="large" button-type="secondary"
            >Register instead</BaseButton
          >
          <BaseButton
            button-size="large"
            button-type="primary"
            button-kind="submit"
            >Log in</BaseButton
          >
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
