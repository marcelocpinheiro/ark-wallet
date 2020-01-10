<template>
  <div class="home h-full flex justify-center">
    <Container :flexDirection="'col'">
      <h3 class="font-bold text-lg border-b">
        Welcome to the Ark Wallet Application
      </h3>
      <p class="mb-6">In this application, you can:</p>
      <ul class="list-inside mb-6">
        <li>* Importing a wallet based on address / public key</li>
        <li>* Generating a new wallet with a random passphrase</li>
        <li>* See a list of transactions for the given wallet</li>
        <li>
          * Fetch a list of delegates and show who a wallet votes for (if
          voting)
        </li>
        <li>* Favorite wallets</li>
        <li>* Delete imported Wallets</li>
      </ul>

      <p>Enjoy!</p>
    </Container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Container from "@/components/common/Container.vue";
import { Component } from "vue-property-decorator";

//Nothing special in this component

@Component({
  components: {
    Container
  }
})
export default class HomeView extends Vue {}
</script>
