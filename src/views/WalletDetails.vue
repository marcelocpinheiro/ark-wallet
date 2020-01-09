<template>
  <div class="wallet-details h-full content-center flex justify-center">
    <Container :flexDirection="'col'">
      <h3 class="text-lg font-bold border-b">Wallet's details</h3>
      <WalletCard
        :address="wallet.address"
        :publicKey="wallet.publicKey"
        :balance="wallet.balance"
        :isDelegate="wallet.isDelegate ? 'Yes' : 'No'"
      >
      </WalletCard>
      <WalletTransactions :wallet="wallet"></WalletTransactions>
      <WalletVotes :wallet="wallet"></WalletVotes>
    </Container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Container from "@/components/common/Container.vue";
import WalletService from "@/services/wallets.service";
import WalletCard from "@/components/wallet/WalletCard.vue";
import WalletTransactions from "@/components/wallet/WalletTransactions.vue";
import WalletVotes from "@/components/wallet/WalletVotes.vue";

@Component({
  components: {
    Container,
    WalletCard,
    WalletTransactions,
    WalletVotes
  }
})
export default class WalletDetailsView extends Vue {
  service = new WalletService();
  wallet = {};

  mounted() {
    this.wallet = this.service.getLocalWallet(this.$route.params.address)[0];
  }
}
</script>
