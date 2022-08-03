const { response, request } = require('express');
const express = require('express');

const { v4: uuidv4 } = require("uuid")

const app = express();

app.use(express.json());

const customers = [];

/**
 * CPF = String
 * Name = String
 * Id = uuid
 * Statement []
 */

// Middleware - Defini-se um middleware por receber 3 parâmetros (request, response, next)
// É o next que define se o middleware vai para frente ou não
function verifyIfExistAccountCPF(request, response, next) {
    const { cpf } = request.params;

    const customer = customers.find((customer) => customer.cpf === cpf);

    if(!customer) return response.status(400).json({ error: "Customer not found" })

    request.customer = customer;
    return next();

}

function getBalance(statement){
    const balance = statement.reduce((acc, operation) => {
        if(operation.type === "credit"){
             return acc + operation.amount
        }else{
            return acc - operation.amount
        }
    }, 0)   //Valor que inicia o reduce

    return balance;

}


app.post("/account", (request, response) => {
    const {cpf, name} = request.body;

    //some, vai retornar um true or false para a verificação
    const customersAlreadyExist = customers.some((customer) => {
        customer.cpf === cpf
    });

    if(customersAlreadyExist) return response.status(400).json({ error: "Customer already exist!" });
    

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    })

    return response.status(201).send();

})

// Se preciso que todas as requisições abaixo verifiquem se existe o cfp
// app.use(verifyIfExistAccountCPF);

app.get("/statement/:cpf", verifyIfExistAccountCPF, (request, response) => {
    const { customer } = request;

    return response.json(customer.statement);
})

app.post("/deposit/:cpf", verifyIfExistAccountCPF, (request, response) => {
    const { description, amount } = request.body;
    const { customer } = request;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }

    customer.statement.push(statementOperation);

    return response.status(201).send();
})

app.post("/withdraw/:cpf", verifyIfExistAccountCPF, (request, response) => {
    const { amount } = request.body;
    const { customer } = request;

    const balance = getBalance(customer.statement);

    if(balance < amount) return response.status(400).json({ error: "Insufficient funds" });

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debit"
    }

    customer.statement.push(statementOperation);

    return response.status(201).send();
})


//localhost:3333
app.listen(3333);


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
// app.get("/courses", (request, response) => {
//     const query = request.query;
//     console.log(query);

//     // /courses?page=1&order=asc

//     return response.json(["Curso 1", "Curso 2", "Curso 3"])
// })

// app.post("/courses", (request, response) => {
//     const body = request.body;
//     console.log(body);

//     return response.json(["Curso 1", "Curso 2", "Curso 3"])
// })

// app.put("/courses/:id", (request, response) => {
//     const { id } = request.params;
//     console.log(id)
//     return response.json(["Curso 6", "Curso 2", "Curso 3"])
// })

// app.patch("/courses/:id", (request, response) => {
//     return response.json(["Curso 6", "Curso 7", "Curso 3"])
// })

// app.delete("/courses/:id", (request, response) => {
//     return response.json(["Curso 6", "Curso 7"])
// })


