const express = require("express");
const app = express();
const port = 3000;
const fs = require('fs');

//middleware to read req.body
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


//GET Read
app.get("/", (req, res) => {
  let rawdata = fs.readFileSync('todolist.json');
  res.send(rawdata);  
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
  res.json({todoList});
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
    console.log(json);
  })
  res.send('Update successfully deleted');
});

//Delete Delete
app.delete("/delete", (req, res)=>{
  fs.readFile('todolist.json', function (err, data) {
    var json = JSON.parse(data);
    for(let i = 0; i< json.todolist.length; i++){
      if(json.todolist[i].id==req.body.id){
        json.todolist.splice(i,1);
      }
    }
    fs.writeFile("todolist.json", JSON.stringify(json), function(err){
      if (err) throw err;
    });
  })
  res.send("deleted file successfully");
});

app.listen(port, () => console.log(`coba ${port}!`));
