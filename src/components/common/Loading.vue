<template>
  <div class="loading mx-6">
    <Spinner size="large" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
const Spinner = require("vue-simple-spinner");
import { Component } from "vue-property-decorator";

// Simple loading component, nothing special
@Component({ components: { Spinner } })
export default class Container extends Vue {}
</script>
