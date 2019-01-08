// 下半部分铅笔
import { Sprite } from "./../base/Sprite.js";
import { DataStore } from "./../base/DataStore.js";
import { Pencil } from "./Pencil.js";

export class DownPencil extends Pencil{

  constructor(top) {
    const image = Sprite.getImage('pencilDown');
    super(image, top);
  }

  draw() {
    // 上下铅笔间距
    let gap = DataStore.getInstance().ctx.canvas.height / 5;  
    this.y = this.top + gap;
    super.draw();
  }
}