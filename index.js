const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(bodyParser.json())

const users = [
    {id: 1, name: "Jan", groupId: 1},
    {id: 2, name: "Adrian", groupId: 1},
    {id: 3, name: "Maria", groupId: 2},
    {id: 4, name: "Anna", groupId: 2}
]

const groups = [
    {id: 1, name: "Grupa A", ownerId: 1},
    {id: 2, name: "Grupa B", ownerId: 3}
]

app.get("/users", (req, res) => {
    res.json(users)
})

app.get("/users/:id", (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id))
    return user
        ? res.json(user)
        : res.status(404).send({error: "User not found"})
})

app.post("/users", (req, res) => {
    const { name, groupId } = req.body;

    if (!name || !groupId) {
        return res.status(400).send({ error: "Missing user name or groupId" })
    }
    const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1
    const newUser = { id: newId, name, groupId }
    users.push(newUser)
    res.json(newUser)
});

app.get("/group", (req, res) => {
    res.json(groups)
})

app.get("/groups/:id", (req, res) => {
    const groupId = parseInt(req.params.id);
    const group = groups.find(group => group.id === groupId)
    return group
        ? res.json(group)
        : res.status(404).send("Group not found")
})

app.post("/send-message/:id", (req, res) => {
    const userId = parseInt(req.params.id)
    const user = users.find(u => u.id === userId)
    const message = req.body.message
    console.log(userId, message)
    return user
        ? res.json({message: "Message sent successfully do użytkownika: " + user.name + ". Treść: " + message})
        : res.status(404).send({error: "Message not sent. User not found."})
})

app.listen(9001, () => {
    console.log("Server started on port 9001")
})

//Dodaj użytkownika {name: "Jan", groupId: 1}
//Pobierz użytkownika o id 1
//Pobierz jego grupę
//Pobierz właściciela grupy
//Wyślij wiadomość do właściciela np. "Użytkownik X jest muzykantem, konszabelantem!"
//Wykonaj zapytania pod nieistniejące id i obsłuż błędy
//Wypisz w konsoli wyniki lub dodaj gui



//alternatywnie przerobić zadanie z poprzednich warsztatów na typescripta