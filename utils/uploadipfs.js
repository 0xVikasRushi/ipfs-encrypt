import { Web3Storage, getFilesFromPath } from "web3.storage";

export async function uploadToIpfs(Web3Storagetoken, folderLocation) {
  if (!Web3Storagetoken) {
    throw new Error(
      "A token is needed. You can create one on https://web3.storage"
    );
  }

  if (!folderLocation) {
    throw new Error("Please supply the path to a file or directory");
  }

  const storage = new Web3Storage({ token : Web3Storagetoken });
  const files = await getFilesFromPath(folderLocation);

  console.log(`Uploading ${files.length} files`);
  const cid = await storage.put(files);
  console.log("Content added with CID:", cid);
  return cid;
}
