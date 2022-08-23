<script setup lang="ts">
import TwitterIcon from "@/assets/icons/twitter.svg?component";
import FacebookIcon from "@/assets/icons/facebook.svg?component";
import LinkedinIcon from "@/assets/icons/linkedin.svg?component";
import InstagramIcon from "@/assets/icons/instagram.svg?component";
import GithubIcon from "@/assets/icons/github.svg?component";
import BehanceIcon from "@/assets/icons/behance.svg?component";
import DribbleIcon from "@/assets/icons/dribble.svg?component";
import PinIcon from "@/assets/icons/pin.svg?component";
import EmailIcon from "@/assets/icons/email.svg?component";
import PhoneIcon from "@/assets/icons/phone.svg?component";
</script>

<template>
  <div class="contact-card">
    <div class="contact-card__map-container">
      <img
        src="@/assets/images/map.png"
        alt="Map of Monterail office location Wroclaw City"
      />
    </div>
    <div class="contact-card__address">
      <div class="contact-card__contact-icon">
        <PinIcon />
      </div>
      <p>
        Monterail Sp. z o.o. <br />
        ul. Oławska 27-29 <br />
        50-123 Wrocław<br />
        Poland
      </p>
      <div class="contact-card__contact-icon">
        <EmailIcon />
      </div>
      <p><a href="mailto: hello@moterail.com">hello@monterail.com</a></p>
      <div class="contact-card__contact-icon">
        <PhoneIcon />
      </div>
      <p><a href="tel: +48533600136">+48 533 600 136</a></p>
    </div>
    <div class="contact-card__social">
      <a to="#" class="contact-card__icon">
        <TwitterIcon />
      </a>
      <a to="#" class="contact-card__icon">
        <FacebookIcon />
      </a>
      <a to="#" class="contact-card__icon">
        <LinkedinIcon />
      </a>
      <a to="#" class="contact-card__icon">
        <InstagramIcon />
      </a>
      <a to="#" class="contact-card__icon">
        <GithubIcon />
      </a>
      <a to="#" class="contact-card__icon">
        <BehanceIcon />
      </a>
      <a to="#" class="contact-card__icon">
        <DribbleIcon />
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact-card {
  display: grid;
  grid-template: 1fr / repeat(2, 1fr) 80px;
  background-color: $athens-gray;
  border-radius: 15px;
  @include sm {
    grid-template: repeat(2, 1fr) 80px / 1fr;
  }

  &__map-container {
    img {
      object-fit: cover;
      height: 412px;
      width: 100%;
      display: block;
      border-radius: 15px 0 0 15px;
      @include sm {
        border-radius: 15px 15px 0 0;
        height: 280px;
      }
    }
  }

  &__address {
    padding: 64px;
    display: grid;
    grid-template: repeat(3, auto) / 45px 1fr;
    @include roboto-mono(normal, 400);
    font-size: 18px;
    line-height: 32px;
    @include sm {
      padding: 24px;
    }
    p {
      padding-top: 5px;
      padding-left: 10px;
    }
  }

  &__contact-icon {
    width: 45px;
    height: 45px;
    @include flex-vcenter-hcenter;
  }

  &__social {
    display: grid;
    grid-template: repeat(7, 1fr) / 1fr;
    @include sm {
      grid-template: 1fr / repeat(7, 1fr);
    }
  }

  &__icon {
    @include flex-vcenter-hcenter;
  }
}
</style>
