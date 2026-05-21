<template>
  <div class="min-h-screen pb-20 bottom-safe">
    <header class="sticky top-0 z-10 bg-white/85 dark:bg-slate-900/85 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-4 py-3">
      <h1 class="text-base font-bold">エバーリフト · 9週ハイパートロフィー</h1>
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
