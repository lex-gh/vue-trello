import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import VueFire from "vuefire";

import "./style.scss";
import vModalVue from "./components/vModal.vue";

const clickOutside = {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = (event) => {
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!(el == event.target && el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: (el) => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

store.subscribe((mutation, state) => {
  localStorage.setItem("boards", JSON.stringify(state.tasks.boards));
});

const app = createApp(App);
// app.use(VueFire)
app.use(store);
app.use(router);
app.component("v-modal", vModalVue);
app.directive("click-outside", clickOutside);
app.mount("#app");
