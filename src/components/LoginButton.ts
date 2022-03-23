export default class LoginButton {
  ref: HTMLDivElement;

  constructor() {
    this.ref = document.createElement("div");
    this.ref.innerText = "Join";
    this.ref.setAttribute(
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
  }

  render() {
    document.body.appendChild(this.ref);
  }
}
