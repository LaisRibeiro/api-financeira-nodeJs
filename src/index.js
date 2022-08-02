const { response, request } = require('express');
const express = require('express');

const app = express();

// app.get("/", (request, response) => {
//     // método send = envia uma mensagem para quem está requisitando
//     //return response.send("Hello World")

//     // Quando implementa na API se utiliza mais o método .json()
//     return response.json({message: "Hello World - Fundamentos NodeJs"})
// })

//Método simples direto pelo navegador, acessamos a rota e ela já retorna o resultado
app.get("/courses", (request, response) => {
    return response.json(["Curso 1", "Curso 2", "Curso 3"])
})

app.post("/courses", (request, response) => {
    return response.json(["Curso 1", "Curso 2", "Curso 3"])
})

app.put("/courses/:id", (request, response) => {
    return response.json(["Curso 6", "Curso 2", "Curso 3"])
})

app.patch("/courses/:id", (request, response) => {
    return response.json(["Curso 6", "Curso 7", "Curso 3"])
})

app.delete("/courses/:id", (request, response) => {
    return response.json(["Curso 6", "Curso 7"])
})



//localhost:3333
app.listen(3333);