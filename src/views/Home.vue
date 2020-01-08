<template>
  <div class="home h-screen flex justify-center">
    <Container>
      <h3>Welcome to the Ark Wallet Application</h3>
    </Container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Container from "@/components/common/Container.vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {
    Container
  }
})
export default class HomeView extends Vue {}
</script>
