// 下半部分铅笔
import { DataStore } from "./../base/DataStore.js";
import { Pencil } from "./Pencil.js";

export class DownPencil extends Pencil{

  constructor(color, top) {
    super(color, top);
  }

  draw() {
    // this.bg = this.color;
    // 上下铅笔间距
    let gap = DataStore.getInstance().ctx.canvas.height / 5;  
    this.y = this.top + gap;
    super.draw();
  }
}