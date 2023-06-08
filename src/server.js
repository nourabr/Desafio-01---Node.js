import http from 'node:http'
import { readJson } from './middleware/readJson.js'
import { routes } from './routes.js'

const server = http.createServer(async(req, res) =>{

  const { method, url } = req

  await readJson(req, res)

  const route = routes.find(route =>{
    return route.method === method && route.path === url
  })

  if (route){
    route.handler(req, res);

  } else{
    res
    .writeHead(404)
    .end()
  }

})

server.listen(3333)