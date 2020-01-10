<template>
  <div class="generate-wallet h-full content-center flex justify-center">
    <Container :flexDirection="'col'">
      <h3 class="text-lg font-bold border-b">Generating a new wallet</h3>

      <div class="mx-6 p-6 text-center" v-if="null == wallet">
        <ul>
          <Spinner size="small"></Spinner>
          <li
            v-for="status in statuses"
            :key="status.text"
            :class="{ 'font-bold': status.done }"
          >
            {{ status.text }}
            <span class="text-green-500" v-if="status.done"
              ><font-awesome-icon icon="check"
            /></span>
          </li>
        </ul>
      </div>
      <div class="mx-6 p-6 text-center" v-if="null != wallet">
        <p class="font-bold">Wallet generated!</p>

        <div class="mt-6 text-left overflow-x-auto">
          <p class="my-5">
            <span class="font-bold">Address:</span><br />
            {{ wallet.address }}
          </p>
          <p class="my-5">
            <span class="font-bold">Public Key:</span><br />
            {{ wallet.publicKey }}
          </p>
          <p class="my-5">
            <span class="font-bold">Password:</span><br />
            {{ wallet.passphrase }}
          </p>
          <p class="my-5">
            <span class="font-bold">Entropy:</span><br />
            {{ wallet.entropy }}
          </p>
          <p class="my-5">
            <span class="font-bold">WIF:</span><br />
            {{ wallet.wif }}
          </p>
          <div class="flex justify-between">
            <button
              class="bg-gray-300 rounded hover:bg-gray-400 font-bold p-4"
              @click="print()"
            >
              Print
            </button>

            <button
              class="bg-blue-300 rounded hover:bg-blue-400 font-bold p-4"
              @click="goTo(`/wallet-details/${wallet.address}`)"
            >
              Wallet details
            </button>

            <button
              class="bg-gray-300 rounded hover:bg-gray-400 font-bold p-4"
              @click="goTo(`/wallets`)"
            >
              Wallets list
            </button>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Container from "@/components/common/Container.vue";
const Spinner = require("vue-simple-spinner");
const Entropy = require("more-entropy");
import Cryptography from "@/utils/Cryptography";
import { WalletInterface } from "../interfaces/WalletInterface";
import WalletService from "@/services/wallets.service";

@Component({
  components: {
    Container,
    Spinner
  }
})
export default class GenerateWalletView extends Vue {
  wallet: WalletInterface | null = null;
  statuses = [{ text: "Generating secure password", done: false }];
  private cryptography = new Cryptography();
  private service = new WalletService();

  mounted() {
    new Entropy.Generator().generate(2048, (values: any) => {
      this.statuses[0].done = true;
      this.statuses.push({ text: "Creating secret keys", done: false });
      setTimeout(() => {
        const wallet = this.cryptography.generateWalletKeys(
          values.slice(0, 16)
        );
        this.statuses[1].done = true;
        this.statuses.push({ text: "Configuring last details", done: false });
        setTimeout(() => {
          this.wallet = wallet;
          const wallets = this.service.getAllLocalWallets();
          wallets.push({
            address: this.wallet.address,
            publicKey: this.wallet.publicKey,
            balance: 0,
            isDelegate: false
          });
          this.service.setLocalWallets(wallets);
        }, 3000);
      }, 3000);
    });
  }

  print() {
    window.print();
  }

  goTo(route: string) {
    this.$router.push(route);
  }
}
</script>
