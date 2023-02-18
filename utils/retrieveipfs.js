import { Web3Storage } from "web3.storage";
import fs from "fs";
import path from "path";

export async function downloadFile(token, cid, savePath) {
  const client = new Web3Storage({
    token,
  });
  const res = await client.get(cid);
  const dirPath = "decryptFiles";
  console.log(dirPath);
  fs.mkdirSync(dirPath, { recursive: true });

  const files = await res.files();
  console.log(files);

  for (const file of files) {
    const filePath = path.join(dirPath, file.name);
    const arr = filePath.split("/");
    console.log(arr);
    const content = await file.arrayBuffer();
    if (file.type === "directory") {
      fs.mkdirSync(filePath, { recursive: true });
    } else {
      arr.pop();
      const singlePath = arr.join("/");
      fs.mkdirSync(singlePath, { recursive: true });
      fs.writeFileSync(filePath, Buffer.from(content));
      console.log(`Downloaded file saved to ${filePath}`);
    }
  }
}