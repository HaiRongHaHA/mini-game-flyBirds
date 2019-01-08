/* 小鸟类
   是循环渲染三只小鸟
   其实是循环渲染图片的三个部分 
*/
import { Sprite } from "./../base/Sprite.js";
export class Birds extends Sprite{
  constructor() {
    const image = Sprite.getImage('birds');
    super(image,
      0, 0,
      50, 50,
      0, 0,
      50, 50
    );

  }

  draw(){
    
    let cutX = 50
  }

}