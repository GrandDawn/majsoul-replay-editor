// ==UserScript==
// @name         replay editor
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  replay editor on tampermonkey
// @author       xiaolan16
// @homepageURL  https://github.com/xiaolan16/make-a-replay-in-maj-soul
// @match        https://game.maj-soul.com/1/
// @match        https://game.mahjongsoul.com/
// @match        https://mahjongsoul.game.yo-star.com/
// @grant        unsafeWindow
// @grant        GM_getValue
// @grant        GM_setValue
// @license      Apache-2.0 License
// ==/UserScript==
class Replay_Storage{
    save(name){
        let allreplay=GM_getValue('allreplay',{});
        saveproject();
        loadreplay();
        allreplay[name]=JSON.stringify(editdata);
        loadproject(lstscene);
        GM_setValue('allreplay',allreplay);
    }
    load(name){
        let allreplay=GM_getValue('allreplay',{});
        try{edit(JSON.parse(allreplay[name]))}catch(e){throw(e);}
    }
    saveproject(name){
        let project=GM_getValue('project',{});
        saveproject();
        project[name]=JSON.stringify(lstscene);
        GM_setValue('project',project);
    }
    loadproject(name){
        let project=GM_getValue('project',{});
        loadproject(JSON.parse(project[name]));
    }
    open(){
        unsafeWindow.editdata=editdata;
        unsafeWindow.settings=settings;
        unsafeWindow.gamebegin=gamebegin;
        unsafeWindow.gameend=gameend;
        unsafeWindow.edit=edit;
        unsafeWindow.canceledit=canceledit;

        unsafeWindow.roundbegin=roundbegin;
        unsafeWindow.roundend=roundend;
        unsafeWindow.randompaishan=randompaishan;
        unsafeWindow.tiles0=tiles0;
        unsafeWindow.tiles1=tiles1;
        unsafeWindow.tiles2=tiles2;
        unsafeWindow.tiles3=tiles3;
        unsafeWindow.paishan=paishan;
        unsafeWindow.muyuseats=muyuseats;
        unsafeWindow.discardtiles=discardtiles;

        unsafeWindow.mopai=mopai;
        unsafeWindow.qiepai=qiepai;
        unsafeWindow.mingpai=mingpai;
        unsafeWindow.leimingpai=leimingpai;
        unsafeWindow.notileliuju=notileliuju;
        unsafeWindow.liuju=liuju;
        unsafeWindow.hupai=hupai;

        unsafeWindow.huansanzhang=huansanzhang;
        unsafeWindow.dingque=dingque;
    }
    close(){
        try{
            delete unsafeWindow.editdata;
            delete unsafeWindow.settings;
            delete unsafeWindow.gamebegin;
            delete unsafeWindow.gameend;
            delete unsafeWindow.edit;
            delete unsafeWindow.canceledit;

            delete unsafeWindow.roundbegin;
            delete unsafeWindow.roundend;
            delete unsafeWindow.randompaishan;
            delete unsafeWindow.tiles0;
            delete unsafeWindow.tiles1;
            delete unsafeWindow.tiles2;
            delete unsafeWindow.tiles3;
            delete unsafeWindow.paishan;
            delete unsafeWindow.muyuseats;
            delete unsafeWindow.discardtiles;

            delete unsafeWindow.mopai;
            delete unsafeWindow.qiepai;
            delete unsafeWindow.mingpai;
            delete unsafeWindow.leimingpai;
            delete unsafeWindow.notileliuju;
            delete unsafeWindow.liuju;
            delete unsafeWindow.hupai;

            delete unsafeWindow.huansanzhang;
            delete unsafeWindow.dingque;
        }catch(e){throw(e);}
    }
}
