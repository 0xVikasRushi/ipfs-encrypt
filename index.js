import { encryptFolder } from "./utils/encrypt.js";
import { decryptFolder } from "./utils/decrypt.js";
import { uploadToIpfs } from "./utils/uploadipfs.js";
import { downloadFile } from "./utils/retrieveipfs.js";

async function uploadEncryptionIpfs(Web3Storagetoken, folderPath, password) {
  await encryptFolder(folderPath, password);
  const cid = await uploadToIpfs(Web3Storagetoken, folderPath);
  return cid;
}

async function decryptFolderIpfs(Web3Storagetoken, cid, password) {
  await downloadFile(Web3Storagetoken, cid);
  const res = await decryptFolder(".", password);
  return res;
}

