// 初始化整个游戏的精灵，作为游戏开始的入口
import { ResourceLoader } from "./js/base/ResourcesLoader.js";
import { BackGround } from "./js/runtime/BackGround.js";

export class Main {
  constructor(){
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    const loader = ResourceLoader.create();
    loader.onloaded(map => this.onResourceFirstLoaded(map));
  }

  onResourceFirstLoaded(map){
    let background = new BackGround(this.ctx, map.get('background'));
    background.draw();
  }
}