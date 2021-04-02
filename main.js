function md5(string){
  function md5_RotateLeft(lValue,iShiftBits){
    return(lValue<<iShiftBits)|(lValue>>>(32-iShiftBits));
  }
  function md5_AddUnsigned(lX,lY){
    var lX4,lY4,lX8,lY8,lResult;
    lX8=(lX&0x80000000);
    lY8=(lY&0x80000000);
    lX4=(lX&0x40000000);
    lY4=(lY&0x40000000);
    lResult=(lX&0x3FFFFFFF)+(lY&0x3FFFFFFF);
    if(lX4&lY4)return(lResult^0x80000000^lX8^lY8);
    if(lX4|lY4){
      if(lResult&0x40000000)return(lResult^0xC0000000^lX8^lY8);
      else return(lResult^0x40000000^lX8^lY8);
    }
    else return(lResult^lX8^lY8);
  }
  function md5_F(x,y,z){
    return(x&y)|((~x)&z);
  }
  function md5_G(x,y,z){
    return(x&z)|(y&(~z));
  }
  function md5_H(x,y,z){
    return(x^y^z);
  }
  function md5_I(x,y,z){
    return(y^(x|(~z)));
  }
  function md5_FF(a,b,c,d,x,s,ac){
    a=md5_AddUnsigned(a,md5_AddUnsigned(md5_AddUnsigned(md5_F(b,c,d),x),ac));
    return md5_AddUnsigned(md5_RotateLeft(a,s),b);
  };
  function md5_GG(a,b,c,d,x,s,ac){
    a=md5_AddUnsigned(a,md5_AddUnsigned(md5_AddUnsigned(md5_G(b,c,d),x),ac));
    return md5_AddUnsigned(md5_RotateLeft(a,s),b);
  };
  function md5_HH(a,b,c,d,x,s,ac){
    a=md5_AddUnsigned(a,md5_AddUnsigned(md5_AddUnsigned(md5_H(b,c,d),x),ac));
    return md5_AddUnsigned(md5_RotateLeft(a,s),b);
  };
  function md5_II(a,b,c,d,x,s,ac){
    a=md5_AddUnsigned(a,md5_AddUnsigned(md5_AddUnsigned(md5_I(b,c,d),x),ac));
    return md5_AddUnsigned(md5_RotateLeft(a,s),b);
  };
  function md5_ConvertToWordArray(string){
    var lWordCount;
    var lMessageLength=string.length;
    var lNumberOfWords_temp1=lMessageLength+8;
    var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1%64))/64;
    var lNumberOfWords=(lNumberOfWords_temp2+1)*16;
    var lWordArray=Array(lNumberOfWords-1);
    var lBytePosition=0;
    var lByteCount=0;
    while(lByteCount<lMessageLength){
      lWordCount=(lByteCount-(lByteCount%4))/4;
      lBytePosition=(lByteCount%4)*8;
      lWordArray[lWordCount]=(lWordArray[lWordCount]|(string.charCodeAt(lByteCount)<<lBytePosition));
      lByteCount++;
    }
    lWordCount=(lByteCount-(lByteCount%4))/4;
    lBytePosition=(lByteCount%4)*8;
    lWordArray[lWordCount]=lWordArray[lWordCount]|(0x80<<lBytePosition);
    lWordArray[lNumberOfWords-2]=lMessageLength<<3;
    lWordArray[lNumberOfWords-1]=lMessageLength>>>29;
    return lWordArray;
  };
  function md5_WordToHex(lValue){
    var WordToHexValue="",
    WordToHexValue_temp="",
    lByte,lCount;
    for(lCount=0;lCount<=3;lCount++){
      lByte=(lValue>>>(lCount*8))&255;
      WordToHexValue_temp="0"+lByte.toString(16);
      WordToHexValue=WordToHexValue+WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
    }
    return WordToHexValue;
  };
  function md5_Utf8Encode(string){
    string=string.replace(/\r\n/g,"\n");
    var utftext="";
    for(var n=0;n<string.length;n++){
      var c=string.charCodeAt(n);
      if(c<128)utftext+=String.fromCharCode(c);
      else if((c>127)&&(c<2048)){
        utftext+=String.fromCharCode((c>>6)|192);
        utftext+=String.fromCharCode((c&63)|128);
      }else{
        utftext+=String.fromCharCode((c>>12)|224);
        utftext+=String.fromCharCode(((c>>6)&63)|128);
        utftext+=String.fromCharCode((c&63)|128);
      }
    }
    return utftext;
  };
  var x=Array();
  var k,AA,BB,CC,DD,a,b,c,d;
  var S11=7,
  S12=12,
  S13=17,
  S14=22;
  var S21=5,
  S22=9,
  S23=14,
  S24=20;
  var S31=4,
  S32=11,
  S33=16,
  S34=23;
  var S41=6,
  S42=10,
  S43=15,
  S44=21;
  string=md5_Utf8Encode(string);
  x=md5_ConvertToWordArray(string);
  a=0x67452301;
  b=0xEFCDAB89;
  c=0x98BADCFE;
  d=0x10325476;
  for(k=0;k<x.length;k+=16){
    AA=a;
    BB=b;
    CC=c;
    DD=d;
    a=md5_FF(a,b,c,d,x[k+0],S11,0xD76AA478);
    d=md5_FF(d,a,b,c,x[k+1],S12,0xE8C7B756);
    c=md5_FF(c,d,a,b,x[k+2],S13,0x242070DB);
    b=md5_FF(b,c,d,a,x[k+3],S14,0xC1BDCEEE);
    a=md5_FF(a,b,c,d,x[k+4],S11,0xF57C0FAF);
    d=md5_FF(d,a,b,c,x[k+5],S12,0x4787C62A);
    c=md5_FF(c,d,a,b,x[k+6],S13,0xA8304613);
    b=md5_FF(b,c,d,a,x[k+7],S14,0xFD469501);
    a=md5_FF(a,b,c,d,x[k+8],S11,0x698098D8);
    d=md5_FF(d,a,b,c,x[k+9],S12,0x8B44F7AF);
    c=md5_FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
    b=md5_FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
    a=md5_FF(a,b,c,d,x[k+12],S11,0x6B901122);
    d=md5_FF(d,a,b,c,x[k+13],S12,0xFD987193);
    c=md5_FF(c,d,a,b,x[k+14],S13,0xA679438E);
    b=md5_FF(b,c,d,a,x[k+15],S14,0x49B40821);
    a=md5_GG(a,b,c,d,x[k+1],S21,0xF61E2562);
    d=md5_GG(d,a,b,c,x[k+6],S22,0xC040B340);
    c=md5_GG(c,d,a,b,x[k+11],S23,0x265E5A51);
    b=md5_GG(b,c,d,a,x[k+0],S24,0xE9B6C7AA);
    a=md5_GG(a,b,c,d,x[k+5],S21,0xD62F105D);
    d=md5_GG(d,a,b,c,x[k+10],S22,0x2441453);
    c=md5_GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
    b=md5_GG(b,c,d,a,x[k+4],S24,0xE7D3FBC8);
    a=md5_GG(a,b,c,d,x[k+9],S21,0x21E1CDE6);
    d=md5_GG(d,a,b,c,x[k+14],S22,0xC33707D6);
    c=md5_GG(c,d,a,b,x[k+3],S23,0xF4D50D87);
    b=md5_GG(b,c,d,a,x[k+8],S24,0x455A14ED);
    a=md5_GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
    d=md5_GG(d,a,b,c,x[k+2],S22,0xFCEFA3F8);
    c=md5_GG(c,d,a,b,x[k+7],S23,0x676F02D9);
    b=md5_GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
    a=md5_HH(a,b,c,d,x[k+5],S31,0xFFFA3942);
    d=md5_HH(d,a,b,c,x[k+8],S32,0x8771F681);
    c=md5_HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
    b=md5_HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
    a=md5_HH(a,b,c,d,x[k+1],S31,0xA4BEEA44);
    d=md5_HH(d,a,b,c,x[k+4],S32,0x4BDECFA9);
    c=md5_HH(c,d,a,b,x[k+7],S33,0xF6BB4B60);
    b=md5_HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
    a=md5_HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
    d=md5_HH(d,a,b,c,x[k+0],S32,0xEAA127FA);
    c=md5_HH(c,d,a,b,x[k+3],S33,0xD4EF3085);
    b=md5_HH(b,c,d,a,x[k+6],S34,0x4881D05);
    a=md5_HH(a,b,c,d,x[k+9],S31,0xD9D4D039);
    d=md5_HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
    c=md5_HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
    b=md5_HH(b,c,d,a,x[k+2],S34,0xC4AC5665);
    a=md5_II(a,b,c,d,x[k+0],S41,0xF4292244);
    d=md5_II(d,a,b,c,x[k+7],S42,0x432AFF97);
    c=md5_II(c,d,a,b,x[k+14],S43,0xAB9423A7);
    b=md5_II(b,c,d,a,x[k+5],S44,0xFC93A039);
    a=md5_II(a,b,c,d,x[k+12],S41,0x655B59C3);
    d=md5_II(d,a,b,c,x[k+3],S42,0x8F0CCC92);
    c=md5_II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
    b=md5_II(b,c,d,a,x[k+1],S44,0x85845DD1);
    a=md5_II(a,b,c,d,x[k+8],S41,0x6FA87E4F);
    d=md5_II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
    c=md5_II(c,d,a,b,x[k+6],S43,0xA3014314);
    b=md5_II(b,c,d,a,x[k+13],S44,0x4E0811A1);
    a=md5_II(a,b,c,d,x[k+4],S41,0xF7537E82);
    d=md5_II(d,a,b,c,x[k+11],S42,0xBD3AF235);
    c=md5_II(c,d,a,b,x[k+2],S43,0x2AD7D2BB);
    b=md5_II(b,c,d,a,x[k+9],S44,0xEB86D391);
    a=md5_AddUnsigned(a,AA);
    b=md5_AddUnsigned(b,BB);
    c=md5_AddUnsigned(c,CC);
    d=md5_AddUnsigned(d,DD);
  }
  return(md5_WordToHex(a)+md5_WordToHex(b)+md5_WordToHex(c)+md5_WordToHex(d)).toLowerCase();
}
const initData=uiscript.UI_Replay.prototype.initData,initRoom=view.DesktopMgr.prototype.initRoom;
function editgame(){
  let UI_Replay=uiscript.UI_Replay.Inst;
  let rounds=[];
  for(let i=0;i<editdata.actions.length;i++){
    let whatever={
      'actions':editdata.actions[i],
      'xun':[]
    }
    if(view.DesktopMgr.Inst.seat)whatever.xun=editdata.xun[i][view.DesktopMgr.Inst.seat];
    else whatever.xun=editdata.xun[i][0];
    rounds.push(whatever);
  }
  UI_Replay.rounds=rounds;
  UI_Replay.gameResult.result.players=editdata.players;
}
function player_datas(a){
  let ret=[];
  for(let seat=0;seat<4;seat++){
    ret[seat]={
      'nickname':editdata.nickname[seat],
      'avatar_id':editdata.avatar_id[seat],
      'character':{
        'is_upgraded':true,
        'level':5,
        'charid':cfg.item_definition.skin.map_[editdata.avatar_id[seat]].character_id,
        'skin':editdata.avatar_id[seat],
      },
      'charid':cfg.item_definition.skin.map_[editdata.avatar_id[seat]].character_id,
      'seat':seat,
      'views':[]
    }
    if(a[seat].account_id!=undefined)ret[seat].account_id=a[seat].account_id;
  }
  return ret;
}
function game_config(){
  return editdata.config;
}
function edit(){
  uiscript.UI_Replay.prototype.initData=function(t){
    let _=initData.call(this,t);
    editgame();
    return _;
  }
  view.DesktopMgr.prototype.initRoom=function(e,a,s,o,l){
    if(o==1)return initRoom.call(this,game_config(),player_datas(a),s,o,l);
    else return initRoom.call(this,e,a,s,o,l);
  }
}
function canceledit(){
  uiscript.UI_Replay.prototype.initData=function(t){
    return initData.call(this,t);
  }
  view.DesktopMgr.prototype.initRoom=function(e,a,s,o,l){
    return initRoom.call(this,e,a,s,o,l);
  }
}
var scores=[25000,25000,25000,25000],tiles0,tiles1,tiles2,tiles3,firstneededscores; 
var baopai,liqibang=0,lstliqi,doracnt,playertiles,fulu,paihe;
var liqiinfo,drawtype,lstdrawtype,doras,li_doras,delta_scores;
var chang=0,ju=0,ben=0,playercnt,actions,xun,players,benchangbang;
var config,hules_history,hupaied,paishan,discardtiles=["","","",""];
var editdata={
  'actions':[],
  'xun':[],
  'players':null,
  'config':null,
  'nickname':[],
  'avatar_id':[],
};
function init(){
  xun=[[],[],[],[]];
  baopai=[];
  actions=[];
  lstliqi=0;
  doracnt={'cnt':1,'lsttype':0};
  hupaied=[false,false,false,false];
  hules_history=[];
  playertiles=[[],[],[],[]];
  fulu=[[],[],[],[]];
  paihe=[{'liujumanguan':true,'tiles':[]},{'liujumanguan':true,'tiles':[]},
         {'liujumanguan':true,'tiles':[]},{'liujumanguan':true,'tiles':[]}];
  liqiinfo=[{'liqi':0,'yifa':1},{'liqi':0,'yifa':1},
            {'liqi':0,'yifa':1},{'liqi':0,'yifa':1}];
  drawtype=1;lstdrawtype=1;
  playercnt;doras=[];li_doras=[];
  if(tiles3.length==0){
    playercnt=3;
    for(let i=0;i<5;i++){
      doras[i]=paishan[paishan.length-18-4*i]+paishan[paishan.length-17-4*i];
      li_doras[i]=paishan[paishan.length-20-4*i]+paishan[paishan.length-19-4*i];
    }
  }
  else {
    playercnt=4;
    for(let i=0;i<5;i++){
      doras[i]=paishan[paishan.length-10-4*i]+paishan[paishan.length-9-4*i];
      li_doras[i]=paishan[paishan.length-12-4*i]+paishan[paishan.length-11-4*i];
    }
  }
  delta_scores=[];
  for(let i=0;i<playercnt;i++)delta_scores[i]=0;
  for(let i=0;i<tiles0.length;i++)playertiles[0][i]=tiles0[i];
  for(let i=0;i<tiles1.length;i++)playertiles[1][i]=tiles1[i];
  for(let i=0;i<tiles2.length;i++)playertiles[2][i]=tiles2[i];
  for(let i=0;i<tiles3.length;i++)playertiles[3][i]=tiles3[i];
}
function is_xuezhandaodi(){
  if(config&&config.mode&&config.mode.deatil_rule&&config.mode.deatil_rule.xuezhandaodi)return true;
  return false;
}
function is_huansanzhang(){
  if(config&&config.mode&&config.mode.deatil_rule&&config.mode.deatil_rule.huansanzhang)return true;
  return false;
}
function is_guyi(){
  if(config&&config.mode&&config.mode.deatil_rule&&config.mode.deatil_rule.guyi_mode)return true;
  return false;
}
function is_shiduan(){
  if(!config)return true;
  if(!config.mode)return true;
  if(!config.mode.deatil_rule)return true;
  if(config.mode.deatil_rule.shiduan)return true;
  return false;
}
function fanfu(){
  if(!config)return 1;
  if(!config.mode)return 1;
  if(!config.mode.deatil_rule)return 1;
  if(config.mode.deatil_rule.fanfu)return config.mode.deatil_rule.fanfu;
  return 1;
}
function separatetile(x){
  let ret=[];
  while(x.length>0){
    ret.push(x.substring(0,2));
    x=x.substring(2);
  }
  return ret;
}
var nxt2=[0,2,3,4,5,6,7,8,9,35,11,12,13,14,15,16,17,18,35,20,21,22,23,24,25,26,27,35,35,35,35,35,35,35,35,36,0,0,0,0];
var doranxt=[0,2,3,4,5,6,7,8,9, 1,11,12,13,14,15,16,17,18,10,20,21,22,23,24,25,26,27,19,29,30,31,28,33,34,32];
function equaltile(x,y){
  if(x[1]==y[1]&&x[0]=='0'&&y[0]=='5')return 1;
  if(x[1]==y[1]&&x[0]=='5'&&y[0]=='0')return 1;
  if(x==y)return 1;
  return 0;
}
function tiletoint(tile,type){
  if(type!=undefined){
    if(tile=="0m")return 35;
    if(tile=="0p")return 36;
    if(tile=="0s")return 37;
  }
  if(tile[0]=='0')tile='5'+tile[1];
  if(tile[1]=='m')return parseInt(tile);
  if(tile[1]=='p')return 9+parseInt(tile);
  if(tile[1]=='s')return 18+parseInt(tile);
  if(tile[1]=='z')return 27+parseInt(tile);
}
function inttotile(x){
  if(x>=1&&x<=9)return x.toString()+"m";
  if(x>=10&&x<=18)return (x-9).toString()+"p";
  if(x>=19&&x<=27)return (x-18).toString()+"s";
  if(x>=28&&x<=34)return (x-27).toString()+"z";
  if(x==35)return "0m";
  if(x==36)return "0p";
  if(x==37)return "0s";
}
function calchupai(tls){
  let cnt=[],tmp=[];
  for(let i=0;i<=36;i++){cnt[i]=0;tmp[i]=0;}
  for(let i=0;i<tls.length;i++)cnt[tiletoint(tls[i])]++;
  for(let i=1;i<=34;i++)if(cnt[i]>4)return 0;
  for(let i=1;i<=34;i++){
    if(cnt[i]>=2){
      let ok=1;
      cnt[i]-=2;
      for(let j=1;j<=34;j++)tmp[j]=cnt[j];
      for(let k=1;k<=3;k++){
        for(let j=k*9-8;j;j=nxt2[j]){
          if(tmp[j]<0){
            ok=0;
            break;
          }
          tmp[j]%=3;
          tmp[nxt2[j]]-=tmp[j];
          tmp[nxt2[nxt2[j]]]-=tmp[j];
        }
        tmp[35]=tmp[36]=0;
      }
      for(let j=28;j<=34;j++)if(tmp[j]%3!=0)ok=0;
      cnt[i]+=2;
      if(ok)return 1;
    }
  }
  let duizi=0;
  for(let i=1;i<=34;i++)if(cnt[i]==2)duizi++;
  if(duizi==7)return 2;
  let guoshi=1;
  for(let i=1;i<=34;i++){
    if(i==1||i==9||i==10||i==18||i==19||i>=27&&i<=34){if(cnt[i]==0)guoshi=0;}
    else if(cnt[i]!=0)guoshi=0;
  }
  if(guoshi)return 3;
  return 0;
}
function tingpai(seat){
  let tls=playertiles[seat];
  let cnt=[];
  for(let i=0;i<=36;i++)cnt[i]=0;
  for(let i=0;i<tls.length;i++)cnt[tiletoint(tls[i])]++;
  for(let i=fulu[seat].length-1;i>=0;i--)if(fulu[seat][i].type==3)cnt[tiletoint(fulu[seat][i].tile[0])]+=4;
  let res=[];
  for(let i=1;i<=34;i++){
    tls.push(inttotile(i));
    cnt[i]++;
    if(cnt[i]<5&&calchupai(tls)!=0)res.push({'tile':inttotile(i)});
    tls.length=tls.length-1;
    cnt[i]--;
  }
  return res;
}
function calcsudian(x){
  let val=0;
  for(let i=0;i<x.fans.length;i++)val=val+x.fans[i].val;
  if(val<fanfu())return -2000;
  else if(x.yiman==true)return 8000*val;
  else if(val==5)return 2000;
  else if(val==6||val==7)return 3000;
  else if(val>=8&&val<=10)return 4000;
  else if(val==11||val==12)return 6000;
  else if(val>=13)return 8000;
  else return Math.min(Math.pow(2,val+2)*x.fu,2000);
}
//0：副露的顺子   1：副露的刻子  2：明杠
//3：暗杠         4：拔北宝牌    5：未副露的顺子 
//6：未副露的刻子 7：对子 

