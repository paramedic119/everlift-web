<template>
  <div v-if="week && day" class="space-y-2">
    <router-link :to="`/week/${week.week}`" class="flex items-center gap-1 text-[11px] text-text2">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      WEEK {{ week.week }}
    </router-link>
    <header class="sticky top-[52px] -mx-4 px-4 py-2 bg-bg/95 backdrop-blur border-b border-bdr z-[5]">
      <p class="text-[10px] uppercase tracking-widest font-medium"
         :class="day.type === 'Upper' ? 'text-upper' : 'text-lower'">WEEK {{ week.week }} · {{ day.type }}</p>
      <h2 class="text-base font-semibold text-text1">{{ day.label }}</h2>
    </header>
    <div class="pt-2">
      <ExerciseCard v-for="(ex, i) in day.exercises" :key="i" :ex="ex" :log="logFor(i, ex)"
        @update-set="(si, patch) => prog.setLog(wkey, day!.id, i, si, patch)"
        @toggle-set="(si) => toggle(i, si)" />
    </div>
  </div>
  <p v-else class="text-text2">該当データなし</p>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import ExerciseCard from "../components/ExerciseCard.vue";
import program from "../data/program.json";
import { useProgress } from "../stores/progress";
import type { Week, Exercise } from "../types";

const route = useRoute();
const weeks = program as Week[];
const week = computed(() => weeks.find(w => w.week === Number(route.params.week)));
const day = computed(() => week.value?.days.find(d => d.id === decodeURIComponent(String(route.params.day))));
const wkey = computed(() => `W${week.value?.week ?? 0}`);
const prog = useProgress();

function plannedSets(ex: Exercise) { return (ex.sets ?? 1) + (ex.backoff?.sets ?? 0); }
function logFor(i: number, ex: Exercise) {
  if (!day.value) return { sets: [], memo: "" };
  return prog.ensure(wkey.value, day.value.id, i, plannedSets(ex));
}
function toggle(i: number, si: number) {
  if (!day.value) return;
  const log = prog.state.data[wkey.value]?.[day.value.id]?.[i];
  if (!log) return;
  log.sets[si] = { ...log.sets[si], done: !log.sets[si].done };
}
</script>
