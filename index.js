import { encryptFolder } from "/utils/encrypt.js";
import { decryptFolder } from "./utils/decrypt";
import { uploadToIpfs } from "/utils/uploadipfs.js";

async function uploadEncrptionIpfs(token, folderPath, password) {
  await encryptFolder(folderPath, password);
  const cid = await uploadToIpfs(token, folderPath);
  console.log("new new new new " + cid);
}
