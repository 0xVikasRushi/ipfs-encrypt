import crypto from "crypto";
import fs from "fs";
import path from "path";
const algorithm = "aes-256-cbc";

/**
 *
 * @param {String} encryptedFilePath
 * @param {String} password
 * @returns {Promise<String | undefined>}
 */
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

/**
 * Recursively decrypts all files in a folder and its subfolders that were previously encrypted with the encryptFolder function using AES-256-CBC encryption with the given password. The decrypted files are saved with their original file extensions.
 * @param {String} folderPath The path to the folder that you want to decrypt.
 * @param {String} password The password to use for decryption.
 * @returns {Promise<String[]>}
 * @example
 * import { decryptFolder } from "ipfs-encrypted";
 * const folderPath = "/path/to/folder";
 * const password = "my_password";
 *
 * decryptFolder(folderPath, password)
 *   .then(() => console.log(`Folder decrypted successfully`))
 *   .catch((error) => console.error(`Error: ${error.message}`));
 */
export async function decryptFolder(folderPath, password) {
  const files = await fs.promises.readdir(folderPath);
  /** @type {String[]} */
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
