# フロントエンド開発用のテンプレート

## ディレクトリ構成

project
├── README.md
├── app.bundle.js      // 成果物
├── app.bundle.js.map  // 成果物
├── index.html         // 成果物
├── index.js           // electron用 index.htmlを表示するのみ
├── lib                // npm配布用。babelだけかましたものをここに吐く。利用側はwebpackを使うこと
│   ├── index.js       // packageのmain
│   └── sample.js
├── karma.conf.js
├── package.json
├── spec
│   ├── helpers
│   ├── sample_spec.js // ここにテストを書く
│   └── support
│       └── jasmine.json
├── src
│   ├── index.js
│   └── sample.js
├── webpack.config.js
└── yarn.lock

## タスク

  "scripts": {
    "start": "electron .", // ネイティブアプリとして起動
    "test": "karma start", // 単体テストを行う ブラウザシミュレートもする
    "build": "webpack" // 成果物 app.bundle.jsを生成する
  },

## 利用しているパッケージ
  "devDependencies": {
    "babel-cli": "^6.18.0", // npmの成果物を吐くのに利用
    "babel-loader": "^6.2.9", // webpackでのビルドに利用
    "jasmine-core": "^2.5.2", // test 
    "karma": "^1.3.0", // test時にブラウザシミュレート
    "karma-chrome-launcher": "^2.0.0",
    "karma-jasmine": "^1.1.0",
    "karma-webpack": "^1.8.0", // test時にwebpackでテストコードをビルドするのに必要
    "path": "^0.12.7", // webpack.configで相対パス指定するのに利用
    "webpack": "^1.14.0", // babel変換やcommonjsコードをフロント用に変換するために利用
  },
}

## TODO
- buildタスクでのminifyなど
- npmPackageとしてのbuildとappとしてのbuildを分けるか、どっちもやるためにbabelでlibに吐く→lib以下をwebpackでさらうなどをしたいgulpの世話になるか
- debugStartタスク
    - 監視リビルドelectron更新をしたい
- 成果物をdistにだしたい
- 結合テスト
- html css のトランスパイル環境
