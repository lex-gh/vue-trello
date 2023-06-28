<template>
  <div
    class="w-[280px] max-h-[100vh] m-2 mr-8 p-2 bg-gray-200 shadow-sm rounded">
    <div class="flex items-center gap-2 select-none py-2">
      <span
        class="column-drag-handle material-icons drag_indicator cursor-move text-gray-700"></span>
      <div
        class="text-xl font-medium text-gray-700 overflow-hidden text-ellipsis"
        :title="item.name">
        {{ item.name }}
      </div>
      <button
        @click="deleteBoard(item.id)"
        class="material-icons delete ml-auto text-gray-300 hover:text-red-500/90 transition"></button>
    </div>
    <Container
      class="container max-h-[360px] overflow-y-auto pr-1"
      group-name="col"
      orientation="vertical"
      drag-class="card-ghost"
      drop-class="card-ghost-drop"
      :drop-placeholder="dropPlaceholderOptions"
      :get-child-payload="getCardPayload(item.id)"
      @drop="(e) => onCardDrop(item.id, e)">
      <Draggable v-for="task in item.tasks" :key="task.id">
        <v-card-item :card="task" @deleteCard="deleteCard($event, item.id)" />
      </Draggable>
    </Container>
    <div
      @click="isForm = !isForm"
      v-show="!isForm"
      class="flex items-center py-2 text-md text-gray-500 cursor-pointer">
      <i class="material-icons add"></i>Добавить задачу
    </div>
    <v-card-form
      v-if="isForm"
      @clickHide="isForm = false"
      @createCard="createCard($event, item.id)" />
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from "vue";
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag } from "@/utils";
import vCardItem from "@/components/vCardItem.vue";
import vCardForm from "@/components/vCardForm.vue";
import { useStore } from "vuex";

const store = useStore();
const isForm = ref(false);
const dropPlaceholderOptions = ref({
  className: "drop-preview",
  animationDuration: "150",
  showOnTop: true,
});
const props = defineProps({
  item: {
    type: Object,
  },
});

const getCardPayload = (columnId) => {
  return (index) => {
    return store.getters["tasks/getCols"].filter((p) => p.id === columnId)[0]
      .tasks[index];
  };
};

const onCardDrop = (columnId, dropResult) => {
  if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
    const scene = store.getters["tasks/getCols"];
    const column = scene.filter((p) => p.id === columnId)[0];
    const columnIndex = scene.indexOf(column);

    const newColumn = Object.assign({}, column);

    newColumn.tasks = applyDrag(newColumn.tasks, dropResult);

    scene.splice(columnIndex, 1, newColumn);
    store.commit("tasks/updateTasks", scene);
  }
};

const createCard = (value, column) => {
  store.commit("tasks/createTask", { value, column });
};

const deleteBoard = (id) => {
  if (props.item.tasks.length !== 0) {
    let isTask = confirm("Остались не закрытые задачи. Все равно удалить?");
    if (isTask) store.commit("tasks/deleteBoard", id);
  } else {
    store.commit("tasks/deleteBoard", id);
  }
};

const deleteCard = (taskID, colsID) => {
  store.commit("tasks/deleteTask", { taskID, colsID });
};
</script>

<style>
.container::-webkit-scrollbar {
  width: 6px;
  background: #eee;
}
.container::-webkit-scrollbar-thumb {
  background: rgba(197, 197, 197, 0.466);
  border-radius: 20px;
}
</style>
