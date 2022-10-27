import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { Mole } from './Mole';
import monopoly from '../../game/monopoly';
import { Button, ButtonWrapper } from './Button';

const WhackAMole: React.FC = () => {

  let game_clock: number;
  let moles: Mole[];
  let release_times: number[];
  let whack_count: number;
  let hole: number;
  let hole_x: number[];
  let hole_y: number[];
  let moles_whacked: number;
  let game_state: number;
  let game_over: number;
  let reward: number;
  let lose_game_str: string;
  let win_game_str: string;
  let lose_end_str: string;
  let win_end_str: string;
  let game_length: number;
  let difficulty: string;
  let start_game_str: string;
  let easy_str: string;
  let medium_str: string;
  let hard_str: string;
  let title_str: string;
  let instruction_str: string;
  let holes: number[];
  let popup_time: number;
  let hammer_image: any;
  let hammer_status: number;
  let mole_image: any;

  function keyPressed(p5: p5Types) {
    if (p5.key == "s" && game_state == 0) {
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
      whack_count = 15;
      popup_time = 70;
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
      whack_count = 15;
      popup_time = 60;
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
      whack_count = 15;
      popup_time = 50;
    }
    else if (p5.key == "p" && (game_state == 2 || game_state == 3)) {
      game_over = 1;
    }
  }

  function make_background(p5: p5Types) {
    p5.background('#2c3325');
    for(let i = 0; i < hole_x.length; i++) {
      p5.fill('#C4A484');
      p5.rect(hole_x[i] - 30, hole_y[i] - 10, 120, 80);
      p5.rect(hole_x[i] - 10, hole_y[i] - 30, 80, 120);
      p5.fill('#5C4033');
      p5.rect(hole_x[i] - 10, hole_y[i] - 10, 80, 80);
      p5.fill('#000000');
      p5.rect(hole_x[i], hole_y[i], 60, 60);
    }
    p5.fill('#ba8c4e');
    p5.rect(p5.width - 220, 0, 200, 200);
    p5.textStyle(p5.BOLD);
    p5.fill('#fef9f3');
    p5.textSize(48);
    p5.text('score: ', p5.width - 100, 30);
    p5.textSize(130);
    p5.text(moles_whacked.toString(), p5.width - 110, 150);

    if(hammer_status == 10){
      p5.image(hammer_image, p5.mouseX-137, p5.mouseY-170, 200, 200);
    }
    else if(hammer_status < 10 && hammer_status > 0){
      hammer_status -= 1;
      p5.translate(p5.mouseX, p5.mouseY);
      p5.rotate(p5.PI/180*-75);
      p5.image(hammer_image, -137, -170, 200, 200);
      p5.rotate(-p5.PI / 180 * -75);
      p5.translate(-(p5.mouseX), -(p5.mouseY));
    }
    else {
      p5.image(hammer_image, p5.mouseX-137, p5.mouseY-170, 200, 200);
      hammer_status = 10
    }
  }

  function mousePressed(p5: p5Types) {
    if(hammer_status == 10) {
    hammer_status -= 1;
    for (var i = 0; i < moles.length; i++) {
      if(!(
        ((p5.mouseY + 65) < (moles[i].y)) ||
        (p5.mouseY + 65 > (moles[i].y + moles[i].h)) ||
        ((p5.mouseX - 110) < moles[i].x) ||
        (p5.mouseX - 110 > (moles[i].x + moles[i].w))
      )) {
        moles.splice(i, 1);
        moles_whacked++;
        break;
      }
    }
    }
  }

  const setup = (p5: p5Types) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    localStorage['miniGame'] = 200;
    game_clock = 0;
    release_times = [];
    for(let i = 0; i < 1800; i++) {
      if(Math.random() < .04) {
        release_times.push(i);
      }
    }
    hole_x = [150, 200, 420, 450, 600, 750, 850, 1120, 1050];
    hole_y = [100, 420, 310, 120, 500, 150, 330, 475, 250];
    moles = [];
    moles_whacked = 0;
    game_state = 0;
    game_over = 0;
    reward = 300;
    difficulty = "easy";
    game_length = 1800;
    holes = [0,0,0,0,0,0,0,0,0];
    whack_count = 15;
    popup_time = 70;
    hammer_image = p5.loadImage('/WhackAMoleImages/hammer.png')
    hammer_status = 10;
    mole_image = p5.loadImage('WhackAMoleImages/monty.png')

    //start screen texts
    p5.background('#2c3325');
    start_game_str = 'press s to start game';
    easy_str = "press 'e' for easy mode: reward multiplier = 1.5x";
    medium_str = "press 'm' for medium mode: reward multiplier = 2.0x";
    hard_str = "press 'h' for hard mode: reward multiplier = 2.5x";
    difficulty = "easy";
    title_str = "Welcome To: Whack A Mole!";
    instruction_str = "Instructions -> click to whack moles, aim where the hammer will swing";

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
      make_background(p5);
      if(release_times.includes(game_clock)) {
        hole = Math.floor(Math.random() * 9);
        if(holes[hole] == 0) {
          moles.push(new Mole(hole_x[hole], hole_y[hole], popup_time, hole));
        }
      }
      holes = [0,0,0,0,0,0,0,0,0];
      for (let m = 0; m < moles.length; m++) {
        moles[m].show(p5, mole_image);
        moles[m].popup();
        holes[moles[m].hole] = 1;
        if(moles[m].curr_time > popup_time) {
          moles.splice(m, 1);
        }
      }
      
      if(game_clock > game_length){
        game_state = 2;
      }

      game_clock++;
    }
    else if (game_state == 2 && moles_whacked < whack_count) {
      if(game_over == 0) {
        localStorage['miniGame'] = 200;
        reward = 200;
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
      }
    }
    else if (game_state == 2 && moles_whacked >= whack_count) {
      if(game_over == 0) {
        localStorage['miniGame'] = reward;
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
        <Button to={"/game"} onClick={() => monopoly.manageMiniGameReward()}>Click Anywhere To Return To Game</Button>
    </ButtonWrapper>
    <Sketch setup={setup} draw={draw} mousePressed={mousePressed} keyPressed={keyPressed} />
    </>
  );
};

export default WhackAMole;