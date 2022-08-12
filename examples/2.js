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
tiles0="1s1s1s1z1z1z2z5z5z6z6z7z7z7z";
tiles1="1m2s2s2s3s3s3s4s4s4s6s8s8s";
tiles2="1m1p1p1p2p2p2p3p3p3p6s8s8s";
paishan=randompaishan("6s6s4z","2s5z9m9m9m3z3z3z3z6z9s9s9s9s6z5z9m7z1z1s4z4z4z");
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
while(getlstaction(1).data.left_tile_count>=2){
  qiepai();
  mopai();
}
leimingpai();
mopai();
qiepai();
hupai();

tiles0="1s1s2s2s3s3s4s5s6s7s8s9s9s4z";
tiles1=["1m","2s","2s","2s","3s","3s","3s","4s","4s","4s","6s","8s","8s"];
tiles2=["1m","1p","1p","1p","2p","2p","2p","3p","3p","3p","6s","8s","8s"];
paishan=randompaishan("","9s");
roundbegin();
leimingpai();
mopai();
hupai();

tiles0="123456789p1199m4z";
tiles1="2223334448888s";
tiles2="123456789p1199m";
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
      while(getlstaction(2).data.left_tile_count>=1){
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
        if(getlstaction(2).data.left_tile_count==0){
          notileliuju();
          break;
        }
      }
    }
  }
}catch(e){}
try{MRE.close();}catch(e){};
