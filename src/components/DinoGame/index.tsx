import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { Player } from './Player';
import { Obstacle } from './Obstacle';
import { Bird } from './Bird';
import { Link } from "react-router-dom";
import { Button, ButtonWrapper } from './Button';
import { Cloud } from './Clouds';

const DinoGame: React.FC = () => {
  let player: Player;
  let obstacle_release_times: number[];
  let bird_release_times: number[];
  let game_clock: number;
  let obstacles: Obstacle[];
  let birds: Bird[];
  let game_state: number;
  let start_game_str: string;
  let easy_str: string;
  let medium_str: string;
  let hard_str: string;
  let difficulty: string;
  let title_str: string;
  let instruction_str: string;
  let reward: number;
  let player_image: any;
  let bird_image: any;
  let object_image: any;
  let game_length: number;
  let game_over: number;
  let lose_game_str: string;
  let win_game_str: string;
  let lose_end_str: string;
  let win_end_str: string;
  let rnum: number;
  let max_num: number;
  let min_num: number;
  let cloud_image: any;
  let cloud_release_times: number[];
  let clouds: Cloud[];

  function keyPressed(p5: p5Types) {
    if (p5.key == " " && game_state == 1) {
      player.jump(p5);
    }
    else if (p5.key == "c" && game_state == 1) {
      player.roll(p5);
    }
    else if (p5.key == "s" && game_state == 0) {
      game_state = 1;
    }
    else if (p5.key == "e" && game_state == 0) {
      p5.fill('#ba8c4e');
      p5.stroke('#fef9f3');
      p5.strokeWeight(8)
      p5.rect(150, 175, 150, 50);
      p5.stroke('#ba8c4e');
      p5.rect(150, 275, 150, 50);
      p5.rect(150, 375, 150, 50);
      p5.noStroke();
      difficulty = "easy";
      reward = 300;
      obstacle_release_times = [10];
      bird_release_times = [85];
      max_num = 100;
      min_num = 1;
      for(let i = 85; i < 1800; i++) {
        rnum = Math.floor(Math.random() * (max_num - min_num) + min_num);
        if(rnum == 1) {
          if(i - 50 > obstacle_release_times[obstacle_release_times.length - 1] && i - 50 > bird_release_times[bird_release_times.length - 1]) {
            obstacle_release_times.push(i);
          }
        }
        else if(rnum == 2) {
          if(i - 50 > obstacle_release_times[obstacle_release_times.length - 1] && i - 50 > bird_release_times[bird_release_times.length - 1]) {
            bird_release_times.push(i);
          }
        }
      }
      console.log(obstacle_release_times);
      console.log(bird_release_times);
      game_length = 1800;
    }
    else if (p5.key == "m" && game_state == 0) {
      p5.noStroke();
      p5.fill('#ba8c4e');
      p5.stroke('#ba8c4e');
      p5.strokeWeight(8)
      p5.rect(150, 175, 150, 50);
      p5.stroke('#fef9f3');
      p5.strokeWeight(8);
      p5.rect(150, 275, 150, 50);
      p5.stroke('#ba8c4e');
      p5.rect(150, 375, 150, 50);
      p5.noStroke();
      difficulty = "medium";
      reward = 400;
      obstacle_release_times = [10];
      bird_release_times = [85];
      max_num = 20;
      min_num = 1;
      for(let i = 30; i < 1800; i++) {
        rnum = Math.floor(Math.random() * (max_num - min_num) + min_num);
        if(rnum == 1) {
          if(i - 50 > obstacle_release_times[obstacle_release_times.length - 1] && i - 50 > bird_release_times[bird_release_times.length - 1]) {
            obstacle_release_times.push(i);
          }
        }
        else if(rnum == 2) {
          if(i - 50 > obstacle_release_times[obstacle_release_times.length - 1] && i - 50 > bird_release_times[bird_release_times.length - 1]) {
            bird_release_times.push(i);
          }
        }
      }
      game_length = 1800;
    }
    else if (p5.key == "h" && game_state == 0) {
      p5.fill('#ba8c4e');
      p5.stroke('#ba8c4e');
      p5.rect(150, 175, 150, 50);
      p5.rect(150, 275, 150, 50);
      p5.stroke('#fef9f3');
      p5.stroke(255);
      p5.strokeWeight(8)
      p5.rect(150, 375, 150, 50);
      p5.noStroke();
      difficulty = "hard";
      reward = 500;
      obstacle_release_times = [10];
      bird_release_times = [85];
      max_num = 8;
      min_num = 1;
      for(let i = 85; i < 1800; i++) {
        rnum = Math.floor(Math.random() * (max_num - min_num) + min_num);
        if(rnum == 1) {
          if(i - 50 > obstacle_release_times[obstacle_release_times.length - 1] && i - 50 > bird_release_times[bird_release_times.length - 1]) {
            obstacle_release_times.push(i);
          }
        }
        else if(rnum == 2) {
          if(i - 50 > obstacle_release_times[obstacle_release_times.length - 1] && i - 50 > bird_release_times[bird_release_times.length - 1]) {
            bird_release_times.push(i);
          }
        }
      };
      game_length = 1800;
    }
    else if (p5.key == "p" && (game_state == 2 || game_state == 3)) {
      game_over = 1;
    }

  }

  const setup = (p5: p5Types) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    localStorage['miniGame'] = 200;
    player = new Player(p5);
    game_clock = 0;
    obstacles = [];
    birds = []; 
    cloud_release_times = [];
    clouds = []
    game_state = 0;
    game_length = 1800;
    game_over = 0;
    reward = 300;
    player_image = p5.loadImage("/DinoGameImages/running_sprite.png");
    bird_image = p5.loadImage("/DinoGameImages/bird.png");
    object_image = p5.loadImage("/DinoGameImages/obstacle.webp");
    cloud_image = p5.loadImage("/DinoGameImages/cloud.png")

    obstacle_release_times = [10];
    bird_release_times = [85];
    max_num = 100;
    min_num = 1;
    for(let i = 85; i < 1800; i++) {
      rnum = Math.floor(Math.random() * (max_num - min_num) + min_num);
      if(rnum == 1) {
       if(i - 50 > obstacle_release_times[obstacle_release_times.length - 1] && i - 50 > bird_release_times[bird_release_times.length - 1]) {
           obstacle_release_times.push(i);
       }
        }
        else if(rnum == 2) {
          if(i - 50 > obstacle_release_times[obstacle_release_times.length - 1] && i - 50 > bird_release_times[bird_release_times.length - 1]) {
            bird_release_times.push(i);
          }
        }
      }

    for(let i = 0; i < 1800; i++) {
      if(Math.random() > .98) {
        cloud_release_times.push(i);
        i+=15;
      }
    }

    //start screen texts
    p5.background('#2c3325');
    start_game_str = 'press s to start game';
    easy_str = "press 'e' for easy mode: reward multiplier = 1.5x";
    medium_str = "press 'm' for medium mode: reward multiplier = 2.0x";
    hard_str = "press 'h' for hard mode: reward multiplier = 2.5x";
    difficulty = "easy";
    title_str = "Welcome To: Definitely Not The Chrome Dino Game!";
    instruction_str = "Instructions -> press space to jump and 'c' to crouch\navoid the obstacles and survive 30 seconds to win";

    //make start screen
    //title
    p5.textFont('Courier New');
    p5.textStyle(p5.BOLD);
    p5.textSize(40);
    p5.fill('#fef9f3');
    p5.textAlign(p5.CENTER);
    p5.text(title_str, p5.width/2, 100);
    //difficulty text
    p5.textStyle(p5.NORMAL);
    p5.textAlign(p5.LEFT);
    p5.textSize(30);
    p5.text(easy_str, 350, 200);
    p5.text(medium_str, 350, 300);
    p5.text(hard_str, 350, 400);
    //difficults boxes
    p5.fill('#ba8c4e');
    p5.stroke('#fef9f3');
    p5.strokeWeight(8)
    p5.rect(150, 175, 150, 50);
    p5.stroke('#ba8c4e');
    p5.rect(150, 275, 150, 50);
    p5.rect(150, 375, 150, 50);
    p5.noStroke();
    //instructions
    p5.textStyle(p5.ITALIC);
    p5.textAlign(p5.CENTER);
    p5.textSize(24);
    p5.text(instruction_str, p5.width/2, 500)
    //start game string
    p5.textStyle(p5.NORMAL);
    p5.fill('#fef9f3');
    p5.textSize(32);
    p5.text(start_game_str, p5.width/2, 600)

    //end game
    lose_game_str = "Wow you're bad. No extra money for you. You get $200 out of pity.";
    win_game_str = "Winner winner chicken dinner. Your prize is: $";
    lose_end_str = "press 'p' to hang your head in shame";
    win_end_str = "press 'p' to haul your winnings to the bank";
  };

  const draw = (p5: p5Types) => {
    if (game_state == 1) {
      p5.removeElements();
      p5.background('#2c3325');
      p5.fill('#5C4033')
      p5.rect(0,p5.height-50,p5.width,50)
      p5.fill('#ADD8E6')
      p5.rect(0,0,p5.width,p5.height-50)
      //p5.image(player_image, 0, 0);
      if (cloud_release_times.includes(game_clock)) {
        clouds.push(new Cloud(p5))
      }
      if (obstacle_release_times.includes(game_clock)) {
        obstacles.push(new Obstacle(p5));
      }
      if (bird_release_times.includes(game_clock)) {
          birds.push(new Bird(p5));
      }

      for (let c of clouds) {
        c.move()
        c.show(p5, cloud_image)
      }
      for (let o of obstacles) {
          o.move();
          o.show(p5, object_image);
          if (player.hitsObstacle(o)) {
          console.log("game over");
          p5.removeElements();
          game_state = 2;
          }
      }
      for (let b of birds) {
          b.move();
          b.show(p5, bird_image);
          if (player.hitsBird(b)) {
              console.log("game over");
              p5.removeElements();
              game_state = 2;
          }
      }

      player.show(p5, player_image);
      player.move(p5);
      if (game_clock >= game_length) {
        localStorage['miniGame'] = reward;
        p5.removeElements();
        game_state = 3;
      }

      game_clock++;

    } else if (game_state == 2) {
      if(game_over == 0) {
        p5.background('#2c3325');
        p5.textStyle(p5.NORMAL);
        p5.fill('#fef9f3');
        p5.textSize(32);
        p5.text(lose_game_str, p5.width/2, 300);
        p5.text(lose_end_str, 100, 400, p5.width - 200);
      }
      else {
        p5.removeElements();
        p5.remove();
        p5.noLoop();
        reward = 200;
      }
    } else if (game_state == 3) {
      if(game_over == 0) {
        p5.background('#2c3325');
        p5.textStyle(p5.NORMAL);
        p5.fill('#fef9f3');
        p5.textSize(32);
        p5.text(win_game_str + reward.toString(), p5.width/2, 300);
        p5.text(win_end_str, 100, 400, p5.width-200);
      }
      else {
        p5.removeElements();
        p5.remove();
        p5.noLoop();
      }
    }
  };

  return (
  <>
  <ButtonWrapper>
      <Button to={"../"}>Click Anywhere To Return To Game</Button>
  </ButtonWrapper>
  <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />
  </>);
};

export default DinoGame;