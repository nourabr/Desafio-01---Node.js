import { Database } from "./database.js"

const db = new Database();

export const routes = [

  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) =>{

      db.select('tasks')

      res.end()
    }
  },
  {
    method: "POST",
    path: "/tasks",
    handler: (req, res) =>{
      
      const test = db.insert('tasks', req.body)
    
      console.log(test)

      res
      .writeHead(201)
      .end(JSON.stringify(req.body))
    }
  }


]