import { defineStore } from "pinia";
import { reactive, watch } from "vue";

const KEY = "everlift-exercise-choices-v1";

function load(): Record<string, string> {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

export const useExerciseChoices = defineStore("exerciseChoices", () => {
  const choices = reactive<Record<string, string>>(load());

  watch(choices, (v) => {
    try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {}
  }, { deep: true });

  // デフォルト名から現在の選択名を返す
  function chosen(defaultName: string): string {
    return choices[defaultName] ?? defaultName;
  }

  function setChoice(defaultName: string, name: string) {
    choices[defaultName] = name;
  }

  function reset() {
    Object.keys(choices).forEach(k => delete choices[k]);
  }

  return { choices, chosen, setChoice, reset };
});
