import {
  getDatabase,
  ref,
  onValue,
  DatabaseReference,
  DataSnapshot,
  off,
  set,
  remove,
  child,
} from "firebase/database";
import { getAuth } from "firebase/auth";

class Player {
  uid: string;
  ref: DatabaseReference;
  status: {
    position: { x: number; y: number };
    animation: string;
    key: { [key in string]: boolean };
  } = {
    position: { x: 0, y: 0 },
    animation: "moveSouth",
    key: {},
  };
  constructor(uid: string) {
    this.uid = uid;

    this.ref = ref(getDatabase(), `users/${this.uid}`);
    onValue(this.ref, this.onStatusChange);

    const currentUser = getAuth().currentUser;

    if (currentUser?.uid === this.uid) {
      document.addEventListener("keydown", this.onKeyDown);
      document.addEventListener("keyup", this.onKeyUp);
    }
  }

  onStatusChange = (snapshot: DataSnapshot) => {
    this.status = snapshot.val();
  };

  onKeyDown = (e: KeyboardEvent) => {
    set(child(this.ref, `key/${e.keyCode}`), true);
  };

  onKeyUp = (e: KeyboardEvent) => {
    remove(child(this.ref, `key/${e.keyCode}`));
  };

  destroy() {
    off(this.ref, "value", this.onStatusChange);
  }
}

export default Player;
