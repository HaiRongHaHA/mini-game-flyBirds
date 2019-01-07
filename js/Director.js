// 导演类，控制游戏的逻辑
import { DataStore } from "./base/DataStore.js";

export class Director {
  static getInstance() {
    if (!Director.instance) {  // 单例模式
      Director.instance = new Director();
    }
    return Director.instance;
  }

  constructor(){
    this.dataStore = DataStore.getInstance(); 
  }

  run(){
    let backgroundSprite = this.dataStore.get('background');
    backgroundSprite.draw();
  }
  
}