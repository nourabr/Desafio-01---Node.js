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
        updated_at: date.toLocaleString('pt-BR'),
        created_at: date.toLocaleString('pt-BR'),
        completed_at: null
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
        updated_at: date.toLocaleString('pt-BR')
      }

      db.update('tasks', id, body) ? res.writeHead(204) : res.writeHead(404)

      res
        .end()
    }
  }


]