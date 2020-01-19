<template>
  <div class="wallet-transactions">
    <h3 class="text-lg font-bold border-b my-3">
      Wallet's transactions <font-awesome-icon icon="file-invoice-dollar" />
    </h3>
    <div
      class="transaction-card rounded border shadow p-3 my-2 flex flex-col cursor-pointer overflow-x-auto"
      v-for="(transaction, index) in transactions"
      :key="transaction.id"
      @click="showTransactionDetails(index)"
    >
      <div class="id-container">
        <span class="font-bold">ID:</span> {{ transaction.id }}
      </div>
      <div class="amount-container">
        <span class="font-bold">Amount: </span> {{ transaction.amount }}
      </div>
    </div>
    <Pagination
      v-if="transactions.length > 0"
      :numberOfPages="metadata.pageCount"
      :activePage="activePage"
      @page-click="handleClick"
      :showFirstAndLastButton="true"
      :showPreviousAndNextButton="true"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Pagination from "../common/Pagination.vue";
import WalletsService from "@/services/wallets.service";
import TransactionInterface from "@/interfaces/TransactionInterface";

/* Component that lists a wallet transactions and its details */
@Component({
  components: {
    Pagination
  }
})
export default class WalletTransactions extends Vue {
  @Prop({ type: Object, required: true })
  wallet!: any;

  @Prop({ type: Number, default: 5 })
  limit!: Number;

  private transactions: Array<TransactionInterface> = [];
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

  showTransactionDetails(index: number) {
    const t = this.transactions[index];
    const date = new Date(t.timestamp.unix * 1000);
    const formatteddate = `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()} ${
      t.timestamp.human.split("T")[1].split(".")[0]
    }`;

    //Ideally, I would create a modal component with a slot.
    this.$swal({
      title: "Transaction Details",
      width: 700,
      html: `
        <p class="text-left mb-2 border-b"><span class="font-bold">ID:</span> ${t.id}</p>
        <p class="text-left mb-2 border-b"><span class="font-bold">Block ID:</span> ${t.blockId}</p>
        <p class="text-left mb-2 border-b"><span class="font-bold">Amount:</span> ${t.amount}</p>
        <p class="text-left mb-2 border-b"><span class="font-bold">Fee:</span> ${t.fee}</p>
        <p class="text-left mb-2 border-b"><span class="font-bold">Sender Address:</span> ${t.sender}</p>
        <p class="text-left mb-2 border-b"><span class="font-bold">Recipient Address:</span> ${t.recipient}</p>
        <p class="text-left mb-2 border-b"><span class="font-bold">Signature:</span> ${t.signature}</p>
        <p class="text-left mb-2 border-b"><span class="font-bold">Date and time:</span> ${formatteddate}</p>
      `
    });
  }
}
</script>
