# 私のポートフォリオ

JavaScript、Git、そして**Firebase**を用いたフルスタック開発への学習記録をまとめたポートフォリオです。
「自分のPCの中だけ」の世界から、**「世界とつながるリアルタイムWebアプリ」**への進化を記録しています。

---

## ■ 学習内容

このリポジトリでは以下の内容を学習しています。
* **Git/GitHub**: 基本操作（init, add, commit, push, README管理）
* **JavaScript (ES6+)**: **Module形式**、DOM操作、非同期処理、**リアルタイム監視**
* **Backend as a Service (BaaS)**: **Firebase (Firestore)** によるクラウドDB連携
* **開発環境**: **Live Server** を活用したローカルサーバー開発
* **配列操作**: `forEach`, `map`, `filter`, `find` 等を用いた高度なデータ処理
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
* **2026/04/27**: Firebase導入開始。クラウドDBとの接続・開発環境の刷新 ✅
* **2026/04/29**: **Firebase (onSnapshot) によるリアルタイム同期の実装。リロード不要の自動更新を達成** ✅ [NEW]

---

## ■ 作成したアプリ

### 1. カフェ空席状況アプリ（Firebase進化版） ★PICK UP
店側（管理）とお客様側（閲覧・予約）をクラウドで繋ぐリアルタイムWebアプリ。

* **リアルタイム・データ同期**: Firebaseの `onSnapshot` 機能を実装。客側の予約が**リロードなしで即座に**店側の画面に反映される仕組みを構築。
* **クラウド連携**: データの保存先をlocalStorageからGoogleのFirestoreへ移行。異なるブラウザ間でのデータ共有を実現。
* **JavaScript Module**: スコープを意識した最新のモジュール形式（type="module"）を採用。
* **完全レスポンシブ**: ドイツでの生活環境（スマホ利用）を想定し、モバイルファーストで設計。

### 2. 社員管理アプリ（Web版）
ブラウザ上で社員情報の操作・検索ができる管理ツール（localStorage対応）。

### 3. 社員管理アプリ（CLI版）
Node.js環境で動作する、コマンドラインベースの管理ツール。

---

## ■ ファイル構成

* `cafe-seat-app/`
    * `index.html`（店側管理画面）
    * `customer.html`（客側予約画面）
    * `script.js` / `customer.js`（**Firebaseリアルタイム監視・操作ロジック**）
    * `style.css`（レスポンシブデザイン）

---

## ■ 今後の予定（フェーズ2：データ整合性と公開）

* **Firebaseデータ双方向連動**: 店側での予約解除をFirebase側のデータ削除（`deleteDoc`）と連動させる。
* **Firebase Hostingでのデプロイ**: アプリをインターネット上に公開し、スマホからいつでもアクセス可能にする。
* **ユーザー認証**: Firebase Authを用いた店員専用ログイン機能の実装。

---

## ■ 目標

**2027年7月までに、リモートワークが可能なソフトウェアエンジニアへの転職を目指す。**
そのための第一歩として、フロントエンド（JS）とバックエンド（Firebase）が高度に連携した「実用的なWebアプリ」の開発に注力しています。