<template>
  <label class="flex items-center justify-between gap-2 py-1.5">
    <span class="text-sm text-slate-600 dark:text-slate-300">{{ label }}</span>
    <div class="flex items-center gap-1">
      <input
        :value="modelValue ?? ''"
        @input="onInput(($event.target as HTMLInputElement).value)"
        :inputmode="step && step < 1 ? 'decimal' : 'numeric'"
        :step="step ?? 1"
        type="number"
        class="w-24 px-2 py-2 text-right rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 tabular-nums" />
      <span v-if="unit" class="text-xs text-slate-500 w-8">{{ unit }}</span>
    </div>
  </label>
</template>
<script setup lang="ts">
const props = defineProps<{ modelValue: number | null; label: string; unit?: string; step?: number }>();
const emit = defineEmits<{ (e: "update:modelValue", v: number | null): void }>();
function onInput(v: string) {
  if (v === "") emit("update:modelValue", null);
  else emit("update:modelValue", Number(v));
}
</script>
