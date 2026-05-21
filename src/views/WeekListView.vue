<template>
  <div class="space-y-2">
    <p class="text-[11px] text-text2 uppercase tracking-wider mb-3">9週間プログラム</p>
    <router-link v-for="w in weeks" :key="w.week" :to="`/week/${w.week}`"
      class="flex items-center gap-4 rounded-lg border border-bdr bg-surface p-4 active:opacity-70 transition-opacity">
      <div class="shrink-0">
        <p class="font-display text-3xl text-text1 leading-none tabular-nums">{{ String(w.week).padStart(2, "0") }}</p>
        <p class="text-[10px] text-text2 mt-0.5">WEEK</p>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex gap-3 text-[11px] mb-2">
          <span><span class="text-text2">Sets </span><span class="font-display text-sm text-text1 tabular-nums">{{ summaryMap.get(w.week)?.totalSets ?? "—" }}</span></span>
          <span><span class="text-text2">RPE </span><span class="font-display text-sm text-text1 tabular-nums">{{ fmtRpe(summaryMap.get(w.week)?.avgRpe) }}</span></span>
          <span><span class="text-text2">Reps </span><span class="font-display text-sm text-text1 tabular-nums">{{ summaryMap.get(w.week)?.totalReps ?? "—" }}</span></span>
        </div>
        <ProgressBar :done="completion(w).done" :total="completion(w).total" />
        <p class="text-[10px] text-text2 mt-1 tabular-nums">{{ completion(w).done }}/{{ completion(w).total }} セット</p>
      </div>
      <svg class="shrink-0 w-4 h-4 text-text2" viewBox="0 0 16 16" fill="none">
        <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
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
