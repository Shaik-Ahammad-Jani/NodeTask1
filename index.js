const http = require('http')
const fs=require('fs')
const  port=5000
// const server = http.createServer((req,res)=>{
//    if(req.url=='/' && req.method=='GET'){
//     fs.readFile('./data.json','utf8',(err,data)=>{
//         if (err) throw err
//         else res.end(data)
//     })
//    }
//    else if(req.url=='/' && req.method=='POST'){
//     let UsersData=''
//     req.on('data',(chunck)=>{
//         UsersData=UsersData+chunck.toString()
//     })
//     req.on('end',()=>{
//         const filedata=JSON.parse(fs.readFileSync('./data.json','utf8'))
//         filedata["user"].push(JSON.parse(UsersData))
//         console.log('Data send succesfully')
//         const UpdatedData=fs.writeFileSync('./data.json',JSON.stringify(filedata))
//         res.end(UpdatedData)
//     })
//    }
// })
// server.listen(`${port}`,()=>{
//     console.log(`server is running at http://localhost:${port}`)
// })
const server = http.createServer((req,res)=>{
    if(req.url==='/'){
        fs.readFile('./index.html','utf8',(err,data)=>{
            if(err) throw err
            else res.end(data)
        })
    }
    else if(req.url=='/user'){
        if(req.method=='GET'){
            // fs.readFile('./data.json','utf8',(err,data)=>{
            //     if(err) throw err
            //     else res.end(data)
            // })
            const fileData=fs.readFileSync('./data.json','utf8')
            res.end(JSON.stringify(JSON.parse(fileData)['user']))
        }else if (req.method=='POST'){
            let Data=''
            req.on('data',(chunck)=>{
                Data+=chunck.toString()
            })
            req.on('end',()=>{
                const fileData1 = JSON.parse(fs.readFileSync('./data.json','utf-8'))
                fileData1['user'].push(JSON.parse(Data))
                console.log('data send succes full')
                const updateUserData=fs.writeFileSync('./data.json',JSON.stringify(fileData1))
                res.end(updateUserData)
            })
        }
    }else if(req.url=='/posts'){
        if(req.method=='GET'){
            // fs.readFile('./data.json','utf8',(err,data)=>{
            //     if(err) throw err
            //     else res.end(data)
            // })
            const fileData=fs.readFileSync('./data.json','utf8')
            res.end(JSON.stringify(JSON.parse(fileData)['posts']))
            
        }else if (req.method=='POST'){
            let Data=''
            req.on('data',(chunck)=>{
                Data+=chunck.toString()
            })
            req.on('end',()=>{
                const fileData1 = JSON.parse(fs.readFileSync('./data.json','utf-8'))
                fileData1['posts'].push(JSON.parse(Data))
                console.log('data send succes full')
                const updateUserData=fs.writeFileSync('./data.json',JSON.stringify(fileData1))
                res.end(updateUserData)
            })
        }
    }
}).listen(`${port}`,()=>{
    console.log(`server is runnig at http://localhost:${port}`)
})