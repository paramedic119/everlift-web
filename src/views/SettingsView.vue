<template>
  <div class="space-y-4">
    <h2 class="text-lg font-bold">設定</h2>
    <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
      <button @click="doExport" class="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold">記録をエクスポート (JSON)</button>
      <label class="block">
        <span class="block text-sm mb-1">記録をインポート</span>
        <input type="file" accept="application/json" @change="onImport" class="block w-full text-sm" />
      </label>
      <button @click="doReset" class="w-full py-3 rounded-lg bg-rose-600 text-white font-semibold">全記録を削除</button>
    </section>
    <p class="text-[11px] text-slate-500">データはこの端末のブラウザ (localStorage) に保存されます。</p>
  </div>
</template>
<script setup lang="ts">
import { useProgress } from "../stores/progress";
const prog = useProgress();
function doExport() {
  const blob = new Blob([prog.exportJson()], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `everlift-${Date.now()}.json`; a.click();
  URL.revokeObjectURL(url);
}
function onImport(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    try { prog.importJson(String(r.result)); alert("インポート完了"); }
    catch { alert("不正なJSONです"); }
  };
  r.readAsText(f);
}
function doReset() {
  if (confirm("全記録を削除します。よろしいですか?")) prog.reset();
}
</script>
