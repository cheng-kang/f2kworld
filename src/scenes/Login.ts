import * as firebase from "../common/firebase";
import { signInAnonymously } from "firebase/auth";

class Login {
  scene: HTMLDivElement;
  loginButton: HTMLDivElement;
  constructor(width: number, height: number) {
    this.scene = document.createElement("div");
    this.scene.setAttribute(
      "style",
      `
    position: absolute;
    top: 0;
    left: 0;
    width: ${width}px;
    height: ${height}px;
    `,
    );
    this.loginButton = document.createElement("div");
    this.loginButton.innerText = "Join";
    this.loginButton.setAttribute(
      "style",
      `
      position: absolute;
      width: 120px;
      height: 32px;
      top: 309px;
      left: 427.5px;
      background-color: white;
      color: black;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    `,
    );
    this.loginButton.addEventListener("click", () => {
      signInAnonymously(firebase.auth)
        .then((user) => {
          console.log("Signed in.", user);
        })
        .catch((error) => {
          alert(error.message);
        });
    });

    this.scene.appendChild(this.loginButton);
  }

  render() {
    document.body.appendChild(this.scene);
  }

  destroy() {
    document.body.removeChild(this.scene);
  }
}

export default Login;
