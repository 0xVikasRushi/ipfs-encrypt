# IPFS-Encrypt

![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/0xVikasRushi/ipfs-encrypt?include_prereleases)
![GitHub last commit](https://img.shields.io/github/last-commit/0xVikasRushi/ipfs-encrypt)
![GitHub issues](https://img.shields.io/github/issues-raw/0xVikasRushi/ipfs-encrypt)
![GitHub pull requests](https://img.shields.io/github/issues-pr/0xVikasRushi/ipfs-encrypt)
![Github Stars](https://img.shields.io/github/stars/0xVikasRushi/ipfs-encrypt)
![GitHub](https://img.shields.io/github/license/0xVikasRushi/ipfs-encrypt)<br>

A Node.js module for uploading and downloading encrypted folders to/from IPFS using AES-256-CBC encryption.

## Working

![ipfs-encrypt (1)](https://user-images.githubusercontent.com/88543171/219943113-21671e6f-7f94-4d85-aae4-9b1924ef3f3e.png)

# ipfs-encrypt

A Node.js module for uploading and downloading encrypted folders to/from IPFS using AES-256-CBC encryption.

## Installation

```sh
npm install ipfs-encrypted
```
## Requirements

To use the `ipfs-encrypted` package, you need to have the following:

- Node.js installed on your computer. You can download it from the official [Node.js website](https://nodejs.org/en/download/).
- A Web3 Storage token to authenticate your requests to the IPFS network. You can obtain a token by signing up for [Web3 Storage](https://web3.storage/).


## Usage

- [uploadEncryptionIpfs](#uploadencryptionipfsweb3storagetoken-folderpath-password)
- [decryptFolderIpfs](#decryptfolderipfsweb3storagetoken-cid-password)
- [uploadToIpfs](#uploadtoipfsweb3storagetoken-folderlocation)
- [downloadFile](#downloadfileweb3storagetoken-cid)
- [encryptFolder](#encryptfolderfolderpath-password)
- [decryptFolder](#decryptfolderfolderpath-password)

---

## Upload with Encryption to Ipfs

### `uploadEncryptionIpfs(Web3Storagetoken, folderPath, password)`

This function uploads a folder to IPFS and encrypts its contents using a password. The function takes three parameters:

- `Web3Storagetoken`: A Web3 Storage token used for authentication.
- `folderPath`: The path to the folder that you want to upload and encrypt.
- `password`: The password to use for encryption.

```js
import { uploadEncryptionIpfs } from "ipfs-encrypted";
const token = "my_web3_storage_token";
const folderPath = "/path/to/folder";
const password = "my_password";

uploadEncryptionIpfs(token, folderPath, password)
  .then((cid) => console.log(`Folder uploaded and encrypted with CID ${cid}`))
  .catch((error) => console.error(`Error: ${error.message}`));
```

## Download IPFS Decrypted Content

### `decryptFolderIpfs(Web3Storagetoken, cid, password)`

This function retrieves an encrypted folder from IPFS and decrypts its contents using a password. The function takes three parameters:

- `Web3Storagetoken`: A Web3 Storage token used for authentication.
- `cid`: The CID of the encrypted folder on IPFS.
- `password`: The password to use for decryption.

```js
import { decryptFolderIpfs } from "ipfs-encrypted";
const token = "my_web3_storage_token";
const cid = "Qm1234abcd";
const password = "my_password";

decryptFolderIpfs(token, cid, password)
  .then((folderPath) =>
    console.log(`Folder decrypted and saved to ${folderPath}`)
  )
  .catch((error) => console.error(`Error: ${error.message}`));
```

## Upload Folders to Ipfs without Encryption

### `uploadToIpfs(Web3Storagetoken, folderLocation)`

This function uploads a folder to IPFS and returns the CID of the uploaded folder. The function takes two parameters:

- `Web3Storagetoken`: A Web3 Storage token used for authentication.
- `folderLocation`: The path to the folder that you want to upload to IPFS.

```js
import { uploadToIpfs } from "ipfs-encrypted";
const token = "my_web3_storage_token";
const folderLocation = "/path/to/folder";

uploadToIpfs(token, folderLocation)
  .then((cid) => console.log(`Folder uploaded with CID ${cid}`))
  .catch((error) => console.error(`Error: ${error.message}`));
```

## Download IPFS content with CID

### `downloadFile(Web3Storagetoken, cid)`

This function downloads a file from IPFS and saves it to the current directory. The function takes two parameters:

- `Web3Storagetoken`: A Web3 Storage token used for authentication.
- `cid`: The CID of the file to download from IPFS.

```js
import downloadFile from "ipfs-encrypted";
const token = "my_web3_storage_token";
const cid = "CID";

downloadFile(token, cid)
  .then((filePath) => console.log(`File downloaded and saved to ${filePath}`))
  .catch((error) => console.error(`Error: ${error.message}`));
```

## Encryption and Decryption using AES-256-CBC Algorithm

### `encryptFolder(folderPath, password)`

This function recursively encrypts all files in a folder and its subfolders using AES-256-CBC encryption with the given password. The encrypted files are saved with a .encrypted extension. The function takes two parameters:

- `folderPath`: The path to the folder that you want to encrypt.
- `password`: The password to use for encryption.

```js
import { encryptFolder } from "ipfs-encrypted";
const folderPath = "/path/to/folder";
const password = "my_password";

encryptFolder(folderPath, password)
  .then(() => console.log(`Folder encrypted successfully`))
  .catch((error) => console.error(`Error: ${error.message}`));
```

### `decryptFolder(folderPath, password)`

This function recursively decrypts all files in a folder and its subfolders that were previously encrypted with the encryptFolder function using AES-256-CBC encryption with the given password. The decrypted files are saved with their original file extensions. The function takes two parameters:

- `folderPath`: The path to the folder that you want to decrypt.
- `password`: The password to use for decryption.

```js
import { decryptFolder } from "ipfs-encrypted";
const folderPath = "/path/to/folder";
const password = "my_password";

decryptFolder(folderPath, password)
  .then(() => console.log(`Folder decrypted successfully`))
  .catch((error) => console.error(`Error: ${error.message}`));
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contributors

<div style="display: flex;">
 
<a href="https://github.com/0xvikasrushi">
    <img src="https://github.com/0xvikasrushi.png" width="100" height="100"/>
  </a>
  
  <a href="https://github.com/c-shubh">
    <img src="https://github.com/c-shubh.png" width="100" height="100"/>
  </a>

</div>
