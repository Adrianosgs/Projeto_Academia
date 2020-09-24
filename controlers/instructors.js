const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')


exports.index = function(req, res) {
return res.render("instrutores/index" , {instrutores: data.instrutores})
}

exports.create = function(req, res) {
return res.render('instrutores/create')
}

exports.post = function(req, res) {

const keys = Object.keys(req.body)


for(key of keys) {
    if (req.body[key] == "") {
        return res.send(`Por favor, Preencha todos os campos!`)
}

}
req.body.birth = Date.parse(req.body.birth)
req.body.created_at = Date.now()
req.body.id = Number(data.instrutores.length + 1)

data.instrutores.push(req.body)

fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("write file error!")


    return res.redirect("/instrutores")
})

}

exports.show = function(req,res) {

const { id } = req.params

const foundInstructor = data.instrutores.find(function(instrutores){

    return id == instrutores.id

})

if (!foundInstructor) return res.send("instrutor não encontrado")


date(foundInstructor.birth)

    const valoresEncontradoNoBackEnd = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(" , "),
        created_at:new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
}

return res.render("instrutores/show", {instrutores: valoresEncontradoNoBackEnd})

}

exports.edit = function(req, res){
    
const { id } = req.params

const foundInstructor = data.instrutores.find(function(instrutores){
    return id == instrutores.id

})

if (!foundInstructor) return res.send("instrutor não encontrado")
    
const instructor = {
    ...foundInstructor, 
    birth:  date(foundInstructor.birth).iso
}
    
return res.render('instrutores/edit', { instructor })
}

exports.put = function(req,res) {

const { id } = req.body
let index = 0

const foundInstructor = data.instrutores.find(function(instrutores, foundIndex){
    if (id == instrutores.id) {
        index = foundIndex
        return true
    }

})

if (!foundInstructor) return res.send("instrutor não encontrado")

const instructor = { 
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth)
}
data.instrutores[index] = instructor

fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("write error!")

    return res.redirect(`/instrutores/${id}`)
})
}

exports.delete = function(req, res) {
const { id } = req.body

const filteredInstructors = data.instrutores.filter(function(instructor){
    return instructor.id != id
})
data.instrutores = filteredInstructors
fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("write error!")

    return res.redirect("/instrutores")

})
}


