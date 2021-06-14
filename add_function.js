function editfunction(){
  ! function(t) {
    var e = function(e) {
      function i() {
        return null !== e && e.apply(this, arguments) || this
      }
      return __extends(i, e), i.play = function(e) {
        app.Log.log("ActionDiscardTile play data:" + JSON.stringify(e)), e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, !1);
        var i = e.seat,
          n = mjcore.MJPai.Create(e.tile),
          a = !(null == e.is_liqi || void 0 == e.is_liqi || !e.is_liqi);
        if(e.muyu && t.DesktopMgr.Inst.onMuyuChange(e.muyu, !0), t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(i)].AddQiPai(n, a, e.moqie), a) {
          e.is_wliqi ? t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(i)].PlaySound("act_drich") : t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(i)].PlaySound("act_rich");
          var r = t.DesktopMgr.Inst.player_effects[i][game.EView.lizhi_bgm];
          if(r && 0 != r) {
            var s = cfg.item_definition.item.get(r).sargs[0];
            t.AudioMgr.lizhiMuted ? t.AudioMgr.PlayLiqiBgm(s, 300, !0) : (t.BgmListMgr.stopBgm(), Laya.timer.once(1e3, this, function() {
              t.DesktopMgr.Inst.gameing && (t.BgmListMgr.PlayMJBgm("", !0), t.AudioMgr.PlayLiqiBgm(s, 300, !0))
            }))
          }
        }
        var o = !1;
        e.tile_state && e.tile_state > 0 && (o = !0), i == t.DesktopMgr.Inst.seat ? t.DesktopMgr.Inst.mainrole.OnDiscardTile(n, o, !1, e.moqie) : t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(i)].onDiscardTile(e.moqie, e.tile, o, !1), e.operation && Laya.timer.once(500, this, function() {
          t.ActionOperation.play(e.operation)
        }), void 0 != e.zhenting && void 0 == e.operation && (uiscript.UI_DesktopInfo.Inst.setZhenting(e.zhenting), uiscript.UI_TingPai.Inst.setZhengting(e.zhenting)), i == t.DesktopMgr.Inst.seat && uiscript.UI_TingPai.Inst.setData1(e, !1), Laya.timer.once(500, this, function() {
          a ? t.DesktopMgr.Inst.clearMindVoice() : t.DesktopMgr.Inst.playMindVoice()
        })
      }, i.fastplay = function(e, i) {
        app.Log.log("ActionDiscardTile fastplay data:" + JSON.stringify(e) + " usetime:" + i), e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, !0);
        var n = e.seat,
          a = mjcore.MJPai.Create(e.tile),
          r = !(null == e.is_liqi || void 0 == e.is_liqi || !e.is_liqi),
          s = !1;
        e.tile_state && e.tile_state > 0 && (s = !0), t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(n)].AddQiPai(a, r, e.moqie, !1), e.muyu && t.DesktopMgr.Inst.onMuyuChange(e.muyu, !1), n == t.DesktopMgr.Inst.seat ? t.DesktopMgr.Inst.mainrole.OnDiscardTile(a, s, !0, e.moqie) : t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(n)].onDiscardTile(e.moqie, e.tile, s, !0), e.operation && -1 != i && Laya.timer.once(500, this, function() {
          t.ActionOperation.play(e.operation, i)
        }), void 0 != e.zhenting && void 0 == e.operation && (uiscript.UI_DesktopInfo.Inst.setZhenting(e.zhenting), uiscript.UI_TingPai.Inst.setZhengting(e.zhenting)), n == t.DesktopMgr.Inst.seat && uiscript.UI_TingPai.Inst.setData1(e, !0)
      }, i.record = function(e, i) {
        void 0 === i && (i = 0), app.Log.log("ActionDiscardTile record data:" + JSON.stringify(e)), e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, !0);
        var n = e.seat,
          a = mjcore.MJPai.Create(e.tile),
          r = !(null == e.is_liqi || void 0 == e.is_liqi || !e.is_liqi),
          s = !1;
        if(e.is_kailiqi){
          if(e.seat!=view.DesktopMgr.Inst.seat){
            for(let i=0;i<view.DesktopMgr.Inst.players[(4+e.seat-view.DesktopMgr.Inst.seat)%4].hand.length;i++)view.DesktopMgr.Inst.players[(4+e.seat-view.DesktopMgr.Inst.seat)%4].hand[i].DoAnim_FullDown();
            for(let i=0;i<view.DesktopMgr.Inst.players[(4+e.seat-view.DesktopMgr.Inst.seat)%4].hand.length;i++)view.DesktopMgr.Inst.players[(4+e.seat-view.DesktopMgr.Inst.seat)%4].hand[i].is_open=true;
          }
          /*else{
            for (o = 0; o < view.DesktopMgr.Inst.players[0].hand.length; o++) view.DesktopMgr.Inst.players[0].hand[o].Hule();
            for (var r = [], s =view.DesktopMgr.Inst.players[0].trans_hand3D, o = 0; o < view.DesktopMgr.Inst.players[0].hand.length; o++) {
              var l = new t.HandPai3D(s);
              l.SetVal(view.DesktopMgr.Inst.players[0].hand[o].val, !1), l.SetIndex(o, !1), l.Stand(), t.DesktopMgr.Inst.is_chuanma_mode() && (l.pai3D.is_gap = l.val.type == view.DesktopMgr.Inst.players[0].gap_type, l.pai3D.OnChoosedPai()), r.push(l)
            }
            var h = r.length;
            for (o = 0; o < h; o++) view.DesktopMgr.Inst.players[0]._hand3d[o].DoAnim_FullDown();
          }*/
        }
        if(e.tile_state && e.tile_state > 0 && (s = !0), e.muyu && t.DesktopMgr.Inst.onMuyuChange(e.muyu, !0), t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(n)].AddQiPai(a, r, e.moqie), r && (e.is_wliqi ? t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(n)].PlaySound("act_drich") : t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(n)].PlaySound("act_rich"), uiscript.UI_DesktopInfo.Inst.changeHeadEmo(n, "emoji_9", 2e3)), n == t.DesktopMgr.Inst.seat ? t.DesktopMgr.Inst.mainrole.OnDiscardTile(a, s, !1, e.moqie) : t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(n)].recordDiscardTile(a, e.moqie, s, !1), e.tingpais && t.DesktopMgr.Inst.setTingpai(e.seat, e.tingpais), t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast && uiscript.UI_Live_Broadcast.Inst.during_play && e.operations)
          for(var o = 0; o < e.operations.length; o++) t.ActionOperation.ob(e.operations[o], i, 450);
        return 500
      }, i.fastrecord = function(e, i) {
        void 0 === i && (i = -1), app.Log.log("ActionDiscardTile fastrecord data:" + JSON.stringify(e)), e.doras && t.DesktopMgr.Inst.WhenDoras(e.doras, !0);
        var n = e.seat,
          a = mjcore.MJPai.Create(e.tile),
          r = !(null == e.is_liqi || void 0 == e.is_liqi || !e.is_liqi),
          s = !1;
        if(e.is_kailiqi){
          if(e.seat!=view.DesktopMgr.Inst.seat){
            for(let i=0;i<view.DesktopMgr.Inst.players[(4+e.seat-view.DesktopMgr.Inst.seat)%4].hand.length;i++)view.DesktopMgr.Inst.players[(4+e.seat-view.DesktopMgr.Inst.seat)%4].hand[i].DoAnim_FullDown();
            for(let i=0;i<view.DesktopMgr.Inst.players[(4+e.seat-view.DesktopMgr.Inst.seat)%4].hand.length;i++)view.DesktopMgr.Inst.players[(4+e.seat-view.DesktopMgr.Inst.seat)%4].hand[i].is_open=true;
          }
          /*else{
            for (o = 0; o < view.DesktopMgr.Inst.players[0].hand.length; o++) view.DesktopMgr.Inst.players[0].hand[o].Hule();
            for (var r = [], s =view.DesktopMgr.Inst.players[0].trans_hand3D, o = 0; o < view.DesktopMgr.Inst.players[0].hand.length; o++) {
              var l = new t.HandPai3D(s);
              l.SetVal(view.DesktopMgr.Inst.players[0].hand[o].val, !1), l.SetIndex(o, !1), l.Stand(), t.DesktopMgr.Inst.is_chuanma_mode() && (l.pai3D.is_gap = l.val.type == view.DesktopMgr.Inst.players[0].gap_type, l.pai3D.OnChoosedPai()), r.push(l)
            }
            var h = r.length;
            for (o = 0; o < h; o++)view.DesktopMgr.Inst.players[0]._hand3d[o].FullDown();
          }*/
        }
        if(e.tile_state && e.tile_state > 0 && (s = !0), e.muyu && t.DesktopMgr.Inst.onMuyuChange(e.muyu, !1), t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(n)].AddQiPai(a, r, e.moqie, !1), n == t.DesktopMgr.Inst.seat ? t.DesktopMgr.Inst.mainrole.OnDiscardTile(a, s, !0, e.moqie) : t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(n)].recordDiscardTile(a, e.moqie, s, !0), e.tingpais && t.DesktopMgr.Inst.setTingpai(e.seat, e.tingpais), t.DesktopMgr.Inst.mode == t.EMJMode.live_broadcast && uiscript.UI_Live_Broadcast.Inst.during_play && i >= 0 && e.operations)
          for(var o = 0; o < e.operations.length; o++) t.ActionOperation.ob(e.operations[o], i, 450)
      }, i
    }(t.ActionBase);
    t.ActionDiscardTile = e
  }(view || (view = {}));
  !function(t){
    var e=function(e){
      function i(){
        return null!==e&&e.apply(this,arguments)||this
      }
      return __extends(i,e),i.play=function(e){
        app.Log.log("ActionBabei play data:"+JSON.stringify(e)),e.doras&&t.DesktopMgr.Inst.WhenDoras(e.doras,!1);
        var i=e.seat,n;
        e.tile?n=mjcore.MJPai.Create(e.tile):n=mjcore.MJPai.Create("4z");
        t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(i)].AddBabei(n,e.moqie,!0),t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(i)].PlaySound("act_babei");
        var a=!1;
        e.tile_state&&e.tile_state>0&&(a=!0),e.muyu&&t.DesktopMgr.Inst.onMuyuChange(e.muyu,!0),i==t.DesktopMgr.Inst.seat ? t.DesktopMgr.Inst.mainrole.onBabei(n,a,!1):t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(i)].onBabei(e.moqie,a,!1),e.operation&&Laya.timer.once(500,this,function(){
          t.ActionOperation.play(e.operation)
        }),void 0 !=e.zhenting&&void 0==e.operation&&(uiscript.UI_DesktopInfo.Inst.setZhenting(e.zhenting),uiscript.UI_TingPai.Inst.setZhengting(e.zhenting)),i==t.DesktopMgr.Inst.seat&&uiscript.UI_TingPai.Inst.setData1(e,!1),t.DesktopMgr.Inst.waiting_lingshang_deal_tile=!0
      },i.fastplay=function(e,i){
        app.Log.log("ActionBabei fastplay data:"+JSON.stringify(e)+" usetime:"+i),e.doras&&t.DesktopMgr.Inst.WhenDoras(e.doras,!0);
        var n=e.seat,a;
        e.tile?a=mjcore.MJPai.Create(e.tile):a=mjcore.MJPai.Create("4z");
        t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(n)].AddBabei(a,e.moqie,!1);
        var r=!1;
        e.tile_state&&e.tile_state>0&&(r=!0),e.muyu&&t.DesktopMgr.Inst.onMuyuChange(e.muyu,!1),n==t.DesktopMgr.Inst.seat ? t.DesktopMgr.Inst.mainrole.onBabei(a,r,!0):t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(n)].onBabei(e.moqie,r,!0),e.operation&&-1 !=i&&Laya.timer.once(500,this,function(){
          t.ActionOperation.play(e.operation,i)
        }),void 0 !=e.zhenting&&void 0==e.operation&&(uiscript.UI_DesktopInfo.Inst.setZhenting(e.zhenting),uiscript.UI_TingPai.Inst.setZhengting(e.zhenting)),n==t.DesktopMgr.Inst.seat&&uiscript.UI_TingPai.Inst.setData1(e,!0),t.DesktopMgr.Inst.waiting_lingshang_deal_tile=!0
      },i.record=function(e,i){
        void 0===i&&(i=0),app.Log.log("ActionBabei record data:"+JSON.stringify(e)),e.doras&&t.DesktopMgr.Inst.WhenDoras(e.doras,!0);
        var n=e.seat,a;
        e.tile?a=mjcore.MJPai.Create(e.tile):a=mjcore.MJPai.Create("4z");
        t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(n)].AddBabei(a,e.moqie,!0),t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(n)].PlaySound("act_babei");
        var r=!1;
        if(e.tile_state&&e.tile_state>0&&(r=!0),e.muyu&&t.DesktopMgr.Inst.onMuyuChange(e.muyu,!0),n==t.DesktopMgr.Inst.seat ? t.DesktopMgr.Inst.mainrole.onBabei(a,r,!1):t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(n)].recordBabei(a,e.moqie,r,!1),e.tingpais&&t.DesktopMgr.Inst.setTingpai(e.seat,e.tingpais),t.DesktopMgr.Inst.mode==t.EMJMode.live_broadcast&&uiscript.UI_Live_Broadcast.Inst.during_play&&e.operations)
          for(var s=0;s<e.operations.length;s++)t.ActionOperation.ob(e.operations[s],i,450);
        return t.DesktopMgr.Inst.waiting_lingshang_deal_tile=!0,1e3
      },i.fastrecord=function(e,i){
        void 0===i&&(i=-1),app.Log.log("ActionBabei fastrecord data:"+JSON.stringify(e)),e.doras&&t.DesktopMgr.Inst.WhenDoras(e.doras,!0);
        var n=e.seat,a;
        e.tile?a=mjcore.MJPai.Create(e.tile):a=mjcore.MJPai.Create("4z");
        t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(n)].AddBabei(a,e.moqie,!1);
        var r=!1;
        if(e.tile_state&&e.tile_state>0&&(r=!0),e.muyu&&t.DesktopMgr.Inst.onMuyuChange(e.muyu,!1),n==t.DesktopMgr.Inst.seat ? t.DesktopMgr.Inst.mainrole.onBabei(a,r,!0):t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(n)].recordBabei(a,e.moqie,r,!0),e.tingpais&&t.DesktopMgr.Inst.setTingpai(e.seat,e.tingpais),t.DesktopMgr.Inst.mode==t.EMJMode.live_broadcast&&uiscript.UI_Live_Broadcast.Inst.during_play&&i>=0&&e.operations)
          for(var s=0;s<e.operations.length;s++)t.ActionOperation.ob(e.operations[s],i,450);
        t.DesktopMgr.Inst.waiting_lingshang_deal_tile=!0
      },i
    }(t.ActionBase);
    t.ActionBabei=e
  }(view||(view={}));
  !function(t){
    var e=function(e){
      function i(){
        return null!==e&&e.apply(this,arguments)||this
      }
      return __extends(i,e),i.record=function(e,i){
        var i=this,n=1;
        e.doras&&t.DesktopMgr.Inst.WhenDoras(e.doras,0);
        Laya.timer.once(100,this,function(){
          var a=e.hules,r=0;
          if(a[0].zimo){
            var s=a[0].seat;
            uiscript.UI_Huleshow.Inst.showZimo([t.DesktopMgr.Inst.seat2LocalPosition(s)]),r+=n?1200:200,
            Laya.timer.once(r,i,function(){
              t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(s)].AddBabei(mjcore.MJPai.Create(a[0].hu_tile),true,1);
              if(t.DesktopMgr.Inst.lastqipai)t.DesktopMgr.Inst.lastqipai.isxuezhanhu=!0,t.DesktopMgr.Inst.lastqipai.OnChoosedPai();
              s==t.DesktopMgr.Inst.seat?t.DesktopMgr.Inst.mainrole.OnDiscardTile(mjcore.MJPai.Create(a[0].hu_tile),0,0):t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(s)].recordDiscardTile(mjcore.MJPai.Create(a[0].hu_tile),true,0,0);
            })
            if(t.DesktopMgr.Inst.lastqipai)t.DesktopMgr.Inst.lastqipai.isxuezhanhu=!0;
            //if(t.DesktopMgr.Inst.lastqipai&&t.DesktopMgr.Inst.lastqipai.model.meshRender)t.DesktopMgr.Inst.lastqipai.OnChoosedPai();
          }
          else{
            for(var o=0,l=-1,h=[],c=0;c<a.length;c++){
              var _=a[c].seat;
              h.push(t.DesktopMgr.Inst.seat2LocalPosition(_)),-1==l&&(l=_)
            }
            l>=0&&(o=t.DesktopMgr.Inst.player_effects[l][game.EView.hupai_effect]),n&&uiscript.UI_Huleshow.Inst.showRong(h),r+=n?1200:200,Laya.timer.once(r,i,function(){
              if(!t.DesktopMgr.Inst.isLastPaiMingPai())t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(t.DesktopMgr.Inst.lastpai_seat)].QiPaiNoPass();
              else{
                t.DesktopMgr.Inst.lastqipai.lastColor=new Laya.Vector4(1,.78,.78,.4);
                t.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR,t.DesktopMgr.Inst.lastqipai.lastColor);
                t.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.blend=2;
                t.DesktopMgr.Inst.lastqipai.val.type+=10;
                t.DesktopMgr.Inst.lastqipai.isxuezhanhu=!0,t.DesktopMgr.Inst.lastqipai.OnChoosedPai()
              }
              for(var e=0;e<a.length;e++){
                var i=a[e].seat;
                var s=mjcore.MJPai.Create(a[0].hu_tile);
                t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(i)].AddBabei(s,true,1);
                //i==t.DesktopMgr.Inst.seat?t.DesktopMgr.Inst.mainrole.onBabei(mjcore.MJPai.Create(a[e].hu_tile),0,0):t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(i)].recordBabei(mjcore.MJPai.Create(a[e].hu_tile),true,0,0);
                if(e!=0)t.DesktopMgr.Inst.lastqipai.lastColor=new Laya.Vector4(1,.78,.78,.4);
                else t.DesktopMgr.Inst.lastqipai.lastColor=new Laya.Vector4(1,.78,.78,1);
                if(t.DesktopMgr.Inst.lastqipai)t.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR,t.DesktopMgr.Inst.lastqipai.lastColor);
                if(t.DesktopMgr.Inst.lastqipai)t.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.blend=2;
                if(t.DesktopMgr.Inst.lastqipai)t.DesktopMgr.Inst.lastqipai.val.type+=10;
                if(t.DesktopMgr.Inst.lastqipai)t.DesktopMgr.Inst.lastqipai.isxuezhanhu=!0,t.DesktopMgr.Inst.lastqipai.OnChoosedPai()
              }
            })
          }
          r+=2e3,Laya.timer.once(r,i,function(){
            for (var n=0,r=t.DesktopMgr.Inst.players;n<r.length;n++){
              r[n].hideLiqi()
            }
            e.liqi?Laya.timer.once(2500,i,function(){
              t.ActionLiqi.play(e.liqi)
            }):uiscript.UI_DesktopInfo.Inst.setLiqibang(0);
            for (var s=[],o=0;o<e.delta_scores.length;o++){
              var l={
                title_id:0,
                score:0,
                delta:0
              };
              if(e.delta_scores[o]>0){
                o==t.DesktopMgr.Inst.seat,uiscript.UI_DesktopInfo.Inst.changeHeadEmo(o,"emoji_7",-1),l.delta=e.delta_scores[o];
                for(var h=0,c=a;h<c.length;h++) {
                  var _=c[h];
                  if(_.seat == o){
                    l.title_id=_.title_id;
                    break
                  }
                }
              } 
              else e.delta_scores[o]<0&&(l.delta=e.delta_scores[o],uiscript.UI_DesktopInfo.Inst.changeHeadEmo(o,"emoji_8",-1));
              l.score=e.old_scores[o],s.push(l)
            }
            Laya.timer.once(200,i,function(){
              t.DesktopMgr.Inst.setScores(e.scores)
            }),uiscript.UI_Hu_Xuezhan.Inst.showScoreChange(s)
          }),r+=3e3,Laya.timer.once(r,i,function(){
            t.DesktopMgr.Inst.ActionRunComplete()
          })
        })
        return 6e3;
      },i.fastrecord=function(e,i){
        app.Log.log("ActionHule fastplay data:"+JSON.stringify(e));
        var n=e.hules;
        if(n[0].zimo){
          a=n[0].seat;
          t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(a)].AddBabei(mjcore.MJPai.Create(n[0].hu_tile),true,0);
          a==t.DesktopMgr.Inst.seat?t.DesktopMgr.Inst.mainrole.OnDiscardTile(mjcore.MJPai.Create(n[0].hu_tile),0,1):t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(a)].recordDiscardTile(mjcore.MJPai.Create(n[0].hu_tile),true,0,1);
          if(t.DesktopMgr.Inst.lastqipai)t.DesktopMgr.Inst.lastqipai.isxuezhanhu=!0,t.DesktopMgr.Inst.lastqipai.OnChoosedPai();
        }
        else{
          if(!t.DesktopMgr.Inst.isLastPaiMingPai())t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(t.DesktopMgr.Inst.lastpai_seat)].QiPaiNoPass();
          else{
            t.DesktopMgr.Inst.lastqipai.lastColor=new Laya.Vector4(1,.78,.78,.4);
            t.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR,t.DesktopMgr.Inst.lastqipai.lastColor);
            t.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.blend=2;
            t.DesktopMgr.Inst.lastqipai.val.type+=10;
            t.DesktopMgr.Inst.lastqipai.isxuezhanhu=!0,t.DesktopMgr.Inst.lastqipai.OnChoosedPai()
          }
          for(s=0;s<n.length;s++){
            var o=n[s].seat;
            t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(o)].AddBabei(mjcore.MJPai.Create(n[s].hu_tile),true,0);
            //o==t.DesktopMgr.Inst.seat?t.DesktopMgr.Inst.mainrole.onBabei(mjcore.MJPai.Create(n[s].hu_tile),0,1):t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(o)].recordBabei(mjcore.MJPai.Create(n[s].hu_tile),true,0,1);
            if(s!=0)t.DesktopMgr.Inst.lastqipai.lastColor=new Laya.Vector4(1,.78,.78,.4);
            else t.DesktopMgr.Inst.lastqipai.lastColor=new Laya.Vector4(1,.78,.78,1);
            if(t.DesktopMgr.Inst.lastqipai)t.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR,t.DesktopMgr.Inst.lastqipai.lastColor);
            if(t.DesktopMgr.Inst.lastqipai)t.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.blend=2;
            if(t.DesktopMgr.Inst.lastqipai)t.DesktopMgr.Inst.lastqipai.val.type+=10;
            if(t.DesktopMgr.Inst.lastqipai)t.DesktopMgr.Inst.lastqipai.isxuezhanhu=!0,t.DesktopMgr.Inst.lastqipai.OnChoosedPai()
          }
        }
        for (var l=0,h=t.DesktopMgr.Inst.players;l<h.length;l++){
          var c=h[l];
          c.hideLiqi()
        }
        e.liqi?t.ActionLiqi.fastplay(e.liqi,0):uiscript.UI_DesktopInfo.Inst.setLiqibang(0),t.DesktopMgr.Inst.setScores(e.scores)
      },i
    }(t.ActionBase);
    t.ActionHuleXueLiu=e
  }(view||(view={}));
  !function(t){
    var e=function(e){
      function i(){
        return null!==e&&e.apply(this,arguments)||this
      }
      return __extends(i,e),i.record=function(e){
        var i=this,n=1;
        e.doras&&t.DesktopMgr.Inst.WhenDoras(e.doras,0);
        Laya.timer.once(100,this,function(){
          var a=e.hules,r=0;
          if(e.hules_history)Laya.timer.once(3e3,i,function(){
            for(var i=0,a=e.hules_history;i<a.length;i++){
              var r=a[i],
                s=t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(r.seat)];
              if(s&&s.already_xuezhan_hule_state){
                for(var o=[],l=0;l<r.hand.length;l++)o.push(mjcore.MJPai.Create(r.hand[l]));
                o=o.sort(mjcore.MJPai.Distance),s.onXuezhanEnd(o,!n)
              }
            }
          })
          if(a[0].zimo){
            var s=a[0].seat;
            uiscript.UI_Huleshow.Inst.showZimo([t.DesktopMgr.Inst.seat2LocalPosition(s)]),r+=n?1200:200,
            Laya.timer.once(r,i,function(){
              t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(s)].AddBabei(mjcore.MJPai.Create(a[0].hu_tile),true,1);
              if(t.DesktopMgr.Inst.lastqipai)t.DesktopMgr.Inst.lastqipai.isxuezhanhu=!0,t.DesktopMgr.Inst.lastqipai.OnChoosedPai();
              s==t.DesktopMgr.Inst.seat?t.DesktopMgr.Inst.mainrole.OnDiscardTile(mjcore.MJPai.Create(a[0].hu_tile),0,0):t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(s)].recordDiscardTile(mjcore.MJPai.Create(a[0].hu_tile),true,0,0);
            })
            if(t.DesktopMgr.Inst.lastqipai)t.DesktopMgr.Inst.lastqipai.isxuezhanhu=!0;
            //if(t.DesktopMgr.Inst.lastqipai&&t.DesktopMgr.Inst.lastqipai.model.meshRender)t.DesktopMgr.Inst.lastqipai.OnChoosedPai();
          }
          else{
            for(var o=0,l=-1,h=[],c=0;c<a.length;c++){
              var _=a[c].seat;
              h.push(t.DesktopMgr.Inst.seat2LocalPosition(_)),-1==l&&(l=_)
            }
            l>=0&&(o=t.DesktopMgr.Inst.player_effects[l][game.EView.hupai_effect]),n&&uiscript.UI_Huleshow.Inst.showRong(h),r+=n?1200:200,Laya.timer.once(r,i,function(){
              if(!t.DesktopMgr.Inst.isLastPaiMingPai())t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(t.DesktopMgr.Inst.lastpai_seat)].QiPaiNoPass();
              else{
                t.DesktopMgr.Inst.lastqipai.lastColor=new Laya.Vector4(1,.78,.78,.4);
                t.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR,t.DesktopMgr.Inst.lastqipai.lastColor);
                t.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.blend=2;
                t.DesktopMgr.Inst.lastqipai.val.type+=10;
                t.DesktopMgr.Inst.lastqipai.isxuezhanhu=!0,t.DesktopMgr.Inst.lastqipai.OnChoosedPai()
              }
              for(var e=0;e<a.length;e++){
                var i=a[e].seat;
                var s=mjcore.MJPai.Create(a[0].hu_tile);
                t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(i)].AddBabei(s,true,1);
                //i==t.DesktopMgr.Inst.seat?t.DesktopMgr.Inst.mainrole.onBabei(mjcore.MJPai.Create(a[e].hu_tile),0,0):t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(i)].recordBabei(mjcore.MJPai.Create(a[e].hu_tile),true,0,0);
                if(e!=0)t.DesktopMgr.Inst.lastqipai.lastColor=new Laya.Vector4(1,.78,.78,.4);
                else t.DesktopMgr.Inst.lastqipai.lastColor=new Laya.Vector4(1,.78,.78,1);
                if(t.DesktopMgr.Inst.lastqipai)t.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR,t.DesktopMgr.Inst.lastqipai.lastColor);
                if(t.DesktopMgr.Inst.lastqipai)t.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.blend=2;
                if(t.DesktopMgr.Inst.lastqipai)t.DesktopMgr.Inst.lastqipai.val.type+=10;
                if(t.DesktopMgr.Inst.lastqipai)t.DesktopMgr.Inst.lastqipai.isxuezhanhu=!0,t.DesktopMgr.Inst.lastqipai.OnChoosedPai()
              }
            })
          }
          r+=2e3,Laya.timer.once(r,i,function(){
            for (var n=0,r=t.DesktopMgr.Inst.players;n<r.length;n++){
              r[n].hideLiqi()
            }
            e.liqi?Laya.timer.once(2500,i,function(){
              t.ActionLiqi.play(e.liqi)
            }):uiscript.UI_DesktopInfo.Inst.setLiqibang(0);
            for (var s=[],o=0;o<e.delta_scores.length;o++){
              var l={
                title_id:0,
                score:0,
                delta:0
              };
              if(e.delta_scores[o]>0){
                o==t.DesktopMgr.Inst.seat,uiscript.UI_DesktopInfo.Inst.changeHeadEmo(o,"emoji_7",-1),l.delta=e.delta_scores[o];
                for(var h=0,c=a;h<c.length;h++) {
                  var _=c[h];
                  if(_.seat == o){
                    l.title_id=_.title_id;
                    break
                  }
                }
              } 
              else e.delta_scores[o]<0&&(l.delta=e.delta_scores[o],uiscript.UI_DesktopInfo.Inst.changeHeadEmo(o,"emoji_8",-1));
              l.score=e.old_scores[o],s.push(l)
            }
            Laya.timer.once(200,i,function(){
              t.DesktopMgr.Inst.setScores(e.scores)
            }),uiscript.UI_Hu_Xuezhan.Inst.showScoreChange(s)
          }),r+=2500,Laya.timer.once(r,this,function(){
            for(var i=0;i<e.allplayertiles.length;i++){
              for(var n=e.allplayertiles[i].split("|"),r=[],s=0;s<n.length;s++)r.push(mjcore.MJPai.Create(n[s]));
              r=r.sort(mjcore.MJPai.Distance),t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(i)].Huangpai(!0,r,!1)
            }
          }),r+=2500,Laya.timer.once(r,i,function(){
            uiscript.UIMgr.Inst.ShowWin(e,!1),t.DesktopMgr.Inst.ActionRunComplete()
          })
        })
        return 1e5;
      },i.fastrecord=function(e,i){
        app.Log.log("ActionHule fastplay data:"+JSON.stringify(e));
        t.BgmListMgr.stopBgm(),t.DesktopMgr.Inst.gameing=!1,e.muyu&&t.DesktopMgr.Inst.onMuyuChange(e.muyu,!1),e.doras&&t.DesktopMgr.Inst.WhenDoras(e.doras,!1),t.DesktopMgr.Inst.setScores(e.scores),uiscript.UIMgr.Inst.ShowWin(e,!1)
      },i
    }(t.ActionBase);
    t.ActionHuleXueLiuEnd=e
  }(view||(view={}));
  let OnChoosedPai=view.ViewPai.prototype.OnChoosedPai;
  view.ViewPai.prototype.OnChoosedPai=function(){
    try{
      let e=view.DesktopMgr.Inst.choosed_pai;
      if(null==e||0!=mjcore.MJPai.Distance(this.val,e)) {
        if(this.lastColor!==undefined)this.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR,this.lastColor);
        else if(this.isxuezhanhu||this.ispaopai)this.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR,new Laya.Vector4(1,.78,.78,1));
        else if(this.ismoqie)this.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR,new Laya.Vector4(.8,.8,.8,1));
        else this.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR,this.GetDefaultColor());
      } 
      else this.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR,new Laya.Vector4(.615,.827,.976,1));
    }catch(e){
      OnChoosedPai.call(this);
      console.error(e);
    }
  }
  uiscript.UI_Replay.prototype.doRecord=function(t){
    try{
      var e=0;
      switch(t.name){
        case "RecordNewRound":
          e=view.ActionNewRound.record(t.data);
          break;
        case "RecordChangeTile":
          e=view.ActionChangeTile.record(t.data);
          break;
        case "RecordSelectGap":
          e=view.ActionSelectGap.record(t.data);
          break;
        case "RecordDiscardTile":
          e=view.ActionDiscardTile.record(t.data);
          break;
        case "RecordDealTile":
          e=view.ActionDealTile.record(t.data);
          break;
        case "RecordChiPengGang":
          e=view.ActionChiPengGang.record(t.data);
          break;
        case "RecordAnGangAddGang":
          e=view.ActionAnGangAddGang.record(t.data);
          break;
        case "RecordBaBei":
          e=view.ActionBabei.record(t.data);
          break;
        case "RecordHule":
          e=view.ActionHule.record(t.data);
          break;
        case "RecordLiuJu":
          e=view.ActionLiuJu.record(t.data);
          break;
        case "RecordNoTile":
          e=view.ActionNoTile.record(t.data);
          break;
        case "RecordHuleXueZhanMid":
          e=view.ActionHuleXueZhanMid.record(t.data);
          break;
        case "RecordHuleXueZhanEnd":
          e=view.ActionHuleXueZhanEnd.record(t.data);
          break;
        case "RecordGangResult":
          e=view.ActionGangResult.record(t.data);
          break;
        case "RecordGangResultEnd":
          e=view.ActionGangResultEnd.record(t.data);
          break;
        case "RecordHuleXueLiu":
          e=view.ActionHuleXueLiu.record(t.data);
          break;
        case "RecordHuleXueLiuEnd":
          e=view.ActionHuleXueLiuEnd.record(t.data)
      }
      return this.auto_play&&(e+=this._get_autoplay_delay(t)),"RecordNewRound"!=t.name&&"RecordDealTile"!=t.name||this.page_paishan.refresh(),e
    }catch (e){
      var i={};
      return i.error=e.message,i.stack=e.stack,i.method="ui_replay doRecord",i.name=t.name,i.data=t.data,GameMgr.Inst.onFatalError(i),1e6
    }
  };
  uiscript.UI_Replay.prototype.doFastRecord = function(t) {
    try{
      switch(t.name){
        case "RecordNewRound":
          view.ActionNewRound.fastrecord(t.data);
          break;
        case "RecordChangeTile":
          view.ActionChangeTile.fastrecord(t.data);
          break;
        case "RecordSelectGap":
          view.ActionSelectGap.fastrecord(t.data);
          break;
        case "RecordDiscardTile":
          view.ActionDiscardTile.fastrecord(t.data);
          break;
        case "RecordDealTile":
          view.ActionDealTile.fastrecord(t.data);
          break;
        case "RecordChiPengGang":
          view.ActionChiPengGang.fastrecord(t.data);
          break;
        case "RecordAnGangAddGang":
          view.ActionAnGangAddGang.fastrecord(t.data);
          break;
        case "RecordHule":
          view.ActionHule.fastrecord(t.data);
          break;
        case "RecordLiuJu":
          view.ActionLiuJu.fastrecord(t.data);
          break;
        case "RecordNoTile":
          view.ActionNoTile.fastrecord(t.data);
          break;
        case "RecordBaBei":
          view.ActionBabei.fastrecord(t.data);
          break;
        case "RecordHuleXueZhanMid":
          view.ActionHuleXueZhanMid.fastrecord(t.data);
          break;
        case "RecordHuleXueZhanEnd":
          view.ActionHuleXueZhanEnd.fastrecord(t.data);
          break;
        case "RecordHuleXueLiu":
          view.ActionHuleXueLiu.fastrecord(t.data);
          break;
        case "RecordHuleXueLiuEnd":
          view.ActionHuleXueLiuEnd.fastrecord(t.data);
      }
      "RecordNewRound"!=t.name&&"RecordDealTile"!=t.name||this.page_paishan.refresh()
    }catch (i){
      var e={};
      return e.error=i.message,e.stack=i.stack,e.method="ui_replay doRecord",e.name=t.name,e.data=t.data,GameMgr.Inst.onFatalError(e),1e6
    }
    return 0
  }
  uiscript.UI_Replay.prototype._get_autoplay_delay=function(t){
    switch(t.name){
      case "RecordNewRound":
        return 0;
      case "RecordChangeTile":
      case "RecordDiscardTile":
      case "RecordDealTile":
      case "RecordChiPengGang":
        return 500;
      case "RecordAnGangAddGang":
      case "RecordBaBei":
        return 200;
      case "RecordHuleXueZhanMid":
        return 500;
      case "RecordHuleXueLiu":
        return 500;
    }
    return 0
  }
}
