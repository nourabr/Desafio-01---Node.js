import http from 'node:http'
import { readJson } from './middleware/readJson.js'
import { routes } from './routes.js'
import { readCsv } from './middleware/readCsv.js'


const server = http.createServer(async(req, res) =>{

  const { method, url } = req

  await readJson(req, res)

  const route = routes.find(route =>{
    return route.method === method && route.path.test(url)
  })

  if (route){

    const routeParams = req.url.match(route.path)

    req.params = routeParams

    if (req.headers['content-type'] === 'text/csv') {

      await readCsv(req, res, route)
    
    } else {
      route.handler(req, res);
    }


  } else{
    res
    .writeHead(404)
    .end()
  }

})

server.listen(3333)