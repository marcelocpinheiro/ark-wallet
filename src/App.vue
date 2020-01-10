<template>
  <div id="app w-full">
    <Navbar></Navbar>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Navbar from "./components/navbar/Navbar.vue";
import Footer from "./components/footer/Footer.vue";

@Component({
  components: { Navbar, Footer }
})
export default class App extends Vue {}
</script>
