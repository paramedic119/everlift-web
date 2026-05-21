<template>
  <div class="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
    <div class="h-full bg-indigo-500 transition-all" :style="{ width: pct + '%' }" />
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{ done: number; total: number }>();
const pct = computed(() => (props.total > 0 ? Math.round((props.done / props.total) * 100) : 0));
</script>
