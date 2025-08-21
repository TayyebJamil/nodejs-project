// 10. Private fields & methods
class SecretBox {
  #secret;
  constructor(secret) {
    this.#secret = secret;
  }
  revealSecret() {
    return this.#secret;
  }
}
const box = new SecretBox("hidden message");
console.log(box.revealSecret()); // Output: hidden message
