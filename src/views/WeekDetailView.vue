<template>
  <div v-if="week" class="space-y-3">
    <router-link to="/weeks" class="text-xs text-indigo-600">← 週リスト</router-link>
    <h2 class="text-lg font-bold">WEEK {{ String(week.week).padStart(2, "0") }}</h2>
    <div class="grid grid-cols-2 gap-2">
      <router-link v-for="d in week.days" :key="d.id" :to="`/week/${week.week}/day/${encodeURIComponent(d.id)}`"
        class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 active:scale-[0.98] transition">
        <p class="text-[11px] uppercase tracking-wide" :class="d.type === 'Upper' ? 'text-rose-500' : 'text-sky-500'">{{ d.type }}</p>
        <p class="font-bold mt-0.5">{{ d.label }}</p>
        <p class="text-[11px] text-slate-500 mt-1 tabular-nums">{{ d.exercises.length }} 種目</p>
        <div class="mt-2">
          <ProgressBar :done="completion(d).done" :total="completion(d).total" />
        </div>
      </router-link>
    </div>
  </div>
  <p v-else class="text-slate-500">該当週なし</p>
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
