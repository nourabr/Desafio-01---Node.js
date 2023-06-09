import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/buildRoutePath.js'

const db = new Database();
const date = new Date();

export const routes = [

  { // Listagem de Tarefas
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) =>{

      const selected = db.select('tasks')

      res.end(JSON.stringify(selected))
    }
  },
  { // Criação de Tarefas
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) =>{

      const { title, description } = req.body
      
      const task = {
        id: randomUUID(),
        title,
        description,
        created_at: date.toLocaleString('pt-BR'),
        completed_at: null,
        updated_at:date.toLocaleString('pt-BR')
      }

      db.insert('tasks', task)

      res
      .writeHead(201)
      .end(JSON.stringify(req.body))
    }
  },
  { // Exclusão de Tarefas
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) =>{


      res
      .writeHead(204)
      .end()
    }
  }


]