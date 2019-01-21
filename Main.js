// 初始化整个游戏的精灵，作为游戏开始的入口
import { ResourceLoader } from "./js/base/ResourcesLoader.js";
import { DataStore } from "./js/base/DataStore.js";
import { Director } from "./js/Director.js";
import { BackGround } from "./js/runtime/BackGround.js";
import { Land } from "./js/runtime/Land.js";
import { Birds } from "./js/player/Birds.js";
import { StartButton } from "./js/player/StartButton.js";
import { Score } from "./js/player/Score.js";

export class Main {
  constructor(){
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.bgm = wx.createInnerAudioContext();
    this.dataStore = DataStore.getInstance(); 
    this.director = Director.getInstance(); 
    const loader = ResourceLoader.create();
    loader.onloaded(map => this.onResourceFirstLoaded(map));
  }

  onResourceFirstLoaded(map){
    this.dataStore.bgm = this.bgm;
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    this.init();
  }

  createBackgroundMusic(){
    this.bgm.autoplay = true;
    this.bgm.loop = true;
    this.bgm.src = 'audios/bgm.mp3';
    // this.bgm.play();
  }

  init(){
    this.createBackgroundMusic();
    // 首先重置游戏是没有结束的
    this.director.isGameOver = false;
    // 公有页面元素数据
    this.dataStore
        .put('pencils', [])
        .put('background', BackGround)
        .put('land', Land)
        .put('birds', Birds)
        .put('score', Score)
        .put('startButton', StartButton);
    this.registerEvent();
    // 游戏逻辑
    this.director.run();
  }

  registerEvent(){
    wx.onTouchStart(e =>{
      this.director.isGameOver ? this.init() : this.director.birdsEvent();
    })
  }
}