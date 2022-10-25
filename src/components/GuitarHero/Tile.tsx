import p5Types from 'p5';

export class Tile {
    x: number;
    y: number;
    w: number;
    h: number;
    vy: number;
    color: string;

    constructor(p5: p5Types, x: number, color:string) {
      this.x = x;
      this.w = 110;
      this.h = 30;
      this.y = 0 - this.h;
      this.vy = 4;
      this.color = color;
    }

    move(p5: p5Types) {
        this.y += this.vy;
    }

    show(p5: p5Types) {
      p5.push();
      p5.noStroke();
      p5.fill('gray')
      p5.rect(this.x, this.y, this.w, this.h);
      p5.fill(this.color);
      p5.stroke('black')
      p5.strokeWeight(3)
      p5.rect(this.x + 5, this.y + 5, this.w - 10, this.h - 10);
      p5.pop();
    }
  
}