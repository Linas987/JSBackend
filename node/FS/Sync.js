// Sync Fs
const {readFileSync,writeFileSync}=require('fs')

const first =readFileSync('./first.txt','utf8');
const second =readFileSync('./second.txt','utf8');

console.log(first,second)

writeFileSync('./content/result-sync.txt',`the result is: ${first},${second}`)
