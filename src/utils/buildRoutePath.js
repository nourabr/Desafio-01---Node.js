export function buildRoutePath(path){

  // Encontra os nomes dos parâmetros
  const parametersRegex = /:([a-zA-Z]+)/g

  // Encontra o conteúdo dos parâmetros
  const pathWithParameters = path
    .replaceAll(parametersRegex, '(?<$1>[a-z0-9\-_]+)')

  // const pathRegex = new RegExp(pathWithParameters)
  const pathRegex = new RegExp(`^${pathWithParameters}`)

  return pathRegex

}