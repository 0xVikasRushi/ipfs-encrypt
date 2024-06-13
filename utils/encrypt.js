import crypto from "crypto";
const algorithm = "aes-256-cbc";
import fs from "fs";
import path from "path";

/**
 *
 * @param {String} filePath
 * @param {String} password
 * @returns {Promise<String>}
 */
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

/**
 * Recursively encrypts all files in a folder and its subfolders using AES-256-CBC encryption with the given password. The encrypted files are saved with a .encrypted extension.
 * @param {String} folderPath The path to the folder that you want to encrypt.
 * @param {String} password The password to use for encryption.
 * @returns {Promise<String[]>}
 * @example
 * import { encryptFolder } from "ipfs-encrypted";
 * const folderPath = "/path/to/folder";
 * const password = "my_password";
 *
 * encryptFolder(folderPath, password)
 *   .then(() => console.log(`Folder encrypted successfully`))
 *   .catch((error) => console.error(`Error: ${error.message}`));
 */
export async function encryptFolder(folderPath, password) {
  const files = await fs.promises.readdir(folderPath);
  /** @type {String[]} */
  const encryptedFiles = [];

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
