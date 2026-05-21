<template>
  <div v-if="week" class="space-y-4">
    <router-link to="/weeks" class="flex items-center gap-1 text-[11px] text-text2">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      週リスト
    </router-link>
    <div class="flex items-baseline gap-2">
      <span class="font-display text-4xl text-text1 leading-none">{{ String(week.week).padStart(2, "0") }}</span>
      <span class="text-text2 text-sm">WEEK</span>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <router-link v-for="d in week.days" :key="d.id" :to="`/week/${week.week}/day/${encodeURIComponent(d.id)}`"
        class="rounded-lg border border-bdr bg-surface p-3 active:opacity-70 transition-opacity">
        <p class="text-[10px] uppercase tracking-widest font-medium"
           :class="d.type === 'Upper' ? 'text-upper' : 'text-lower'">{{ d.type }}</p>
        <p class="font-semibold text-sm mt-1 text-text1">{{ d.label }}</p>
        <p class="text-[10px] text-text2 mt-1">{{ d.exercises.length }} 種目</p>
        <div class="mt-3">
          <ProgressBar :done="completion(d).done" :total="completion(d).total" />
          <p class="text-[10px] text-text2 mt-1 tabular-nums">{{ completion(d).done }}/{{ completion(d).total }}</p>
        </div>
      </router-link>
    </div>
  </div>
  <p v-else class="text-text2">該当週なし</p>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import ProgressBar from "../components/ProgressBar.vue";
import program from "../data/program.json";
import { useProgress } from "../stores/progress";
import type { Week, Day } from "../types";

const route = useRoute();
const weeks = program as Week[];
const week = computed(() => weeks.find(w => w.week === Number(route.params.week)));
const prog = useProgress();

function completion(d: Day) {
  if (!week.value) return { done: 0, total: 0 };
  const wkey = `W${week.value.week}`;
  const list = d.exercises.map(ex => (ex.sets ?? 1) + (ex.backoff?.sets ?? 0));
  return prog.dayCompletion(wkey, d.id, list);
}
</script>
