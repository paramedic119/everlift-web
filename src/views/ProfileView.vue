<template>
  <div class="space-y-4">
    <div>
      <p class="text-[11px] text-text2 uppercase tracking-wider">プロフィール / 現状値</p>
      <p class="text-[11px] text-text2 mt-1">入力した値はこの端末のブラウザに保存されます。</p>
    </div>

    <section class="rounded-lg border border-bdr bg-surface p-4">
      <p class="text-[11px] text-text2 uppercase tracking-wider mb-3 border-l-2 border-accent pl-2">BIG3 現在のMAX</p>
      <NumberField v-model="d.big3.squat" label="スクワット" unit="kg" :step="0.5" />
      <NumberField v-model="d.big3.bench" label="ベンチプレス" unit="kg" :step="0.5" />
      <NumberField v-model="d.big3.deadlift" label="デッドリフト" unit="kg" :step="0.5" />
      <NumberField v-model="d.big3.highbarSquat" label="ハイバースクワット" unit="kg" :step="0.5" />
      <NumberField v-model="d.big3.shoulderPress" label="ショルダープレス" unit="kg" :step="0.5" />
    </section>

    <section class="rounded-lg border border-bdr bg-surface p-4">
      <p class="text-[11px] text-text2 uppercase tracking-wider mb-3 border-l-2 border-accent pl-2">身体</p>
      <NumberField v-model="d.profile.heightCm" label="身長" unit="cm" :step="0.5" />
      <NumberField v-model="d.profile.weightKg" label="体重" unit="kg" :step="0.1" />
      <label class="flex items-center justify-between gap-2 py-2.5 border-b border-bdr last:border-b-0">
        <span class="text-sm text-text2">モード</span>
        <select v-model="d.profile.mode"
          class="px-2 py-1.5 rounded border border-bdr bg-surface2 text-text1 text-sm focus:outline-none focus:border-accent transition-colors">
          <option value="リーンバルク">リーンバルク</option>
          <option value="減量">減量</option>
          <option value="維持">維持</option>
        </select>
      </label>
    </section>

    <section class="rounded-lg border border-bdr bg-surface p-4">
      <p class="text-[11px] text-text2 uppercase tracking-wider mb-3 border-l-2 border-accent pl-2">栄養目標</p>
      <NumberField v-model="d.nutrition.maintenanceKcal" label="維持カロリー" unit="kcal" :step="1" />
      <NumberField v-model="d.nutrition.targetKcal" label="目標カロリー" unit="kcal" :step="1" />
      <NumberField v-model="d.nutrition.p" label="タンパク質 P" unit="g" :step="1" />
      <NumberField v-model="d.nutrition.f" label="脂質 F" unit="g" :step="1" />
      <NumberField v-model="d.nutrition.c" label="炭水化物 C" unit="g" :step="1" />
      <NumberField v-model="d.nutrition.proteinPerMeal" label="1食P目安" unit="g" :step="0.5" />
    </section>

    <button @click="onReset" class="w-full py-3 rounded-lg border border-bdr bg-surface text-sm text-text2 active:border-accent active:text-accent transition-colors">
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
