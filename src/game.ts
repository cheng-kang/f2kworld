import * as PIXI from "pixi.js";
import * as firebase from "./common/firebase";
import { get, onChildAdded, onChildRemoved } from "firebase/database";
import Player from "./player";
import LoginScene from "./scenes/Login";

class Game {
  app: PIXI.Application;
  backgroundImage: PIXI.Sprite | null = null;
  backgroundMusic: HTMLAudioElement | null = null;
  keys: { [key in number]: boolean } = {};
  scenes: { [key in string]: any } = {};
  players: { [key in string]: Player } = {};

  constructor(options: PIXI.IApplicationOptions) {
    this.app = new PIXI.Application(options);
  }

  init() {
    document.body.insertBefore(
      this.app.view,
      document.getElementById("display")!,
    );
    this.initBackground();
  }

  start() {
    this.initBackgroundMusic();
    this.initKeyPressListener();
  }

  authed() {
    if (!firebase.auth.currentUser)
      throw new Error("wtf? should have authed but not...");

    if (this.scenes["login"]) {
      this.scenes["login"].destroy();
    }

    // get(firebase.presenceRef).then((snapshot) => {
    //   const val = snapshot.val();
    //   console.log(val);
    //   if (val) {
    //     Object.keys(val).forEach((uid) => {
    //       this.players.push(new Player(uid));
    //     });
    //   }
    // });

    onChildAdded(firebase.presenceRef, (snapshot) => {
      if (snapshot.key) {
        this.players[snapshot.key] = new Player(snapshot.key);
      }
    });
    onChildRemoved(firebase.presenceRef, (snapshot) => {
      if (snapshot.key && this.players[snapshot.key]) {
        this.players[snapshot.key].destroy();
        delete this.players[snapshot.key];
      }
    });
  }

  unauthed() {
    this.scenes["login"] = new LoginScene(975, 650);
    this.scenes["login"].render();
  }

  private initBackground() {
    this.backgroundImage = PIXI.Sprite.from(
      "/public/assets/images/random1.png",
    );
    this.backgroundImage.alpha = 0.2;
    this.app.stage.addChild(this.backgroundImage);
    this.backgroundImage.width = this.app.screen.width;
    this.backgroundImage.height = this.app.screen.height;
  }

  private initBackgroundMusic() {
    const bg = new Audio(
      "/public/assets/music/n_8681826e-c33c-4c94-a761-2da3f9329b40.mp3",
    );
    bg.loop = true;
    bg.play();
  }

  private initKeyPressListener() {
    document.addEventListener("keydown", (e) => {
      this.keys[e.keyCode] = true;
    });

    document.addEventListener("keyup", (e) => {
      this.keys[e.keyCode] = false;
    });
  }

  private initTicker() {
    app.ticker.add((delta) => {
      if (keys[40] && keys[37]) {
        if (currentFrames !== "down-facing-left") {
          female.textures = femaleRunningDownFacingLeftFrames;
          female.scale.x = 1;
          currentFrames = "down-facing-left";
        }
      } else if (keys[40] && keys[39]) {
        if (currentFrames !== "down-facing-right") {
          female.textures = femaleRunningDownFacingLeftFrames;
          female.scale.x = -1;
          currentFrames = "down-facing-right";
        }
      } else if (keys[37]) {
        if (currentFrames !== "left") {
          female.textures = femaleRunningLeftFrames;
          female.scale.x = 1;
          currentFrames = "left";
        }
      } else if (keys[39]) {
        if (currentFrames !== "right") {
          female.textures = femaleRunningLeftFrames;
          female.scale.x = -1;
          currentFrames = "right";
        }
      } else if (keys[38]) {
        if (currentFrames !== "up") {
          female.textures = femaleMoveNorthFrames;
          female.scale.x = 1;
          currentFrames = "up";
        }
      } else if (keys[40]) {
        if (currentFrames !== "down") {
          female.textures = femaleRunningDownFrames;
          currentFrames = "down";
        }
      }

      if (keys[37] || keys[38] || keys[39] || keys[40]) {
        female.play();
      } else {
        female.stop();
        female.textures = femaleRunningDownFrames;
        currentFrames = "down";
      }
      const speed = 1;
      if (keys[40]) {
        if (female.y > app.screen.height) {
          female.y = 0;
          female.x = app.screen.width / 2;
        } else {
          female.y += speed * delta;
        }
      }
      if (keys[38]) {
        if (female.y < 0) {
          female.y = app.screen.height;
          female.x = app.screen.width / 2;
        } else {
          female.y -= speed * delta;
        }
      }
      if (keys[37]) {
        if (female.x > app.screen.width) {
          female.x = 0;
        } else if (female.x < 0) {
          female.x = app.screen.width;
        } else {
          female.x -= speed * delta;
        }
      }
      if (keys[39]) {
        if (female.x > app.screen.width) {
          female.x = 0;
        } else if (female.x < 0) {
          female.x = app.screen.width;
        } else {
          female.x += speed * delta;
        }
      }
    });
  }
}

export default Game;
