import { parse } from 'csv-parse'
import { createReadStream } from 'node:fs'

export async function readCsv(req, res, route){

  // Usado para remover o cabeçalho da planilha
  let index = 0

  // Desabilita o res.end() em routes.js 
  req.csv = true;

  createReadStream('spreadsheet.csv')
    .pipe(parse())
    .on('data', (line) => {
      
      if (index > 0) {

        req.body = {
          "title": line[0],
          "description": line[1]
        }

        route.handler(req, res)
      } 

      index++
      
    })
    .on('end', () =>{
      res
      .writeHead(201)
      .end(JSON.stringify("Tarefas adicionadas com sucesso!"))
    })

}
