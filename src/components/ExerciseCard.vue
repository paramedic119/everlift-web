<template>
  <section class="rounded-lg border border-bdr bg-surface p-3 mb-3">
    <header class="flex items-center gap-2 mb-3">
      <span v-if="ex.part" class="text-[10px] px-1.5 py-0.5 rounded bg-accent/15 text-accent shrink-0 font-medium">{{ ex.part }}</span>
      <div class="flex-1 min-w-0 relative">
        <template v-if="alternatives.length > 1">
          <select :value="displayName"
            @change="onChoose(($event.target as HTMLSelectElement).value)"
            class="font-semibold text-sm bg-transparent text-text1 border-b border-dashed border-accent/40 pr-5 w-full appearance-none focus:outline-none focus:border-accent cursor-pointer">
            <option v-for="opt in alternatives" :key="opt" :value="opt" class="bg-surface2 text-text1">{{ opt }}</option>
          </select>
          <svg class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-accent pointer-events-none" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </template>
        <h3 v-else class="font-semibold text-sm text-text1">{{ displayName }}</h3>
      </div>
    </header>

    <div class="flex flex-wrap gap-x-3 gap-y-1 mb-3">
      <span v-if="ex.rpe != null" class="text-[11px]">
        <span class="text-text2">RPE </span><span class="font-display text-sm text-text1">{{ ex.rpe }}</span>
      </span>
      <span v-if="ex.percentRm != null" class="text-[11px]">
        <span class="text-text2">%RM </span><span class="font-display text-sm text-text1">{{ pct(ex.percentRm) }}</span>
      </span>
      <span v-if="ex.sets != null" class="text-[11px]">
        <span class="text-text2">×</span><span class="font-display text-sm text-text1">{{ ex.sets }}</span>
      </span>
      <span v-if="ex.repRange" class="text-[11px]">
        <span class="font-display text-sm text-text1">{{ ex.repRange }}</span><span class="text-text2"> rep</span>
      </span>
      <span v-if="ex.intervalSec" class="text-[11px]">
        <span class="text-text2">Int </span><span class="font-display text-sm text-text1">{{ fmt(ex.intervalSec) }}</span>
      </span>
      <span v-if="mainRefKg != null" class="text-[11px]">
        <span class="text-text2">参考 </span><span class="font-display text-sm text-accent">{{ mainRefKg }}kg</span>
      </span>
    </div>

    <div class="border-t border-bdr pt-2 space-y-0.5">
      <template v-for="(s, i) in log.sets" :key="i">
        <div v-if="ex.backoff && i === mainSets" class="flex items-center gap-2 pt-2 pb-1">
          <div class="flex-1 border-t border-dashed border-bdr"></div>
          <span class="text-[10px] px-1.5 py-0.5 rounded border border-bdr text-text2 shrink-0">BACKOFF</span>
          <span v-if="ex.backoff.repRange" class="text-[10px] text-text2">{{ ex.backoff.repRange }} rep</span>
          <span v-if="backoffRefKg != null" class="text-[10px] text-text2">参考 <span class="text-accent">{{ backoffRefKg }}kg</span></span>
          <div class="flex-1 border-t border-dashed border-bdr"></div>
        </div>
        <SetRow :index="i" :log="s"
          :ref-kg="ex.backoff && i >= mainSets ? backoffRefKg : mainRefKg"
          @update="patch => emit('updateSet', i, patch)"
          @toggle="emit('toggleSet', i)" />
      </template>
    </div>

    <p v-if="ex.note" class="mt-2 text-[11px] text-accent2/90 whitespace-pre-wrap border-l-2 border-accent2/40 pl-2">{{ ex.note }}</p>
    <textarea v-model="log.memo" rows="2" placeholder="メモ…"
      class="mt-3 w-full text-xs p-2 rounded border border-bdr bg-surface2 text-text1 placeholder:text-text2 focus:outline-none focus:border-accent transition-colors resize-none"></textarea>
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
