<template>
  <div class="space-y-3">
    <h2 class="text-sm font-semibold text-slate-500">9週間プログラム</h2>
    <router-link v-for="w in weeks" :key="w.week" :to="`/week/${w.week}`"
      class="block rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 active:scale-[0.99] transition">
      <div class="flex items-baseline justify-between">
        <h3 class="font-bold">WEEK {{ String(w.week).padStart(2, "0") }}</h3>
        <span class="text-xs text-slate-500">{{ w.days.length }} Days</span>
      </div>
      <dl class="grid grid-cols-3 gap-2 text-center mt-2 text-xs">
        <div><dt class="text-slate-500">Sets</dt><dd class="font-semibold tabular-nums">{{ summaryMap.get(w.week)?.totalSets ?? "-" }}</dd></div>
        <div><dt class="text-slate-500">avg RPE</dt><dd class="font-semibold tabular-nums">{{ fmtRpe(summaryMap.get(w.week)?.avgRpe) }}</dd></div>
        <div><dt class="text-slate-500">Reps</dt><dd class="font-semibold tabular-nums">{{ summaryMap.get(w.week)?.totalReps ?? "-" }}</dd></div>
      </dl>
      <div class="mt-3">
        <ProgressBar :done="completion(w).done" :total="completion(w).total" />
        <p class="text-[11px] text-slate-500 mt-1 tabular-nums">{{ completion(w).done }}/{{ completion(w).total }} セット完了</p>
      </div>
    </router-link>
  </div>
</template>
<script setup lang="ts">
import ProgressBar from "../components/ProgressBar.vue";
import program from "../data/program.json";
import summary from "../data/summary.json";
import { useProgress } from "../stores/progress";
import type { Week, SummaryWeek } from "../types";

const weeks = program as Week[];
const summaryMap = new Map((summary as SummaryWeek[]).map(s => [s.week, s]));
const prog = useProgress();

function completion(w: Week) {
  let done = 0, total = 0;
  const wkey = `W${w.week}`;
  for (const d of w.days) {
    const list = d.exercises.map(ex => (ex.sets ?? 1) + (ex.backoff?.sets ?? 0));
    const r = prog.dayCompletion(wkey, d.id, list);
    done += r.done; total += r.total;
  }
  return { done, total };
}
function fmtRpe(v?: number) { return v == null ? "-" : v.toFixed(1); }
</script>
