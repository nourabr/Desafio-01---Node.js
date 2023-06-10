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

  delete(table, id){
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1){
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
      return true
      
    } else {
      return false
    }

  }

  update(table, id, data){

    const date = new Date();

    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1){

      const { 
          created_at,
          completed_at,
          updated_at 
        } = this.#database[table][rowIndex]

      this.#database[table][rowIndex] = 
        {
          id,
          ...data,
          created_at,
          completed_at,
          updated_at: date.toLocaleString('pt-BR')
        }
      
      this.#persist()
      return true

    } else{
      return false
    }

  }

}