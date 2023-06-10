import { Database } from "./database.js"
import { buildRoutePath } from './utils/buildRoutePath.js'

const db = new Database();

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
        title,
        description, 
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

      const { id } = req.params.groups

      db.delete('tasks',id) ? res.writeHead(204) : res.writeHead(404)

      res.end()
    }
  },
  { // Atualização de Tarefas
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) =>{

      const { title, description } = req.body
      const { id } = req.params.groups
      
      const body = {
        title,
        description,
      }

      db.update('tasks', id, body) ? res.writeHead(204) : res.writeHead(404)

      res
        .end()
    }
  }


]