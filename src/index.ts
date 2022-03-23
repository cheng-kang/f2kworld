import "./styles.css";
import * as firebase from "./common/firebase";
import { ref, set, onDisconnect } from "firebase/database";
import Game from "./game";

const game = new Game({
  // backgroundColor: 0xffffff,
  width: 975,
  height: 650,
});

game.init();

firebase.auth.onAuthStateChanged((user) => {
  if (user) {
    const presenceRef = ref(firebase.database, `precense/${user.uid}`);
    set(presenceRef, true);
    onDisconnect(presenceRef).remove();

    game.authed();
  } else {
    game.unauthed();
  }
});
