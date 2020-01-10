<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

/*
  Created this component to centralize the main container of the application
*/
@Component
export default class Container extends Vue {
  @Prop({ default: "row" })
  flexDirection!: string;

  private classes: Array<any> = [];

  mounted() {
    this.classes = [
      "container",
      "bg-transparent",
      "flex",
      { "flex-row": this.flexDirection == "row" },
      { "flex-col": this.flexDirection == "col" },
      "p-3",
      "lg:w-3/5",
      "md:w-4/5",
      "sm:w-auto",
      "my-8"
    ];
  }
}
</script>
