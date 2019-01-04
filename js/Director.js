// 导演类，控制游戏的逻辑

export class Director {
  constructor(){
    console.log('构造器初始化');
  }

  static getInstance(){
    if (!Director.instance) {  // 单例模式
      Director.instance = new Director();
    }
    return Director.instance;
  }
}