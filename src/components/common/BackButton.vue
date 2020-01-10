<template>
  <div class="backbutton">
    <button
      class="bg-transparent text-blue-500 hover:text-blue-700"
      @click="back()"
    >
      Back
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class BackButton extends Vue {
  back() {
    this.$router.go(-1);
  }
}
</script>
