import {
  encryptFolder,
  decryptFolder,
  uploadToIpfs,
  downloadFile,
} from "./utils/index.js";

/**
 * Uploads a folder to IPFS and encrypts its contents using a password.
 * @param {String} Web3Storagetoken A Web3 Storage token used for authentication.
 * @param {String} folderPath The path to the folder that you want to upload and encrypt.
 * @param {String} password The password to use for encryption.
 * @returns {Promise<String>} CID of the uploaded folder.
 * @example
 * import { uploadEncryptionIpfs } from "ipfs-encrypted";
 * const token = "my_web3_storage_token";
 * const folderPath = "/path/to/folder";
 * const password = "my_password";
 *
 * uploadEncryptionIpfs(token, folderPath, password)
 *   .then((cid) => console.log(`Folder uploaded and encrypted with CID ${cid}`))
 *   .catch((error) => console.error(`Error: ${error.message}`));
 */
export async function uploadEncryptionIpfs(
  Web3Storagetoken,
  folderPath,
  password
) {
  await encryptFolder(folderPath, password);
  const cid = await uploadToIpfs(Web3Storagetoken, folderPath);
  return cid;
}

/**
 * Retrieves an encrypted folder from IPFS and decrypts its contents using a password.
 * @param {String} Web3Storagetoken A Web3 Storage token used for authentication.
 * @param {String} cid The CID of the encrypted folder on IPFS.
 * @param {String} password The password to use for decryption.
 * @param {String} downloadLocation Path of folder that content need to downloaded.
 * @returns {Promise<String[]>}
 * @example
 * import { decryptFolderIpfs } from "ipfs-encrypted";
 * const token = "my_web3_storage_token";
 * const cid = "Qm1234abcd";
 * const password = "my_password";
 * const downloadLocation = "/path/to/folder";
 *
 * decryptFolderIpfs(token, cid, password, downloadLocation)
 *   .then((folderPath) =>
 *     console.log(`Folder decrypted and saved to ${folderPath}`)
 *   )
 *   .catch((error) => console.error(`Error: ${error.message}`));
 */
export async function decryptFolderIpfs(
  Web3Storagetoken,
  cid,
  password,
  downloadLocation
) {
  await downloadFile(Web3Storagetoken, cid, downloadLocation);
  const res = await decryptFolder(downloadLocation, password);
  return res;
}
export {
  encryptFolder,
  decryptFolder,
  uploadToIpfs,
  downloadFile,
} from "./utils/index.js";
