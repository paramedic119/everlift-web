<template>
  <div class="min-h-screen pb-20 bottom-safe bg-bg text-text1">
    <header class="sticky top-0 z-10 bg-bg/95 backdrop-blur border-b border-bdr px-4 py-3 flex items-center justify-between">
      <h1 class="font-display text-2xl tracking-widest leading-none">EVER<span class="text-accent">LIFT</span></h1>
      <span class="text-[10px] text-text2 tracking-wider uppercase">9wk Hypertrophy</span>
    </header>
    <main class="px-4 py-4 max-w-screen-sm mx-auto">
      <router-view />
    </main>
    <BottomNav />
  </div>
</template>
<script setup lang="ts">
import BottomNav from "./components/BottomNav.vue";
</script>
