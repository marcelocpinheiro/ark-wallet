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

/* Nav Item*/

@Component
export default class NavbarItem extends Vue {
  @Prop({ type: String, default: "Label" })
  label!: string;

  @Prop({ type: String, default: "/home" })
  route!: string;
}
</script>
