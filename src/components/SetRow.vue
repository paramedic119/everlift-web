<template>
  <div class="flex items-center gap-2 py-1.5">
    <span class="w-8 text-xs text-slate-500 tabular-nums">#{{ index + 1 }}</span>
    <button v-if="refKg != null" type="button"
      class="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 active:bg-slate-200"
      @click="fillRef">参考 {{ refKg }}kg</button>
    <input
      :value="log.kg ?? ''"
      @input="onKg(($event.target as HTMLInputElement).value)"
      inputmode="decimal" placeholder="kg"
      class="w-20 px-2 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-base tabular-nums" />
    <span class="text-slate-400">×</span>
    <input
      :value="log.reps ?? ''"
      @input="onReps(($event.target as HTMLInputElement).value)"
      inputmode="numeric" placeholder="reps"
      class="w-16 px-2 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-base tabular-nums" />
    <button type="button"
      @click="emit('toggle')"
      class="ml-auto w-10 h-10 rounded-full flex items-center justify-center text-lg"
      :class="log.done ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'">
      ✓
    </button>
  </div>
</template>
<script setup lang="ts">
import type { SetLog } from "../types";
const props = defineProps<{ index: number; log: SetLog; refKg: number | null }>();
const emit = defineEmits<{ (e: "update", patch: Partial<SetLog>): void; (e: "toggle"): void }>();
function onKg(v: string) { emit("update", { kg: v === "" ? null : Number(v) }); }
function onReps(v: string) { emit("update", { reps: v === "" ? null : Number(v) }); }
function fillRef() { if (props.refKg != null) emit("update", { kg: props.refKg }); }
</script>
