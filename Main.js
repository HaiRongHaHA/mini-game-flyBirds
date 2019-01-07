// 初始化整个游戏的精灵，作为游戏开始的入口
import { ResourceLoader } from "./js/base/ResourcesLoader.js";
import { BackGround } from "./js/runtime/BackGround.js";
import { DataStore } from "./js/base/DataStore.js";
import { Director } from "./js/Director.js";


export class Main {
  constructor(){
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.dataStore = DataStore.getInstance(); 
    const loader = ResourceLoader.create();
    loader.onloaded(map => this.onResourceFirstLoaded(map));
  }

  onResourceFirstLoaded(map){
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    this.init();
  }

  init(){
    this.dataStore.put('background', new BackGround(this.ctx, this.dataStore.res.get('background')));
    Director.getInstance().run();
  }
}