import { Web3Storage, getFilesFromPath } from "web3.storage";

/**
 * Uploads a folder to IPFS and returns the CID of the uploaded folder.
 * @param {String} Web3Storagetoken A Web3 Storage token used for authentication.
 * @param {String} folderLocation The path to the folder that you want to upload to IPFS.
 * @returns {Promise<String>} CID of the uploaded folder.
 * @example
 * import { uploadToIpfs } from "ipfs-encrypted";
 * const token = "my_web3_storage_token";
 * const folderLocation = "/path/to/folder";
 *
 * uploadToIpfs(token, folderLocation)
 *   .then((cid) => console.log(`Folder uploaded with CID ${cid}`))
 *   .catch((error) => console.error(`Error: ${error.message}`));
 */
export async function uploadToIpfs(Web3Storagetoken, folderLocation) {
  if (!Web3Storagetoken) {
    throw new Error(
      "A token is needed. You can create one on https://web3.storage"
    );
  }

  if (!folderLocation) {
    throw new Error("Please supply the path to a file or directory");
  }

  const storage = new Web3Storage({ token: Web3Storagetoken });
  const files = await getFilesFromPath(folderLocation);

  console.log(`Uploading ${files.length} files`);
  const cid = await storage.put(files);
  console.log("Content added with CID:", cid);
  return cid;
}
