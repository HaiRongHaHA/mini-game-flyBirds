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
  // 绘制随机高度铅笔
  createPencil(){
    const minTop = this.dataStore.ctx.canvas.height / 8;
    const maxTop = this.dataStore.ctx.canvas.height / 2;
    const top = minTop + Math.random() * (maxTop - minTop);
    // 固定色值
    const colorArray = ['#68c9bb', '#dea8c9', '#b2fad4', '#fbbcc1', '#ef8f65', '#e96f88', '#c5b5d0', '#d8e7f8', '#52dbcb'];
    const randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    const randomColor2 = colorArray[Math.floor(Math.random() * colorArray.length)];
    // const randomColor = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
    // const randomColor2 = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
    // console.log(randomColor)
    this.dataStore.get('pencils').push(new UpPencil(randomColor, top));
    this.dataStore.get('pencils').push(new DownPencil(randomColor2, top));
  }

  // 小鸟点击向上飞
  birdsEvent(){
    for(let i=0; i<=2; i++){
      this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
    }
    this.dataStore.get('birds').time = 0;
  }

  // 判断小鸟是否和铅笔撞击
  static isStrike(bird, pencil){
    let s = false;
    if (bird.top >= pencil.bottom || 
        bird.bottom <= pencil.top || 
        bird.right <= pencil.left || 
        bird.left >= pencil.right
    ) {
      s = true;
    }
    return !s;
  }

  // 撞击地板或铅笔的音效
  deadMusic(){
    const scoreBgm = wx.createInnerAudioContext();
          scoreBgm.autoplay = true;
          scoreBgm.src = 'audios/boom.mp3';
  }

  // 小鸟是否撞击地板和铅笔
  checkShake(){
    const birds = this.dataStore.get('birds');
    const land = this.dataStore.get('land');
    const pencils = this.dataStore.get('pencils');
    const score = this.dataStore.get('score');
    // 地板的撞击判断
    // if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y){
    //小鸟落地撞击 
    if (birds.birdsY[0] + birds.birdsHeight[0] >= 
      this.dataStore.ctx.canvas.height - birds.birdsHeight[0] ) 
    {
      this.deadMusic();
      this.isGameOver = true;
      return;
    }
    // 小鸟的边框模型
    const birdsBorder = {
      top:birds.y[0],
      bottom: birds.birdsY[0] + birds.birdsHeight[0],
      left: birds.birdsX[0],
      right: birds.birdsX[0] + birds.birdsWidth[0]
    }
    // 铅笔模型
    const pencilsLen = pencils.length;
    for (let i = 0; i < pencilsLen; i++){
      // 每一支铅笔的模型
      const pencil = pencils[i];
      const pencilBorder = {
        top:pencil.y,
        bottom: pencil.y + pencil.pencilHeight,
        left:pencil.x,
        right: pencil.x + pencil.pencilWidth
      };
      if (Director.isStrike(birdsBorder, pencilBorder)){
        this.deadMusic();
        this.isGameOver = true;
        return;
      }
    }
    // 记分器逻辑
    if (pencils.length > 0){
      if (birds.birdsX[0] > pencils[0].x + pencils[0].pencilWidth && score.isScore) {
        const scoreBgm = wx.createInnerAudioContext();
              scoreBgm.autoplay = true;
              scoreBgm.src = 'audios/bullet.mp3';
        score.isScore = false;
        score.scoreNumber++;
      }
    }
  }

  run(){
    this.checkShake();
    if (!this.isGameOver){
      // 绘制背景
      this.dataStore.get('background').draw();
      // 绘制铅笔类,  创建铅笔要在游戏逻辑进行之前
      const pencils = this.dataStore.get('pencils');
      // 销毁越界铅笔
      if (pencils.length !== 0 && pencils[0].x + pencils[0].pencilWidth <= 0 && pencils.length === 4) {
        pencils.shift();
        pencils.shift();
        this.dataStore.get('score').isScore = true;
      }
      /*  
        1、铅笔初始化
        2、越界铅笔销毁后接着创建新的铅笔
      */
      if (pencils.length === 0 || (pencils.length !== 0 && pencils[0].x <= 
        (this.dataStore.ctx.canvas.width - pencils[0].pencilWidth) / 2 && pencils.length === 2)) {
        this.createPencil();
      }
      // 循环绘制铅笔
      pencils.forEach((value) => {
        value.draw();
      });

      // 绘制陆地
      // this.dataStore.get('land').draw();

      // 记分器
      this.dataStore.get('score').draw();

      // 绘制小鸟
      this.dataStore.get('birds').draw();

      // 游戏动画
      let timer = requestAnimationFrame(() => this.run());
      this.dataStore.put('timer', timer);

    } else {
      // 游戏结束
      // this.dataStore.bgm.stop();
      // this.dataStore.get('startButton').draw();
      cancelAnimationFrame(this.dataStore.get('timer'));
      this.dataStore.destroy();
      // 微信小游戏垃圾回收
      wx.triggerGC();
    }
  }
  
}