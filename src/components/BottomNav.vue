<template>
  <nav class="fixed bottom-0 inset-x-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 bottom-safe">
    <ul class="grid grid-cols-4 max-w-screen-sm mx-auto">
      <li v-for="t in tabs" :key="t.to">
        <router-link :to="t.to" class="flex flex-col items-center justify-center py-2.5 text-xs"
          :class="isActive(t.to) ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-500'">
          <span class="text-lg leading-none">{{ t.icon }}</span>
          <span class="mt-1">{{ t.label }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
const tabs = [
  { to: "/", label: "ホーム", icon: "🏠" },
  { to: "/weeks", label: "週", icon: "📅" },
  { to: "/nutrition", label: "栄養", icon: "🍱" },
  { to: "/settings", label: "設定", icon: "⚙️" },
];
function isActive(to: string) {
  if (to === "/") return route.path === "/";
  return route.path.startsWith(to);
}
</script>
