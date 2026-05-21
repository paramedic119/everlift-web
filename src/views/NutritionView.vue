<template>
  <div class="space-y-4">
    <h2 class="text-lg font-bold">栄養目標</h2>
    <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
      <p class="text-xs text-slate-500">1日の摂取目標</p>
      <p class="text-3xl font-bold tabular-nums">{{ Math.round(n.targetKcal || 0) }} <span class="text-sm font-normal">kcal</span></p>
      <p class="text-[11px] text-slate-500 mt-1">維持カロリー {{ n.maintenanceKcal }} kcal + {{ Math.round(n.overKcal || 0) }} kcal</p>
    </section>
    <section class="grid grid-cols-3 gap-2">
      <div class="rounded-xl bg-rose-100 dark:bg-rose-950/50 p-3 text-center">
        <p class="text-[10px] text-rose-700 dark:text-rose-300">タンパク質 P</p>
        <p class="text-2xl font-bold tabular-nums text-rose-700 dark:text-rose-200">{{ Math.round(n.p || 0) }}<span class="text-xs">g</span></p>
      </div>
      <div class="rounded-xl bg-amber-100 dark:bg-amber-950/50 p-3 text-center">
        <p class="text-[10px] text-amber-700 dark:text-amber-300">脂質 F</p>
        <p class="text-2xl font-bold tabular-nums text-amber-700 dark:text-amber-200">{{ Math.round(n.f || 0) }}<span class="text-xs">g</span></p>
      </div>
      <div class="rounded-xl bg-sky-100 dark:bg-sky-950/50 p-3 text-center">
        <p class="text-[10px] text-sky-700 dark:text-sky-300">炭水化物 C</p>
        <p class="text-2xl font-bold tabular-nums text-sky-700 dark:text-sky-200">{{ Math.round(n.c || 0) }}<span class="text-xs">g</span></p>
      </div>
    </section>
    <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-sm space-y-1">
      <p><span class="text-slate-500">1食あたりタンパク質目安:</span> <b class="tabular-nums">{{ n.proteinPerMeal }}g</b></p>
      <p><span class="text-slate-500">モード:</span> {{ p.profile.mode }}</p>
      <p><span class="text-slate-500">日常生活強度:</span> {{ p.profile.dailyIntensity }}</p>
      <p><span class="text-slate-500">トレーニング歴:</span> {{ p.profile.trainingLevel }}</p>
      <p><span class="text-slate-500">身長/体重:</span> {{ p.profile.heightCm }}cm / {{ p.profile.weightKg }}kg</p>
    </section>
    <p class="text-[11px] text-slate-500 leading-relaxed">※ WEEK1-4はボリュームが多いため、体重が減ってしまう場合は炭水化物を目標より10%増を目安に。</p>
  </div>
</template>
<script setup lang="ts">
import personalRaw from "../data/personal.json";
import type { Personal } from "../types";
const p = personalRaw as Personal;
const n = p.nutrition;
</script>
