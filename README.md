# エバーリフト 9週ハイパートロフィー

スマホ最適化のトレーニング閲覧 & セット記録Webアプリ。
データはブラウザ (localStorage) に保存され、サーバー送信は一切ありません。

## 開発

```bash
npm install
npm run regen     # Excel → src/data/*.json を再生成 (任意)
npm run dev
npm run build && npm run preview
```

## デプロイ (GitHub Pages)

1. このリポジトリを GitHub に push (`main` ブランチ)
2. Settings → Pages → Source: **GitHub Actions** を選択
3. push の度に自動デプロイ。URL は Actions の "deploy" ジョブのログまたは Settings → Pages に表示

`vite.config.ts` の `base` は GitHub Actions の中で `VITE_BASE=/<repo-name>/` から動的設定されます。
