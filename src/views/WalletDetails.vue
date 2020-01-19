<template>
  <div class="wallet-details h-full content-center flex justify-center">
    <Container :flexDirection="'col'">
      <BackButton></BackButton>
      <div class="flex border-b justify-between align-bottom">
        <h3 class="text-lg font-bold border-b">Wallet's details</h3>
        <div class="options-container">
          <span
            class="fav cursor-pointer"
            :title="isFav ? 'Unfav Wallet' : 'Fav Wallet'"
            :class="{ 'text-yellow-500': isFav, 'text-gray-500': !isFav }"
            @click="toggleFav()"
            ><font-awesome-icon icon="star"
          /></span>
          <button
            class="bg-red-500 hover:bg-red-700 p-2 m-2 rounded text-white font-bold"
            @click="deleteWallet()"
          >
            Delete Wallet
          </button>
        </div>
      </div>
      <WalletCard
        :address="wallet.address"
        :publicKey="wallet.publicKey"
        :balance="wallet.balance"
        :isDelegate="wallet.isDelegate ? 'Yes' : 'No'"
      >
      </WalletCard>
      <WalletTransactions
        v-if="wallet !== null"
        :wallet="wallet"
      ></WalletTransactions>
      <WalletVotes v-if="wallet !== null" :wallet="wallet"></WalletVotes>
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
import BackButton from "@/components/common/BackButton.vue";
import { WalletInterface } from "../interfaces/WalletInterface";

@Component({
  components: {
    Container,
    WalletCard,
    WalletTransactions,
    WalletVotes,
    BackButton
  }
})
export default class WalletDetailsView extends Vue {
  service = new WalletService();
  wallet: WalletInterface | null = null;
  isFav: Boolean = false;

  mounted() {
    this.wallet = this.service.getLocalWallet(this.$route.params.address)[0];
    this.isFav = this.service.isWalletFav(this.wallet.address);
  }

  deleteWallet() {
    this.$swal({
      title: "Deleting wallet",
      text: "Are you sure? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      const wallets = this.service.getAllLocalWallets();
      const newWalletsArray = wallets.filter(
        obj => obj.address != this.wallet.address
      );
      this.service.setLocalWallets(newWalletsArray);
      if (result.value) {
        this.$swal("Deleted!", "the wallet has been deleted.", "success").then(
          () => {
            this.$router.push("/wallets");
          }
        );
      }
    });
  }

  toggleFav() {
    this.isFav = !this.isFav;
    if (this.isFav) {
      this.service.favWallet(this.wallet.address);
    } else {
      this.service.unfavWallet(this.wallet.address);
    }
  }
}
</script>
