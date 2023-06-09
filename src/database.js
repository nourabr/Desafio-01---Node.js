import fs from 'node:fs/promises'
import { randomUUID } from 'node:crypto'

const databasePath = new URL('../db/db.json', import.meta.url)

export class Database{

  #database = {
    "tasks": []
  }

  constructor(){
    fs.readFile(databasePath, 'utf8')
      
      .then(file=>{
        this.#database = JSON.parse(file)
      })

      .catch(()=>{
        this.#persist()
      })

  }
  
  #persist(){
    fs.writeFile(databasePath,JSON.stringify(this.#database))
  }

  select(table){
    const data = this.#database[table] ?? []
    return data
  }

  insert(table, data){
    this.#database[table].push(data)
    this.#persist()
  }

}