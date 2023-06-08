export class Database{

  #database = {
    "tasks": []
  }
  
  #persist(){}

  select(table){
    const data = this.#database[table] ?? []
    return data
  }

  insert(table, data){
    this.#database[table].push(data)
  }

}