import http from 'node:http'
import { readJson } from './middleware/readJson.js'

const server = http.createServer(async(req, res) =>{

  const { method, url } = req

  await readJson(req, res)

  if (method === 'GET' && url === '/tasks'){
    res.end()
  } 

  if (method === 'POST' && url === '/tasks'){

    res
      .writeHead(201)
      .end(JSON.stringify(req.body))

  }

  res
    .writeHead(404)
    .end()


  

})

server.listen(3333)