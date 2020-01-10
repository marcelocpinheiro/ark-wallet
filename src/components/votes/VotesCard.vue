<template>
  <div
    class="votes-card rounded border shadow p-3 my-2 flex flex-col overflow-x-auto"
  >
    <div class="id-container">
      <span class="font-bold">ID:</span> {{ voteId }}
    </div>
    <div class="delegate-container cursor-pointer">
      <span class="font-bold">Delegate:</span>
      <span class="text-blue-600 ml-3"
        ><router-link :to="`/delegate-details/${delegate.username}`">{{
          delegate.username
        }}</router-link></span
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import DelegatesCard from "@/components/delegates/DelegatesCard.vue";
import Container from "@/components/common/Container.vue";
import DelegatesService from "@/services/delegates.service";

@Component({
  components: {
    DelegatesCard,
    Container
  }
})
export default class VotesCard extends Vue {
  private service = new DelegatesService();
  private delegate = {
    username: "Loading ..."
  };

  @Prop({ required: true })
  voteId!: string;

  @Prop({ required: true })
  voteAsset!: any;

  async mounted() {
    const data = await this.service.getDelegate(
      this.voteAsset.votes[0].slice(1)
    );
    this.delegate = data.data;
  }
}
</script>
