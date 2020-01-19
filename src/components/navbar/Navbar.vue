<template>
  <div
    class="navbar w-full flex p-3 justify-between shadow-xl bg-gray-100 border"
  >
    <div class="brand font-bold p-3 mr-5">
      Ark <span class="text-red-600">Wallet</span>
    </div>
    <div class="items-container flex flex-row">
      <NavbarItem :label="'Home'" :route="'/'" />
      <NavbarItem :label="'Wallets'" :route="'/wallets'" />
      <NavbarItem :label="'Delegates'" :route="'/delegates'" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NavbarItem from "./NavbarItem.vue";
import { Component } from "vue-property-decorator";
/* Main navbar styled component*/
@Component({
  components: {
    NavbarItem
  }
})
export default class Navbar extends Vue {}
</script>
