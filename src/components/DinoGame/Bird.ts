import p5Types from 'p5';

export class Bird {
  x: number;
  y: number;
  h: number;
  w: number;

    constructor(p5: p5Types) {
      this.x = p5.width;
      this.y = p5.height - 210;
      this.h = 25;
      this.w = 25;
    }
  
    move() {
      this.x -= 24;
    }
  
    show(p5: p5Types, bird_image: any) {
      p5.push()
      p5.image(bird_image, this.x, this.y, this.w, this.h)
      p5.pop()
    }
  
  }