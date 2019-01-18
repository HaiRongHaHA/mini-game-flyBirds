/* 小鸟类
   是循环渲染三只小鸟
   其实是循环渲染图片的三个部分 
*/
import { DataStore } from "./../base/DataStore.js";
import { Sprite } from "./../base/Sprite.js";
export class Birds extends Sprite{
  constructor() {
    const image = Sprite.getImage('birds');
    super(image,
      0, 0,
      image.width, image.height,
      0, 0,
      image.width, image.height
    );
    this.canvasAttr = DataStore.getInstance().ctx.canvas; //canvas的属性，宽高等之类的
    // 小鸟的三种状态需要一个数组去存储
    // 小鸟的宽是34，小鸟的高度，上下边距是10，小鸟左右边距是9
    this.clippimgX = [  //三只鸟的剪裁开始位置
      9,   
      9 + 34 + 18,    
      9 + (34 + 18) * 2     
    ]
    this.clippimgY = [10, 10, 10];  
    this.clippimgWidth = [34, 34, 34];
    this.clippimgHeight = [24, 24, 24]; 
    const birdX = this.canvasAttr.width / 4;   
    const birdY = this.canvasAttr.height / 2;
    const birdWidth = 34;
    const birdHeight = 24;
    this.birdsX = [birdX, birdX, birdX];
    this.birdsY = [birdY, birdY, birdY];
    this.birdsWidth = [birdWidth, birdWidth, birdWidth];
    this.birdsHeight = [birdHeight, birdHeight, birdHeight];
    this.y = [birdY, birdY, birdY];    //小鸟的y坐标（唯一需要变化的位置）
    this.index = 0;   //鸟类的下标
    this.count = 0;   
    this.time = 0;  //下落时间
  }
  draw(){
    const speed = .2;//切换三只小鸟的速度
    this.count = this.count + speed;
    if(this.index >= 2){
      this.count = 0;
    }
    // 减速器的作用
    this.index = Math.floor(this.count);
    // 模拟重力加速度
    const g = 0.98 / 2.5;
    // 向上移动一丢丢的偏移量
    const offsetUp = 30;
    // 小鸟的位移(自由落体公式)
    const offsetY = (g * this.time * (this.time - offsetUp)) / 2;
    for(let i = 0; i<=2; i++){
      this.birdsY[i] = this.y[i] + offsetY;
    }
    this.time++;

    super.draw(this.img,
      this.clippimgX[this.index],
      this.clippimgY[this.index],
      this.birdsWidth[this.index],
      this.birdsHeight[this.index],
      this.birdsX[this.index],
      this.birdsY[this.index],
      this.birdsWidth[this.index],
      this.birdsHeight[this.index]
    )
  }

}