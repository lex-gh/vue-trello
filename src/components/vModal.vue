<template>
  <div
    v-if="isShowModal"
    v-click-outside="hideModal"
    class="fixed top-0 right-0 left-0 bottom-0 bg-slate-600/40 flex items-start justify-center z-[9999]">
    <div
      class="max-w-[450px] w-full min-h-[100px] top-1/4 relative bg-white rounded-md p-2 mx-4">
      <div class="w-full text-slate-700 font-bold text-xl">
        <slot name="title"></slot>
        <button
          @click="hideModal"
          class="material-icons close float-right"></button>
      </div>
      <slot name="body" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const isShowModal = computed(() => {
  return store.state.ui.modalShow;
});

const hideModal = () => {
  store.commit("ui/hideModal");
};
</script>

<style lang="scss" scoped></style>
