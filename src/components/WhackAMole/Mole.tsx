import p5Types from 'p5';

export class Mole {
    x: number;
    y: number;
    w: number;
    h: number;
    time: number;
    hole: number;
    curr_time: number;
    perc: number;

    constructor(x: number, y: number, popup_time: number, hole: number) {
      this.x = x;
      this.y = y;
      this.w = 60;
      this.h = 60;
      this.time = popup_time;
      this.curr_time = 0;
      this.hole = hole;
      this.perc = 0;
    }

    popup() {
      this.curr_time++;
      if(this.curr_time > this.time) {
        this.x = -100;
        this.y = -100;
      }
    }

    show(p5: p5Types, mole_image: any) {
      if(this.curr_time <= this.time/2) {
        this.perc = (this.curr_time + .001) / (this.time/2);
        //p5.image(mole_image, this.x, this.y - (this.h * this.perc) + this.h, this.w, this.h * this.perc, 0, this.perc * 220)
        p5.image(mole_image, this.x, this.y + this.h - (this.perc * this.h), this.w, this.h * this.perc, 0, 0)
      }
      else {
        this.perc = 1 - (this.curr_time - (this.time/2)) / (this.time - (this.time/2)) + .001
        p5.image(mole_image, this.x, this.y + this.h - (this.perc * this.h), this.w, this.h * this.perc, 0, 0)
      }
    }
  
}