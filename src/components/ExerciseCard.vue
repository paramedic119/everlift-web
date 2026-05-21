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
      <template v-for="(s, i) in log.sets" :key="i">
        <div v-if="ex.backoff && i === mainSets" class="flex items-center gap-2 mt-2 mb-1">
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">Backoff</span>
          <span v-if="ex.backoff.rpe != null" class="text-[10px] text-slate-400">RPE {{ ex.backoff.rpe }}</span>
          <span v-if="ex.backoff.repRange" class="text-[10px] text-slate-400">{{ ex.backoff.repRange }} reps</span>
          <span v-if="ex.backoff.refKg != null" class="text-[10px] text-slate-400">参考 {{ ex.backoff.refKg }}kg</span>
        </div>
        <SetRow :index="i" :log="s"
          :ref-kg="ex.backoff && i >= mainSets ? (ex.backoff.refKg ?? ex.refKg) : ex.refKg"
          @update="patch => emit('updateSet', i, patch)"
          @toggle="emit('toggleSet', i)" />
      </template>
    </div>
    <p v-if="ex.note" class="mt-2 text-[11px] text-amber-700 dark:text-amber-400 whitespace-pre-wrap">{{ ex.note }}</p>
    <textarea v-model="log.memo" rows="2" placeholder="メモ"
      class="mt-2 w-full text-xs p-2 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"></textarea>
  </section>
</template>
<script setup lang="ts">
import { computed } from "vue";
import SetRow from "./SetRow.vue";
import type { Exercise, ExerciseLog, SetLog } from "../types";
const props = defineProps<{ ex: Exercise; log: ExerciseLog }>();
const emit = defineEmits<{ (e: "updateSet", i: number, patch: Partial<SetLog>): void; (e: "toggleSet", i: number): void }>();
const mainSets = computed(() => props.ex.sets ?? 1);
function pct(v: number) { return (v * 100).toFixed(0) + "%"; }
function fmt(sec: number) {
  const m = Math.floor(sec / 60); const s = sec % 60;
  return s ? `${m}:${String(s).padStart(2, "0")}` : `${m}分`;
}
</script>
