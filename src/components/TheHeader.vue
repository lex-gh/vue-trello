<template>
  <header class="w-full bg-gray-100 border-b-[0.5px] border-gray-300">
    <div class="container-xl h-[60px] mx-auto px-4 flex items-center">
      <div class="logo text-2xl md:text-3xl font-bold text-gray-700">
        Vuello<span class="w-2 h-2 rounded-lg bg-red-600 inline-block"></span>
      </div>
      <button
        @click="showModal"
        :class="{ 'create-board': !store.state.tasks.boards.length }"
        class="flex items-center px-3 py-1 ml-auto bg-red-500 hover:bg-red-600 rounded-md outline-none cursor-pointer transition-all border-none"
        title="create new board">
        <i class="material-icons edit text-xl text-white mr-0 md:mr-2"></i>
        <span class="text-white font-normal hidden md:block"
          >Добавить доску</span
        >
      </button>
      <div class="dropdown ml-1 flex items-center relative">
        <button
          @click="isShowSettingMenu = !isShowSettingMenu"
          class="material-icons settings ml-4 text-gray-700 text-3xl"
          title="setting"></button>
        <div
          v-show="isShowSettingMenu"
          class="content absolute top-12 right-0 w-min bg-white shadow-md px-4 py-2 rounded-md z-[999]">
          <ul>
            <router-link
              to="#"
              class="text-gray-700 flex gap-2 cursor-pointer mb-2"
              ><i class="material-icons settings"></i>Setting</router-link
            >
            <li class="text-gray-700 flex gap-2 cursor-pointer">
              <i class="material-icons logout"></i> Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
  <v-modal>
    <template #title>Создание доски</template>
    <template #body>
      <div class="flex flex-col sm:flex-row pt-2">
        <input
          v-model="board"
          type="text"
          placeholder="Мои задачи"
          class="w-full h-8 shrink grow mb-4 sm:mb-0 border-[1px] px-2 shrink rounded-md border-gray-400 outline-none mr-4" />
        <button
          @click="createBoard"
          class="px-5 py-1 rounded-md text-white bg-green-600 hover:bg-green-700 rounded-md outline-none cursor-pointer border-none">
          Создать
        </button>
      </div>
    </template>
  </v-modal>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
const isShowSettingMenu = ref(false);

const store = useStore();
const board = ref("");
// Methods

const showModal = () => {
  store.commit("ui/showModal");
};

const createBoard = () => {
  store.commit("tasks/createBoard", board.value);
  board.value = "";
  store.commit("ui/showModal");
};
</script>

<style lang="scss" scoped>
.create-board {
  animation: animate-pulse 3s linear;
}

@keyframes animate-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 109, 74, 0.7), 0 0 0 0 rgba(255, 109, 74, 0.7);
  }
  40% {
    box-shadow: 0 0 0 30px rgba(255, 109, 74, 0),
      0 0 0 0 rgba(255, 109, 74, 0.7);
  }
  80% {
    box-shadow: 0 0 0 30px rgba(255, 109, 74, 0),
      0 0 0 30px rgba(255, 109, 74, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 109, 74, 0), 0 0 0 10px rgba(255, 109, 74, 0);
  }
}
</style>
