// 上半部分铅笔
import { Pencil } from "./Pencil.js";

export class UpPencil extends Pencil{
  constructor(color, top){
    super(color, top);
  }

  draw(){
    // this.bg = this.color;
    this.y = this.top - this.pencilHeight;
    super.draw();
  }
}               