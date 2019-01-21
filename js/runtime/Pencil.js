// 铅笔基类
import { DataStore } from "./../base/DataStore.js";

export class Pencil{

  constructor(color, top) {
    this.top = top;
    this.pencilWidth = 54;
    this.pencilHeight = 420;
    this.x = DataStore.getInstance().ctx.canvas.width;
    this.y = 0;
    this.moveSpeed = DataStore.getInstance().moveSpeed;
    this.ctx = DataStore.getInstance().ctx;
    this.bg = color;
  }

  draw(){
    this.x = this.x - this.moveSpeed;
    this.ctx.fillStyle = this.bg;
    this.ctx.fillRect(
      this.x,
      this.y,
      this.pencilWidth,
      this.pencilHeight);
  }

}