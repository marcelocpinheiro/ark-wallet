<template>
  <router-link :to="`/wallet-details/${address}`">
    <div
      class="wallet flex flex-row p-4 border rounded hover:bg-gray-100 cursor-pointer my-2 shadow"
      title="Click to see details of this wallet"
    >
      <div class="flex flex-col ml-6">
        <div class="wallet-address">
          <span class="text-indigo-500" title="Wallet address"
            ><font-awesome-icon icon="address-card"
          /></span>
          <span class="ml-3 font-bold">{{ address }}</span>
        </div>
        <div class="wallet-public-key flex">
          <span class="text-yellow-400" title="Public Key"
            ><font-awesome-icon icon="key"
          /></span>
          <span class="ml-3 text-sm">{{ publicKey }}</span>
        </div>
        <div class="wallet-balance">
          <span class="text-green-600" title="Wallet Balance"
            ><font-awesome-icon icon="money-bill"
          /></span>
          <span class="ml-3 font-bold">{{ balance }}</span>
        </div>
        <div class="wallet-delegate">
          <span class="text-gray-700 font-bold" title="Is Wallet Delegate?"
            >Is Delegate?
          </span>
          <span class="ml-1">{{ isDelegate }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class WalletCard extends Vue {
  @Prop({ required: true })
  address!: string;

  @Prop({ required: true })
  publicKey!: string;

  @Prop({ required: true })
  balance!: string;

  @Prop({ required: true })
  isDelegate!: string;
}
</script>
