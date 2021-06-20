try{MRE.open();}catch(e){};
loadproject();
editdata.player_datas[0].nickname="电脑(简单)";
editdata.player_datas[1].nickname="电脑(简单)";
editdata.player_datas[2].nickname="电脑(简单)";
editdata.player_datas[3].nickname="电脑(简单)";
editdata.player_datas[0].avatar_id=400101;
editdata.player_datas[1].avatar_id=400101;
editdata.player_datas[2].avatar_id=400101;
editdata.player_datas[3].avatar_id=400101;
settings.chuanma_points_method=0;
editdata.config={
  'category':1,
  'meta':{'mode_id':2},
  'mode':{
    'mode':11,
    'detail_rule':{
      'begin_open_mode':0,
      'chuanma':0,
      'dora3_mode':0,
      'dora_count':3,
      'fanfu':1,
      'guyi_mode':0,
      'have_zimosun':false,
      'huansanzhang':0,
      'open_hand':0,
      'init_point':100000,
      'muyu_mode':0,
      'shiduan':1,
      'xuezhandaodi':0,
      'xueliu':0
    }
  }
}
tiles0=["1s","1s","1s","1z","1z","1z","5z","5z","6z","6z","7z","7z","7z","2z"];
tiles1=["1m","2s","2s","2s","3s","3s","3s","4s","4s","4s","6s","8s","8s"];
tiles2=["1m","1p","1p","1p","2p","2p","2p","3p","3p","3p","6s","8s","8s"];
tiles3=[];
paishan=randompaishan("6s6s4z","7z1z1s4z4z4z");
roundbegin();
qiepai("2z",true);
mopai();
qiepai("1m",true);
mopai();
qiepai("1m",true);
mopai();
leimingpai();
mopai();
leimingpai();
mopai();
leimingpai();
mopai();
leimingpai();
mopai();
leimingpai();
mopai();
leimingpai();
mopai();
leimingpai();
mopai();
if(getlstaction().data.tile=="5z"||getlstaction().data.tile=="6z")hupai();
else{
  qiepai();
  while(paishan.length/2>=15){
    mopai();
    let seat=getlstaction().data.seat,tile=getlstaction().data.tile;
    if(tile=="5z"||tile=="6z"){
      if(seat!=0)qiepai();
      hupai();
      break;
    }
    else qiepai();
    if(paishan.length/2==14){
      notileliuju();
      break;
    }
  }
}

tiles0="1s1s2s2s3s3s4s5s6s7s8s9s9s4z";
tiles1=["1m","2s","2s","2s","3s","3s","3s","4s","4s","4s","6s","8s","8s"];
tiles2=["1m","1p","1p","1p","2p","2p","2p","3p","3p","3p","6s","8s","8s"];
tiles3=[];
paishan=randompaishan("","9s");
roundbegin();
leimingpai();
mopai();
hupai();

tiles0="123456789p1199m4z";
tiles1="2223334448888s";
tiles2="123456789p1199m";
tiles3=[];
paishan=randompaishan("");
roundbegin();
leimingpai();
mopai();
qiepai(true);
mopai();
qiepai("8s",true);
let tingpais=tingpai(1);
function hule(t,tingpais){
  for(let i=0;i<tingpais.length;i++)if(tingpais[i].tile==t)return true;
  return false;
}
try{
  mopai();
  if(getlstaction().data.tile!="4z")qiepai(true);
  else leimingpai();
  if(hule(getlstaction().data.tile,tingpais))hupai();
  else{
    if(getlstaction().name=="RecordBaBei"){
      mopai();
      if(getlstaction().data.tile!="4z")qiepai(true);
      else leimingpai();
      if(hule(getlstaction().data.tile,tingpais))hupai();
      if(getlstaction().name=="RecordBaBei"){
        mopai();
        if(getlstaction().data.tile!="4z")qiepai(true);
        else leimingpai();
        if(hule(getlstaction().data.tile,tingpais))hupai();
      }
    }
    else{
      while(paishan.length/2>=15){
        mopai();
        let seat=getlstaction().data.seat,tile=getlstaction().data.tile;
        if(hule(tile,tingpais)){
          if(seat!=1&&tile!="4z")qiepai();
          else if(tile!=1)leimingpai();
          hupai();
          break;
        }
        else if(tile=="4z")leimingpai();
        else qiepai();
        if(paishan.length/2==14){
          notileliuju();
          break;
        }
      }
    }
  }
}catch(e){}
try{MRE.close();}catch(e){};
