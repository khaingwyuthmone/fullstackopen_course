

const express = require('express');
const morgan  = require('morgan')
const app = express();

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json()); // json_parser
/* Middleware */
const requestLogger = (request, response, next) => {
    console.log("Method :", request.method)
    console.log("Path :", request.path)
    console.log("Body :", request.body)
    console.log('-----');
    next();
}
// app.use(requestLogger);
morgan.token('body', req =>{
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :response-time :body'));


/* Route */
app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.post('/api/persons', (request, response) =>{
    const body = request.body;
    console.log(body);

    if(body.name && body.number && !isExistingPerson(body.name)){
        const new_person = {
            name : body.name,
            number : body.number,
            id : generateId()
        }
        persons = persons.concat(new_person);
        response.json(new_person).end();
    }else{
        response.status(409).json({error : "name must be unique."});
    }

});

const isExistingPerson = (name) => {
    const person = persons.find(person => person.name.trim() === name);
    if(person){
        return true;
    }else{
        return false;
    }
}

const generateId = () => {
    const randomId = Math.floor(Math.random() * 1000 );
    return randomId;
}

app.get('/info', (request, response) => {
    response.send(  `Phonebook has info for ${persons.length} people 
                    <br> 
                    ${new Date()}
                    `);
    
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    if(person){
        response.json(person);
    }else{
        response.status(404).send("The resource you requested is not found on our server").end();
    }
});

app.delete('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if(person){
        persons = persons.filter(person=> person.id !== id);
        response.status(204).end();
    }else{
        response.status(404).send("The resource you want to delete is not found");
    }
});

const unknownEndpoint = (request, response) =>{
    response.status(404).send({error : 'unknown endpoint'})
}

app.use(unknownEndpoint)


const PORT = 3001;
app.listen(PORT, () =>{
    console.log("PhoneBook Backend is running");
});