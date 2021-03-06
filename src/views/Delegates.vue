<template>
  <div class="delegates h-full content-center flex justify-center">
    <Container :flexDirection="'col'">
      <h3 class="font-bold text-lg border-b">Delegates</h3>

      <Loading v-if="isLoading" />

      <div class="delegates-list flex flex-wrap" v-if="!isLoading">
        <DelegatesCard
          v-for="delegate in delegates"
          :key="delegate.address"
          :username="delegate.username"
          :rank="delegate.rank"
          :votes="delegate.votes"
        />
      </div>

      <Pagination
        :numberOfPages="metadata.pageCount"
        :activePage="activePage"
        @page-click="handleClick"
        :showFirstAndLastButton="true"
        :showPreviousAndNextButton="true"
      />
    </Container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Container from "@/components/common/Container.vue";
import Loading from "@/components/common/Loading.vue";
import Pagination from "@/components/common/Pagination.vue";
import { Component } from "vue-property-decorator";
import DelegatesService from "@/services/delegates.service";
import DelegatesCard from "@/components/delegates/DelegatesCard.vue";

@Component({
  components: {
    Container,
    Loading,
    Pagination,
    DelegatesCard
  }
})
export default class DelegatesView extends Vue {
  private service = new DelegatesService();
  private delegates = [];
  private metadata = {};
  private activePage = 1;
  private isLoading = true;

  async mounted() {
    try {
      const ret = await this.service.getAllDelegates();
      if (typeof ret.error !== "undefined") {
        this.$swal(ret.error, ret.message, "error");
      } else {
        this.metadata = ret.meta;
        this.delegates = ret.data;
      }
    } catch (e) {
      this.$swal("Unknown error", "Please, try again", "error");
    }
    this.isLoading = false;
  }

  async handleClick(data: any) {
    this.isLoading = true;
    const ret = await this.service.getAllDelegates(51, data);
    if (typeof ret.error !== "undefined") {
      this.$swal(ret.error, ret.message, "error");
    } else {
      this.metadata = ret.meta;
      this.delegates = ret.data;
      this.activePage = parseInt(data);
    }
    this.isLoading = false;
  }
}
</script>
