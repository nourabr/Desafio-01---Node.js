export class Database{

  #database = {
    "tasks": []
  }
  
  #persist(){}

  select(table){
    return this.#database[table] ?? []
  }

  insert(table, data){
    return this.#database[table] ? this.#database.push(data) : []
  }

}