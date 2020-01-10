<template>
  <router-link :to="route">
    <div
      class="navbar-item bg-gray-300 rounded p-3 font-bold text-gray-700 cursor-pointer mx-3"
    >
      {{ label }}
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class NavbarItem extends Vue {
  @Prop({ default: "Label" })
  label!: string;

  @Prop({ default: "/home" })
  route!: string;
}
</script>
