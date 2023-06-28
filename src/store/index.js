import { createStore } from "vuex";

import { ui } from "./modules/ui";
import { tasks } from "./modules/tasks";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    ui,
    tasks,
  },
});
