import { timeStamp } from "node:console";
import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'

const db = new Database();
const date = new Date();

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

      const { title, description } = req.body
      
      db.insert('tasks', {
        id: randomUUID(),
        title,
        description,
        created_at: date.toLocaleString('pt-BR'),
        completed_at: null,
        updated_at:date.toLocaleString('pt-BR')
      })

      res
      .writeHead(201)
      .end(JSON.stringify(req.body))
    }
  }


]