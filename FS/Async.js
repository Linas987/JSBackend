// Async FS
const {readFileSync,readFile,writeFile}=require('fs')

const getText=(path)=>{
    return new Promise((resolve,reject)=>{
        readFile(path,'utf8',(err,result)=>{
            if(err){
                //console.log(err)
                reject(err)
            }
            //console.log(result)
            resolve(result)
        })
    })
}
// getText('./first.txt')
//     .then(result=>console.log(result))
//     .catch(err=>console.log(err))

let firstText='';
let secondText='';
const start =async()=>{
    try {
        const first = await getText('./first.txt');
        const second = await getText('./second.txt')
        console.log(first,second);
        //firstText=first;
        //secondText=second;
        writeFile;
    }
    catch (error){
        console.log(error);
    }
}
start();

const first =readFileSync('./first.txt','utf8');
const second =readFileSync('./second.txt','utf8');

writeFile('./content/result-async.txt',`result: ${first},${second}`,
    (err,result)=>{
        if (err) {
            console.log(err)
            return
        }
        console.log(result)
    }
)
module.exports={writeFile}
