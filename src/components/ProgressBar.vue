<template>
  <div class="h-0.5 bg-bdr overflow-hidden">
    <div class="h-full bg-accent transition-all duration-500" :style="{ width: pct + '%' }" />
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{ done: number; total: number }>();
const pct = computed(() => (props.total > 0 ? Math.round((props.done / props.total) * 100) : 0));
</script>
