export const ui = {
  namespaced: true,
  state: () => ({
    modalShow: false,
  }),

  mutations: {
    showModal(state) {
      state.modalShow = !state.modalShow;
    },
    hideModal(state) {
      state.modalShow = false;
    },
  },
  actions: {},
  getters: {},
};
