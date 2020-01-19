<template>
  <router-link
    :to="{ name: 'delegate-details', params: { username: username } }"
  >
    <div
      class="wallet flex flex-row p-2 border rounded hover:bg-gray-100 cursor-pointer m-2 shadow"
      title="Click to see details of this delegate"
    >
      <div class="flex flex-col ml-6">
        <div class="wallet-address">
          <span class="text-indigo-500" title="Delegate's username"
            ><font-awesome-icon icon="user"
          /></span>
          <span class="ml-3 font-bold">{{ username }}</span>
        </div>
        <div class="wallet-public-key flex">
          <span class="text-yellow-400" title="Delegate's rank"
            ><font-awesome-icon icon="medal"
          /></span>
          <span class="ml-3 text-sm">{{ rank }}</span>
        </div>
        <div class="wallet-balance">
          <span class="text-green-600" title="Delegate's votes"
            ><font-awesome-icon icon="vote-yea"
          /></span>
          <span class="ml-3 font-bold">{{ votes }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

/* Card to demonstrate the principal data of delegates */
@Component
export default class WalletCard extends Vue {
  @Prop({ required: true })
  username!: string;

  @Prop({ required: true })
  rank!: string;

  @Prop({ required: true })
  votes!: string;
}
</script>
