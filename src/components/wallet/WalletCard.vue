<template>
  <router-link :to="`/wallet-details/${address}`">
    <div
      class="wallet flex flex-row p-4 border rounded hover:bg-gray-100 cursor-pointer my-2 shadow overflow-x-auto"
      title="Click to see details of this wallet"
    >
      <div class="flex flex-col ml-6">
        <div class="wallet-address flex justify-between w-full">
          <div class="wallet-address-text ">
            <span class="text-indigo-500" title="Wallet address"
              ><font-awesome-icon icon="address-card"
            /></span>
            <span class="ml-3 font-bold break-words">{{ address }}</span>
          </div>

          <span
            class="fav cursor-pointer text-right"
            v-if="isFav !== null"
            :title="isFav ? 'Favorite Wallet' : ''"
            :class="{ 'text-yellow-500': isFav, 'text-gray-500': !isFav }"
            ><font-awesome-icon icon="star"
          /></span>
        </div>
        <div class="wallet-public-key flex">
          <span class="text-yellow-400" title="Public Key"
            ><font-awesome-icon icon="key"
          /></span>
          <span class="ml-3 text-sm break-words w-full">{{ publicKey }}</span>
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

/* Wallet card showing the main information */
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

  @Prop({ default: null })
  isFav!: Boolean | null;
}
</script>
