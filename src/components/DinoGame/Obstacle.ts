import p5Types from 'p5';

export class Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;

    constructor(p5: p5Types) {
      this.x = p5.width;
      this.y = p5.height - 100;
      this.w = 100;
      this.h = 100;
    }
  
    move() {
      this.x -= 16;
    }
  
    show(p5: p5Types, object_image: any) {
      p5.image(object_image, this.x, this.y, this.w, this.h);
    }
  
  }