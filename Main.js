// 初始化整个游戏的精灵，作为游戏开始的入口
import { ResourceLoader } from "./js/base/ResourcesLoader.js";
import { Director } from "./js/Director.js";


export class Main {
  constructor(){
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    const loader = ResourceLoader.create();
    loader.onloaded(map => this.onResourceFirstLoaded(map));

    Director.getInstance();

    Director.getInstance();

    Director.getInstance();

  }

  onResourceFirstLoaded(map){
    // console.log(map)
  }
}