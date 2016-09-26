/**
 * Wantedlyの各募集要項枚に自動応援をします。
 * ＜使い方＞
 * 1.ユーザID,パスワードをセットし、プロジェクトIDをセットします。
 * 2.terminalで node auto-cheer.js と実行すると自動で応援します。
 * 途中に応援済みのページがある場合はエラーとなり停止します。
 * また、Facebookのアカウントには対応していません。
 */

"use strict";

/**
 * 設定が必要な変数
 * ＜project_listについて＞
 * 応援したい募集要項が以下のように３つある場合は、
 * https://www.wantedly.com/projects/65498
 * https://www.wantedly.com/projects/64675
 * https://www.wantedly.com/projects/64678
 * project_list = [65498,64675,64678];と入れてください。
 */
var user_id      = "sample@yahoo.co.jp"
var password     = "password"
var project_list = [65498,64675,64678,64663,64486,64495,64690,48465];

/**
 * 以下は変更不要です。
 */
// selenium の設定
var webdriver = require('selenium-webdriver');
var until     = require('selenium-webdriver').until;
var By        = require('selenium-webdriver').By;
var browser   = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();

// Wantedlyへアクセスしログインする
browser.get('https://www.wantedly.com/');
var p_login = browser.findElement({css: 'a.ui-show-modal'}).click();
p_login.then(function(){
  browser.findElement(By.id('user_email')).sendKeys(user_id);
  browser.findElement(By.id('user_password')).sendKeys(password);
  browser.findElement({css: 'input.wt-ui-button'}).click();
});

// 各募集要項へアクセスし応援する
project_list.forEach(function(item,index){
  browser.get('https://www.wantedly.com/projects/' + item);
  browser.wait(until.titleContains('Wantedly'), 10000);
  browser.wait(function(){return browser.isElementPresent(By.css('div.wt-ui-button.wt-ui-button-blue.project-support-link.ng-isolate-scope'))},10000);
  browser.findElement(By.css('div.wt-ui-button.wt-ui-button-blue.project-support-link.ng-isolate-scope')).click();
  browser.wait(function(){return browser.isElementPresent({css: 'h3.ng-binding'})},10000);
  var p_cheer = browser.findElement(By.css('button.wt-ui-button.ng-binding')).click();
  p_cheer.then(function(){
    // 応援ボタンを押したら少し待つ
    browser.get('https://www.wantedly.com/');
  });
});

// ブラウザを終了する
browser.quit();
