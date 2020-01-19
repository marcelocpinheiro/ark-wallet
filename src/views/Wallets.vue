<template>
  <div class="wallets h-full content-center flex justify-center">
    <Container :flexDirection="'col'">
      <div class="add-wallet-form-container w-full">
        <input
          type="text"
          v-model="walletKey"
          class="p-2 w-4/5 focus:outline-none focus:shadow-outline border outline-none border-gray-300 rounded-lg rounded-r-none"
          placeholder="Type Wallet address/public key to import"
        />
        <button
          @click="getWallet()"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-1/5 rounded-l-none"
        >
          <span title="Import wallet"
            ><font-awesome-icon icon="cloud-download-alt"
          /></span>
        </button>
      </div>
      <p class="mx-5 text-center font-bold">or</p>
      <div class="mx-5 flex justify-center">
        <button
          @click="generateWallet()"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-2/5 rounded"
        >
          Generate a new one <font-awesome-icon icon="plus" />
        </button>
      </div>
      <div
        class="title-and-search-container flex flex-row justify-between mt-10 border-b"
      >
        <h3 class="text-lg font-bold">
          <select v-model="showType">
            <option value="all">All</option>
            <option value="fav">Favorite</option>
          </select>
          Wallets
        </h3>
        <input
          type="text"
          v-model="searchWallet"
          class="p-2 w-2/5 focus:outline-none bg-transparent"
          placeholder="Search"
        />
      </div>
      <div class="wallets-list mt-2" v-if="!isLoading">
        <p v-if="wallets && wallets.length == 0">{{ emptyMessage }}</p>
      </div>
      <div v-if="wallets && wallets.length > 0 && !isLoading">
        <WalletCard
          v-for="wallet in wallets"
          :key="wallet.address"
          :publicKey="wallet.publicKey"
          :address="wallet.address"
          :balance="`${wallet.balance}`"
          :isFav="isFav(wallet.address)"
          :isDelegate="wallet.isDelegate ? 'Yes' : 'No'"
        />
      </div>
      <div class="wallets-list-loading mt-2" v-if="isLoading">
        <Loading />
      </div>
    </Container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Container from "@/components/common/Container.vue";
import Loading from "@/components/common/Loading.vue";
import { Component, Watch } from "vue-property-decorator";
import WalletsService from "@/services/wallets.service";
import WalletCard from "@/components/wallet/WalletCard.vue";
import { WalletInterface } from "../interfaces/WalletInterface";

@Component({
  components: {
    Container,
    Loading,
    WalletCard
  }
})
export default class WalletsView extends Vue {
  private wallets: Array<WalletInterface> = [];
  private searchWallets: Array<WalletInterface> = [];
  private walletKey = "";
  private searchWallet = "";
  private service = new WalletsService();
  private isLoading = false;
  private emptyMessage = "No Wallets found";
  private showType = "all";

  mounted() {
    this.wallets = this.searchWallets = this.service.getAllLocalWallets();
  }

  // just to exemplify an use for watcher. Could be done with v-on:change. Not sure if this is the better possible example :p
  @Watch("searchWallet")
  onSearchWalletChanged(value: string, oldValue: string) {
    this.findWallet();
  }

  @Watch("showType")
  onShowTypeChanged(value: string, oldValue: string) {
    if (value == "all") this.wallets = this.searchWallets;

    if (value == "fav") {
      const favWallets = this.service.getFavWalletsAddresses();
      this.wallets = this.searchWallets.filter(obj => {
        if (obj && obj.address) {
          return favWallets.includes(obj.address);
        }
      });
    }
  }

  async getWallet() {
    this.isLoading = true;

    //only run if the user actually typed something
    if (this.walletKey.length > 0) {
      //prevent duplicated wallet imports
      if (this.service.getLocalWallet(this.walletKey).length > 0) {
        this.$swal(
          "Duplicated wallet",
          "You have already imported this wallet",
          "error"
        );
      } else {
        try {
          const ret = await this.service.getWallet(this.walletKey);
          if (typeof ret.error !== "undefined") {
            this.$swal(ret.error, ret.message, "error");
          } else {
            this.wallets.push(ret.data);
            this.service.setLocalWallets(this.wallets);
          }
        } catch (e) {
          this.$swal("Unknown error", "Please, try again", "error");
        }
      }
    } else {
      this.$swal("Wallet address or public key is required", "", "error");
    }
    this.isLoading = false;
  }

  generateWallet() {
    this.$router.push({ name: "generate-wallet" });
  }

  isFav(walletAddress: string) {
    return this.service.isWalletFav(walletAddress);
  }

  findWallet() {
    if (this.searchWallet.length > 0) {
      this.emptyMessage = `No wallets found with the search "${this.searchWallet}"`;
      if (this.wallets && this.searchWallets) {
        this.wallets = this.searchWallets.filter(obj => {
          if (
            obj.address &&
            obj.address.toUpperCase().includes(this.searchWallet.toUpperCase())
          )
            return obj;
          if (
            obj.publicKey &&
            obj.publicKey
              .toUpperCase()
              .includes(this.searchWallet.toUpperCase())
          )
            return obj;
        });
      }
    } else {
      this.wallets = this.searchWallets;
    }
  }
}
</script>
