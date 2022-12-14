const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
//user안의 json 형식: { name: "김준성", nickname: "hide on bush", id: "2018312075", depart: "소프트웨어학과", tier: "", rank: "", point: "" }
let user = [];
let user_count = 1;


app.post('/connect', (req, res) => {
    let flag = 1;
    let flag2 = 1;
    user.forEach((e) => {
        if (e["id"] === req.body["id"]) {
            flag = 0;
            if (e["nickname"] !== req.body["nickname"]) {
                console.log("소환사명과 학번이 일치하지 않습니다.");
                flag2 = 0;
            }
        }
    })
    if (flag) {
        user.push(req.body);
        user_count++;
    }
    if (flag2) {
        res.send(200);
    }
    else {
        res.send(400);
    }


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


let chats = [];

app.get('/chats', (req, res) => {
    res.send(chats);
})

app.post('/chats', (req, res) => {
    chats.push(req.body.chat);
    res.send(200);
})

app.post('/del',(req,res)=>{
    chats.pop();
})

app.use(express.static('public'))