//1~64
//自摸   立直   抢杠     岭上   海底   河底   白     发     中     门风 
//场风   断幺   一杯     平和   混全   一气   三色   w立    三同刻 三杠
//对对   三暗   小三元   混老头 七对   纯全   混     二杯   清     一发
//dora   红宝   里宝     北宝   天和   地和   带三元 四暗   字一色 绿一色
//清老头 国士   小四喜   四杠   九莲   八连庄 纯九   四单   十三面 带四喜
//燕返   杠振   十二落抬 五门齐 三连刻 三同顺 1p摸月 9p捞鱼 人和   带车轮
//大竹林 大数邻 石上     带七星
function calcfan(tls,seat,zimo){
  let lsttile=tls[tls.length-1],fulucnt=0;
  let ret={'yiman':false,'fans':0,'fu':0};
  let cnt=[],tmp=[];
  for(let i=0;i<=36;i++){cnt[i]=0;tmp[i]=0;}
  for(let i=0;i<tls.length;i++)cnt[tiletoint(tls[i])]++;
  let partition=[];
  for(let i=0;i<fulu[seat].length;i++){
    if(fulu[seat][i].type!=4)partition.push(fulu[seat][i]);
    if(fulu[seat][i].type!=4&&fulu[seat][i].type!=3)fulucnt++;
  }
  function updateret(x){
    if(x==undefined)return;
    if(calcsudian(x)>calcsudian(ret))ret=x;
  }
  function calc(){
    let cnt2=[];
    for(let i=0;i<=36;i++)cnt2[i]=0;
    let partitiontmp=[].concat(partition);
    for(let i=partitiontmp.length-1;i>=0;i--){
      let tiles=partitiontmp[i].tile;
      if(partitiontmp[i].type==0||partitiontmp[i].type==5){
        cnt2[tiletoint(tiles[0])]++;
        cnt2[tiletoint(tiles[1])]++;
        cnt2[tiletoint(tiles[2])]++;
      }
      else if(partitiontmp[i].type==1||partitiontmp[i].type==6)cnt2[tiletoint(tiles[0])]+=3;
      else if(partitiontmp[i].type==2||partitiontmp[i].type==3)cnt2[tiletoint(tiles[0])]+=4;
      else if(partitiontmp[i].type==7)cnt2[tiletoint(tiles[0])]+=2;
    }
    function calc0(tingpaifu){
      function deletefan(ans,x){
        let flag=false;
        for(let i=0;i<ans.fans.length;i++){
          if(flag)ans.fans[i-1]=ans.fans[i];
          if(ans.fans[i].id==x)flag=true;
        }
        if(flag)ans.fans.length=ans.fans.length-1;
        return ans;
      }
      let tianhu=false; 
      let ans={'yiman':true,'fans':[],'fu':0};
      //---------------------------------------------- 
      let typecnt=[];
      for(let i=0;i<=34;i++)typecnt[i]=[0,0,0];
      for(let i=0;i<partitiontmp.length;i++){
        let type=partitiontmp[i].type;
        if(type==1||type==2||type==3||type==6||type==7)typecnt[tiletoint(partitiontmp[i].tile[0])][0]=type;
        if(type==1||type==2||type==3||type==6)typecnt[tiletoint(partitiontmp[i].tile[0])][1]=2;
        if(type==7)typecnt[tiletoint(partitiontmp[i].tile[0])][1]=1;
        if(type==0||type==5)typecnt[(tiletoint(partitiontmp[i].tile[0])+tiletoint(partitiontmp[i].tile[1])+tiletoint(partitiontmp[i].tile[2]))/3][2]++;
      } 
      let anke=0,gangzi=0,beikou=0,kezi=0,duizi=0,santongshun=false,sanlianke=false;
      for(let i=1;i<=34;i++){
        if(typecnt[i][0]==3||typecnt[i][0]==6)anke++;
        if(typecnt[i][0]==3||typecnt[i][0]==2)gangzi++;
        if(typecnt[i][1]==2)kezi++;
        if(i>=2&&i<=8||i>=11&&i<=17||i>=20&&i<=26){
          if(typecnt[i][1]==2&&typecnt[i-1][1]==2&&typecnt[i+1][1]==2)sanlianke=true;
        }
        if(typecnt[i][0]==7)duizi++;
        beikou+=Math.floor(typecnt[i][2]/2);
        if(Math.floor(typecnt[i][2]/3)>0)santongshun=true;
      }
      //--------------------------- 
      let flag=[true,true,true,true,true];
      for(let i=1;i<=34;i++){
        if(i!=28&&i!=29&&i!=30&&i!=31&&i!=32&&i!=33&&i!=34&&cnt2[i]>0)flag[0]=false;
        if(i!=20&&i!=21&&i!=22&&i!=24&&i!=26&&i!=33&&cnt2[i]>0)flag[1]=false;
        if(i!=1&&i!=9&&i!=10&&i!=18&&i!=19&&i!=27&&cnt2[i]>0)flag[2]=false;
        if((i==1||i==9||i==10||i==18||i==19||i==27||i>=28&&i<=34)&&cnt2[i]>0)flag[3]=false;
        if((i>=2&&i<=8||i>=11&&i<=17||i>=20&&i<=26)&&cnt2[i]>0)flag[4]=false;
      }
      //---------------------------------
      let wumenqi=true;
      if(cnt2[1]+cnt2[2]+cnt2[3]+cnt2[4]+cnt2[5]+cnt2[6]+cnt2[7]+cnt2[8]+cnt2[9]==0)wumenqi=false; 
      if(cnt2[10]+cnt2[11]+cnt2[12]+cnt2[13]+cnt2[14]+cnt2[15]+cnt2[16]+cnt2[17]+cnt2[18]==0)wumenqi=false; 
      if(cnt2[19]+cnt2[20]+cnt2[21]+cnt2[22]+cnt2[23]+cnt2[24]+cnt2[25]+cnt2[26]+cnt2[27]==0)wumenqi=false;
      if(cnt2[28]+cnt2[29]+cnt2[30]+cnt2[31]==0)wumenqi=false;
      if(cnt2[32]+cnt2[33]+cnt2[34]==0)wumenqi=false;
      //--------------------------------- 
      let jiulian=[0,""],yiqi=false,hunyise=false,qingyise=false;
      let jlbd=[0,3,1,1,1,1,1,1,1,3];
      for(let k=0;k<=2;k++){
        if(typecnt[k*9+2][2]>0&&typecnt[k*9+5][2]>0&&typecnt[k*9+8][2]>0)yiqi=true;
        jiulian=[1,""];
        for(let i=1;i<=9;i++)if(cnt2[k*9+i]<jlbd[i])jiulian=[0,""];
        if(jiulian[0]==1){
          for(let i=1;i<=9;i++)if(cnt2[k*9+i]>jlbd[i])jiulian[1]=inttotile(k*9+i);
          break;
        }
      }
      for(let i=partitiontmp.length-1;i>=0;i--)if(partitiontmp[i].type==3)jiulian=[0,""];
      for(let k=0;k<=3;k++){
        hunyise=true;qingyise=true;
        for(let i=1;i<=34;i++){
          if(Math.floor((i-1)/9)!=k&&cnt2[i]>0)qingyise=false;
          if(Math.floor((i-1)/9)!=k&&i<=27&&cnt2[i]>0)hunyise=false;
        }
        if(hunyise==true)break;
      }
      //----------------------------------
      let sanse=false,sansetongke=false;
      for(let i=1;i<=9;i++){
        if(i>=2&&i<=8&&typecnt[i][2]>0&&typecnt[i+9][2]>0&&typecnt[i+18][2]>0)sanse=true;
        if(typecnt[i][1]==2&&typecnt[i+9][1]==2&&typecnt[i+18][1]==2)sansetongke=true;
      }
      //---------------------------------- 
      let chunquandai=true,hunquandai=true;
      for(let i=1;i<=34;i++){
        if(i!=2&&i!=8&&i!=11&&i!=17&&i!=20&&i!=26&&typecnt[i][2]>0){chunquandai=false;hunquandai=false;}
        if(i!=1&&i!=9&&i!=10&&i!=18&&i!=19&&i!=27&&typecnt[i][1]!=0){chunquandai=false;hunquandai=false;}
        if(i>=28&&i<=34&&typecnt[i][1]!=0)hunquandai=false;
      }
      //------------------------------------
      let pinghu=true;
      if(duizi==7)pinghu=false;
      for(let i=1;i<=34;i++){
        if(typecnt[i][1]==2)pinghu=false;
        if(typecnt[i][0]==7){
          if(tiletoint(((seat-ju+playercnt)%playercnt+1).toString()+"z")==i)pinghu=false;
          if(tiletoint((chang+1).toString()+"z")==i)pinghu=false;
          if(i==32||i==33||i==34)pinghu=false;
        }
      }
      let flagcnt=0;
      if((tiletoint(lsttile)-1)%9>=3)if(typecnt[tiletoint(lsttile)-1][2])flagcnt++;
      if((tiletoint(lsttile)-1)%9<=5)if(typecnt[tiletoint(lsttile)+1][2])flagcnt++;
      if(flagcnt==0)pinghu=false;
      //------------------------------------- 
      let alldoras=[0,0,0,0];
      for(let i=0;i<fulu[seat].length;i++){
        if(fulu[seat][i].type==4){
          cnt2[tiletoint(fulu[seat][i].tile[0])]++;
          if(fulu[seat][i].tile[0]=="4z")alldoras[2]++;
        }
      }
      for(let i=0;i<doracnt.cnt;i++){
        if(playercnt==3&&tiletoint(doras[i])==1)alldoras[0]+=cnt2[9];
        else alldoras[0]+=cnt2[doranxt[tiletoint(doras[i])]];
        if(playercnt==3&&tiletoint(li_doras[i])==1)alldoras[3]+=cnt2[9];
        else alldoras[3]+=cnt2[doranxt[tiletoint(li_doras[i])]];
      }
      for(let i=0;i<tls.length;i++)if(tls[i][0]=='0')alldoras[1]++;
      for(let i=0;i<fulu[seat].length;i++)
        for(let j=0;j<fulu[seat][i].tile.length;j++)if(fulu[seat][i].tile[j][0]=='0')alldoras[1]++;
      let lstaction=actions[actions.length-1];
      //------------------------------------
      if(liqiinfo[seat].yifa!=0&&liqiinfo[seat].liqi==0&&seat==ju&&zimo){ans.fans.push({'val':1,id:35});tianhu=true;}//天和 
      if(liqiinfo[seat].yifa!=0&&liqiinfo[seat].liqi==0&&seat!=ju&&zimo)ans.fans.push({'val':1,id:36});//地和 
      if(liqiinfo[seat].yifa!=0&&liqiinfo[seat].liqi==0&&seat!=ju&&!zimo&&is_guyi())ans.fans.push({'val':1,id:59});//人和 
      if(typecnt[32][1]+typecnt[33][1]+typecnt[34][1]==6){
        ans.fans.push({'val':1,'id':37});//大三元
        let fulusanyuancnt=0;
        for(let i=0;i<fulu[seat].length;i++){
          let type=fulu[seat][i].type,tile=tiletoint(fulu[seat][i].tile[0]);
          if((type==1||type==2)&&(tile==32||tile==33||tile==34)){
            fulusanyuancnt++;
            if(fulusanyuancnt==3&&!is_xuezhandaodi())baopai[seat]={'seat':fulu[seat][i].from,'val':1};
          }
        }
      }
      if(fulucnt==0&&anke==4&&typecnt[tiletoint(lsttile)][1]==2&&!tianhu)ans.fans.push({'val':1,'id':38});//四暗刻 
      if(flag[0]==true)ans.fans.push({'val':1,'id':39});//字一色 
      if(flag[1]==true)ans.fans.push({'val':1,'id':40});//绿一色 
      if(flag[2]==true)ans.fans.push({'val':1,'id':41});//清老头 
      if(typecnt[28][1]+typecnt[29][1]+typecnt[30][1]+typecnt[31][1]==7)ans.fans.push({'val':1,'id':43});//小四喜 
      if(gangzi==4)ans.fans.push({'val':1,'id':44});//四杠子
      if(fulucnt==0&&jiulian[0]==1&&!equaltile(lsttile,jiulian[1])&&!tianhu)ans.fans.push({'val':1,'id':45});//九莲宝灯 
      if(fulucnt==0&&jiulian[0]==1&&(equaltile(lsttile,jiulian[1])||tianhu))ans.fans.push({'val':2,'id':47});//纯正九莲宝灯
      if(fulucnt==0&&anke==4&&(typecnt[tiletoint(lsttile)][0]==7||tianhu))ans.fans.push({'val':2,'id':48});//四暗刻单骑 
      if(typecnt[28][1]+typecnt[29][1]+typecnt[30][1]+typecnt[31][1]==8){
        ans.fans.push({'val':2,'id':50});//大四喜 
        let fulusixicnt=0;
        for(let i=0;i<fulu[seat].length;i++){
          let type=fulu[seat][i].type,tile=tiletoint(fulu[seat][i].tile[0]);
          if((type==1||type==2)&&(tile==28||tile==29||tile==30||tile==31)){
            fulusixicnt++;
            if(fulusixicnt==4&&!is_xuezhandaodi())baopai[seat]={'seat':fulu[seat][i].from,'val':2};
          }
        }
      }
      if(is_guyi()){
        if(qingyise&&duizi==7&&flag[3]){
          if(cnt2[2]>0)ans.fans.push({'val':1,'id':62});//大数邻
          if(cnt2[11]>0)ans.fans.push({'val':1,'id':60});//大车轮 
          if(cnt2[20]>0)ans.fans.push({'val':1,'id':61});//大竹林 
        }
        if(liqiinfo[seat].liqi==2&&(zimo&&paishan.length/2-14==0&&lstdrawtype==1||!zimo&&paishan.length/2-14==0))ans.fans.push({'val':1,'id':63});//石上三年 
        if(flag[0]==true&&duizi==7){
          ans=deletefan(ans,39);
          ans.fans.push({'val':2,'id':64});
        }//大七星 
      }
      if(ans.fans.length!=0)return ans; 
      //------------------------------------
      ans.yiman=false;
      if(liqiinfo[seat].liqi==2)ans.fans.push({'val':2,'id':18});//双立直
      if(liqiinfo[seat].liqi==1)ans.fans.push({'val':1,'id':2});//立直
      if(liqiinfo[seat].liqi!=0&&liqiinfo[seat].yifa!=0)ans.fans.push({'val':1,'id':30});//一发 
      if(is_guyi()){
        if(lstaction.name=="RecordDiscardTile"&&lstaction.data.is_liqi)ans.fans.push({'val':1,'id':51});//燕返 
        if(!zimo&&lstdrawtype==0)ans.fans.push({'val':1,'id':52});//杠振 
        if(fulucnt==4)ans.fans.push({'val':1,'id':53});//十二落抬 
      }
      if(fulucnt==0&&zimo)ans.fans.push({'val':1,'id':1});//门前清自摸和 
      if(lstaction.name=="RecordAnGangAddGang")ans.fans.push({'val':1,'id':3});//抢杠 
      if(zimo&&lstdrawtype==0)ans.fans.push({'val':1,'id':4});//岭上开花 
      if(zimo&&paishan.length/2-14==0&&lstdrawtype==1)ans.fans.push({'val':1,'id':5});//海底捞月 
      if(!zimo&&paishan.length/2-14==0)ans.fans.push({'val':1,'id':6});//河底捞鱼
      if(typecnt[32][1]==2)ans.fans.push({'val':1,'id':7});//白 
      if(typecnt[33][1]==2)ans.fans.push({'val':1,'id':8});//发 
      if(typecnt[34][1]==2)ans.fans.push({'val':1,'id':9});//中
      if(typecnt[tiletoint(((seat-ju+playercnt)%playercnt+1).toString()+"z")][1]==2)ans.fans.push({'val':1,'id':10});//门风 
      if(typecnt[tiletoint((chang+1).toString()+"z")][1]==2)ans.fans.push({'val':1,'id':11});//场风 
      if(flag[3]==true&&(is_shiduan()||!is_shiduan()&&fulucnt==0))ans.fans.push({'val':1,'id':12});//断幺九 
      if(beikou==1&&fulucnt==0)ans.fans.push({'val':1,'id':13});//一杯口
      if(pinghu&&fulucnt==0)ans.fans.push({'val':1,'id':14});//平和 
      if(hunquandai&&!chunquandai&&!flag[4]){
        if(fulucnt==0)ans.fans.push({'val':2,'id':15});
        else ans.fans.push({'val':1,'id':15});
      }//混全带幺九
      if(yiqi){
        if(fulucnt==0)ans.fans.push({'val':2,'id':16});
        else ans.fans.push({'val':1,'id':16});
      }//一气通贯 
      if(sanse){
        if(fulucnt==0)ans.fans.push({'val':2,'id':17});
        else ans.fans.push({'val':1,'id':17});
      }//三色同顺 
      if(sansetongke)ans.fans.push({'val':2,'id':19});//三色同刻 
      if(gangzi==3)ans.fans.push({'val':2,'id':20});//三杠子 
      if(kezi==4)ans.fans.push({'val':2,'id':21});//对对和 
      if(anke==3)ans.fans.push({'val':2,'id':22});//三暗刻 
      if(typecnt[32][1]+typecnt[33][1]+typecnt[34][1]==5)ans.fans.push({'val':2,'id':23});//小三元 
      if(flag[4]==true)ans.fans.push({'val':2,'id':24});//混老头 
      if(duizi==7)ans.fans.push({'val':2,'id':25});//七对子 
      if(is_guyi()&&wumenqi)ans.fans.push({'val':2,'id':54});//五门齐 
      if(is_guyi()&&sanlianke)ans.fans.push({'val':2,'id':55});//三连刻 
      if(chunquandai){
        if(fulucnt==0)ans.fans.push({'val':3,'id':26});
        else ans.fans.push({'val':2,'id':26});
      }//纯全带幺九
      if(hunyise&&!qingyise){
        if(fulucnt==0)ans.fans.push({'val':3,'id':27});
        else ans.fans.push({'val':2,'id':27});
      }//混一色 
      if(is_guyi()&&santongshun){
        ans=deletefan(ans,13);
        if(fulucnt==0)ans.fans.push({'val':3,'id':56});
        else ans.fans.push({'val':2,'id':56});
      }//一色三同顺 
      if(beikou==2&&fulucnt==0)ans.fans.push({'val':3,'id':28});//两杯口
      if(qingyise){
        if(fulucnt==0)ans.fans.push({'val':6,'id':29});
        else ans.fans.push({'val':5,'id':29});
      }//清一色 
      if(is_guyi()==2){
        if(zimo&&paishan.length/2-14==0&&lstdrawtype==1&&lsttile=="1p"){
          ans=deletefan(ans,5);
          ans.fans.push({'val':5,'id':57});//一筒摸月 
        }
        if(!zimo&&paishan.length/2-14==0&&lsttile=="9p"){
          ans=deletefan(ans,6);
          ans.fans.push({'val':5,'id':58});//九筒捞鱼 
        }
      }
      if(calcsudian(ans)==-2000)return ans; 
      if(alldoras[0]!=0)ans.fans.push({'val':alldoras[0],'id':31});//宝牌 
      if(alldoras[1]!=0)ans.fans.push({'val':alldoras[1],'id':32});//红宝牌 
      if(alldoras[2]!=0)ans.fans.push({'val':alldoras[2],'id':34});//北宝牌 
      if(liqiinfo[seat].liqi!=0)ans.fans.push({'val':alldoras[3],'id':33});//里宝牌 
      //--------------------------------------------------
      if(duizi==7){
        ans.fu=25;
        return ans;
      }//七对子固定符数 
      ans.fu=20;//符底 
      if(!pinghu)ans.fu+=tingpaifu;//听牌型符
      for(let i=1;i<=34;i++){
        if(i==1||i==9||i==10||i==18||i==19||i==27||i>=28&&i<=34){
          if(typecnt[i][0]==1)ans.fu+=4;
          if(typecnt[i][0]==2)ans.fu+=16;
          if(typecnt[i][0]==3)ans.fu+=32;
          if(typecnt[i][0]==6)ans.fu+=8;
        }
        else{
          if(typecnt[i][0]==1)ans.fu+=2;
          if(typecnt[i][0]==2)ans.fu+=8;
          if(typecnt[i][0]==3)ans.fu+=16;
          if(typecnt[i][0]==6)ans.fu+=4;
        }
        if(typecnt[i][0]==7){
          if(i==tiletoint(((seat-ju+playercnt)%playercnt+1).toString()+"z"))ans.fu+=2;
          if(i==tiletoint((chang+1).toString()+"z"))ans.fu+=2;
          if(i==32||i==33||i==34)ans.fu+=2;
        }
      }//刻子符 
      if(zimo&&!pinghu)ans.fu+=2;//自摸符 
      if(!zimo&&fulucnt==0)ans.fu+=10;//门前清荣和符 
      ans.fu=Math.ceil(ans.fu/10)*10;
      if(ans.fan==1&&ans.fu==20)ans.fu=30;
      //--------------------------------------------------
      return ans;
    }
    for(let i=partitiontmp.length-1;i>=0;i--){
      let tile=partitiontmp[i].tile,type=partitiontmp[i].type;
      if(type==5&&(equaltile(tile[0],lsttile)||equaltile(tile[1],lsttile)||equaltile(tile[2],lsttile))){
        if(!zimo)partitiontmp[i].type=0;
        let midtile=inttotile((tiletoint(tile[0])+tiletoint(tile[1])+tiletoint(tile[2]))/3);
        if(equaltile(midtile,lsttile))updateret(calc0(2));//坎张听符 
        else if(tiletoint(lsttile)%9==3&&tiletoint(midtile)%9==2)updateret(calc0(2));//边张听符 
        else if(tiletoint(lsttile)%9==7&&tiletoint(midtile)%9==8)updateret(calc0(2));//边张听符 
        else updateret(calc0(0));
        partitiontmp[i].type=5;
      }
      if(type==6&&equaltile(tile[0],lsttile)){
        if(!zimo)partitiontmp[i].type=1;
        updateret(calc0(0));
        partitiontmp[i].type=6;
      }
      if(type==7&&equaltile(tile[0],lsttile))updateret(calc0(2));//单骑符 
    }
  }
  function dfs(now){
    if(now==35){
      if(partition.length==7||partition.length==5)calc(); 
      return;
    }
    if(cnt[now]==0){
      dfs(now+1);
      return;
    }
    let whatever=[0,2,3];
    for(let k=0;k<3;k++){
      if(cnt[now]<whatever[k])continue;
      cnt[now]-=whatever[k];
      let cnt0=cnt[now];
      if(k==1)partition.push({'type':7,'tile':[inttotile(now),inttotile(now)]}); 
      else if(k==2)partition.push({'type':6,'tile':[inttotile(now),inttotile(now),inttotile(now)]}); 
      if(cnt[nxt2[now]]>=cnt0&&cnt[nxt2[nxt2[now]]]>=cnt0){
        cnt[now]-=cnt0;
        cnt[nxt2[now]]-=cnt0;
        cnt[nxt2[nxt2[now]]]-=cnt0;
        for(let i=1;i<=cnt0;i++)partition.push({'type':5,'tile':[inttotile(now),inttotile(nxt2[now]),inttotile(nxt2[nxt2[now]])]});
        dfs(now+1);
        cnt[now]+=cnt0;
        cnt[nxt2[now]]+=cnt0;
        cnt[nxt2[nxt2[now]]]+=cnt0;
        for(let i=1;i<=cnt0;i++)partition.length=partition.length-1;
      }
      if(k==1||k==2)partition.length=partition.length-1;
      cnt[now]+=whatever[k];
    }
  }
  dfs(1);
  if(calchupai(tls)==3){
    let tianhu=false; 
    let ans={'yiman':true,'fans':[],'fu':0};
    if(liqiinfo[seat].yifa!=0&&liqiinfo[seat].liqi==0&&seat==ju&&zimo){ans.fans.push({'val':1,id:35});tianhu=true;}//天和 
    if(liqiinfo[seat].yifa!=0&&liqiinfo[seat].liqi==0&&seat!=ju&&zimo)ans.fans.push({'val':1,id:36});//地和 
    if(liqiinfo[seat].yifa!=0&&liqiinfo[seat].liqi==0&&seat!=ju&&!zimo&&is_guyi())ans.fans.push({'val':1,id:59});//人和 
    if(fulucnt==0&&cnt[tiletoint(lsttile)]==1&&!tianhu)ans.fans.push({'val':1,'id':42});//国士无双 
    if(fulucnt==0&&(cnt[tiletoint(lsttile)]==2||tianhu))ans.fans.push({'val':2,'id':49});//国士无双十三面 
    updateret(ans);
  }
  return ret;
}
function calcxun(){
  for(let x=0;x<playercnt;x++)if(playertiles[x].length%3==2&&!hupaied[x])xun[x].push(actions.length-1);
}
function calcdoras(){
  let doras0=[];
  for(let i=0;i<doracnt.cnt;i++)doras0[i]=doras[i];
  return doras0;
}
function gamebegin(){
  config=editdata.config;
  if(is_guyi()&&config.mode.mode==11){
    config.mode.detail_rule.guyi_mode=0;
    config.mode.detail_rule.xuezhandaodi=0;
    config.mode.detail_rule.huansanzhang=0;
  }
  if(config.mode.mode==11){
    if(config&&config.mode&&config.mode.detail_rule&&config.mode.detail_rule.init_point)scores=[config.mode.detail_rule.init_point,config.mode.detail_rule.init_point,config.mode.detail_rule.init_point];
    else scores=[35000,35000,35000];
  }
  else{
    if(config&&config.mode&&config.mode.detail_rule&&config.mode.detail_rule.init_point)scores=[config.mode.detail_rule.init_point,config.mode.detail_rule.init_point,config.mode.detail_rule.init_point,config.mode.detail_rule.init_point];
    else scores=[25000,25000,25000];
  }
  firstneededscores=scores[0];
}
function addNewRound(chang,ju,ben,doras,left_tile_count,liqibang,md5,paishan,scores,tiles0,tiles1,tiles2,tiles3,tingpai){
  let ret={
    name:"RecordNewRound",
    data:{
      'chang':chang,
      'ju':ju,
      'ben':ben,
      'left_tile_count':left_tile_count,
      'liqibang':liqibang,
      'md5':md5,
      'paishan':paishan,
      'scores':[].concat(scores),
      'tiles0':[].concat(tiles0),
      'tiles1':[].concat(tiles1),
      'tiles2':[].concat(tiles2),
      'tiles3':[].concat(tiles3)
    }
  };
  if(is_huansanzhang())ret.data.operations=[{
    'operation_list':[{
      'change_tile_states':[0,0,0],
      'change_tiles':[tiles0[0],tiles0[1],tiles0[2]]
    }],
    'seat':0
  },{
    'operation_list':[{
      'change_tile_states':[0,0,0],
      'change_tiles':[tiles1[0],tiles1[1],tiles1[2]]
    }],
    'seat':1
  },{
    'operation_list':[{
      'change_tile_states':[0,0,0],
      'change_tiles':[tiles2[0],tiles2[1],tiles2[2]]
    }],
    'seat':2
  },{
    'operation_list':[{
      'change_tile_states':[0,0,0],
      'change_tiles':[tiles3[0],tiles3[1],tiles3[2]]
    }],
    'seat':3
  }];
  if(tingpai!=undefined&&tingpai!=[])ret.data.tingpai=tingpai;
  if(!is_xuezhandaodi())ret.data.dora=doras;
  actions.push(ret);
  calcxun();
}
function roundbegin(){
  if(ju==playercnt){chang++;ju=0;}
  if(chang==playercnt)chang=0;
  if(typeof(tiles0)=="string")tiles0=separatetile(tiles0);
  if(typeof(tiles1)=="string")tiles1=separatetile(tiles1);
  if(typeof(tiles2)=="string")tiles2=separatetile(tiles2);
  if(typeof(tiles3)=="string")tiles3=separatetile(tiles3);
  tiles0.sort(cmp);
  tiles1.sort(cmp);
  tiles2.sort(cmp);
  tiles3.sort(cmp);
  init();
  benchangbang=ben;
  let dora;
  if(!is_xuezhandaodi())dora=doras[0];
  let lsttile=playertiles[ju][playertiles[ju].length-1];
  playertiles[ju].length--;
  let tingpais=[];
  for(let i=0;i<playercnt;i++){
    let tingpaitmp=tingpai(i);
    if(tingpaitmp.length!=0)tingpais.push({'seat':i,'tingpais1':tingpaitmp});
  }
  playertiles[ju].push(lsttile);
  addNewRound(chang,ju,ben,dora,paishan.length/2-14,liqibang,md5(paishan),paishan,[].concat(scores),[].concat(tiles0),[].concat(tiles1),[].concat(tiles2),[].concat(tiles3),tingpais);
}
function addDiscardTile(is_liqi,is_wliqi,doras,moqie,seat,tile,tingpais){ 
  for(let i=0;i<playertiles[seat].length;i++){
    if(playertiles[seat][i]==tile){
      playertiles[seat][i]=playertiles[seat][playertiles[seat].length-1];
      playertiles[seat].length--;
      break;
    }
  }
  let ret={
    name:"RecordDiscardTile",
    data:{
      'is_liqi':is_liqi,
      'is_wliqi':is_wliqi,
      'doras':doras,
      'moqie':moqie,
      'seat':seat,
      'tile':tile,
      'tingpais':tingpai(seat)
    }
  };
  actions.push(ret);
  calcxun();
}
function addDealTile(doras,left_tile_count,seat,tile,liqi){
  playertiles[seat].push(tile);
  let ret={
    name:"RecordDealTile",
    data:{
      'doras':doras,
      'left_tile_count':left_tile_count,
      'seat':seat,
      'tile':tile,
    }
  };
  if(liqi!=undefined&&liqi!=0)ret.data.liqi=liqi;
  actions.push(ret);
  calcxun();
}
function addChiPengGang(froms,seat,tiles,type,liqi){
  for(let j=0;j<tiles.length;j++){
    for(let i=0;i<playertiles[seat].length;i++){
      if(playertiles[seat][i]==tiles[j]){
        playertiles[seat][i]=playertiles[seat][playertiles[seat].length-1];
        playertiles[seat].length--;
        break;
      }
    }
  }
  let ret={
    name:"RecordChiPengGang",
    data:{
      'froms':froms,
      'seat':seat,
      'tiles':tiles,
      'type':type
    }  
  };
  if(liqi!=undefined&&liqi!=0)ret.data.liqi=liqi;
  actions.push(ret);
  calcxun();
}
function addAnGangAddGang(doras,seat,tiles,type){
  if(type!=3){
    for(let i=0;i<playertiles[seat].length;i++){
      if(equaltile(playertiles[seat][i],tiles)){
        playertiles[seat][i]=playertiles[seat][playertiles[seat].length-1];
        playertiles[seat].length--;
        break;
      }
    }
  }
  else{
    for(let j=1;j<=4;j++){
      for(let i=0;i<playertiles[seat].length;i++){
        if(equaltile(playertiles[seat][i],tiles)){
          playertiles[seat][i]=playertiles[seat][playertiles[seat].length-1];
          playertiles[seat].length--;
          break;
        }
      }
    }
  }
  actions.push({
    name:"RecordAnGangAddGang",
    data:{
      'doras':doras,
      'seat':seat,
      'tiles':tiles,
      'type':type
    }
  });
  calcxun();
}
function addBaBei(doras,seat,moqie){
  if(moqie==undefined){
    if(playertiles[seat][playertiles[seat].length-1]=="4z")moqie=true;
    else moqie=false;
  }
  for(let i=0;i<playertiles[seat].length;i++){
    if(playertiles[seat][i]=="4z"){
      playertiles[seat][i]=playertiles[seat][playertiles[seat].length-1];
      playertiles[seat].length--;
      break;
    }
  }
  actions.push({
    name:"RecordBaBei",
    data:{
      'doras':doras,
      'moqie':moqie,
      'seat':seat
    }
  });
  calcxun();
}
function cmp(x,y){
  return tiletoint(x)-tiletoint(y);
}
function hupaioneplayer(seat){
  function qieshang(x){
    return Math.ceil(x/100)*100;
  }
  let lstaction=actions[actions.length-1],zimo=false;
  if(lstaction.name=="RecordDealTile"||lstaction.name=="RecordNewRound"||lstaction.name=="RecordChangeTile")zimo=true;
  else if(lstaction.name=="RecordDiscardTile")playertiles[seat].push(lstaction.data.tile);
  else if(lstaction.name=="RecordAnGangAddGang")playertiles[seat].push(lstaction.data.tiles);
  else if(lstaction.name=="RecordBaBei")playertiles[seat].push("4z");
  let fangtong;
  if(!zimo)fangtong=lstaction.data.seat;
  let doras0=[];
  for(let i=0;i<doracnt.cnt;i++)doras0[i]=doras[i];
  let li_doras0=[];
  if(liqiinfo[seat].liqi!=0)for(let i=0;i<doracnt.cnt;i++)li_doras0[i]=li_doras[i];
  let ming=[];
  for(let i=0;i<fulu[seat].length;i++){
    let tiles=fulu[seat][i].tile;
    if(fulu[seat][i].type==0)ming.push("shunzi("+tiles[0]+","+tiles[1]+","+tiles[2]+")");
    else if(fulu[seat][i].type==1)ming.push("kezi("+tiles[0]+","+tiles[1]+","+tiles[2]+")");
    else if(fulu[seat][i].type==2)ming.push("minggang("+tiles[0]+","+tiles[1]+","+tiles[2]+","+tiles[3]+")");
    else if(fulu[seat][i].type==3)ming.push("angang("+tiles[0]+","+tiles[1]+","+tiles[2]+","+tiles[3]+")");
  }
  let hand=[].concat(playertiles[seat]),hu_tile;
  hu_tile=hand[hand.length-1];
  hand.length--;
  hand.sort(cmp);
  //------------------------------
  let qinjia;
  if(seat==ju)qinjia=true;
  else qinjia=false;
  let liqi;
  if(liqiinfo[seat].liqi!=0)liqi=true;
  else liqi=false;
  //-------------------------------------------
  let points=calcfan(playertiles[seat],seat,zimo);
  let val=0,title_id=0;
  for(let i=0;i<points.fans.length;i++)val=val+points.fans[i].val;
  if(points.yiman==false&&val==5)title_id=1;
  if(points.yiman==false&&(val==6||val==7))title_id=2;
  if(points.yiman==false&&(val==8||val==9||val==10))title_id=3;
  if(points.yiman==false&&(val==11||val==12))title_id=4;
  if(points.yiman==false&&val>=13)title_id=11;
  if(points.yiman==true)title_id=val+4;
  //-------------------------------------------
  let sudian=calcsudian(points);
  let zhahu=false;
  if(calchupai(playertiles[seat])==0||sudian==-2000)zhahu=true;
  if(calchupai(playertiles[seat])!=3&&lstaction.name=="RecordAnGangAddGang"&&lstaction.data.type==3)zhahu=true;
  let point_rong=0,point_sum=0,point_zimo_qin=0,point_zimo_xian=0;
  if(qinjia){
    point_rong=6*sudian;
    point_zimo_qin=2*sudian;//not needed
    point_zimo_xian=2*sudian;
    if(playercnt==3)point_sum=4*sudian;
    else point_sum=6*sudian;
  }
  else{
    point_rong=4*sudian;
    point_zimo_qin=2*sudian;
    point_zimo_xian=sudian;
    if(playercnt==3)point_sum=3*sudian;
    else point_sum=4*sudian;
  }
  point_rong=qieshang(point_rong);
  point_sum=qieshang(point_sum);
  point_zimo_qin=qieshang(point_zimo_qin);
  point_zimo_xian=qieshang(point_zimo_xian);
  if(zhahu){
    if(qinjia){
      point_rong=12000;
      point_zimo_qin=4000;//not needed
      point_zimo_xian=4000;
      if(playercnt==3)point_sum=8000;
      else point_sum=12000;
    }
    else{
      point_rong=8000;
      point_zimo_qin=4000;
      point_zimo_xian=2000;
      if(playercnt==3)point_sum=6000;
      else point_sum=8000;
    }
    for(let i=0;i<playercnt;i++){
      if(i==seat||hupaied[i])continue;
      if(i==ju||seat==ju){
        delta_scores[i]-=qieshang(-4000);
        delta_scores[seat]+=qieshang(-4000);
      }
      else{
        delta_scores[i]-=qieshang(-2000);
        delta_scores[seat]+=qieshang(-2000);
      }
    }
    let ret={
      count:0,
      doras:doras0,
      li_doras:li_doras0,
      fans:[],
      fu:0,
      hand:hand,
      hu_tile:hu_tile,
      liqi:liqi,
      ming:ming,
      point_rong:point_rong,
      point_sum:point_sum,
      point_zimo_qin:point_zimo_qin,
      point_zimo_xian:point_zimo_xian,
      qinjia:qinjia,
      seat:seat,
      title_id:1,
      yiman:false,
      zimo:zimo,
    }
    return ret;
  }
  if(baopai[seat]!=undefined){
    if(zimo){
      if(qinjia){
        delta_scores[baopai[seat].seat]-=baopai[seat].val*48000;
        delta_scores[seat]+=baopai[seat].val*48000;
      }
      else{
        delta_scores[baopai[seat].seat]-=baopai[seat].val*32000;
        delta_scores[seat]+=baopai[seat].val*32000;
      }
      for(let i=0;i<playercnt;i++){
        if(i==seat||hupaied[i])continue;
        if(i==ju||seat==ju){
          delta_scores[i]-=(val-baopai[seat].val)*16000;
          delta_scores[seat]+=(val-baopai[seat].val)*16000;
        }
        else{
          delta_scores[i]-=(val-baopai[seat].val)*8000;
          delta_scores[seat]+=(val-baopai[seat].val)*8000;
        }
      }
    }
    else{
      if(qinjia){
        delta_scores[baopai[seat].seat]-=baopai[seat].val*24000;
        delta_scores[seat]+=baopai[seat].val*24000;
        delta_scores[fangtong]-=val*48000-baopai[seat].val*24000;
        delta_scores[seat]+=val*48000-baopai[seat].val*24000;
      }
      else{
        delta_scores[baopai[seat].seat]-=baopai[seat].val*16000;
        delta_scores[seat]+=baopai[seat].val*16000;
        delta_scores[fangtong]-=val*32000-baopai[seat].val*16000;
        delta_scores[seat]+=val*32000-baopai[seat].val*16000;
      }
    }
  }
  else{
    if(zimo){
      for(let i=0;i<playercnt;i++){
        if(i==seat||hupaied[i])continue;
        if(i==ju||seat==ju){
          delta_scores[i]-=qieshang(sudian*2);
          delta_scores[seat]+=qieshang(sudian*2);
        }
        else{
          delta_scores[i]-=qieshang(sudian);
          delta_scores[seat]+=qieshang(sudian);
        }
      }
    }
    else{
      if(qinjia){
        delta_scores[fangtong]-=qieshang(6*sudian);
        delta_scores[seat]+=qieshang(6*sudian);
      }
      else{
        delta_scores[fangtong]-=qieshang(4*sudian);
        delta_scores[seat]+=qieshang(4*sudian);
      }
    }
  }
  let dadian=Math.max(delta_scores[seat],-delta_scores[seat]);
  if(zimo){
    for(let i=0;i<playercnt;i++){
      if(i==seat||hupaied[i])continue;
      delta_scores[i]-=100*benchangbang;
      delta_scores[seat]+=100*benchangbang;
    }
  }
  else{
    delta_scores[fangtong]-=(playercnt-1)*100*benchangbang;
    delta_scores[seat]+=(playercnt-1)*100*benchangbang;
  }
  benchangbang=0;
  delta_scores[seat]+=liqibang*1000;
  liqibang=0;
  //---------------------------------------------------
  let ret={
    count:val,
    doras:doras0,
    li_doras:li_doras0,
    fans:points.fans,
    fu:points.fu,
    hand:hand,
    hu_tile:hu_tile,
    liqi:liqi,
    ming:ming,
    point_rong:point_rong,
    point_sum:point_sum,
    point_zimo_qin:point_zimo_qin,
    point_zimo_xian:point_zimo_xian,
    qinjia:qinjia,
    seat:seat,
    title_id:title_id,
    yiman:points.yiman,
    zimo:zimo,
  }
  if(is_xuezhandaodi())ret.dadian=dadian;
  return ret;
}
function endHule(HuleInfo,old_scores,delta_scores,scores){
  actions.push({
    name:"RecordHule",
    data:{
      'delta_scores':[].concat(delta_scores),
      'hules':HuleInfo,
      'old_scores':[].concat(old_scores),
      'scores':[].concat(scores)
    }
  });
}
function addHuleXueZhanMid(HuleInfo,old_scores,delta_scores,scores){
  for(let seat=0;seat<4;seat++)liqiinfo[seat].yifa=0;//?????
  actions.push({
    name:"RecordHuleXueZhanMid",
    data:{
      'delta_scores':[].concat(delta_scores),
      'hules':HuleInfo,
      'old_scores':[].concat(old_scores),
      'scores':[].concat(scores)
    }
  });
}
function addHuleXueZhanEnd(HuleInfo,old_scores,delta_scores,scores){
  actions.push({
    name:"RecordHuleXueZhanEnd",
    data:{
      'delta_scores':[].concat(delta_scores),
      'hules':HuleInfo,
      'hules_history':hules_history,
      'old_scores':[].concat(old_scores),
      'scores':[].concat(scores)
    }
  });
}
function hupai(x,type){
  if(x==true||x==false){type=x;x=undefined;}
  if(typeof(x)=="number")x=[x];
  if(x==undefined){
    let lstaction=actions[actions.length-1];
    if(lstaction.name=="RecordDealTile")x=[lstaction.data.seat];
    else if(lstaction.name=="RecordNewRound"||lstaction.name=="RecordChangeTile")x=[ju];
    else{
      x=[];
      for(let i=ju;i<playercnt+ju;i++){
        seat=i%playercnt;
        if(seat==actions[actions.length-1].data.seat||hupaied[seat])continue;
        if(lstaction.name=="RecordDiscardTile")playertiles[seat].push(lstaction.data.tile);
        else if(lstaction.name=="RecordAnGangAddGang")playertiles[seat].push(lstaction.data.tiles);
        else if(lstaction.name=="RecordBaBei")playertiles[seat].push("4z");
        if(calchupai(playertiles[seat])!=0)x.push(seat);
        playertiles[seat].length=playertiles[seat].length-1;
      }
    }
  }
  if(!is_xuezhandaodi()){
    let ret=[];
    for(let i=0;i<x.length;i++)ret.push(hupaioneplayer(x[i]));
    for(let i=0;i<x.length;i++)hupaied[x[i]]=true;
    let old_scores=[].concat(scores);
    for(let i=0;i<playercnt;i++)scores[i]=scores[i]+delta_scores[i];
    endHule(ret,[].concat(old_scores),[].concat(delta_scores),[].concat(scores));
    delta_scores=[0,0,0,0];
    if(hupaied[ju])ben++;
    else{
      ju++;
      ben=0;
    }
  }
  else if(is_xuezhandaodi()&&(type==undefined||type==false)){
    let ret=[];
    for(let i=0;i<x.length;i++){
      let whatever=hupaioneplayer(x[i]);
      ret.push(whatever);
      hules_history.push(whatever);
    }
    for(let i=0;i<x.length;i++)hupaied[x[i]]=true;
    let old_scores=[].concat(scores);
    for(let i=0;i<playercnt;i++)scores[i]=scores[i]+delta_scores[i];
    addHuleXueZhanMid(ret,[].concat(old_scores),[].concat(delta_scores),[].concat(scores));
    delta_scores=[0,0,0,0];
  } 
  else if(is_xuezhandaodi()&&type!=undefined&&type!=false){
    let ret=[];
    for(let i=0;i<x.length;i++){
      let whatever=hupaioneplayer(x[i]);
      ret.push(whatever);
      hules_history.push(whatever);
    }
    for(let i=0;i<x.length;i++)hupaied[x[i]]=true;
    let old_scores=[].concat(scores);
    for(let i=0;i<playercnt;i++)scores[i]=scores[i]+delta_scores[i];
    addHuleXueZhanEnd(ret,[].concat(old_scores),[].concat(delta_scores),[].concat(scores));
    delta_scores=[0,0,0,0];
    ju++;
  }
}
function addChangeTile(change_tile_infos,change_type,doras){
  for(let seat=0;seat<4;seat++){
    for(let j=0;j<3;j++){
      for(let i=0;i<playertiles[seat].length;i++){
        if(playertiles[seat][i]==change_tile_infos[seat].out_tiles[j]){
          playertiles[seat][i]=playertiles[seat][playertiles[seat].length-1];
          playertiles[seat].length--;
          break;
        }
      }
    }
    for(let j=0;j<3;j++)playertiles[seat].push(change_tile_infos[seat].in_tiles[j]);
  }
  let ret={
    name:"RecordChangeTile",
    data:{
      'change_tile_infos':change_tile_infos,
      'change_type':change_type,
      'doras':doras,
    }
  };
  let lsttile=playertiles[ju][playertiles[ju].length-1];
  playertiles[ju].length--;
  let tingpais=[];
  for(let i=0;i<playercnt;i++){
    let tingpaitmp=tingpai(i);
    if(tingpaitmp.length!=0)tingpais.push({'seat':i,'tingpais1':tingpaitmp});
  }
  if(tingpais.length!=0)ret.data.tingpai=tingpais;
  playertiles[ju].push(lsttile);
  actions.push(ret);
}
//0:逆时针  1:对家   2:顺时针 
function huansanzhang(tiles0,tiles1,tiles2,tiles3,type){
  if(typeof(tiles0)=="string")tiles0=separatetile(tiles0);
  if(typeof(tiles1)=="string")tiles1=separatetile(tiles1);
  if(typeof(tiles2)=="string")tiles2=separatetile(tiles2);
  if(typeof(tiles3)=="string")tiles3=separatetile(tiles3);
  let ret=[];
  let tiles=[tiles0,tiles1,tiles2,tiles3];
  for(let seat=0;seat<4;seat++){
    ret.push({
      'out_tiles':tiles[seat],
      'in_tile_states':[0,0,0],
      'in_tiles':tiles[(seat-type-1+8)%4],
      'out_tile_states':[0,0,0],
    })
  }
  addChangeTile(ret,type,calcdoras());
}
function endNoTile(liujumanguan,players,scores){
  let ret={
    name:"RecordNoTile",
    data:{
      'gameend':false,
      'liujumanguan':liujumanguan,
      'players':players,
      'scores':scores
    }
  };
  if(hules_history.length!=0)ret.data.hules_history=hules_history;
  actions.push(ret);
}
function mopai(seat){
  let lstaction=actions[actions.length-1];
  if(lstaction.name=="RecordChiPengGang"||lstaction.name=="RecordBaBei"||lstaction.name=="RecordAnGangAddGang")seat=lstaction.data.seat;
  if(lstaction.name=="RecordDiscardTile"||lstaction.name=="RecordHuleXueZhanMid"){
    if(lstaction.name=="RecordDiscardTile")seat=(lstaction.data.seat+1)%playercnt;
    else seat=(lstaction.data.hules[lstaction.data.hules.length-1].seat+1)%playercnt;
    while(hupaied[seat])seat=(seat+1)%playercnt;
  }
  if(doracnt.lsttype==2){
    doracnt.lsttype=0;
    doracnt.cnt++;
  }
  for(let i=0;i<playercnt;i++)if(liqiinfo[i].yifa==2)liqiinfo[i].yifa=0;
  let drawcard,liqi;
  if(lstliqi!=0&&scores[lstliqi.seat]>=1000){
    liqibang=liqibang+1;
    scores[lstliqi.seat]=scores[lstliqi.seat]-1000;
    liqiinfo[lstliqi.seat]={'liqi':lstliqi.type,'yifa':1};
    liqi={
      'liqibang':liqibang,
      'score':scores[lstliqi.seat],
      'seat':lstliqi.seat
    }
  }
  lstliqi=0;
  if(drawtype==1){
    addDealTile(calcdoras(),paishan.length/2-15,seat,paishan.substring(0,2),liqi);
    drawcard=paishan.substring(0,2);
    paishan=paishan.substring(2);
    lstdrawtype=1;
  }
  else{
    addDealTile(calcdoras(),paishan.length/2-15,seat,paishan.substring(paishan.length-2),liqi);
    drawcard=paishan.substring(paishan.length-2);
    paishan=paishan.substring(0,paishan.length-2);
    lstdrawtype=0;
  }
  drawtype=1;
  return drawcard;
}
function qiepai(seat,kind,is_liqi,var1){
  if(seat==true||seat==false){kind=seat;seat=undefined;}
  if(kind==true||kind==false){is_liqi=kind;kind=undefined;}
  if(seat!=0&&seat!=1&&seat!=2&&seat!=playercnt-1&&seat!=undefined){kind=seat;seat=undefined;}
  if(seat==undefined){
    let lstaction=actions[actions.length-1];
    if(lstaction.name=="RecordNewRound"||lstaction.name=="RecordChangeTile")seat=ju;
    else seat=lstaction.data.seat;
  }
  if(kind==undefined){
    if(discardtiles[seat].length!=0){
      kind=discardtiles[seat].substring(0,2);
      discardtiles[seat]=discardtiles[seat].substring(2);
      if(kind==".."||kind=="  ")kind="moqie";
    }
    else kind="moqie";
  }
  let is_wliqi=false;
  if(is_liqi==undefined)is_liqi=false;
  if(is_liqi&&liqiinfo[seat].yifa!=0)is_wliqi=true;
  if(is_wliqi)lstliqi={'seat':seat,'type':2};
  else if(is_liqi)lstliqi={'seat':seat,'type':1};
  if(doracnt.lsttype==1){
    doracnt.lsttype=0;
    doracnt.cnt++;
  }
  let flag=0,tile;
  function swap(x){
    playertiles[seat][x]=playertiles[seat][playertiles[seat].length-1];
    playertiles[seat][playertiles[seat].length-1]=tile;
    if(x==playertiles[seat].length-1)flag=2;
    else flag=1;
  }
  if(kind=="moqie")flag=2;
  for(let i=0;i<playertiles[seat].length;i++){
    tile=playertiles[seat][i];
    if(kind=="duanyaojiu"&&(tile[1]=='z'||tile=="1p"||tile=="9p"||tile=="1s"||tile=="9s"||tile=="1m"||tile=="9m")){swap(i);break;}
    else if(kind=="hunyise"&&tile[1]!='z'&&tile[1]!=var1){swap(i);break;}
    else if(kind=="qingyise"&&tile[1]!=var1){swap(i);break;}
    else if(kind=="hunquandai"&&(tile[0]=='4'||tile[0]=='5'||tile[0]=='6')&&(tile[1]=='m'||tile[1]=='p'||tile[1]=='s')){swap(i);break;}
    else if(kind=="chunquandai"&&(tile[1]=='z'||(tile[0]=='4'||tile[0]=='5'||tile[0]=='6')&&(tile[1]=='m'||tile[1]=='p'||tile[1]=='s'))){swap(i);break;}
    else if((kind=="hunlaotou"||kind=="guoshiwushuang")&&(tile[0]>='2'&&tile[0]<='8')&&(tile[1]=='m'||tile[1]=='p'||tile[1]=='s')){swap(i);break;}
    else if(kind=="qinglaotou"&&(tile[1]=='z'||(tile[0]>='2'&&tile[0]<='8')&&(tile[1]=='m'||tile[1]=='p'||tile[1]=='s'))){swap(i);break;}
    else if(kind=="ziyise"&&tile[1]!='z'){swap(i);break;}
    else if(kind=="lvyise"&&tile!="6z"&&tile!="2s"&&tile!="3s"&&tile!="4s"&&tile!="6s"&&tile!="8s"){swap(i);break;}
  }
  let cnt=[];
  for(let i=1;i<=34;i++)cnt[i]=0;
  for(let i=0;i<playertiles[seat].length;i++)cnt[tiletoint(playertiles[seat][i])]++;
  if(kind=="guoshiwushuang"){
    for(let i=1;i<=34;i++){
      if((i%9==1||i%9==0||i>=28&&i<=34)&&cnt[i]>=2){
        for(let j=0;j<playertiles[seat].length;j++)if(equaltile(playertiles[seat][j],inttotile(i))){swap(j);break;}
        break;
      }
    }
  }
  let lstactionname=actions[actions.length-1].name;
  if(flag==0&&kind[0]>='0'&&kind[0]<='9'){
    paihe[seat].tiles.push(kind);
    let abc=tiletoint(kind);
    if(abc!=1&&abc!=9&&abc!=10&&abc!=18&&abc!=19&&abc!=27&&abc<=27)paihe[seat].liujumanguan=false;
    liqiinfo[seat].yifa=0;
    if(playertiles[seat][playertiles[seat].length-1]==kind&&lstactionname!="RecordNewRound"&&lstactionname!="RecordChiPengGang")addDiscardTile(is_liqi,is_wliqi,calcdoras(),true,seat,kind,tingpai(seat));
    else addDiscardTile(is_liqi,is_wliqi,calcdoras(),false,seat,kind,tingpai(seat));
    return 1;
  }    
  if(flag==1||lstactionname=="RecordNewRound"||lstactionname=="RecordChiPengGang"){
    let tile=playertiles[seat][playertiles[seat].length-1];
    paihe[seat].tiles.push(tile);
    let abc=tiletoint(tile);
    if(abc!=1&&abc!=9&&abc!=10&&abc!=18&&abc!=19&&abc!=27&&abc<=27)paihe[seat].liujumanguan=false;
    liqiinfo[seat].yifa=0;
    addDiscardTile(is_liqi,is_wliqi,calcdoras(),false,seat,tile,tingpai(seat));
    return 1;
  }
  else if(flag==2&&lstactionname!="RecordNewRound"&&lstactionname!="RecordChiPengGang"){
    let tile=playertiles[seat][playertiles[seat].length-1];
    paihe[seat].tiles.push(tile);
    let abc=tiletoint(tile);
    if(abc!=1&&abc!=9&&abc!=10&&abc!=18&&abc!=19&&abc!=27&&abc<=27)paihe[seat].liujumanguan=false;
    liqiinfo[seat].yifa=0;
    addDiscardTile(is_liqi,is_wliqi,calcdoras(),true,seat,tile,tingpai(seat));
    return 1;
  } 
  else return 0;
}
function mingpai(seat,tiles){
  function changedora(x){
    if(x[0]=='0')return "5"+x[1];
    if(x[0]=='5'&&x[1]!='z')return "0"+x[1];
    return x;
  }
  function intiles(x,y){
    let cnt=[],cnt2=[];
    for(let i=1;i<=37;i++)cnt[i]=cnt2[i]=0;
    for(let i=0;i<x.length;i++)cnt[tiletoint(x[i],1)]++;
    for(let i=0;i<y.length;i++)cnt2[tiletoint(y[i],1)]++;
    for(let i=1;i<=37;i++)if(cnt[i]>cnt2[i])return false;
    return true;
  }
  function trying(x,seat){
    for(let seat2=0;seat2<playercnt;seat2++){
      if((seat==seat2||seat==undefined)&&intiles(x,playertiles[seat2])){
        mingpai(seat2,x);
        return true;
      }
    }
    return false;
  }
  if(seat!=0&&seat!=1&&seat!=2&&seat!=playercnt-1){tiles=seat;seat=undefined;}
  if(seat==undefined){
    if(!equaltile(tiles[0],actions[actions.length-1].data.tile))seat=(actions[actions.length-1].data.seat+1)%playercnt;
    else {
      for(let seat2=0;seat2<playercnt;seat2++){
        if(seat2==actions[actions.length-1].data.seat)continue;
        let cnt=[];
        for(let i=0;i<=36;i++)cnt[i]=0;
        for(let i=0;i<playertiles[seat2].length;i++)cnt[tiletoint(playertiles[seat2][i])]++;
        if(tiles.length==3&&cnt[tiletoint(tiles[0])]>=3)seat=seat2;
        if(tiles.length==2&&cnt[tiletoint(tiles[0])]>=2)seat=seat2;
      }
    }
  }
  if(typeof(tiles)=="string")tiles=separatetile(tiles);
  if(tiles==undefined){
    let lsttile=actions[actions.length-1].data.tile;
    lsttile=inttotile(tiletoint(lsttile));
    if(trying([lsttile,lsttile,lsttile],seat))return;
    if(lsttile[0]=='5'&&lsttile[1]!='z'){
      if(trying(["0"+lsttile[1],lsttile,lsttile],seat))return;
      if(trying(["0"+lsttile[1],"0"+lsttile[1],lsttile],seat))return;
    }
    if(trying([lsttile,lsttile],seat))return;
    if(lsttile[0]=='5'&&lsttile[1]!='z'){
      if(trying(["0"+lsttile[1],lsttile],seat))return;
      if(trying(["0"+lsttile[1],"0"+lsttile[1]],seat))return;
    }
    seat=(actions[actions.length-1].data.seat+1)%playercnt;
    if(lsttile[1]!='z'&&lsttile[0]!='1'&&lsttile[0]!='2'){
      if(trying([inttotile(tiletoint(lsttile)-2),inttotile(tiletoint(lsttile)-1)],seat))return;
      if(trying([changedora(inttotile(tiletoint(lsttile)-2)),inttotile(tiletoint(lsttile)-1)],seat))return;
      if(trying([inttotile(tiletoint(lsttile)-2),changedora(inttotile(tiletoint(lsttile)-1))],seat))return;
    }
    if(lsttile[1]!='z'&&lsttile[0]!='1'&&lsttile[0]!='9'){
      if(trying([inttotile(tiletoint(lsttile)-1),inttotile(tiletoint(lsttile)+1)],seat))return;
      if(trying([changedora(inttotile(tiletoint(lsttile)-1)),inttotile(tiletoint(lsttile)+1)],seat))return;
      if(trying([inttotile(tiletoint(lsttile)-1),changedora(inttotile(tiletoint(lsttile)+1))],seat))return;
    }
    if(lsttile[1]!='z'&&lsttile[0]!='8'&&lsttile[0]!='9'){
      if(trying([inttotile(tiletoint(lsttile)+1),inttotile(tiletoint(lsttile)+2)],seat))return;
      if(trying([changedora(inttotile(tiletoint(lsttile)+1)),inttotile(tiletoint(lsttile)+2)],seat))return;
      if(trying([inttotile(tiletoint(lsttile)+1),changedora(inttotile(tiletoint(lsttile)+2))],seat))return;
    }
    return;
  }
  for(let i=0;i<playercnt;i++)liqiinfo[i].yifa=0;
  let lstaction=actions[actions.length-1];
  paihe[lstaction.data.seat].liujumanguan=false;
  let from=actions[actions.length-1].data.seat,lsttile=actions[actions.length-1].data.tile;
  let liqi=0;
  if(lstliqi!=0&&scores[lstliqi.seat]>=1000){
    liqibang=liqibang+1;
    scores[lstliqi.seat]=scores[lstliqi.seat]-1000;
    liqiinfo[lstliqi.seat]={'liqi':lstliqi.type,'yifa':1};
    liqi={
      'liqibang':liqibang,
      'score':scores[lstliqi.seat],
      'seat':lstliqi.seat
    }
  }
  lstliqi=0;
  if(!equaltile(tiles[0],lsttile)){
    fulu[seat].push({'type':0,'tile':[tiles[0],tiles[1],lsttile],'from':from});
    addChiPengGang([from,seat,seat],seat,[lsttile,tiles[0],tiles[1]],0,liqi);
  }
  else if(tiles.length==3){
    doracnt.lsttype=1;
    drawtype=0;
    fulu[seat].push({'type':2,'tile':[tiles[0],tiles[1],tiles[2],lsttile],'from':from});
    if(from==(seat+3)%4)addChiPengGang([from,seat,seat,seat],seat,[lsttile,tiles[0],tiles[1],tiles[2]],2,liqi);
    if(from==(seat+2)%4)addChiPengGang([seat,from,seat,seat],seat,[tiles[0],lsttile,tiles[1],tiles[2]],2,liqi);
    if(from==(seat+1)%4)addChiPengGang([seat,seat,seat,from],seat,[tiles[0],tiles[1],tiles[2],lsttile],2,liqi);
  }
  else{
    fulu[seat].push({'type':1,'tile':[tiles[0],tiles[1],lsttile],'from':from});
    if(from==(seat+3)%4)addChiPengGang([from,seat,seat],seat,[lsttile,tiles[0],tiles[1]],1,liqi);
    if(from==(seat+2)%4)addChiPengGang([seat,from,seat],seat,[tiles[0],lsttile,tiles[1]],1,liqi);
    if(from==(seat+1)%4)addChiPengGang([seat,seat,from],seat,[tiles[0],tiles[1],lsttile],1,liqi);
  }
} 
function leimingpai(seat,tile,type){
  if(seat=="babei"||seat=="angang"||seat=="jiagang"){tile=seat;seat=undefined;}
  if(tile=="babei"||tile=="angang"||tile=="jiagang"){type=tile;tile=undefined;}
  if(seat!=0&&seat!=1&&seat!=2&&seat!=playercnt-1){tile=seat;seat=undefined;}
  if(tile==undefined){
    if(leimingpai("4z","babei"))return true;
    for(let i=1;i<=34;i++)if(leimingpai(inttotile(i),"angang"))return true;
    for(let i=1;i<=34;i++)if(leimingpai(inttotile(i),"jiagang"))return true;
    return false;
  }
  if(seat==undefined){
    let lstaction=actions[actions.length-1];
    if(lstaction.name=="RecordNewRound"||lstaction.name=="RecordChangeTile")seat=ju;
    else seat=lstaction.data.seat;
  }
  if(doracnt.lsttype==1){
    doracnt.lsttype=0;
    doracnt.cnt++;
  }
  let tilecnt=0,jiagangflag=false;
  for(let i=0;i<playertiles[seat].length;i++)if(equaltile(tile,playertiles[seat][i]))tilecnt++;
  if(playercnt==3&&tile=="4z"&&tilecnt>=1&&(type==undefined||type=="babei")){
    for(let i=0;i<playercnt;i++)if(liqiinfo[i].yifa==1)liqiinfo[i].yifa=2;
    fulu[seat].push({'type':4,'tile':["4z"]});
    drawtype=0;
    addBaBei(calcdoras(),seat);
    return true;
  }
  for(let i=0;i<fulu[seat].length;i++)if(equaltile(fulu[seat][i].tile[0],tile)&&fulu[seat][i].type==1)jiagangflag=true;
  if(tilecnt>=4&&(type==undefined||type=="angang")){
    for(let i=0;i<playercnt;i++)if(liqiinfo[i].yifa==1)liqiinfo[i].yifa=2;
    doracnt.lsttype=2;
    fulu[seat].push({'type':3,'tile':[tile,tile,tile,tile]});
    drawtype=0;
    addAnGangAddGang(calcdoras(),seat,tile,3);
    return true;
  }
  if(jiagangflag&&tilecnt>=1&&(type==undefined||type=="jiagang")){
    for(let i=0;i<playercnt;i++)if(liqiinfo[i].yifa==1)liqiinfo[i].yifa=2;
    doracnt.lsttype=1;
    for(let i=0;i<fulu[seat].length;i++){
      if(fulu[seat][i].type==1&&equaltile(fulu[seat][i].tile[0],tile)){
          fulu[seat][i].type=2;
          fulu[seat][i].tile.push(tile);
      }
    }
    drawtype=0;
    addAnGangAddGang(calcdoras(),seat,tile,2);
    return true;
  }
  return false;
}
function notileliuju(){
  let playerleft=0;
  for(let seat=0;seat<playercnt;seat++)if(!hupaied[seat])playerleft++;
  let tingcnt=0;
  let liujumanguan=false;
  let ret=[];
  for(let i=0;i<playercnt;i++){
    let tings=tingpai(i);
    if(tings.length==0){
      ret.push({
        'tingpai':false,
        'hand':[],
        'tings':[]
      });
    }
    else{
      tingcnt++;
      playertiles[i].sort(cmp);
      ret.push({
        'tingpai':true,
        'hand':[].concat(playertiles[i]),
        'tings':tings
      });
    }
  }
  let ret2=[];
  for(let i=ju;i<playercnt+ju;i++){
    seat=i%playercnt;
    if(!paihe[seat].liujumanguan||hupaied[seat])continue;
    liujumanguan=true;
    let score=0;
    playertiles[seat].sort(cmp);
    for(let i=0;i<playercnt;i++){
      if(seat==i||hupaied[i])continue;
      if(seat==ju||i==ju){
        delta_scores[i]-=4000;
        delta_scores[seat]+=4000;
        score+=4000;
      }
      else{
        delta_scores[i]-=2000;
        delta_scores[seat]+=2000;
        score+=2000;
      }
    }
    let ming=[];
    for(let i=0;i<fulu[seat].length;i++){
      let tiles=fulu[seat][i].tile;
      if(fulu[seat][i].type==0)ming.push("shunzi("+tiles[0]+","+tiles[1]+","+tiles[2]+")");
      else if(fulu[seat][i].type==1)ming.push("kezi("+tiles[0]+","+tiles[1]+","+tiles[2]+")");
      else if(fulu[seat][i].type==2)ming.push("minggang("+tiles[0]+","+tiles[1]+","+tiles[2]+","+tiles[3]+")");
      else if(fulu[seat][i].type==3)ming.push("angang("+tiles[0]+","+tiles[1]+","+tiles[2]+","+tiles[3]+")");
    }
    ret2.push({
      'delta_scores':[].concat(delta_scores),
      'doras':calcdoras(),
      'hand':[].concat(playertiles[seat]),
      'ming':ming,
      'old_scores':[].concat(scores),
      'score':score,
      'seat':seat
    });
    for(let i=0;i<playercnt;i++){
      scores[i]=scores[i]+delta_scores[i];
      delta_scores[i]=0;
    }
  }
  if(liujumanguan){
    endNoTile(true,ret,ret2);
    if(!is_xuezhandaodi())ben++;
    if(ret[ju].tingpai==false||is_xuezhandaodi())ju++;
    return;
  }
  ret2=[{'delta_scores':[],'old_scores':[]}];
  if(liujumanguan==false&&tingcnt!=0&&tingcnt!=playercnt){
    for(let seat=0;seat<playercnt;seat++){
      if(hupaied[seat])continue;
      if(!is_xuezhandaodi()){
        if(ret[seat].tingpai==true)delta_scores[seat]+=(playerleft-1)*1000/tingcnt;
        else delta_scores[seat]-=(playerleft-1)*1000/(playerleft-tingcnt);
      }
      else{
        if(ret[seat].tingpai==true)delta_scores[seat]+=(playerleft-tingcnt)*1000;
        else delta_scores[seat]-=tingcnt*1000;
      }
    }
  }
  ret2[0].old_scores=[].concat(scores);
  ret2[0].delta_scores=[].concat(delta_scores);
  for(let seat=0;seat<playercnt;seat++)scores[seat]=scores[seat]+delta_scores[seat];
  endNoTile(false,ret,ret2);
  if(!is_xuezhandaodi())ben++;
  if(ret[ju].tingpai==false||is_xuezhandaodi())ju++;
}
function liuju(){
  let ret;
  for(let seat=0;seat<playercnt;seat++){
    let cnt=[],yaojiutype=0;
    for(let i=0;i<=36;i++)cnt[i]=0;
    for(let i=0;i<playertiles[seat].length;i++)cnt[tiletoint(playertiles[seat][i])]++;
    if(cnt[1]>=1)yaojiutype++;if(cnt[9]>=1)yaojiutype++;
    if(cnt[10]>=1)yaojiutype++;if(cnt[18]>=1)yaojiutype++;
    if(cnt[19]>=1)yaojiutype++;if(cnt[27]>=1)yaojiutype++;
    if(cnt[28]>=1)yaojiutype++;if(cnt[29]>=1)yaojiutype++;
    if(cnt[30]>=1)yaojiutype++;if(cnt[31]>=1)yaojiutype++;
    if(cnt[32]>=1)yaojiutype++;if(cnt[33]>=1)yaojiutype++;
    if(cnt[34]>=1)yaojiutype++;
    if(yaojiutype>=9&&liqiinfo[seat].liqi==0&&liqiinfo[seat].yifa==1&&playertiles[seat].length==14){
      let lsttile=playertiles[seat][playertiles[seat].length-1];
      playertiles[seat].length=playertiles[seat].length-1;
      playertiles[seat].sort(cmp);
      playertiles[seat].push(lsttile);
      if(ret==undefined)ret={
        name:"RecordLiuJu",
        data:{
          'seat':seat,
          'tiles':[].concat(playertiles[seat]),
          'type':1
        }
      };
    }
  }
  if(playercnt==4&&paihe[0].tiles.length==1&&paihe[1].tiles.length==1&&paihe[2].tiles.length==1&&paihe[3].tiles.length==1&&paihe[0].tiles[0]==paihe[1].tiles[0]&&paihe[1].tiles[0]==paihe[2].tiles[0]&&paihe[2].tiles[0]==paihe[3].tiles[0]&&tiletoint(paihe[0].tiles[0])>=28&&tiletoint(paihe[0].tiles[0])<=31){
    if(ret==undefined)ret={
      name:"RecordLiuJu",
      data:{
        'type':2
      }
    };
  }
  if(playercnt==4&&ret==undefined){
    let liqiplayercnt=0;
    if(liqiinfo[0].liqi!=0)liqiplayercnt++;
    if(liqiinfo[1].liqi!=0)liqiplayercnt++;
    if(liqiinfo[2].liqi!=0)liqiplayercnt++;
    if(liqiinfo[3].liqi!=0)liqiplayercnt++;
    if(liqiplayercnt==3&&lstliqi!=0&&scores[lstliqi.seat]>=1000){
      liqibang=liqibang+1;
      scores[lstliqi.seat]=scores[lstliqi.seat]-1000;
      liqiinfo[lstliqi.seat]={'liqi':lstliqi.type,'yifa':1};
      let allplayertiles=["","","",""];
      for(let seat=0;seat<playercnt;seat++){
        playertiles[seat].sort(cmp);
        for(let i=0;i<playertiles[seat].length;i++){
          allplayertiles[seat]+=playertiles[seat][i];
          if(i!=playertiles[seat].length-1)allplayertiles[seat]+="|";
        }
      }
      if(ret==undefined)ret={
        name:"RecordLiuJu",
        data:{
          'type':4,
          'liqi':{
            'liqibang':liqibang,
            'score':scores[lstliqi.seat],
            'seat':lstliqi.seat
          },
          'allplayertiles':allplayertiles
        }
      };
    } 
  }
  let havegang=[0,0,0,0],havegangcnt;
  for(let seat=0;seat<playercnt;seat++){
    for(let i=0;i<fulu[seat].length;i++)if(fulu[seat][i].type==2||fulu[seat][i].type==3)havegang[seat]=1;
    havegangcnt+=havegang[seat];
  }
  if(doracnt.cnt==5&&havegangcnt>=2){
    if(ret==undefined)ret={
      name:"RecordLiuJu",
      data:{
        'type':3
      }
    };
  }
  if(hules_history.length!=0)ret.data.hules_history=hules_history;
  actions.push(ret);
  if(!is_xuezhandaodi())ben++;
}
function roundend(){
  discardtiles=["","","",""];
  editdata.actions.push([].concat(actions));
  editdata.xun.push([].concat(xun));
  xun=[[],[],[],[]];
  actions=[];
}
function gameend(){
  function cmp2(x,y){
    if(y.part_point_1>x.part_point_1)return 1;
    if(y.part_point_1<x.part_point_1)return -1;
    if(y.seat<x.seat)return 1;
    if(y.seat>x.seat)return -1;
  }
  players=[];
  for(let i=0;i<playercnt;i++)players.push({
    gold:0,
    grading_score:0,
    part_point_1:scores[i],
    part_point_2:0,
    seat:i,
    total_point:0,
  });
  players.sort(cmp2);
  players[0].part_point_1+=liqibang*1000;
  let madian=[[15,5,-5,-15],[10,0,-10]];
  if(playercnt==3){
    for(let i=1;i<3;i++)players[i].total_point=players[i].part_point_1-firstneededscores+madian[1][i]*1000;
    players[0].total_point=-players[1].total_point-players[2].total_point;
  }
  else{
    for(let i=1;i<4;i++)players[i].total_point=players[i].part_point_1-firstneededscores+madian[0][i]*1000;
    players[0].total_point=-players[1].total_point-players[2].total_point-players[3].total_point;
  }
  editdata.players=players;
  edit()
}
function randompaishan(paishan,paishanback,reddora){
  if(typeof(tiles0)=="string")tiles0=separatetile(tiles0);
  if(typeof(tiles1)=="string")tiles1=separatetile(tiles1);
  if(typeof(tiles2)=="string")tiles2=separatetile(tiles2);
  if(typeof(tiles3)=="string")tiles3=separatetile(tiles3);
  if(typeof(paishanback)=="number"){reddora=paishanback;paishanback=undefined;}
  if(reddora==undefined){
    if(config.mode.mode==11){
      if(config&&config.mode&&config.mode.detail_rule&&config.mode.detail_rule.dora_count)reddora=config.mode.detail_rule.dora_count;
      else reddora=2;
    }
    else{
      if(config&&config.mode&&config.mode.detail_rule&&config.mode.detail_rule.dora_count)reddora=config.mode.detail_rule.dora_count;
      else reddora=3;
    }
  }
  function randomcmp(x,y){
    return Math.random()-0.5;
  }
  let cnt=[],tls=[];
  for(let i=1;i<=34;i++)cnt[i]=4;
  if(tiles3.length==0){
    cnt[2]=0;cnt[3]=0;cnt[4]=0;cnt[5]=0;cnt[6]=0;cnt[7]=0;cnt[8]=0;
    if(reddora==undefined||reddora==2){cnt[14]=3;cnt[23]=3;cnt[36]=1;cnt[37]=1;}
  }
  else{
    if(reddora==undefined||reddora==3){cnt[5]=3;cnt[14]=3;cnt[23]=3;cnt[35]=1;cnt[36]=1;cnt[37]=1;}
    if(reddora==4){cnt[5]=3;cnt[14]=2;cnt[23]=3;cnt[35]=1;cnt[36]=2;cnt[37]=1;}
  }
  for(let i=0;i<tiles0.length;i++)cnt[tiletoint(tiles0[i],1)]--;
  for(let i=0;i<tiles1.length;i++)cnt[tiletoint(tiles1[i],1)]--;
  for(let i=0;i<tiles2.length;i++)cnt[tiletoint(tiles2[i],1)]--;
  for(let i=0;i<tiles3.length;i++)cnt[tiletoint(tiles3[i],1)]--;
  for(let i=0;i<paishan.length;i+=2)cnt[tiletoint(paishan[i]+paishan[i+1],1)]--;
  if(paishanback!=undefined)for(let i=0;i<paishanback.length;i+=2)cnt[tiletoint(paishanback[i]+paishanback[i+1],1)]--;
  for(let i=1;i<=37;i++){
    for(let j=1;j<=cnt[i];j++)tls.push(inttotile(i));
  }
  tls.sort(randomcmp);
  for(let i=0;i<tls.length;i++)paishan+=tls[i];
  if(paishanback!=undefined)paishan+=paishanback;
  return paishan;
}
//该部分朝下 
editdata.nickname=["电脑(简单)","电脑(简单)","电脑(简单)","电脑(简单)"];
editdata.avatar_id=[400101,400101,400101,400101];
editdata.config={
  'category':2,//1表示友人房，2表示匹配房......
  'meta':{'mode_id':11},
  'mode':{
    'mode':1,//1表示4人，11表示3人
    'detail_rule':{
      'dora_count':3,
      'fanfu':1,
      'guyi_mode':0,
      'huansanzhang':0,
      'init_point':25000,
      'shiduan':1,
      'xuezhandaodi':0
    }
  }
}
gamebegin();
//第一局（流局满贯，作弊） 
tiles0=["1m","1m","1m","2m","3m","4m","0m","6m","7m","8m","9m","9m","9m","5z"];
tiles1=["1p","1p","1p","2p","3p","4p","0p","6p","7p","8p","9p","9p","9p"];
tiles2=["1s","1s","1s","2s","3s","4s","0s","6s","7s","8s","9s","9s","9s"];  
tiles3=["1z","1z","1z","2z","2z","2z","3z","3z","3z","4z","4z","4z","7z"];
paishan="5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z";
roundbegin();
qiepai("5z");
for(let i=69;i>=1;i--){
  mopai();
  qiepai();
}
notileliuju();
roundend();
//第二局（每局的dora可能不一样哦）
tiles0=["1s","1s","1s","2s","3s","4s","0s","6s","7s","8s","9s","9s","9s","1p"];
tiles1=["1p","1p","2p","3p","7m","7m","7m","8m","8m","8m","9m","9m","9m"];
tiles2=["2s","2s","2s","3s","3s","3s","4s","4s","4s","5s","5s","6s","6s"];  
tiles3=["2m","2m","2m","3m","3m","3m","4m","4m","4m","5m","5m","6m","6m"];
paishan=randompaishan("4p");
roundbegin();
qiepai("1p",true);
hupai();
roundend();
//第三局（诈和示范） 
tiles1=["1m","1m","1m","2m","3m","4m","0m","6m","7m","8m","9m","9m","9m","6z"];
tiles2=["2s","3s","8s","5p","5p","1z","2z","5z","5z","6z","6z","7z","7z"];
tiles3=["2s","2s","3s","4s","4s","6s","6s","8s","8s","3z","4z","5z","7z"];  
tiles0=["3s","4s","6s","5p","9p","1z","1z","2z","2z","3z","3z","4z","4z"];
paishan=randompaishan("3s");
roundbegin();
hupai();
roundend();
//第四局 
tiles1=["3m","4m","5m","3p","4p","5p","4s","7s","1z","1z","1z","5z","5z","5z"];
tiles2=["3s","1m","1m","1m","2m","3m","4m","0m","6m","7m","8m","9m","9m"];
tiles3=["3s","3s","6z","6z","4s","4s","6s","6s","6s","8s","8s","8s","2s"];  
tiles0=["1p","1p","1p","2p","3p","4p","0p","6p","7p","8p","9p","9p","9p"];
paishan=randompaishan("9m9s1z9s3s","1s1s1s1s7s7s4s5s");
discardtiles=["","7s5z","3s","2s"];
roundbegin();
qiepai();
mopai();
qiepai(true);
mingpai(["3s","3s"]);
qiepai();
mopai();
qiepai(true);
mopai();
leimingpai("1z");
mopai();
qiepai(true);
mopai();
qiepai();
mopai();
leimingpai("3s");
hupai();
roundend();
//第五局
tiles1=["2s","2s","4s","4s","8s","8s","1z","1z","2z","2z","3z","3z","4z","7z"];
tiles2=["1m","1m","1m","2m","3m","4m","0m","6m","7m","8m","9m","9m","9m"];
tiles3=["1p","1p","1p","2p","3p","4p","0p","6p","7p","8p","9p","9p","9p"];  
tiles0=["1s","1s","1s","2s","3s","4s","0s","6s","7s","8s","9s","9s","9s"];
paishan=randompaishan("4z","5z5z5z5z6z6z6z6z");
roundbegin();
qiepai("7z",true);
mopai();
qiepai("4z",true);
hupai();
roundend();
//第六局
tiles1="1m1m1m2m3m4m0m6m7m8m9m9m9m1z";
tiles2="1p1p1p2p3p4p0p6p7p8p9p9p9p";
tiles3="1s1s1s2s3s4s0s6s7s8s9s9s9s";  
tiles0="2p2s3p3s4p4s5m6p7p8p6s7s8s";
paishan=randompaishan("1z1z1z");
roundbegin();
qiepai("1z",true);
mopai();
qiepai(true);
mopai();
qiepai(true);
mopai();
qiepai(true);
liuju();
roundend();
//第七局
tiles1=["1m","1m","1m","2m","3m","4m","0m","6m","7m","8m","9m","9m","9m","6z"];
tiles2=["2s","3s","8s","5p","5p","1z","2z","5z","5z","6z","6z","7z","7z"];
tiles3=["2s","2s","3s","4s","4s","6s","6s","8s","8s","3z","4z","5z","7z"];  
tiles0=["3s","4s","6s","5p","9p","1z","1z","2z","2z","3z","3z","4z","4z"];
paishan=randompaishan("3s");
roundbegin();
qiepai("6z",true);
mingpai(["6z","6z"]);
qiepai("8s");
mingpai(["8s","8s"]);
qiepai("3z");
mingpai(["3z","3z"]);
qiepai("5p");
mingpai(["5p","5p"]);
qiepai("2z");
mingpai(["2z","2z"]);
qiepai("6s");
mingpai(["6s","6s"]);
qiepai("7z");
mingpai(["7z","7z"]);
qiepai("2s");
mingpai(["2s","2s"]);
qiepai("4z");
mingpai(["4z","4z"]);
qiepai("4s");
mingpai(["4s","4s"]);
qiepai("5z");
mingpai(["5z","5z"]);
qiepai("1z");
mingpai(["1z","1z"]);
qiepai("9p");
mopai();
qiepai();
hupai();
roundend();
//第八局
//... 
gameend();
