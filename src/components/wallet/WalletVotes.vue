<template>
  <div class="wallet-votes">
    <h3 class="text-lg font-bold border-b my-3">
      Wallet's Votes <font-awesome-icon icon="thumbs-up" />
    </h3>
    <div
      class="votes-card rounded border shadow p-3 my-2 flex flex-col cursor-pointer"
      v-for="vote in votes"
      :key="vote.id"
    >
      <div class="id-container">
        <span class="font-bold">ID:</span> {{ vote.id }}
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
export default class WalletVotes extends Vue {
  @Prop({ required: true })
  wallet!: any;

  @Prop({ default: 5 })
  limit!: Number;

  private votes = [];
  private metadata = {};
  private service = new WalletsService();
  private activePage = 1;

  async mounted() {
    try {
      const ret = await this.service.getWalletVotes(this.wallet.address);
      if (typeof ret.error !== "undefined") {
        this.$swal(ret.error, ret.message, "error");
      } else {
        this.metadata = ret.meta;
        this.votes = ret.data;
      }
    } catch (e) {
      this.$swal("Unknown error", "Please, try again", "error");
    }
  }

  async handleClick(data: any) {
    const ret = await this.service.getWalletVotes(this.wallet.address, 5, data);
    if (typeof ret.error !== "undefined") {
      this.$swal(ret.error, ret.message, "error");
    } else {
      this.metadata = ret.meta;
      this.votes = ret.data;
      this.activePage = parseInt(data);
    }
  }
}
</script>
