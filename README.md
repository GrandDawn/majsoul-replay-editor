# 雀魂自制回放
## 功能：自己造一个雀魂的回放
## 使用方法

1.从注释```该部分朝下```开始编辑。

2.编辑将每个人的初始分数。
常用：
+ ```scores=[25000,25000,25000,25000];```
+ ```scores=[35000,35000,35000];```

3.开始每一局的编辑。

4.调用函数`gameend();`。

5.编辑完后，打开雀魂网址，打开开发者工具，选择`console`，输入代码。

6.打开一个开局以自己为东家，并且人数和设定相符合的牌谱，开始享用。

## 每一局的编辑方法


0.定义：**`0`号玩家表示开局时自己的自风为东的玩家，`1`号玩家表示开局时自己的自风为南的玩家......**

1.编辑每个人的初始手牌。`tiles i`表示`i`号玩家的初始手牌。

例子：
```
tiles0=["1m","1m","1m","2m","3m","4m","5m","6m","7m","8m","9m","9m","9m","6z"];
tiles1=["2s","3s","8s","5p","5p","1z","2z","5z","5z","6z","6z","7z","7z"];
tiles2=["2s","2s","3s","4s","4s","6s","6s","8s","8s","3z","4z","5z","7z"];  
tiles3=["3s","4s","6s","5p","9p","1z","1z","2z","2z","3z","3z","4z","4z"];
```
如果为三人麻将，请确保```tiles3=[];```。

2.编辑牌山。

例子：
```
paishan="3s4m1p7p7m8m1m3p1s1s5s9s8p9s2p7m2m8m4p3m6p4m3p1s1p5m2p2m5s7m0s3m4m6m8m6p0m4p7p1p8p3p1s1p2m3m7s3p7s9m2p8p4p6m9p6m9p7p7s8p6p4p6z9s9s7p9p6p7s5s2p5z6s3z4s2z0p7z8s1z2s4z5m";
```

为了方便，代码提供了函数```randompaishan()```，需要两个参数，分别是牌山的开头和牌山的结尾。采用四麻三赤、三麻二赤规则。

例子：
```
paishan=randompaishan("3s","");//以三索开头的牌山
paishan=randompaishan("3s3s3s3s","1z");//以四个三索开头，东风为结尾的牌山
```

3.编辑每一局参数。

一局通常记为`chang ju局ben本场`。

+ `chang`：`0`表示东，`1`表示南，`2`表示西。

+ `ju`：第`ju+1`局。

+ `ben`：`ben`本场。

例如：南二局3本场，则`chang=1;ju=1;ben=3;`。

4.`addNewRound();`不需要改动。

5.开始编辑每一局的过程。

6.结束后调用函数`addedit();`。

## 编辑每一局的过程

1.摸牌：函数`mopai(seat)`。

`seat`：`seat`号玩家摸牌。

例子：`mopai(1);`。

2.出牌：`qiepai(seat,kind,is_liqi)`

`seat`：`seat`号玩家切牌。

`kind`：

+ 如果`kind`等于`"moqie"`，那么为自动摸切。

+ 否则表示切牌`kind`。（请注意红宝牌的影响）

`is_liqi`：表示这次切牌是否立直（仅需第一次）。由系统判断是否是双立直。没有此参数时默认不立直。

例子：`qiepai(0,"0m",true);`和`qiepai(3,"moqie");`。

3.鸣牌：`mingpai(seat,tiles)`

`seat`：`seat`号玩家鸣牌。

`tiles`：从手里拿出的牌。

例子：`mingpai(3,["4m","6m"]);`和`mingpai(1,["0s","5s","5s"]);`。

4.暗杠/加杠/拔北：`leimingpai(seat,tile,type)`

`seat`：`seat`号玩家暗杠/加杠/拔北。

`tile`：要暗杠/加杠/拔北的牌。

`type`：`babei`，`minggang`或`angang`。没有此参数时默认按照拔北、暗杠、加杠的顺序判断。

例子：`leimingpai(0,"1m");`和`leimingpai(2,"4z","angang");`。

5.荒牌流局：`huangpailiuju()`

6.流局：`liuju()`

7.和牌：`hupai([seat1,seat2,...])`

表示`seat1`,`seat2`,...的玩家和牌。

例子：`hupai([0]);`和`hupai([1,2,3]);`。

## 注意事项

1.规则全部按照现行段位场规则。

2.对于不符合要求的填写，可能出现页面崩溃的问题。

3.除了变量名变动以外，大部分情况下会向下兼容。

## 已知BUG

1.天听不显示听牌。

2.巡数不随玩家的变动而改变。

3.荒牌流局时如果有人没听牌会有BUG。

如果发现如何解决BUG，欢迎提 issue 和 pull request。（对于1，只需要提供一个牌谱就行了）

## 版权声明

1.md5加密来自于[百度百科](https://baike.baidu.com/item/MD5/212708?fromtitle=MD5%E5%8A%A0%E5%AF%86&fromid=5706230&fr=aladdin)。

2.recordedit部分参考了B站[一般通过彳亍人](https://space.bilibili.com/23019265)的[BV1HE411Q7JM](https://www.bilibili.com/video/BV1HE411Q7JM)。

3.其他部分均由本人编写。可以用于个人使用，请勿用于商业用途，谢谢配合。请不要将示例代码进行录制并宣传，谢谢。
