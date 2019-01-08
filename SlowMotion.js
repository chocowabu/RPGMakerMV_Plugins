/*=============================================================================
 SlowMotion.js
----------------------------------------------------------------------------
 (c) 2019 chocowabu
----------------------------------------------------------------------------
 Version
 1.0.0 2019/01/09 初版
//=============================================================================*/
/*:
 * @plugindesc スローモーションプラグイン
 * @author チョコワ部 chocowabu
 *
 *
 * @param SlowmotionSwitchId
 * @text スローモーションスイッチ番号
 * @desc 指定したスイッチがONになっている間、スローモーションになります。
 * @default 0
 * @type switch
 *
 * @param SlowmotionRateId
 * @text スローモーション倍率を指定する変数
 * @desc 指定した変数の1/100倍速になります。指定した変数が50なら50%＝1/2倍速に、200なら200%＝2倍速になります。
 * @default 0
 * @type variable
 * 
 * @help
 * スイッチがONになっている間、ゲームの実行速度が変化するプラグインです。
 * スローモーション、もしくは高速化ができます。
 *
 * 使い方
 * ①プラグインパラメータでスイッチ番号を入力してね。スイッチをONにするとスローモーションになるよ。
 * ②プラグインパラメータで変数番号を入力すると変数でスロー倍率を指定できるよ。
 *
 * 備考
 * ・マップシーン、およびバトルシーンで変更が有効になります。
 * ・シーンが変わってもスロー状態が維持されます。
 * ・変数を指定しない、あるいは指定した変数が0の場合は、自動的に1/2倍速になります。
 * ・このプラグインにはプラグインコマンドはありません。
 *
 * 利用規約：
 * ・改変・再配布・利用形態は制限しません。好きに使ってね。
 * ・著作者名を明記する必要もありません。気軽に使ってね。
 * ・このプラグインが原因でなにか問題が起きても対応できません。ごめんね。
 */
 
(function() {

	var parameters = PluginManager.parameters('SlowMotion');
	const switchId = parameters['SlowmotionSwitchId'];
	const slowRateId = parameters['SlowmotionRateId'];

var scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	if ($gameSwitches.value(switchId)) {
		var slowRate = $gameVariables.value(slowRateId);
		if (slowRate == 0) {slowRate = 50};
		var fps = (100 / slowRate) / 60.0;
		} else {
		var fps = 1.0 / 60.0;
		}
    SceneManager._deltaTime = fps;
    scene_Map_update.call(this);
};

var scene_Battle_update = Scene_Battle.prototype.update
Scene_Battle.prototype.update = function() {
	if ($gameSwitches.value(switchId)) {
		var slowRate = $gameVariables.value(slowRateId);
		if (slowRate == 0) {slowRate = 50};
		var fps = (100 / slowRate) / 60.0;
		} else {
		var fps = 1.0 / 60.0;
		}
    SceneManager._deltaTime = fps;
    scene_Battle_update.call(this);
};

})();
