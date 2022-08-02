const { response, request } = require('express');
const express = require('express');

const app = express();

app.use(express.json());


/**
 * Tipos de parâmetros
 * 
 * Route Params => São os parâmetros que recebemos encapsulados na nossa rota, divido pela barra (/)
 * è um parâmetro que já esperamos receber, se passar a rota sem ele dará erro.
 * Para que serve? Identificar um recurso editar/deletar/buscar
 * 
 * Query Params => Vão estar na rota mas de forma diferente (/courses?page=1&order=asc), de forma opcional
 * Para que serve? Paginação/Filtros
 * 
 * Body Params => Objetos passados para inserção ou alteração de algum recurso (Json)
 * 
 */

// app.get("/", (request, response) => {
//     // método send = envia uma mensagem para quem está requisitando
//     //return response.send("Hello World")

//     // Quando implementa na API se utiliza mais o método .json()
//     return response.json({message: "Hello World - Fundamentos NodeJs"})
// })

//Método simples direto pelo navegador, acessamos a rota e ela já retorna o resultado
app.get("/courses", (request, response) => {
    const query = request.query;
    console.log(query);

    // /courses?page=1&order=asc

    return response.json(["Curso 1", "Curso 2", "Curso 3"])
})

app.post("/courses", (request, response) => {
    const body = request.body;
    console.log(body);

    return response.json(["Curso 1", "Curso 2", "Curso 3"])
})

app.put("/courses/:id", (request, response) => {
    const { id } = request.params;
    console.log(id)
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