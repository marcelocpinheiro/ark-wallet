<template>
  <div class="delegate-details h-full content-center flex justify-center">
    <Container :flexDirection="'col'">
      <BackButton></BackButton>
      <h3 class="font-bold text-lg border-b">Delegate Details</h3>
      <Loading v-if="isLoading"></Loading>
      <DelegatesCard
        :rank="delegate.rank"
        :username="delegate.username"
        :votes="delegate.votes"
      ></DelegatesCard>
      <div
        class="delegate-details flex flex-col overflow-x-auto"
        v-if="!isLoading"
      >
        <p class="my-3">
          <span class="font-bold">Produced Blocks:</span><br />
          {{ delegate.blocks.produced }}
        </p>

        <p class="my-3">
          <span class="font-bold">Last block id:</span><br />
          {{ delegate.blocks.last.id }}
        </p>

        <p class="my-3">
          <span class="font-bold">Last block height:</span><br />
          {{ delegate.blocks.last.height }}
        </p>

        <p class="my-3">
          <span class="font-bold">Last block date:</span><br />
          {{ delegate.blocks.last.timestamp.human }}
        </p>
      </div>
    </Container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import DelegatesCard from "@/components/delegates/DelegatesCard.vue";
import DelegateInterface from "@/interfaces/DelegateInterface";
import Loading from "@/components/common/Loading.vue";
import Container from "@/components/common/Container.vue";
import DelegatesService from "@/services/delegates.service";
import BackButton from "@/components/common/BackButton.vue";

@Component({
  components: {
    DelegatesCard,
    Container,
    BackButton,
    Loading
  }
})
export default class DelegateDetailsView extends Vue {
  private service = new DelegatesService();
  private delegate: DelegateInterface = {};
  private isLoading = true;

  async mounted() {
    const data = await this.service.getDelegate(this.$route.params.username);
    this.delegate = data.data;
    this.isLoading = false;
  }
}
</script>
