import { Web3Storage } from "web3.storage";
import fs from "fs";
import path from "path";

/**
 * Downloads a file from IPFS and saves it to the specified location.
 * @param {String} Web3Storagetoken A Web3 Storage token used for authentication.
 * @param {String} cid The CID of the file to download from IPFS.
 * @param {String} downloadLocation Path of folder that content need to downloaded
 * @returns {Promise<void>}
 * @example
 * import downloadFile from "ipfs-encrypted";
 * const token = "my_web3_storage_token";
 * const cid = "CID";
 * const downloadLocation = "/path/to/folder";
 *
 * downloadFile(token, cid, downloadLocation)
 *   .then((filePath) => console.log(`File downloaded and saved to ${filePath}`))
 *   .catch((error) => console.error(`Error: ${error.message}`));
 */
export async function downloadFile(Web3Storagetoken, cid, downloadLocation) {
  const client = new Web3Storage({
    token: Web3Storagetoken,
  });
  const res = await client.get(cid);
  const dirPath = downloadLocation;
  console.log(dirPath);
  fs.mkdirSync(dirPath, { recursive: true });
  const files = await res.files();
  for (const file of files) {
    const filePath = path.join(dirPath, file.name);
    const arr = filePath.split(path.sep);
    const content = await file.arrayBuffer();
    if (file.type === "directory") {
      fs.mkdirSync(filePath, { recursive: true });
    } else {
      arr.pop();
      const singlePath = arr.join(path.sep);
      fs.mkdirSync(singlePath, { recursive: true });
      fs.writeFileSync(filePath, Buffer.from(content));
      console.log(`Downloaded file saved to ${filePath}`);
    }
  }
}
