// 初始化整个游戏的精灵，作为游戏开始的入口
import { ResourceLoader } from "./js/base/ResourcesLoader.js";
import { DataStore } from "./js/base/DataStore.js";
import { Director } from "./js/Director.js";
import { BackGround } from "./js/runtime/BackGround.js";
import { Land } from "./js/runtime/Land.js";
import { Birds } from "./js/player/Birds.js";

export class Main {
  constructor(){
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.dataStore = DataStore.getInstance(); 
    this.director = Director.getInstance(); 
    const loader = ResourceLoader.create();
    loader.onloaded(map => this.onResourceFirstLoaded(map));
  }

  onResourceFirstLoaded(map){
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    this.init();
  }

  init(){
    // 首先重置游戏是没有结束的
    this.director.isGameOver = false;

    // 公有页面元素数据
    this.dataStore
        .put('pencils', [])
        .put('background', BackGround)
        .put('land', Land)
        .put('birds', Birds);
    // 游戏逻辑
    this.director.run();
  }
}