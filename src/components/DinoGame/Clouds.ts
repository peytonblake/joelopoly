import p5Types from 'p5';

export class Cloud {
  x: number;
  y: number;
  h: number;
  w: number;

    constructor(p5: p5Types) {
      this.x = p5.width;
      this.y = p5.height - (Math.random() * (400 - 275) + 275);
      this.h = 20 + (Math.random() * 20);
      this.w = 50 + (Math.random() * 100);
    }
  
    move() {
      this.x -= 6;
    }
  
    show(p5: p5Types, cloud_image: any) {
      p5.push()
      p5.image(cloud_image, this.x, this.y, this.w, this.h)
      p5.pop()
    }
  
  }