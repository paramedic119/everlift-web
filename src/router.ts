import { createRouter, createWebHashHistory } from "vue-router";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: () => import("./views/HomeView.vue") },
    { path: "/weeks", component: () => import("./views/WeekListView.vue") },
    { path: "/week/:week", component: () => import("./views/WeekDetailView.vue"), props: true },
    { path: "/week/:week/day/:day", component: () => import("./views/DayView.vue"), props: true },
    { path: "/nutrition", component: () => import("./views/NutritionView.vue") },
    { path: "/settings", component: () => import("./views/SettingsView.vue") },
  ],
  scrollBehavior() { return { top: 0 }; },
});
