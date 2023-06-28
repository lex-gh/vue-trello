<template>
  <div class="min-w-0 flex-auto overflow-auto">
    <div v-if="!cols.length" class="p-4">
      <div class="leading-10 text-center">
        <h3 class="text-2xl mb-4">Привет 👋</h3>
        <p class="text-xl">Создайте свою первую доску 💼</p>
      </div>
    </div>
    <div v-else class="p-4">
      <Container
        drag-handle-selector=".column-drag-handle"
        orientation="horizontal"
        :drop-placeholder="upperDropPlaceholderOptions"
        @drop="onDrop">
        <Draggable v-for="col in cols" :key="col.id">
          <v-card-container :item="col" />
        </Draggable>
      </Container>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import vCardContainer from "@/components/vCardContainer.vue";
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag } from "@/utils";
import { useStore } from "vuex";

const store = useStore();
const upperDropPlaceholderOptions = ref({
  className: "cards-drop-preview",
  animationDuration: "150",
  showOnTop: true,
});
const cols = computed({
  get() {
    return store.state.tasks.boards;
  },
  set(value) {
    store.commit("tasks/updateCols", value);
  },
});

const onDrop = (dropResult) => {
  cols.value = applyDrag(cols.value, dropResult);
};
</script>
