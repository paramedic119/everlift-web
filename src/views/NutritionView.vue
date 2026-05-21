<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <p class="text-[11px] text-text2 uppercase tracking-wider">栄養目標</p>
      <router-link to="/profile" class="text-[11px] text-accent">編集 →</router-link>
    </div>

    <section class="rounded-lg border border-bdr bg-surface p-4">
      <p class="text-[11px] text-text2 mb-1">1日の摂取目標</p>
      <div class="flex items-baseline gap-1.5">
        <span class="font-display text-5xl text-text1 tabular-nums leading-none">{{ Math.round(n.targetKcal || 0) }}</span>
        <span class="text-text2 text-sm">kcal</span>
      </div>
      <p v-if="n.maintenanceKcal" class="text-[10px] text-text2 mt-1">
        維持 <span class="font-display text-sm text-text1">{{ Math.round(n.maintenanceKcal) }}</span> kcal
        + <span class="font-display text-sm text-accent">{{ Math.round(n.overKcal || 0) }}</span> kcal
      </p>
    </section>

    <section class="grid grid-cols-3 gap-2">
      <div class="rounded-lg border border-bdr bg-surface p-3 text-center">
        <p class="text-[10px] text-text2 mb-1">タンパク質</p>
        <p class="text-[10px] text-text2 mb-2">P</p>
        <p class="font-display text-2xl text-text1 tabular-nums leading-none">{{ Math.round(n.p || 0) }}<span class="text-xs text-text2">g</span></p>
      </div>
      <div class="rounded-lg border border-bdr bg-surface p-3 text-center">
        <p class="text-[10px] text-text2 mb-1">脂質</p>
        <p class="text-[10px] text-text2 mb-2">F</p>
        <p class="font-display text-2xl text-text1 tabular-nums leading-none">{{ Math.round(n.f || 0) }}<span class="text-xs text-text2">g</span></p>
      </div>
      <div class="rounded-lg border border-bdr bg-surface p-3 text-center">
        <p class="text-[10px] text-text2 mb-1">炭水化物</p>
        <p class="text-[10px] text-text2 mb-2">C</p>
        <p class="font-display text-2xl text-text1 tabular-nums leading-none">{{ Math.round(n.c || 0) }}<span class="text-xs text-text2">g</span></p>
      </div>
    </section>

    <section class="rounded-lg border border-bdr bg-surface p-4 space-y-2.5">
      <div class="flex items-center justify-between">
        <span class="text-sm text-text2">1食あたりP目安</span>
        <span class="font-display text-xl text-text1 tabular-nums leading-none">{{ n.proteinPerMeal }}<span class="text-xs text-text2 ml-0.5">g</span></span>
      </div>
      <div class="flex items-center justify-between border-t border-bdr pt-2.5">
        <span class="text-sm text-text2">モード</span>
        <span class="text-sm text-text1">{{ p.profile.mode }}</span>
      </div>
      <div v-if="p.profile.heightCm || p.profile.weightKg" class="flex items-center justify-between border-t border-bdr pt-2.5">
        <span class="text-sm text-text2">身長 / 体重</span>
        <span class="font-display text-sm text-text1 tabular-nums">{{ p.profile.heightCm }}cm / {{ p.profile.weightKg }}kg</span>
      </div>
    </section>

    <p class="text-[11px] text-text2 leading-relaxed border-l-2 border-bdr pl-3">
      WEEK1-4はボリュームが多いため、体重が減る場合は炭水化物を目標より10%増を目安に。
    </p>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { usePersonal } from "../stores/personal";
const personal = usePersonal();
const p = computed(() => personal.state.data);
const n = computed(() => p.value.nutrition);
</script>
