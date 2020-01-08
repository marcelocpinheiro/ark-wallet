<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Navbar from "./components/navbar/Navbar.vue";

@Component({
  components: { Navbar }
})
export default class App extends Vue {}
</script>
