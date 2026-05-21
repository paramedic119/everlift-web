import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import defaults from "../data/personal.json";
import type { Personal } from "../types";

const KEY = "everlift-personal-v1";

function load(): Personal {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Personal;
      return {
        big3: { ...defaults.big3, ...parsed.big3 },
        profile: { ...defaults.profile, ...parsed.profile },
        nutrition: { ...defaults.nutrition, ...parsed.nutrition },
      };
    }
  } catch {}
  return JSON.parse(JSON.stringify(defaults));
}

export const usePersonal = defineStore("personal", () => {
  const state = reactive<{ data: Personal }>({ data: load() });

  watch(() => state.data, (v) => {
    try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {}
  }, { deep: true });

  function resetToDefaults() {
    state.data = JSON.parse(JSON.stringify(defaults));
  }

  return { state, resetToDefaults };
});
