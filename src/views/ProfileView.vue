<template>
  <div class="space-y-4">
    <h2 class="text-lg font-bold">プロフィール / 現状値</h2>
    <p class="text-[11px] text-slate-500">入力した値はこの端末のブラウザに保存されます。</p>

    <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
      <h3 class="text-sm font-semibold mb-2">BIG3 現在のMAX</h3>
      <NumberField v-model="d.big3.squat" label="スクワット" unit="kg" :step="0.5" />
      <NumberField v-model="d.big3.bench" label="ベンチプレス" unit="kg" :step="0.5" />
      <NumberField v-model="d.big3.deadlift" label="デッドリフト" unit="kg" :step="0.5" />
      <NumberField v-model="d.big3.highbarSquat" label="ハイバースクワット" unit="kg" :step="0.5" />
      <NumberField v-model="d.big3.shoulderPress" label="ショルダープレス" unit="kg" :step="0.5" />
    </section>

    <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
      <h3 class="text-sm font-semibold mb-2">身体</h3>
      <NumberField v-model="d.profile.heightCm" label="身長" unit="cm" :step="0.5" />
      <NumberField v-model="d.profile.weightKg" label="体重" unit="kg" :step="0.1" />
      <label class="flex items-center justify-between gap-2 py-1.5">
        <span class="text-sm text-slate-600 dark:text-slate-300">モード</span>
        <select v-model="d.profile.mode" class="px-2 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
          <option value="リーンバルク">リーンバルク</option>
          <option value="減量">減量</option>
          <option value="維持">維持</option>
        </select>
      </label>
    </section>

    <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
      <h3 class="text-sm font-semibold mb-2">栄養目標</h3>
      <NumberField v-model="d.nutrition.maintenanceKcal" label="維持カロリー" unit="kcal" :step="1" />
      <NumberField v-model="d.nutrition.targetKcal" label="目標カロリー" unit="kcal" :step="1" />
      <NumberField v-model="d.nutrition.p" label="タンパク質 P" unit="g" :step="1" />
      <NumberField v-model="d.nutrition.f" label="脂質 F" unit="g" :step="1" />
      <NumberField v-model="d.nutrition.c" label="炭水化物 C" unit="g" :step="1" />
      <NumberField v-model="d.nutrition.proteinPerMeal" label="1食P目安" unit="g" :step="0.5" />
    </section>

    <button @click="onReset" class="w-full py-3 rounded-lg bg-slate-200 dark:bg-slate-800 text-sm font-semibold">
      Excel初期値に戻す
    </button>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import NumberField from "../components/NumberField.vue";
import { usePersonal } from "../stores/personal";
const store = usePersonal();
const d = computed(() => store.state.data);
function onReset() {
  if (confirm("プロフィール値をExcel初期値に戻します。よろしいですか?")) store.resetToDefaults();
}
</script>
