<template>
  <div class="w-full p-2 bg-white shadow-sm rounded mb-3 relative">
    <div class="text-md text-gray-700 flex items-center justify-between">
      {{ card.title }}
      <i
        @click="$emit('deleteCard', card.id)"
        class="material-icons delete text-gray-300 hover:text-red-500 cursor-pointer"></i>
    </div>
    <p class="text-sm text-gray-600 pt-2 pb-3">{{ card.description }}</p>
    <div v-if="card.date" class="text-xs text-gray-400 flex items-center">
      <i class="material-icons schedule text-xs mr-1"></i>
      <!-- {{ localeDate }} -->
      {{ card.date }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

const localeDate = computed(() => {
  return props.card.date.toLocaleDateString("ru-RU");
});
</script>

<style lang="scss" scoped></style>
