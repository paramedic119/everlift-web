<template>
  <nav class="fixed bottom-0 inset-x-0 bg-surface border-t border-bdr bottom-safe">
    <ul class="grid grid-cols-5 max-w-screen-sm mx-auto">
      <li v-for="t in tabs" :key="t.to">
        <router-link :to="t.to"
          class="flex flex-col items-center justify-center py-2.5 gap-1 transition-colors"
          :class="isActive(t.to) ? 'text-accent' : 'text-text2'">
          <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" v-html="t.icon" />
          <span class="text-[10px] font-medium">{{ t.label }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
const tabs = [
  {
    to: "/", label: "ホーム",
    icon: `<path d="M3 10.5L10 4l7 6.5V17h-4.5v-4h-5v4H3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>`
  },
  {
    to: "/weeks", label: "週",
    icon: `<rect x="3" y="4.5" width="14" height="12" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M7 3v3M13 3v3M3 9h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`
  },
  {
    to: "/profile", label: "プロフ",
    icon: `<path d="M2 17c0-2.5 1.5-4 4-4h8c2.5 0 4 1.5 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="10" cy="7" r="3" stroke="currentColor" stroke-width="1.5"/>`
  },
  {
    to: "/nutrition", label: "栄養",
    icon: `<path d="M14 3C14 3 9 3 6 6c-2.5 2.5-3 6-3 8 2.5 0 6-1 8-3 2.5-2.5 3-6 3-8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M3 14l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`
  },
  {
    to: "/settings", label: "設定",
    icon: `<circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M10 3v2M10 15v2M3 10h2M15 10h2M4.9 4.9l1.4 1.4M13.7 13.7l1.4 1.4M4.9 15.1l1.4-1.4M13.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`
  },
];
function isActive(to: string) {
  if (to === "/") return route.path === "/";
  return route.path.startsWith(to);
}
</script>
