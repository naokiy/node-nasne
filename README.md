# node-nasne

## 目的

node.jsからnasneのJSON APIを叩いて、HDD残容量などを管理したい。

## 使用例

```js
var Nasne = require('./nasne.js');

// nasneのIPを指定
var nasne = new Nasne('192.168.11.5');

// HDDの容量を取得
nasne.getHDDVolumeSize(console.log);
```

## メモ

|Path|Method|Type|Port|Description|Available|
|---|---|---|---|---|---|
|/chEpg/channelLogoDataGet|GET|???|64210|???| - |
|/chEpg/EPGGet|POST|???|64210|???| - |
|/chEpg/EPGStoreStart|POST|???|64210|???| - |
|/cma/connectionOnlineIdGet|GET|JSON|64210|???| - |
|/cma/reconstructDatabaseProgressGet|GET|JSON|64210|???| - |
|/config/reconstructDatabaseProgressGet|GET|JSON|64210|???| - |
|/config/NASMetaDataAnalyzeProgressGet|GET|JSON|64210|???| - |
|/recorded/titleListGet|GET|JSON|64220|録画された番組の情報を取得| - |
|/recorded/recordedContentThumbnailGet|GET|???|64210|録画番組のサムネイル取得?| - |
|/remoteAccess/dr/matchingIdInfoGet|GET|JSON|64210|???| - |
|/remoteAccess/dr/outdoorClientListGet2|GET|JSON|64210|???| - |
|/remoteAccess/dr/registerRequestListGet|GET|JSON|64210|???| - |
|/remoteAccess/sync/registerdFolderNameGetByReceiver|GET|JSON|64210|???| - |
|/remoteAccess/sync/reservedFolderNameGetByInitiator|GET|JSON|64210|???| - |
|/remoteAccess/sync/syncDTVTunerListGet_2|GET|JSON|64210|???| - |
|/schedule/conflictListGet|GET|JSON|64220|予約時に衝突してるかを確認| - |
|/schedule/reservedInfoBitrateGet|GET|JSON|64220|???| - |
|/schedule/reservedInfoCreate|POST|JSON|64220|録画予約追加| - |
|/schedule/reservedInfoDelete|POST|JSON|64220|録画予約削除| - |
|/schedule/reservedListGet|GET|JSON|64220|録画予約情報の取得|OK|
|/status/areaInfoGet|GET|JSON|64210|地域情報取得| - |
|/status/BCASInfoGet|GET|JSON|64210|BCAS情報取得| - |
|/status/boxNameGet|GET|JSON|64210|nasneの名前取得| - |
|/status/boxStatusListGet|GET|JSON|64210|nasneのステータス取得|OK|
|/status/bdPowerSupplyGet|GET|JSON|64210|???|OK|
|/status/channelPhysicalInfoGet|GET|JSON|64210|アンテナ感度?| - |
|/status/channelPhysicalInfoGetEnd|POST|JSON|64210|アンテナ感度?| - |
|/status/channelPhysicalInfoGetStart|POST|JSON|64210|アンテナ感度?| - |
|/status/channelInfoGet|GET|JSON|64210|選択したチャンネルの情報取得| - |
|/status/channelInfoGet2|GET|JSON|64210|選択したチャンネルの情報取得(放送中の番組込み)|OK|
|/status/channelListGet|GET|JSON|64210|チャンネル一覧を取得|OK|
|/status/currDateGet|GET|JSON|64210|現在時刻を取得| - |
|/status/DLNAMediaServerIconGet|GET|JSON|64210|???| - |
|/status/DLNAMediaServerIconListGet|GET|JSON|64210|???| - |
|/status/DMPAutoRegisterInfoGet|GET|JSON|64210|???| - |
|/status/DMPListGet|GET|JSON|64210|???| - |
|/status/downloadingPermissionGet|GET|JSON|64210|???| - |
|/status/dtcpipClientListGet|GET|JSON|64210|???| - |
|/status/EPGVersionInfoGet|GET|???|64210|EPGの何か???| - |
|/status/eventRelayInfoGet|GET|JSON|64210|???| - |
|/status/HDDInfoGet|GET|JSON|64210|HDDの情報を取得|OK|
|/status/HDDListGet|GET|JSON|64210|HDDの一覧を取得|OK|
|/status/HDDPowerSavingModeGet|GET|JSON|64210|???| - |
|/status/isFinishSetup|GET|JSON|64210|???| - |
|/status/NASInfoGet|GET|JSON|64210|???| - |
|/status/mobileBitrateInfoGet|GET|JSON|64210|???| - |
|/status/networkIfInfoGet|GET|JSON|64210|接続情報を取得| - |
|/status/parentalRatingInfoGet|GET|JSON|64210|???| - |
|/status/parentalRatingPasswordGet|GET|JSON|64210|???| - |
|/status/recNgListGet|GET|JSON|64210|録画失敗情報の取得?| - |
|/status/remoteListGet|GET|JSON|64210|???| - |
|/status/requestClientInfoGet|GET|JSON|64210|接続してるクライアントの情報?| - |
|/status/softwareVersionGet|GET|JSON|64210|ソフトウェアバージョンの確認| - |
|/status/TOTStatusGet|GET|JSON|64210|???| - |
|/status/updateCheck|GET|JSON|64210|更新確認| - |
|/status/updateCheck2|GET|JSON|64210|更新確認 (上との違いがわからない)| - |

