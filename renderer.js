const crypto = require("crypto");
const algorithm = "aes-192-cbc";
const iv = crypto.randomBytes(16);

document.getElementById("encryptData").addEventListener("click", encryptData);
document.getElementById("decryptData").addEventListener("click", decryptData);

function encryptData() {
  let inputBox = document.getElementById("input-message");
  let outputBox = document.getElementById("output");
  let key = document.getElementById("key").value;
  let keyValue = crypto.scryptSync(key, "salt", 24);

  const cipher = crypto.createCipheriv(algorithm, keyValue, iv);
  let encrypted =
    cipher.update(inputBox.value, "utf8", "hex") + cipher.final("hex");

  outputBox.value = encrypted;
  //console.log("hello:", outputBox.value, key);
}

function decryptData() {
  let inputBox = document.getElementById("input-message");
  let outputBox = document.getElementById("output");
  let key = document.getElementById("key").value;
  let keyValue = crypto.scryptSync(key, "salt", 24);

  const decipher = crypto.createDecipheriv(algorithm, keyValue, iv);
  let decrypted =
    decipher.update(inputBox.value, "hex", "utf-8") + decipher.final("utf-8");

  outputBox.value = decrypted;
}
