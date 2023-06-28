<template>
  <div class="w-full pt-4 flex flex-col">
    <input
      v-model="formValue.title"
      class="h-8 mb-2 px-2 text-md outline-none rounded-md"
      type="text"
      placeholder="Заголовок" />
    <textarea
      v-model="formValue.description"
      class="h-[100px] p-2 text-sm outline-none rounded-md"
      cols="30"
      rows="7"
      placeholder="Описание"></textarea>
    <div class="flex gap-2 py-3">
      <button
        @click="handlerForm"
        :class="[
          { 'bg-green-600/40 pointer-events-none': isDisabled },
          'flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md',
        ]">
        Сохранить
      </button>
      <button
        @click="$emit('clickHide')"
        class="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md">
        Закрыть
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, defineEmits, computed } from "vue";

const emit = defineEmits(["createCard", "clickHide"]);
const formValue = reactive({
  title: "",
  description: "",
});

const isDisabled = computed(() => {
  return !(formValue.title && formValue.description);
});

const handlerForm = () => {
  if (!(formValue.title && formValue.description)) return;
  emit("createCard", formValue);
  emit("clickHide");
};
</script>

<style lang="scss" scoped></style>
