const fs = require('fs')
const data = require('../data.json')
const { date } = require('../utils')


exports.index = function(req, res) {
return res.render("members/index" , {members: data.members})
}

exports.create = function(req, res) {
    return res.render('members/create')
}

exports.post = function(req, res) {

    const keys = Object.keys(req.body)
    
    
    for(key of keys) {
        if (req.body[key] == "") {
            return res.send('Por favor, Preencha todos os campos!')
    }
    
    }
    birth = Date.parse(req.body.birth)
    
    let id = 1
    const lastMenber = data.members[data.members.length - 1]
    id = Number(lastMenber.id + 1)
  
    
    data.members.push({
        ...req.body,
        id,
        birth
    })
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("write file error!")
    
    
        return res.redirect(`/members/${id}`)
    })
    
    }

exports.show = function(req,res) {

const { id } = req.params

const foundMember = data.members.find(function(members){

    return id == members.id

})

if (!foundMember) return res.send("menbro não encontrado")


date(foundMember.birth)

    const valoresEncontradoNoBackEnd = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay.iso
}

return res.render("members/show", {members: valoresEncontradoNoBackEnd})
}

exports.edit = function(req, res){
    
const { id } = req.params

const foundMembers = data.members.find(function(members){
    return id == members.id

})

if (!foundMembers) return res.send("member não encontrado")
    
const members = {
    ...foundMembers, 
    birth:  date(foundMembers.birth).iso
}
    
return res.render('members/edit', { members })
}

exports.put = function(req,res) {

const { id } = req.body
let index = 0

const foundMembers = data.members.find(function(members, foundIndex){
    if (id == members.id) {
        index = foundIndex
        return true
    }

})

if (!foundMembers) return res.send("member não encontrado")

const members = { 
    ...foundMembers,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
}
data.members[index] = members

fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("write error!")

    return res.redirect(`/members/${id}`)
})
}

exports.delete = function(req, res) {
const { id } = req.body

const filteredMembers = data.members.filter(function(instructor){
    return instructor.id != id
})
data.members = filteredMembers
fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("write error!")

    return res.redirect("/members")

})
}
