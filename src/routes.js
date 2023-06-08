import { Database } from "./database.js"

const db = new Database();

export const routes = [

  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) =>{

      const selected = db.select('tasks')

      res.end(JSON.stringify(selected))
    }
  },
  {
    method: "POST",
    path: "/tasks",
    handler: (req, res) =>{
      
      db.insert('tasks', req.body)
    
      console.log(req.body)

      res
      .writeHead(201)
      .end(JSON.stringify(req.body))
    }
  }


]