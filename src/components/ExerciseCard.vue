<template>
  <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 mb-3 shadow-sm">
    <header class="flex items-baseline gap-2 mb-2">
      <span v-if="ex.part" class="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 shrink-0">{{ ex.part }}</span>
      <div class="flex-1 min-w-0">
        <template v-if="alternatives.length > 1">
          <select :value="displayName"
            @change="onChoose(($event.target as HTMLSelectElement).value)"
            class="font-semibold text-sm bg-transparent border-b border-dashed border-indigo-400 dark:border-indigo-500 pr-1 w-full truncate">
            <option v-for="opt in alternatives" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </template>
        <h3 v-else class="font-semibold text-sm">{{ displayName }}</h3>
      </div>
    </header>
    <dl class="grid grid-cols-4 gap-y-1 gap-x-2 text-[11px] text-slate-500 dark:text-slate-400 mb-2">
      <div v-if="ex.rpe != null"><dt class="inline">RPE</dt><dd class="inline ml-1 text-slate-700 dark:text-slate-200 tabular-nums">{{ ex.rpe }}</dd></div>
      <div v-if="ex.percentRm != null"><dt class="inline">%RM</dt><dd class="inline ml-1 text-slate-700 dark:text-slate-200 tabular-nums">{{ pct(ex.percentRm) }}</dd></div>
      <div v-if="ex.sets != null"><dt class="inline">Set</dt><dd class="inline ml-1 text-slate-700 dark:text-slate-200 tabular-nums">{{ ex.sets }}</dd></div>
      <div v-if="ex.repRange"><dt class="inline">Rep</dt><dd class="inline ml-1 text-slate-700 dark:text-slate-200">{{ ex.repRange }}</dd></div>
      <div v-if="ex.intervalSec"><dt class="inline">Int</dt><dd class="inline ml-1 text-slate-700 dark:text-slate-200">{{ fmt(ex.intervalSec) }}</dd></div>
      <div v-if="mainRefKg != null"><dt class="inline">参考</dt><dd class="inline ml-1 text-slate-700 dark:text-slate-200 tabular-nums">{{ mainRefKg }}kg</dd></div>
    </dl>
    <div class="border-t border-slate-100 dark:border-slate-800 pt-1">
      <template v-for="(s, i) in log.sets" :key="i">
        <div v-if="ex.backoff && i === mainSets" class="flex items-center gap-2 mt-2 mb-1">
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">Backoff</span>
          <span v-if="ex.backoff.rpe != null" class="text-[10px] text-slate-400">RPE {{ ex.backoff.rpe }}</span>
          <span v-if="ex.backoff.repRange" class="text-[10px] text-slate-400">{{ ex.backoff.repRange }} reps</span>
          <span v-if="backoffRefKg != null" class="text-[10px] text-slate-400">参考 {{ backoffRefKg }}kg</span>
        </div>
        <SetRow :index="i" :log="s"
          :ref-kg="ex.backoff && i >= mainSets ? backoffRefKg : mainRefKg"
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
import { usePersonal } from "../stores/personal";
import { useExerciseChoices } from "../stores/exerciseChoices";
import { calcRefKg, calcBackoffRefKg } from "../utils/calcRefKg";
import alternativesData from "../data/alternatives.json";
import type { Exercise, ExerciseLog, SetLog } from "../types";

const props = defineProps<{ ex: Exercise; log: ExerciseLog }>();
const emit = defineEmits<{ (e: "updateSet", i: number, patch: Partial<SetLog>): void; (e: "toggleSet", i: number): void }>();

const personal = usePersonal();
const exChoices = useExerciseChoices();
const alts = alternativesData as Record<string, string[]>;

const alternatives = computed(() => alts[props.ex.name] ?? []);
const displayName = computed(() => exChoices.chosen(props.ex.name));
const mainSets = computed(() => props.ex.sets ?? 1);
const mainRefKg = computed(() => calcRefKg(props.ex, personal.state.data, displayName.value));
const backoffRefKg = computed(() => calcBackoffRefKg(props.ex, personal.state.data, displayName.value));

function onChoose(name: string) {
  exChoices.setChoice(props.ex.name, name);
}

function pct(v: number) { return (v * 100).toFixed(0) + "%"; }
function fmt(sec: number) {
  const m = Math.floor(sec / 60); const s = sec % 60;
  return s ? `${m}:${String(s).padStart(2, "0")}` : `${m}分`;
}
</script>
