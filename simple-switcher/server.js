import jsonServer from 'json-server'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const validator = (request, response, next) => {
  const { display_name } = request.body

  if (request.method === 'POST' && (!display_name || display_name.length < 5)) {
    return response.status(400).json({
      error: 'display name too short, must have 5 or more characters',
    })
  } else {
    next()
  }
}
server.use(function(req, res, next){
  setTimeout(next, 2000);
});
server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(validator)
server.use(router)

server.listen(3001, () => {
  console.log('JSON Server is running')
})
