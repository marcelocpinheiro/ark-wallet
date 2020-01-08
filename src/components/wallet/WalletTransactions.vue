<template>
  <div class="wallet-transitions">
    <h3 class="text-lg font-bold border-b my-3">
      Wallet's transactions <font-awesome-icon icon="file-invoice-dollar" />
    </h3>
    <div
      class="transaction-card rounded border shadow p-3 my-2 flex flex-col cursor-pointer"
      v-for="transaction in transactions"
      :key="transaction.id"
    >
      <div class="id-container">
        <span class="font-bold">ID:</span> {{ transaction.id }}
      </div>
      <div class="amount-container">
        <span class="font-bold">Amount: </span> {{ transaction.amount }}
      </div>
    </div>
    <Pagination
      :numberOfPages="metadata.pageCount"
      :activePage="activePage"
      @page-click="handleClick"
      :showFirstAndLastButton="true"
      :showPreviousAndNextButton="true"
    ></Pagination>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Pagination from "../common/Pagination.vue";
import WalletsService from "@/services/wallets.service";

@Component({
  components: {
    Pagination
  }
})
export default class WalletTransactions extends Vue {
  @Prop({ required: true })
  wallet!: any;

  @Prop({ default: 5 })
  limit!: Number;

  private transactions = [];
  private metadata = {};
  private service = new WalletsService();
  private activePage = 1;

  async mounted() {
    try {
      const ret = await this.service.getWalletTransactions(this.wallet.address);
      if (typeof ret.error !== "undefined") {
        this.$swal(ret.error, ret.message, "error");
      } else {
        this.metadata = ret.meta;
        this.transactions = ret.data;
      }
    } catch (e) {
      this.$swal("Unknown error", "Please, try again", "error");
    }
  }

  async handleClick(data: any) {
    const ret = await this.service.getWalletTransactions(
      this.wallet.address,
      5,
      data
    );
    if (typeof ret.error !== "undefined") {
      this.$swal(ret.error, ret.message, "error");
    } else {
      this.metadata = ret.meta;
      this.transactions = ret.data;
      this.activePage = parseInt(data);
    }
  }
}
</script>
