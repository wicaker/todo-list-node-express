const express = require("express");
const app = express();
const port = 8080;
const fs = require('fs');


//middleware to read req.body
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //this allow all client with everything domain to access our api
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})


//GET Read
app.get("/", (req, res) => {
  let dataList = JSON.parse(fs.readFileSync('todolist.json'));
  res.json(dataList);  
});

//POST Created
app.post("/post", (req, res) => {
  const todoList = {
    id : req.body.id, 
    day : req.body.day,
    act : req.body.act
  }
  fs.readFile('todolist.json', function (err, data) {
    var json = JSON.parse(data);
    json.todolist.push(todoList);    
    fs.writeFile("todolist.json", JSON.stringify(json), function(err){
      if (err) throw err;
    });
  })
  res.json({ "message": "Adding todo list successfully"});
});

//PUT Update
app.put("/update", (req, res)=>{
  fs.readFile('todolist.json', function (err, data) {
    var json = JSON.parse(data);
    for(let i=0; i<json.todolist.length; i++){
      if(json.todolist[i].id==req.body.id){
        json.todolist[i] = {
          id : req.body.id,
          day : req.body.day,
          act : req.body.act
        }
      }
    }
    fs.writeFile("todolist.json", JSON.stringify(json), function(err){
      if (err) throw err;
    });
  })
  res.json({ "message" : "Update todo list successfully"});
});

//Delete Delete
app.delete("/delete/:id", (req, res)=>{
  fs.readFile('todolist.json', function (err, data) {
    var json = JSON.parse(data);
    for(let i = 0; i< json.todolist.length; i++){
      if(json.todolist[i].id==req.params.id){
        json.todolist.splice(i,1);
      }
    }
    fs.writeFile("todolist.json", JSON.stringify(json), function(err){
      if (err) throw err;
    });
  })
  res.json({"message" : "Deleting todo list successfully"});
});

app.listen(port, () => console.log(`coba ${port}!`));
