# vscbouyomi README

Visual Studio Codeからローカルの棒読みちゃんをコントロールする拡張機能です  

## できること

- 文章全体の読み上げ  
- 選択文字列の読み上げ
- 一時停止
- 再開
- スキップ

## Usage

インストールすると`Ctrl+Shift+P` で開くコマンドパレットから以下のコマンドが使えるようになります  

- `VSCBouyomi : Talk` : 読み上げ  
    - 内部コマンド : `vscbouyomi.talk`  
- `VSCBouyomi : Skip` : 読み上げのスキップ  
    - 内部コマンド : `vscbouyomi.skip`  
- `VSCBouyomi : Pause` : 読み上げの一時停止  
    - 内部コマンド : `vscbouyomi.pause`  
- `VSCBouyomi : Resume` : 読み上げの再開  
    - 内部コマンド : `vscbouyomi.resume`  

またエディタ内で右クリックコンテキストメニューからも`VSCBouyomi : Talk`が実行できます。

## Requirements

当然ですが棒読みちゃんが必要です  

[棒読みちゃん](http://chi.usamimi.info/Program/Application/BouyomiChan/)  

## Extension Settings

詳しい値などは棒読みちゃん付属の`SampleSrc.txt`をお読みください

- `vscbouyomi.voice` : 棒読みちゃんの声です  
- `vscbouyomi.tone` : 棒読みちゃんの音程です  
- `vscbouyomi.speed` : 棒読みちゃんの読み上げ速度です  
- `vscbouyomi.volume` : 棒読みちゃんの音量です  
- `vscbouyomi.encoding` : 文章のエンコーディングです  
- `vscbouyomi.delimitor` : 文章の区切りを複数指定できます。これで設定した区切り事に棒読みちゃんに読み上げタスクが送られます  
- `vscbouyomi.skipblank` : 空白行を飛ばすかどうかを決められます  

## Known Issues

- `vscbouyomi.encoding` を排除して自動判別するようにしたい
- テストが不十分すぎ

## Release Notes

### 1.0.0

最初のリリース

-----------------------------------------------------------------------------------------------------------
