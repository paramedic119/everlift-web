<template>
  <div class="space-y-4">
    <p class="text-[11px] text-text2 uppercase tracking-wider">設定</p>
    <section class="rounded-lg border border-bdr bg-surface p-4 space-y-3">
      <button @click="doExport"
        class="w-full py-3 rounded-lg border border-accent text-accent font-semibold text-sm active:bg-accent/10 transition-colors">
        記録をエクスポート (JSON)
      </button>
      <label class="block">
        <span class="block text-sm text-text2 mb-2">記録をインポート</span>
        <input type="file" accept="application/json" @change="onImport"
          class="block w-full text-sm text-text2 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border file:border-bdr file:bg-surface2 file:text-text2 file:text-xs" />
      </label>
      <button @click="doReset"
        class="w-full py-3 rounded-lg border border-accent2/50 text-accent2 font-semibold text-sm active:bg-accent2/10 transition-colors">
        全記録を削除
      </button>
    </section>
    <p class="text-[11px] text-text2 border-l-2 border-bdr pl-3">データはこの端末のブラウザ (localStorage) に保存されます。</p>
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
