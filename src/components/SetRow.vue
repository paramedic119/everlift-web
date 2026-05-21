<template>
  <div class="flex items-center gap-2 py-2 pl-2 pr-1 rounded-lg transition-colors"
       :class="log.done ? 'bg-success/[0.07]' : ''">
    <span class="w-5 shrink-0 font-display text-base leading-none text-center"
          :class="log.done ? 'text-success' : 'text-text2'">{{ index + 1 }}</span>
    <button v-if="refKg != null" type="button"
      class="text-xs px-2 py-1 rounded border border-bdr text-text2 active:border-accent active:text-accent shrink-0 transition-colors tabular-nums font-display"
      @click="fillRef">{{ refKg }}</button>
    <input
      :value="log.kg ?? ''"
      @input="onKg(($event.target as HTMLInputElement).value)"
      inputmode="decimal" placeholder="—"
      class="w-20 shrink-0 px-2 py-2 rounded border bg-surface2 text-base tabular-nums text-center font-display tracking-wide focus:outline-none focus:border-accent transition-colors"
      :class="log.done ? 'border-bdr text-text2' : 'border-bdr text-text1'" />
    <span class="text-text2 text-xs shrink-0">×</span>
    <input
      :value="log.reps ?? ''"
      @input="onReps(($event.target as HTMLInputElement).value)"
      inputmode="numeric" placeholder="—"
      class="w-16 shrink-0 px-2 py-2 rounded border bg-surface2 text-base tabular-nums text-center font-display tracking-wide focus:outline-none focus:border-accent transition-colors"
      :class="log.done ? 'border-bdr text-text2' : 'border-bdr text-text1'" />
    <button type="button"
      @click="emit('toggle')"
      class="shrink-0 ml-auto w-9 h-9 rounded-full flex items-center justify-center transition-all"
      :class="log.done ? 'bg-success text-bg' : 'border border-bdr text-text2'">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2.5 7l3 3L11.5 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
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
