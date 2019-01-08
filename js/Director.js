// 导演类，控制游戏的逻辑
import { DataStore } from "./base/DataStore.js";
import { UpPencil } from "./runtime/UpPencil.js";
import { DownPencil } from "./runtime/DownPencil.js";


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

  createPencil(){
    const minTop = this.dataStore.ctx.canvas.height / 8;
    const maxTop = this.dataStore.ctx.canvas.height / 2;
    const top = minTop + Math.random() * (maxTop - minTop);
    this.dataStore.get('pencils').push(new UpPencil(top));
    this.dataStore.get('pencils').push(new DownPencil(top));
  }

  run(){
    if (!this.isGameOver){
      // 绘制背景
      this.dataStore.get('background').draw();
      // 绘制铅笔类,  创建铅笔要在游戏逻辑进行之前
      const pencils = this.dataStore.get('pencils');
      // 销毁越界铅笔
      if (pencils.length !== 0 && pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
        pencils.shift();
        pencils.shift();
      }
      /*  
        1、铅笔初始化
        2、越界铅笔销毁后接着创建新的铅笔
      */
      if (pencils.length === 0 || (pencils.length !== 0 && pencils[0].x <= 
                                  (this.dataStore.ctx.canvas.width - pencils[0].width) / 2 && pencils.length === 2)) {
        this.createPencil();
      }
      // 循环绘制铅笔
      pencils.forEach((value) => {
        value.draw();
      });

      // 绘制陆地
      this.dataStore.get('land').draw();

      // 绘制小鸟
      this.dataStore.get('birds').draw();

      // 游戏动画
      let timer = requestAnimationFrame(() => this.run());
      this.dataStore.put('timer', timer);

    } else {
      // 游戏结束
      cancelAnimationFrame(this.dataStore.get('timer'));
      this.dataStore.destroy();
    }

  }
  
}