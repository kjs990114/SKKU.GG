const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
//user안의 json 형식: { name: "김준성", nickname: "hide on bush", id: "2018312075", depart: "소프트웨어학과", tier: "", rank: "", point: "" }
let user = [];
let user_count = 1;


app.post('/connect', (req, res) => {
    let flag = 1;
    user.forEach((e) => {
        if (e["id"] === req.body["id"]) flag = 0;
    })
    if (flag) {
        user.push(req.body);
        user_count++;
    }
    res.send(200);
})

//setInterval(() => console.log(JSON.stringify(user)), 1000);
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})


let response = {};
app.post('/search', (req, res) => {
    response = req.body;
})

app.get('/search', (req, res) => {
    res.send(JSON.stringify(response));
})

app.get('/info', (req, res) => {
    res.send(user);
})

let counter = 0;

app.get('/counter', (req, res) => {
    counter++;
    res.send(counter.toString())
})
let chats = [];

app.get('/chats', (req, res) => {
    res.send(chats);
})

app.post('/chats', (req, res) => {
    chats.push(req.body.chat);
    res.send(200);
})

app.use(express.static('public'))