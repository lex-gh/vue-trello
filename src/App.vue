<template>
  <div class="flex flex-col flex-auto min-w-[280px]">
    <the-header />
    <router-view />
  </div>
</template>

<script setup>
import TheHeader from "@/components/TheHeader.vue";
</script>
