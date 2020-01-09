<template>
  <div class="delegate-details h-full content-center flex justify-center">
    <Container :flexDirection="'col'">
      <h3 class="font-bold text-lg border-b">Delegate Details</h3>
      <DelegatesCard
        :rank="delegate.rank"
        :username="delegate.username"
        :votes="delegate.votes"
      ></DelegatesCard>
    </Container>
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
export default class DelegateDetailsView extends Vue {
  private service = new DelegatesService();
  private delegate = {};

  async mounted() {
    const data = await this.service.getDelegate(this.$route.params.username);
    this.delegate = data.data;
  }
}
</script>
