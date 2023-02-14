import { Web3Storage } from 'web3.storage'
import { File } from 'web3.storage'
function getAccessToken () {
  return process.env.TOKEN;
}

function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
} 



async function getFiles (path) {
  const files = await getFilesFromPath(path)
  console.log(`read ${files.length} file(s) from ${path}`)
  return files
}

function makeFileObjects () {
  const obj = { hello: 'world' }
  const buffer = Buffer.from(JSON.stringify(obj))

  const files = [
    new File(['contents-of-file-1'], 'plain-utf8.txt'),
    new File([buffer], 'hello.json')
  ]
  return files
}
// storeFiles('/test/new.js').then(()=>{console.log("working")})