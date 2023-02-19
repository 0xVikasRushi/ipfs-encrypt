import crypto from "crypto";
import fs from "fs";
import path from "path";
const algorithm = "aes-256-cbc";

export async function decryptFile(encryptedFilePath, password) {
  const key = crypto
    .createHash("sha256")
    .update(String(password))
    .digest("base64")
    .substring(0, 32);
  const data = await fs.promises.readFile(encryptedFilePath);
  const iv = data.slice(0, 16);
  const encryptedData = data.slice(16);

  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  try {
    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    await fs.unlinkSync(encryptedFilePath);
    const decryptedFilePath = encryptedFilePath.replace(".encrypted", "");
    await fs.promises.writeFile(decryptedFilePath, decrypted);
    return decryptedFilePath;
  } catch (error) {
    if (error.code === "ERR_OSSL_BAD_DECRYPT") {
      console.log("wrong password");
    }
  }
}

// Decrypting all files in a folder
export async function decryptFolder(folderPath, password) {
  const files = await fs.promises.readdir(folderPath);
  const decryptedFiles = [];

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stats = await fs.promises.stat(filePath);

    if (stats.isDirectory()) {
      const nestedDecryptedFiles = await decryptFolder(filePath, password);
      decryptedFiles.push(...nestedDecryptedFiles);
    } else if (stats.isFile() && file.endsWith(".encrypted")) {
      const decryptedFilePath = await decryptFile(filePath, password);
      decryptedFiles.push(decryptedFilePath);
    }
  }

  return decryptedFiles;
}
