export async function readJson(req, res){
  
  const buffers = []

  for await(const chunk of req){
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers))
  } catch {
    req.body = null
  }


}