const crypto = require("crypto");
const fs = require("fs");
const algorithm = "aes-256-cbc";

async function encryptFile(filePath, password) {
  const key = crypto
    .createHash("sha256")
    .update(String(password))
    .digest("base64")
    .substring(0, 32);
  const data = await fs.promises.readFile(filePath);
  const iv = crypto.randomBytes(16);

  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  const encryptedFilePath = filePath + ".encrypted";
  await fs.promises.writeFile(
    encryptedFilePath,
    Buffer.concat([iv, encrypted])
  );
  await fs.unlinkSync(filePath);
  return encryptedFilePath;
}

async function encryptFolder(folderPath, password) {
  const files = await fs.promises.readdir(folderPath);
  const encryptedFiles = [];
  for (const file of files) {
    const filePath = folderPath + "/" + file;
    const stats = await fs.promises.stat(filePath);
    if (stats.isFile()) {
      const encryptedFilePath = await encryptFile(filePath, password);
      encryptedFiles.push(encryptedFilePath);
    }
  }
  return encryptedFiles;
}

module.exports = { encryptFile, encryptFolder };
