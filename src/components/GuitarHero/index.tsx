import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { Tile } from "./Tile";
import { Button, ButtonWrapper } from './Button';
import { Key } from './Key';
import monopoly from '../../game/monopoly';

const GuitarHero: React.FC = () => {

  let game_clock: number;
  let rnum: number;
  let cols: Tile[][];
  let colors: string[];
  let hits: number;
  let total: number;
  let game_state: number;
  let start_game_str: string;
  let easy_str: string;
  let medium_str: string;
  let hard_str: string;
  let difficulty: string;
  let title_str: string;
  let instruction_str: string;
  let reward: number;
  let game_length: number;
  let game_over: number;
  let lose_game_str: string;
  let win_game_str: string;
  let lose_end_str: string;
  let win_end_str: string;
  let tile_x: number[];
  let keys: Key[];
  let letters: string[];
  let hits_to_win: number;
  let release_freq: number;
  let test_sound: any;

  function keyPressed(p5: p5Types) {
    if (p5.key == "a" && game_state == 1) {
      if(keys[0].pressed == 0){
        keys[0].pressed = 1;
      }
      if(cols[0].length > 0) {
        if ((cols[0][cols[0].length - 1].y <= (p5.height) && cols[0][cols[0].length - 1].y >= (p5.height-70))) {
          cols[0].splice(cols[0].length - 1,1);
          hits++;
        }
      }
    }
    else if (p5.key == "s" && game_state == 1) {
      if(keys[1].pressed == 0){
        keys[1].pressed = 1;
      }
      if(cols[1].length > 0) {
        if ((cols[1][cols[1].length - 1].y <= (p5.height) && cols[1][cols[1].length - 1].y >= (p5.height-70))) {
          cols[1].splice(cols[1].length - 1,1);
          hits++;
        }
      }
    }
    else if (p5.key == "d" && game_state == 1) {
      if(keys[2].pressed == 0){
        keys[2].pressed = 1;
      }
      if(cols[2].length > 0) {
        if ((cols[2][cols[2].length - 1].y <= (p5.height) && cols[2][cols[2].length - 1].y >= (p5.height-70))) {
          cols[2].splice(cols[2].length - 1,1);
          hits++;
        }
      }
    }
    else if (p5.key == "f" && game_state == 1) {
      if(keys[3].pressed == 0){
        keys[3].pressed = 1;
      }
      if(cols[3].length > 0) {
        if ((cols[3][cols[3].length - 1].y <= (p5.height) && cols[3][cols[3].length - 1].y >= (p5.height-70))) {
          cols[3].splice(cols[3].length - 1,1);
          hits++;
        }
      }
    }
    else if (p5.key == "g" && game_state == 1) {
      if(keys[4].pressed == 0){
        keys[4].pressed = 1;
      }
      if(cols[4].length > 0) {
        if ((cols[4][cols[4].length - 1].y <= (p5.height) && cols[4][cols[4].length - 1].y >= (p5.height-70))) {
          cols[4].splice(cols[4].length - 1,1);
          hits++;
        }
      }
    }
    else if (p5.key == "h" && game_state == 1) {
      if(keys[5].pressed == 0){
        keys[5].pressed = 1;
      }
      if(cols[5].length > 0) {
        if ((cols[5][cols[5].length - 1].y <= (p5.height) && cols[5][cols[5].length - 1].y >= (p5.height-70))) {
          cols[5].splice(cols[5].length - 1,1);
          hits++;
        }
      }
    }
    else if (p5.key == "j" && game_state == 1) {
      if(keys[6].pressed == 0){
        keys[6].pressed = 1;
      }
      if(cols[6].length > 0) {
        if ((cols[6][cols[6].length - 1].y <= (p5.height) && cols[6][cols[6].length - 1].y >= (p5.height-70))) {
          cols[6].splice(cols[6].length - 1,1);
          hits++;
        }
      }
    }
    else if (p5.key == "k" && game_state == 1) {
      if(keys[7].pressed == 0){
        keys[7].pressed = 1;
      }
      if(cols[7].length > 0) {
        if ((cols[7][cols[7].length - 1].y <= (p5.height) && cols[7][cols[7].length - 1].y >= (p5.height-70))) {
          cols[7].splice(cols[7].length - 1,1);
          hits++;
        }
      }
    }
    else if (p5.key == "l" && game_state == 1) {
      if(keys[8].pressed == 0){
        keys[8].pressed = 1;
      }
      if(cols[8].length > 0) {
        if ((cols[8][cols[8].length - 1].y <= (p5.height) && cols[8][cols[8].length - 1].y >= (p5.height-70))) {
          cols[8].splice(cols[8].length - 1,1);
          hits++;
        }
      }
    }
    else if (p5.key == ";" && game_state == 1) {
      if(keys[9].pressed == 0){
        keys[9].pressed = 1;
      }
      if(cols[9].length > 0) {
        if ((cols[9][cols[9].length - 1].y <= (p5.height) && cols[9][cols[9].length - 1].y >= (p5.height-70))) {
          cols[9].splice(cols[9].length - 1,1);
          hits++;
        }
      }
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
      game_length = 1800;
      hits_to_win = 14;
      release_freq = 800;
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
      game_length = 1800;
      hits_to_win = 22;
      release_freq = 550;
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
      game_length = 1800;
      hits_to_win = 28;
      release_freq = 300;
    }
    else if (p5.key == "p" && (game_state == 2 || game_state == 3)) {
      game_over = 1;
    }
  }

  const setup = (p5: p5Types) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    localStorage['miniGame'] = 200;
    game_clock = 0;
    cols = [[],[],[],[],[],[],[],[],[],[]];
    colors = ['brown', 'pink', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white'];
    hits = 0;
    total = 0;
    game_state = 0;
    game_length = 1800;
    game_over = 0;
    reward = 300;
    tile_x = [30, 160, 290, 420, 550, 680, 810, 940, 1070, 1200];
    letters = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];
    hits_to_win = 10;
    release_freq = 800;
    keys = [];
    for(let i = 0; i < 10; i++) {
      keys.push(new Key(p5, (i * 130) + 25, colors[i], letters[i]))
    }

    //start screen texts
    p5.background('#2c3325');
    start_game_str = 'press s to start game';
    easy_str = "press 'e' for easy mode: reward multiplier = 1.5x";
    medium_str = "press 'm' for medium mode: reward multiplier = 2.0x";
    hard_str = "press 'h' for hard mode: reward multiplier = 2.5x";
    difficulty = "easy";
    title_str = "Welcome To: Definitely Not Guitar Hero!";
    instruction_str = "Instructions -> press the keys associated with the falling pieces as they pass over the slots at the bottom of the screen";

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
    if(game_state == 1) {
      p5.removeElements();
      p5.background('#2c3325');

      for(let k = 0; k < keys.length; k++) {
        keys[k].show(p5);
      }

      for(var i = 0; i < 10; i++) {
          rnum = Math.floor(Math.random() * release_freq);
          if(rnum == 1) {
            if(cols[i].length > 0) {
              if(cols[i][cols[i].length - 1].y > 100) {
                cols[i].push(new Tile(p5, tile_x[i], colors[i]));
                total++;
              }
            }
            else {
              cols[i].push(new Tile(p5, tile_x[i], colors[i]));
              total++;
            }
          }
      }

      for (var col = 0; col < cols.length; col++) {
          for (let t = cols[col].length - 1; t >= 0; t--) {
            if(cols[col][t].y < p5.height - 10) {
              cols[col][t].move(p5);
              cols[col][t].show(p5);
            }
            else {
              cols[col].splice(t,1);
            }
          }
      }
      p5.fill('gray')
      p5.rect(p5.width/2 - 150, 10, 300, 50)
      p5.fill('white')
      p5.text('score: ' + hits.toString(), p5.width/2, 40)

      game_clock++;
      if(game_clock > game_length) {
        if(hits > hits_to_win) {
          game_state = 3;
          localStorage['miniGame'] = reward;
        }
        else {
          game_state = 2;
          localStorage['miniGame'] = 200;
        }
      }
    }
    else if(game_state == 2) {
      if(game_over == 0) {
        p5.background('#2c3325');
        p5.textStyle(p5.NORMAL);
        p5.fill('#fef9f3');
        p5.textSize(32);
        p5.text(lose_game_str, p5.width/2, 300);
        p5.text(lose_end_str, 100, 400, p5.width - 200);
      }
      else {
        localStorage['miniGame'] = 200;
        p5.removeElements();
        p5.remove();
        p5.noLoop();
        reward = 200;
      }
    }
    else if(game_state == 3) {
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
  }

  return (
    <>
    <ButtonWrapper>
        <Button to={"/game"} onClick={() => {monopoly.manageMiniGameReward()}}>Click Anywhere To Return To Game</Button>
    </ButtonWrapper>
    <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />
    </>
  );
};

export default GuitarHero;