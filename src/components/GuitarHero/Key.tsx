import p5Types from 'p5';

export class Key {
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
    pressed: number;
    press_count: number;
    letter: string;

    constructor(p5: p5Types, x: number, color:string, letter:string) {
      this.x = x;
      this.w = 110;
      this.h = 30;
      this.y = p5.height - 40;
      this.color = color;
      this.pressed = 0;
      this.press_count = 50;
      this.letter = letter;
    }

    show(p5: p5Types) {
      p5.push();
      if(this.pressed == 0) {
        this.press_count--;
        p5.stroke('black')
        p5.strokeWeight(3)
        p5.fill('gray')
        p5.rect(this.x, this.y, 120, 40);
        p5.noStroke()
        p5.fill(this.color)
        p5.rect(this.x + 5, this.y + 5, 110, 30);
        }
      else {
        p5.noStroke()
        p5.fill(this.color)
        p5.rect(this.x, this.y, 120, 40);
        this.press_count--;
      }
      if(this.press_count <= 0) {
        this.press_count = 50;
        this.pressed = 0;
      }
      p5.textStyle(p5.BOLD)
      p5.textAlign(p5.CENTER);
      p5.textSize(24);
      p5.fill('black')
      p5.text(this.letter, this.x + 60, this.y + 25)
      p5.pop();
    }
  
}