<script setup lang="ts">
import PinIcon from "@/assets/icons/pin.svg?component";
import EmailIcon from "@/assets/icons/email.svg?component";
import PhoneIcon from "@/assets/icons/phone.svg?component";
</script>

<template>
  <div class="wrapper">
    <h1 class="heading-1">Contact us</h1>
    <div class="address_card">
      <div>
        <PinIcon class="address_card__icon" />
      </div>
      <p>
        Monterail Sp. z o.o. <br />
        ul. Oławska 27-29 <br />
        50-123 Wrocław<br />
        Poland
      </p>
      <div class="address_card__icon">
        <EmailIcon />
      </div>
      <p><a href="mailto: hello@moterail.com">hello@monterail.com</a></p>
      <div class="address_card__icon">
        <PhoneIcon />
      </div>
      <p><a href="tel: +48533600136">+48 533 600 136</a></p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  @include flex-vcenter-hcenter;
  flex-direction: column;
}

.address_card {
  margin-top: 48px;
  width: 600px;
  background-color: $athens-gray;
  padding: 64px;
  display: grid;
  grid-template: repeat(3, auto) / 45px 1fr;
  @include roboto-mono(normal, 400);
  font-size: 18px;
  line-height: 32px;

  &__icon {
    width: 45px;
    height: 45px;
    @include flex-vcenter-hcenter;
  }
}
</style>
