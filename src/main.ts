import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "@/assets/css/tailwind.css";

//Some import are working besides of the modules not being found by the IDE.
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAddressCard,
  faCloudDownloadAlt,
  faKey,
  faMoneyBill,
  faWallet,
  faArrowRight,
  faArrowLeft,
  faFileInvoiceDollar,
  faThumbsUp,
  faUser,
  faMedal,
  faVoteYea,
  faPlus,
  faCheck,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.config.productionTip = false;
Vue.use(VueSweetalert2);
library.add([
  faAddressCard,
  faCloudDownloadAlt,
  faKey,
  faMoneyBill,
  faWallet,
  faArrowRight,
  faArrowLeft,
  faFileInvoiceDollar,
  faThumbsUp,
  faUser,
  faMedal,
  faVoteYea,
  faPlus,
  faCheck,
  faStar
]);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
