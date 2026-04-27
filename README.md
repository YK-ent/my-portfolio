# 私のポートフォリオ

JavaScript、Git、そして**Firebase**を用いたフルスタック開発への学習記録をまとめたポートフォリオです。
基礎から「世界とつながるWebアプリ」への進化を記録しています。

---

## ■ 学習内容

このリポジトリでは以下の内容を学習しています。
* **Git/GitHub**: 基本操作（init, add, commit, push, README管理）
* **JavaScript (ES6+)**: **Module形式（type="module"）**、DOM操作、非同期処理
* **Backend as a Service (BaaS)**: **Firebase (Firestore)** によるクラウドDB連携
* **開発環境**: **Live Server** を活用したローカルサーバー開発
* **配列操作**: `forEach`, `map`, `filter` 等を用いたデータ処理
* **デザイン**: CSS Flexbox、メディアクエリによるレスポンシブ対応

---

## ■ 使用技術

* **Frontend**: JavaScript, HTML5, CSS3
* **Backend/Database**: **Firebase (Cloud Firestore)**
* **Tool**: Git / GitHub, **VS Code (Live Server)**

---

## ■ 学習の進捗状況

* **2026/02/24**: Git基本操作を練習開始 ✅
* **2026/02/26**: JavaScript基礎習得 ✅
* **2026/03/21**: Web版社員管理アプリ完成（localStorage実装） ✅
* **2026/04/21**: カフェ空席状況アプリ localStorage版完成 ✅
* **2026/04/27**: **Firebase導入開始。クラウドDBとの接続・開発環境の刷新** ✅ [NEW]

---

## ■ 作成したアプリ

### 1. カフェ空席状況アプリ（Firebase進化版） ★PICK UP
店側（管理）とお客様側（閲覧・予約）をクラウドで繋ぐリアルタイムWebアプリ。

* **ハイブリッド・アーキテクチャ**: 従来のlocalStorageから、Firebase (Firestore) への移行プロジェクトを進行中。
* **リアルタイム性**: クラウドDBの監視により、リロード不要のデータ更新を目指した実装。
* **JavaScript Module**: スコープを意識した最新のモジュール形式（type="module"）を採用。
* **完全レスポンシブ**: モバイルファーストで設計し、スマホ・PC両方に対応。

### 2. 社員管理アプリ（Web版）
ブラウザ上で社員情報の操作・検索ができる管理ツール（localStorage対応）。

### 3. 社員管理アプリ（CLI版）
Node.js環境で動作する、コマンドラインベースの管理ツール。

---

## ■ ファイル構成

* `cafe-seat-app/`
    * `index.html`（店側管理画面）
    * `customer.html`（客側予約画面）
    * `script.js` / `customer.js`（**Firebase接続・操作ロジック**）
    * `style.css`（レスポンシブデザイン）

---

## ■ 今後の予定（フェーズ1）

* **Firebase完全移行**: localStorageからFirestoreへのデータ処理の完全書き換え
* **ユーザー認証**: Firebase Authを用いたログイン機能の実装
* **アプリの公開**: GitHub Pages または Firebase Hosting でのデプロイ

---

## ■ 目標

**2027年7月までに、リモートワークが可能なソフトウェアエンジニアへの転職を目指す。**
そのための第一歩として、フロントエンド（JS）とバックエンド（Firebase）が連携した「実用的なWebアプリ」の開発に注力しています。