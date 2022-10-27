import p5Types from 'p5';
import { Obstacle } from './Obstacle';
import { Bird } from './Bird';

export class Player {
  h: number;
  w: number;
  x: number;
  y: number;
  vy: number;
  gravity: number;
  is_rolling: number;
  roll_count: number;
  offset: number;
  counter: number;

    constructor(p5: p5Types) {
      this.h = 200;
      this.w = 125;
      this.x = 50;
      this.y = p5.height - this.h;
      this.vy = 0;
      this.gravity = 2.75;
      this.is_rolling = 0;
      this.roll_count = 25;
      this.offset = 1;
      this.counter = 0;
    }
  
    jump(p5: p5Types) {
      if (this.y == p5.height - this.h) {
        this.vy = -35;
      }
    }
  
    roll(p5: p5Types) {
        if (this.is_rolling == 0 && this.y == p5.height - this.h) {
            this.is_rolling = 1;
        }
    }

    hitsObstacle(obstacle: Obstacle) {
      return !(
        ((this.y + this.h) < (obstacle.y)) ||
        (this.y > (obstacle.y + obstacle.h)) ||
        ((this.x + this.w) < obstacle.x) ||
        (this.x > (obstacle.x + obstacle.w))
      );
    }

    hitsBird(bird: Bird) {
      return !(
        ((this.y + this.h) < (bird.y)) ||
        (this.y > (bird.y + bird.h)) ||
        ((this.x + this.w) < bird.x) ||
        (this.x > (bird.x + bird.w))
      );
    }
  
    move(p5: p5Types) {
      this.y += this.vy;
      this.vy += this.gravity;
      this.y = p5.constrain(this.y, 0, p5.height - this.h);
      if(this.is_rolling == 1) {
        this.roll_count--;
        this.h = 100;
        this.y = p5.height - this.h;
      }
      if (this.roll_count < 0) {
        this.h = 200;
        this.y = p5.height - this.h;
        this.roll_count = 20;
        this.is_rolling = 0;
      }
    }
  
    show(p5: p5Types, player_image: any) {
      p5.image(player_image, this.x, this.y + 1, this.w, this.h + 10, 108 * this.offset, 10, 108, 120)
      this.counter++;
      if(this.counter % 5 == 0) {
        this.offset++;
        if(this.offset >= 8){
          this.offset = 1;
        }
      }
    }
  }