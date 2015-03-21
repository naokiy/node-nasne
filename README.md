# node-nasne

## 目的

node.jsからnasneのJSON APIを叩いて、HDD残容量などを管理したい。

## 使用例

```js
var Nasne = require('./nasne.js');

// nasneのIPを指定
var nasne = new Nasne('192.168.11.5');

nasne.getHddInfo(function(hddInfo) {
  console.log(hddInfo[0].freeVolumeSize);
});

// HDDが追加されているとき
var nasneWithHdd = new Nasne('192.168.11.5', {additional_hdd: true});

nasneWithHdd.getHddInfo(function(hddInfo) {
  console.log(hddInfo[0].freeVolumeSize + hddInfo[1].freeVolumeSize);
});
```
