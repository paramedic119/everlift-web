import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import type { ProgressState, ExerciseLog, SetLog } from "../types";

const KEY = "everlift-progress-v1";

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ProgressState;
  } catch { return {}; }
}

export const useProgress = defineStore("progress", () => {
  const state = reactive<{ data: ProgressState }>({ data: load() });

  watch(() => state.data, (v) => {
    try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {}
  }, { deep: true });

  function ensure(week: string, day: string, idx: number, plannedSets: number): ExerciseLog {
    if (!state.data[week]) state.data[week] = {};
    if (!state.data[week][day]) state.data[week][day] = {};
    let ex = state.data[week][day][idx];
    if (!ex) {
      ex = { sets: [], memo: "" };
      state.data[week][day][idx] = ex;
    }
    while (ex.sets.length < plannedSets) {
      ex.sets.push({ kg: null, reps: null, done: false });
    }
    return ex;
  }

  function setLog(week: string, day: string, idx: number, setIdx: number, patch: Partial<SetLog>) {
    const ex = state.data[week]?.[day]?.[idx];
    if (!ex) return;
    ex.sets[setIdx] = { ...ex.sets[setIdx], ...patch };
  }

  function dayCompletion(week: string, day: string, plannedSetsList: number[]): { done: number; total: number } {
    const d = state.data[week]?.[day];
    let done = 0; let total = 0;
    plannedSetsList.forEach((n, i) => {
      total += n;
      const ex = d?.[i];
      if (!ex) return;
      done += ex.sets.filter(s => s.done).length;
    });
    return { done, total };
  }

  function reset() { state.data = {}; }
  function exportJson(): string { return JSON.stringify(state.data, null, 2); }
  function importJson(json: string) { state.data = JSON.parse(json); }

  return { state, ensure, setLog, dayCompletion, reset, exportJson, importJson };
});
