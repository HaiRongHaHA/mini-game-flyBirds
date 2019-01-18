import { DataStore } from "./../base/DataStore.js";
import { Sprite } from "./../base/Sprite.js";

// 开始按钮类
export class StartButton extends Sprite{
  constructor(){
    const image = Sprite.getImage('startButton');
    super(
      image, 0, 0,
      image.width, image.height,
      (DataStore.getInstance().ctx.canvas.width - image.width) / 2,
      (DataStore.getInstance().ctx.canvas.height - image.height) / 2.5,
      image.width, image.height
    );
  }
}