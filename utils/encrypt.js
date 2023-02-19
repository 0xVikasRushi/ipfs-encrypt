import crypto from "crypto";
const algorithm = "aes-256-cbc";
import fs from "fs";
import path from "path";

export async function encryptFile(filePath, password) {
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

export async function encryptFolder(folderPath, password) {
  const files = await fs.promises.readdir(folderPath);
  const encryptedFiles =  [];
  
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stats = await fs.promises.stat(filePath);

    if (stats.isDirectory()) {
      const nestedEncryptedFiles = await encryptFolder(filePath, password);
      encryptedFiles.push(...nestedEncryptedFiles);
    } else if (stats.isFile()) {
      console.log(filePath);
      const encryptedFilePath = await encryptFile(filePath, password);
      encryptedFiles.push(encryptedFilePath);
    }
  }
  console.log(encryptedFiles);
  return encryptedFiles;
}
