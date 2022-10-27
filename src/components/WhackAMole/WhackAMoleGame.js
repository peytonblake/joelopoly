 // Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/147-chrome-dinosaur.html
// https://youtu.be/l0HoJHc-63Q

// Google Chrome Dinosaur Game (Unicorn, run!)
// https://editor.p5js.org/codingtrain/sketches/v3thq2uhk

let mole_image;
let background_image;
let start_image;
let game_clock = 0;
let button;
let begin = 0;
let moles = [];
let release_times = [];
let remove_moles;
let whack_count = 0;
let add_mole;

//https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window

function preload() {
  mole_image = loadImage("mole2.png");
  background_image = loadImage("background_image.png");
  start_image = loadImage("start_background.jpg");
}

function mousePressed() {
  for (let m of moles) {
    if(((mouseX >= m.x) && (mouseX <= m.x + m.r)) && ((mouseY >= m.y) && (mouseY <= m.y + m.r))) {
      m.time = 0;
      whack_count++;
    }
    //check if mouse is on mole
    //if yes increment score andmake mole.time = 0
  }
}

function start_game() {
    begin = 1;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(start_image);
  for(let i = 0; i < 200; i+=15){
    release_times.push(i);
  }
  button = createButton('click me to start');
  button.position(width/2 - 75,height/2 - 50);
  button.mousePressed(start_game);
}

function draw() {
  if(begin == 1) {
    removeElements();
    background(background_image);
    add_mole = 1;
    if(release_times.includes(game_clock)) {
      x = Math.random() * ((width - 100) - 0) + 0;
      y = Math.random() * ((height - 100) - 0) + 0;
      for (let m of moles) {
        if(collideRectRect(x, y, 100, 100, m.x, m.y, m.r, m.r)){
          add_mole = 0;
        }
      }
      if(add_mole == 1){
        moles.push(new Mole(x,y));
      }
    }
    remove_moles = [];
    for (let m of moles) {
      m.popup();
      m.show();
    }
    game_clock++
    if(game_clock >= 1000) {
      console.log("game over");
      noLoop();
    }

  }
    //background(background_image);
}
