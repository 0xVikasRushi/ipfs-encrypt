import {
  encryptFolder,
  decryptFolder,
  uploadToIpfs,
  downloadFile,
} from "./utils/index.js";

export async function uploadEncryptionIpfs(
  Web3Storagetoken,
  folderPath,
  password
) {
  await encryptFolder(folderPath, password);
  const cid = await uploadToIpfs(Web3Storagetoken, folderPath);
  return cid;
}

export async function decryptFolderIpfs(Web3Storagetoken, cid, password) {
  await downloadFile(Web3Storagetoken, cid);
  const res = await decryptFolder(".", password);
  return res;
}
export {
  encryptFolder,
  decryptFolder,
  uploadToIpfs,
  downloadFile,
} from "./utils/index.js";
