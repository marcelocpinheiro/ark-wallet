import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/wallets",
    name: "wallets",
    component: () => import("../views/Wallets.vue")
  },
  {
    path: "/wallet-details/:address",
    name: "wallet-details",
    component: () => import("../views/WalletDetails.vue")
  },
  {
    path: "/delegates",
    name: "delegates",
    component: () => import("../views/Delegates.vue")
  },
  {
    path: "/delegate-details/:username",
    name: "delegate-details",
    component: () => import("../views/DelegateDetails.vue")
  },
  {
    path: "/generate-wallet",
    name: "generate-wallet",
    component: () => import("../views/GenerateWallet.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
