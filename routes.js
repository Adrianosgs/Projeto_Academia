const express = require('express')
const routes = express.Router()
const instructors = require('./controlers/instructors')
const members = require('./controlers/members')

routes.get('/', function(req, res) {
return res.redirect("/instrutores") 
})

routes.get('/instrutores', instructors.index)
routes.get('/instrutores/create', instructors.create)
routes.get('/instrutores/:id', instructors.show)
routes.get('/instrutores/:id/edit', instructors.edit)
routes.post("/instrutores",  instructors.post)
routes.put("/instrutores", instructors.put)
routes.delete("/instrutores", instructors.delete)



routes.get('/members', members.index)
routes.get('/members/create', members.create)
routes.get('/members/:id', members.show)
routes.get('/members/:id/edit', members.edit)
routes.post("/members",  members.post)
routes.put("/members", members.put)
routes.delete("/members", members.delete)


module.exports = routes