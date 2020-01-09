<template>
  <div class="about h-full flex justify-center">
    <Container>
      <h1>This is an about page</h1>
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
export default class AboutView extends Vue {}
</script>
