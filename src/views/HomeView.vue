<template>
  <div class="space-y-4">
    <section class="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4 shadow">
      <p class="text-xs opacity-80">プログラム進捗</p>
      <p class="text-2xl font-bold mt-1 tabular-nums">{{ overall.done }} / {{ overall.total }} <span class="text-sm font-normal opacity-80">セット完了</span></p>
      <ProgressBar :done="overall.done" :total="overall.total" class="mt-3 [&>div]:bg-white" />
    </section>

    <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
      <h2 class="text-sm font-semibold mb-2">BIG3 現状</h2>
      <dl class="grid grid-cols-3 gap-2 text-center">
        <div><dt class="text-[10px] text-slate-500">SQ</dt><dd class="text-lg font-bold tabular-nums">{{ personal.big3.squat }}<span class="text-xs">kg</span></dd></div>
        <div><dt class="text-[10px] text-slate-500">BP</dt><dd class="text-lg font-bold tabular-nums">{{ personal.big3.bench }}<span class="text-xs">kg</span></dd></div>
        <div><dt class="text-[10px] text-slate-500">DL</dt><dd class="text-lg font-bold tabular-nums">{{ personal.big3.deadlift }}<span class="text-xs">kg</span></dd></div>
      </dl>
    </section>

    <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
      <h2 class="text-sm font-semibold mb-2">栄養目標</h2>
      <p class="text-2xl font-bold tabular-nums">{{ Math.round(personal.nutrition.targetKcal || 0) }} <span class="text-xs font-normal">kcal/日</span></p>
      <dl class="grid grid-cols-3 gap-2 mt-2 text-xs">
        <div class="rounded bg-rose-50 dark:bg-rose-950/40 p-2 text-center"><dt class="text-rose-700 dark:text-rose-300">P</dt><dd class="font-bold tabular-nums">{{ Math.round(personal.nutrition.p || 0) }}g</dd></div>
        <div class="rounded bg-amber-50 dark:bg-amber-950/40 p-2 text-center"><dt class="text-amber-700 dark:text-amber-300">F</dt><dd class="font-bold tabular-nums">{{ Math.round(personal.nutrition.f || 0) }}g</dd></div>
        <div class="rounded bg-sky-50 dark:bg-sky-950/40 p-2 text-center"><dt class="text-sky-700 dark:text-sky-300">C</dt><dd class="font-bold tabular-nums">{{ Math.round(personal.nutrition.c || 0) }}g</dd></div>
      </dl>
    </section>

    <router-link to="/weeks" class="block w-full text-center py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow active:bg-indigo-700">
      週リストへ →
    </router-link>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import ProgressBar from "../components/ProgressBar.vue";
import personalRaw from "../data/personal.json";
import program from "../data/program.json";
import { useProgress } from "../stores/progress";
import type { Personal, Week } from "../types";

const personal = personalRaw as Personal;
const weeks = program as Week[];
const prog = useProgress();

const overall = computed(() => {
  let done = 0, total = 0;
  for (const w of weeks) {
    const wkey = `W${w.week}`;
    for (const d of w.days) {
      const plannedList = d.exercises.map(ex => (ex.sets ?? 1) + (ex.backoff?.sets ?? 0));
      const r = prog.dayCompletion(wkey, d.id, plannedList);
      done += r.done; total += r.total;
    }
  }
  return { done, total };
});
</script>
