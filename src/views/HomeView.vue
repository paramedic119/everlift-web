<template>
  <div class="space-y-4">
    <!-- 進捗 -->
    <section class="rounded-lg border border-bdr bg-surface p-4">
      <p class="text-[11px] text-text2 uppercase tracking-wider mb-1">プログラム進捗</p>
      <div class="flex items-baseline gap-2 mb-3">
        <span class="font-display text-5xl text-accent leading-none tabular-nums">{{ overall.done }}</span>
        <span class="text-text2 text-sm">/ {{ overall.total }} セット</span>
      </div>
      <ProgressBar :done="overall.done" :total="overall.total" />
      <p class="text-[10px] text-text2 mt-1 tabular-nums">{{ pctDone }}% 完了</p>
    </section>

    <!-- BIG3 -->
    <section class="rounded-lg border border-bdr bg-surface p-4">
      <div class="flex items-center justify-between mb-3">
        <p class="text-[11px] text-text2 uppercase tracking-wider">BIG3 現状</p>
        <router-link to="/profile" class="text-[11px] text-accent">編集 →</router-link>
      </div>
      <dl class="grid grid-cols-3 gap-2 text-center">
        <div class="rounded bg-surface2 py-2">
          <dt class="text-[10px] text-text2 mb-1">SQ</dt>
          <dd class="font-display text-2xl text-text1 tabular-nums leading-none">{{ p.big3.squat ?? "—" }}<span class="text-xs text-text2 ml-0.5">kg</span></dd>
        </div>
        <div class="rounded bg-surface2 py-2">
          <dt class="text-[10px] text-text2 mb-1">BP</dt>
          <dd class="font-display text-2xl text-text1 tabular-nums leading-none">{{ p.big3.bench ?? "—" }}<span class="text-xs text-text2 ml-0.5">kg</span></dd>
        </div>
        <div class="rounded bg-surface2 py-2">
          <dt class="text-[10px] text-text2 mb-1">DL</dt>
          <dd class="font-display text-2xl text-text1 tabular-nums leading-none">{{ p.big3.deadlift ?? "—" }}<span class="text-xs text-text2 ml-0.5">kg</span></dd>
        </div>
      </dl>
    </section>

    <!-- 栄養 -->
    <section class="rounded-lg border border-bdr bg-surface p-4">
      <p class="text-[11px] text-text2 uppercase tracking-wider mb-2">栄養目標</p>
      <div class="flex items-baseline gap-1.5 mb-3">
        <span class="font-display text-4xl text-text1 tabular-nums leading-none">{{ Math.round(p.nutrition.targetKcal || 0) }}</span>
        <span class="text-text2 text-xs">kcal/日</span>
      </div>
      <dl class="grid grid-cols-3 gap-2 text-center text-xs">
        <div class="rounded bg-surface2 py-2">
          <dt class="text-[10px] text-text2 mb-1">タンパク質 P</dt>
          <dd class="font-display text-xl text-text1 tabular-nums leading-none">{{ Math.round(p.nutrition.p || 0) }}<span class="text-xs text-text2">g</span></dd>
        </div>
        <div class="rounded bg-surface2 py-2">
          <dt class="text-[10px] text-text2 mb-1">脂質 F</dt>
          <dd class="font-display text-xl text-text1 tabular-nums leading-none">{{ Math.round(p.nutrition.f || 0) }}<span class="text-xs text-text2">g</span></dd>
        </div>
        <div class="rounded bg-surface2 py-2">
          <dt class="text-[10px] text-text2 mb-1">炭水化物 C</dt>
          <dd class="font-display text-xl text-text1 tabular-nums leading-none">{{ Math.round(p.nutrition.c || 0) }}<span class="text-xs text-text2">g</span></dd>
        </div>
      </dl>
    </section>

    <router-link to="/weeks" class="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg bg-accent text-bg font-bold text-sm tracking-wide active:opacity-80 transition-opacity">
      週リストへ
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </router-link>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import ProgressBar from "../components/ProgressBar.vue";
import program from "../data/program.json";
import { useProgress } from "../stores/progress";
import { usePersonal } from "../stores/personal";
import type { Week } from "../types";

const weeks = program as Week[];
const prog = useProgress();
const personal = usePersonal();
const p = computed(() => personal.state.data);

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
const pctDone = computed(() => overall.value.total > 0 ? Math.round(overall.value.done / overall.value.total * 100) : 0);
</script>
