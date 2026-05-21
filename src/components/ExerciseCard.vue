<template>
  <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 mb-3 shadow-sm">
    <header class="flex items-baseline gap-2 mb-2">
      <span v-if="ex.part" class="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">{{ ex.part }}</span>
      <h3 class="font-semibold text-sm">{{ ex.name }}</h3>
    </header>
    <dl class="grid grid-cols-4 gap-y-1 gap-x-2 text-[11px] text-slate-500 dark:text-slate-400 mb-2">
      <div v-if="ex.rpe != null"><dt class="inline">RPE</dt><dd class="inline ml-1 text-slate-700 dark:text-slate-200 tabular-nums">{{ ex.rpe }}</dd></div>
      <div v-if="ex.percentRm != null"><dt class="inline">%RM</dt><dd class="inline ml-1 text-slate-700 dark:text-slate-200 tabular-nums">{{ pct(ex.percentRm) }}</dd></div>
      <div v-if="ex.sets != null"><dt class="inline">Set</dt><dd class="inline ml-1 text-slate-700 dark:text-slate-200 tabular-nums">{{ ex.sets }}</dd></div>
      <div v-if="ex.repRange"><dt class="inline">Rep</dt><dd class="inline ml-1 text-slate-700 dark:text-slate-200">{{ ex.repRange }}</dd></div>
      <div v-if="ex.intervalSec"><dt class="inline">Int</dt><dd class="inline ml-1 text-slate-700 dark:text-slate-200">{{ fmt(ex.intervalSec) }}</dd></div>
      <div v-if="ex.refKg != null"><dt class="inline">参考</dt><dd class="inline ml-1 text-slate-700 dark:text-slate-200 tabular-nums">{{ ex.refKg }}kg</dd></div>
    </dl>
    <div class="border-t border-slate-100 dark:border-slate-800 pt-1">
      <SetRow v-for="(s, i) in log.sets" :key="i" :index="i" :log="s" :ref-kg="ex.refKg"
        @update="patch => emit('updateSet', i, patch)"
        @toggle="emit('toggleSet', i)" />
    </div>
    <details v-if="ex.backoff" class="mt-2 text-xs">
      <summary class="text-slate-500 cursor-pointer">Backoff詳細</summary>
      <div class="mt-1 grid grid-cols-3 gap-1 text-slate-600 dark:text-slate-300">
        <div v-if="ex.backoff.rpe != null">RPE {{ ex.backoff.rpe }}</div>
        <div v-if="ex.backoff.percentRm != null">%RM {{ pct(ex.backoff.percentRm) }}</div>
        <div v-if="ex.backoff.sets != null">Set {{ ex.backoff.sets }}</div>
        <div v-if="ex.backoff.repRange">Rep {{ ex.backoff.repRange }}</div>
        <div v-if="ex.backoff.refKg != null">参考 {{ ex.backoff.refKg }}kg</div>
      </div>
    </details>
    <p v-if="ex.note" class="mt-2 text-[11px] text-amber-700 dark:text-amber-400 whitespace-pre-wrap">{{ ex.note }}</p>
    <textarea v-model="log.memo" rows="2" placeholder="メモ"
      class="mt-2 w-full text-xs p-2 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"></textarea>
  </section>
</template>
<script setup lang="ts">
import SetRow from "./SetRow.vue";
import type { Exercise, ExerciseLog, SetLog } from "../types";
defineProps<{ ex: Exercise; log: ExerciseLog }>();
const emit = defineEmits<{ (e: "updateSet", i: number, patch: Partial<SetLog>): void; (e: "toggleSet", i: number): void }>();
function pct(v: number) { return (v * 100).toFixed(0) + "%"; }
function fmt(sec: number) {
  const m = Math.floor(sec / 60); const s = sec % 60;
  return s ? `${m}:${String(s).padStart(2, "0")}` : `${m}分`;
}
</script>
