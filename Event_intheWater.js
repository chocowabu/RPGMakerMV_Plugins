/*=============================================================================
 Event_intheWater.js
----------------------------------------------------------------------------
 (c) 2019 fuku / chocowabu
  This software is released under the MIT License.
  http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2019/12/23 初版
//=============================================================================*/
/*:
 * @plugindesc 水中判定イベントプラグイン
 * @author fuku / チョコワ部
 *
 * @help
 * マップイベントを大型船（乗り物）と同じ通行判定にできるプラグインです。
 * 魚や船のNPCを作るのに便利です。
 *
 * 使い方
 * ①マップイベントのメモ欄に<type:ship>もしくは<type:fish>を入れてね。
 * ②マップの通行判定が大型船と同じになるよ。
 * ③fishは下層タイルの下に表示されるよ。
 *   タイルセットの水部分を半透明にしておいてね。
 *
 * 備考
 * ・大型船の通行設定については公式のヘルプを見てね。
 * ・すり抜け判定がONになっているとそちらが優先されます。
 * ・このプラグインにはプラグインコマンドはありません。
 *
 * 利用規約：
 * ・改変・再配布・利用形態は制限しません。好きに使ってね。
 * ・使う場合は著作者名を明記してね。詳しくはMITライセンスで調べてね。
 * ・このプラグインが原因でなにか問題が起きても対応できません。ごめんね。
 * 
 */
 
(function() {

var fishHook=function(events){
	var isMapPassable=function(x,y,d){
		var x2 = $gameMap.roundXWithDirection(x, d);
		var y2 = $gameMap.roundYWithDirection(y, d);

		return $gameMap.isShipPassable(x2,y2);
	};
	var screenZ=function(){return -2;};
	var i,max,event;
	for(i=0,max=events.length;i<max;i++){
		event=events[i];
		if(event){
			if(event.event().meta.type==='ship'){
				event.isMapPassable=isMapPassable;
			}else if(event.event().meta.type==='fish'){
				event.isMapPassable=isMapPassable;
				event.screenZ=screenZ;
			}
		}
	}
};

//シンプルだけどメニュー閉じた際や戦闘後も呼び出される
//負荷が大きい場合は軽量版を推奨
var sm_onMapLoaded=Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded=function(){
sm_onMapLoaded.call(this);
fishHook($gameMap.events());
};

//軽量版
/*
var gm_setupEvents=Game_Map.prototype.setupEvents;
Game_Map.prototype.setupEvents=function(){
	gm_setupEvents.call(this);
	fishHook(this._events);
};

var need_restore=false;
var dm_extractSaveContents=DataManager.extractSaveContents;
DataManager.extractSaveContents=function(contents){
	dm_extractSaveContents.apply(this,arguments);
	need_restore=true;
};
var sm_onMapLoaded=Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded=function(){
	if(need_restore){
		fishHook($gameMap.events());
		need_restore=false;
	}
	sm_onMapLoaded.call(this);
};
*/

})();
