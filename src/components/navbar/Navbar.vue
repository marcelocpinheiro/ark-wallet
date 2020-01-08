<template>
  <div class="navbar w-auto flex  p-3 justify-between shadow-xl bg-gray-100">
    <div class="brand font-bold p-3 mr-5">
      Ark <span class="text-red-600">Wallet</span>
    </div>
    <div class="items-container flex flex-row">
      <NavbarItem :label="'Home'" :route="'/'"></NavbarItem>
      <NavbarItem :label="'Wallets'" :route="'/wallets'"></NavbarItem>
      <NavbarItem :label="'About'" :route="'/about'"></NavbarItem>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NavbarItem from "./NavbarItem.vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {
    NavbarItem
  }
})
export default class Navbar extends Vue {}
</script>
