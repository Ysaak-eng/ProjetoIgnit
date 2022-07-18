const express = require("express");
const cors = require("cors");
const {v4:uuidV4} = require("uuid")
const app = express();
const port = 5000;

function checkMiddleware(req,res,next){
const {userame} = req.headers;

const user = customers.find(user =>{customers.userame === userame});

if(!user){
return res.status(400).json({erro:"Erro usuario não encontrado"})
}
req.user = user;

  return next()
}
app.use(cors())
app.use(express.json());
const customers = []

app.post("/user",(req,res)=>{
const {name ,userame} = req.body;

const userExiste = customers.find(user=> customers.userame === userame);

if(userExiste){
res.status(400).json("Usuario invalido")
}

customers.push({
id:uuidV4(),
name:"Ysaak Silverio",
userame:"Ysaak",
tudos:[]
})

res.status(2001).json(customers)

})

app.get("/todos",checkMiddleware,(req,res)=>{
const {user} = req;

return res.json(200).send(user.todos)

})
app.post("/todos",checkMiddleware,(req,res)=>{
    const {user} = req;
    const {title,deadline} = req.body;

    const tudos  = {
    id:uuidV4(),
    title,
    done:false,
    deadline : new Date(deadline),
    created_at: new Date()

    }
customers.tudos.push(tudos)

return res.status(201).json(tudos)

    })
app.put("/todos/:id",checkMiddleware,(req,res)=>{
const {user} = req;
const {title,deadline} = req.body;
const {id} = req.params;

const todo = customers.todos.find(todo =>{todo.id ===id});

if(!todo){
res.status(400).json({erro:"Todo invalido"})
}

todo.title = title;
todo.deadline = new Date(deadline)

return res.json(todo)

        })
app.put("/todos:id/done",checkMiddleware,(req,res)=>{
const {user} = req;
const {id} = req.params;

todo.done = true;

if(!todo){
return res.status(400).json({error:"Messagem com erro "})
}


return res.json(todo)
})

app.delete("/todos/:id",checkMiddleware,(req,res)=>{

const {user} = req;
const {id} = req.params;

const todoIndex = customers.tudos.findIndex(tudos=>{tudos.id ===id})

if(todoIndex=== -1){
return res.status(404).json({error:"Valor Invalido"})
}

user.tudos.splice(todoIndex,-1)

return res.status(204).json()

})

app.listen(port)


