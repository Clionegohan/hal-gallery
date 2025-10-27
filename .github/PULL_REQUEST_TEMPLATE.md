## 概要

## リリース予定

yyyy/mm/dd

## 技術的変更点概要

* なにをどう変更したか
* 追加したモデルの概要(どんなカラムがあってなにが登録されるのか)
* レビュワーにわかるように、技術的視線での変更概要説明

## テスト結果とテスト項目

[開発テストプロセス資料](https://spacemarket.atlassian.net/wiki/spaces/engineering/pages/1538655183)

#### 単体テスト

* [ ] circle ci 上で rspec が全て green となっていること
* [ ] **circle ci の結果は必ず確認する**
* [ ] **緊急のリリースではない限り、落ちたケースの修正も行う**

#### 結合テスト

* [ ] テストする際の項目を、このように、チェック可能な形式で記載する。
* [ ] テストしたらチェックを入れていく。(基本すべてのチェックが終わった時点でレビューに入る)
* [ ] **結合テストでは最終出力の確認も行う(例: 売上の振込予定日のロジック変更をした場合 ->最終的な振り込み処理が変更した振り込み予定日に適切に振り込まれることを確認する)**
* [ ] **決済系のロジック変更は特に決済〜振込までの処理のデグレがないかをテストする**

## チェックリスト

* [ ] [API設計思想を厳守している](https://spacemarket.atlassian.net/wiki/pages/viewpage.action?pageId=2523139)
* [ ] [コーディング規約を厳守している](https://github.com/spacemarket/styleguide/blob/master/ruby.ja.md)
* ドメイン知識ドキュメント更新対象かを確認（[ドキュメント保守ルール](https://spacemarket.atlassian.net/wiki/spaces/engineering/pages/2437906948))
  * [ ] 対象
    * [ ] 更新完了（リリース後でも可）
  * [ ] 対象外
* [ ] APIレスポンスに個人情報を含んでいない(current_resource_ownerが本人の場合を除く)
* [ ] **要求に対して改修範囲に漏れがないこと**
* [ ] **テスト項目の内容の精査・テストの実施自体が行われていること**

## 今回保留した項目とTODOリスト

* [ ] [エンドポイントやフィールドを追加する場合は仕様書を更新](https://spacemarket.atlassian.net/wiki/pages/viewpage.action?pageId=2523139)
* [ ] [後方互換がない変更を加える場合Changelogを更新](https://spacemarket.atlassian.net/wiki/display/api/ChangeLog)
