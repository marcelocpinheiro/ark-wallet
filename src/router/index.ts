import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/Home.vue";
import WalletsView from "@/views/Wallets.vue";
import WalletDetailsView from "@/views/WalletDetails.vue";
import DelegatesView from "@/views/Delegates.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue")
  },
  {
    path: "/wallets",
    name: "wallets",
    component: WalletsView
  },
  {
    path: "/wallet-details/:address",
    name: "wallet-details",
    component: WalletDetailsView
  },
  {
    path: "/delegates",
    name: "delegates",
    component: DelegatesView
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
