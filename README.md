## 概要

 Reactを用いたイベントチケットの予約サイト<br >
 React学習用のため、デザインは最小限にしています。<br >
 制作：約100時間<br >
 参考サイト：https://t.livepocket.jp/e/wyxxw


## 環境

| 言語・フレームワーク  | バージョン |
| --------------------- | ---------- |
| MySQL2                 | 3.3.1        |
| axios                 | 1.7.3        |
| Express                 | 4.18.2        |
| Node.js               | 18.17.0    |
| React                 | 18.3.1     |
| React Router Dom                 | 6.25.1     |
| npm             |  9.6.7      |


## 機能一覧

- ユーザー登録、ログイン機能
- チケット購入機能
  - ログイン時のみ購入可能
  - 残数表示
- マイページ表示機能
  - 購入済チケット一覧表示


## ディレクトリ構成
.<br >
├── .gitignore<br >
├── README.md<br >
├── client<br >
|   ├── .gitignore<br >
|   ├── package-lock.json<br >
|   ├── package.json<br >
|   ├── public<br >
|   |   └── index.html<br >
|   └── src<br >
|       ├── App.js<br >
|       ├── Router.js<br >
|       ├── api<br >
|       ├── components<br >
|       ├── hooks<br >
|       ├── index.css<br >
|       ├── index.js<br >
|       └── pages<br >
└── server<br >
    ├── .gitignore<br >
    ├── index.js<br >
    ├── package-lock.json<br >
    └── package.json


## 開発環境構築

### 起動

ターミナルで二画面表示し、以下コマンドを実行

①一画面目<br >
cd server/<br >
npm run start

②二画面目<br >
cd client/<br >
npm run start
