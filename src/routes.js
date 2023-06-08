export const routes = [

  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) =>{
      res.end()
    }
  },
  {
    method: "POST",
    path: "/tasks",
    handler: (req, res) =>{
      res
      .writeHead(201)
      .end(JSON.stringify(req.body))
    }
  }


]