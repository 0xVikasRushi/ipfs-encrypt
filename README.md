
# IPFS-Encrypt

IPFS-Encrypt is an npm package that provides two functions for encrypting and decrypting files stored on IPFS.

![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/0xVikasRushi/ipfs-encrypt?include_prereleases)
![GitHub last commit](https://img.shields.io/github/last-commit/0xVikasRushi/ipfs-encrypt)
![GitHub issues](https://img.shields.io/github/issues-raw/0xVikasRushi/ipfs-encrypt)
![GitHub pull requests](https://img.shields.io/github/issues-pr/0xVikasRushi/ipfs-encrypt)
![GitHub](https://img.shields.io/github/license/0xVikasRushi/ipfs-encrypt)<br>

## Installation

You can install IPFS-Encrypt using npm:

```
npm install ipfs-encrypt
```
## Requirements

To use `ipfs-encrypt`, you need the following:

- A [Web3 Storage](https://web3.storage/) account and an API token with sufficient permissions to write to IPFS.


## Usage

* [uploadEncryptionIpfs](#uploadencryptionipfsweb3storagetoken-folderpath-password)
* [decryptFolderIpfs](#decryptfolderipfsweb3storagetoken-cid-password)
* [encryptFolder](#encryptfolderfolderpath-password)
* [decryptFolder](#decryptfolderfolderpath-password)

## Methods
### `uploadEncryptionIpfs(Web3Storagetoken, folderPath, password)`

This function uploads a folder to IPFS and encrypts its contents using a password. The function takes three parameters:

- `Web3Storagetoken`: A Web3 Storage token used for authentication.
- `folderPath`: The path to the folder that you want to upload and encrypt.
- `password`: The password to use for encryption.

```js
const { uploadEncryptionIpfs } = require('ipfs-encrypt');

const token = 'my_web3_storage_token';
const folderPath = '/path/to/folder';
const password = 'my_password';

uploadEncryptionIpfs(token, folderPath, password)
  .then(cid => console.log(`Folder uploaded and encrypted with CID ${cid}`))
  .catch(error => console.error(`Error: ${error.message}`));
```

### `decryptFolderIpfs(Web3Storagetoken, cid, password)`

This function retrieves an encrypted folder from IPFS and decrypts its contents using a password. The function takes three parameters:

- `Web3Storagetoken`: A Web3 Storage token used for authentication.
- `cid`: The CID of the encrypted folder on IPFS.
- `password`: The password to use for decryption.

```js
const { decryptFolderIpfs } = require('ipfs-encrypt');

const token = 'my_web3_storage_token';
const cid = 'Qm1234abcd';
const password = 'my_password';

decryptFolderIpfs(token, cid, password)
  .then(folderPath => console.log(`Folder decrypted and saved to ${folderPath}`))
  .catch(error => console.error(`Error: ${error.message}`));
```

### `encryptFolder(folderPath, password)`

This function encrypts the files in a folder using AES-256-CBC encryption with the given password. The function takes two parameters:

- `folderPath`: The path to the folder that you want to encrypt.
- `password`: The password to use for encryption.

```js
const { encryptFolder } = require('ipfs-encrypt');

const folderPath = '/path/to/folder';
const password = 'my_password';

encryptFolder(folderPath, password)
  .then(() => console.log(`Folder encrypted successfully`))
  .catch(error => console.error(`Error: ${error.message}`));
```

### `decryptFolder(folderPath, password)`

This function decrypts the files in a folder that were encrypted using AES-256-CBC encryption with the given password. The function takes two parameters:

- `folderPath`: The path to the folder that you want to decrypt.
- `password`: The password to use for decryption.

```js
const { decryptFolder } = require('ipfs-encrypt');

const folderPath = '/path/to/folder';
const password = 'my_password';

decryptFolder(folderPath, password)
  .then(() => console.log(`Folder decrypted successfully`))
  .catch(error => console

```
## License

[MIT](https://choosealicense.com/licenses/mit/)

