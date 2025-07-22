const jsonServer = require('json-server')
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();

server.use('middlewares');
server.use(jsonServer.bodyParser);

server.post('/rsvp', (req, res) => {
  const db = router.db;
  db.get('rsvps').push(req.body).write();
  res.status(201).json(req.body); 
});

const PORT = 3001;
server.use(router); 
server.listen(PORT, () => {
  console.log(`JSON Server running at http://localhost:${PORT}`);
});