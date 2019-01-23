import { DataStore } from "./../base/DataStore.js";
// 计分器类
export class Score {
  constructor(){
    this.ctx = DataStore.getInstance().ctx;
    this.scoreNumber = 0;
    //因为canvas刷新的很快，所以需要一个变量控制加分，只加一次
    this.isScore = true;
  }
  draw(){
    this.ctx.font = '24px Arial';
    this.ctx.fillStyle = '#666';
    this.ctx.fillText(
      this.scoreNumber,
      DataStore.getInstance().ctx.canvas.width / 10,
      DataStore.getInstance().ctx.canvas.height / 10
    );
  }
}