const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Mimic DB using an Array
let blogList = [];

app.get("/blogs", (req, res) => {
  return res.status(200).json({
    data: blogList,
    success: true,
  });
});

app.post("/blogs", (req, res) => {
    console.log(req.body);
  blogList.push({
    title: req.body.title,
    content: req.body.content,
    id: Math.floor(Math.random()*1000),
  });
  return res.status(201).json({
    success: true,
  });
});

app.get("/blogs/:id", (req, res) => {
    console.log(req.params.id);
    console.log(blogList);
    const result = blogList.filter((currBlog)=>{
        return currBlog.id == req.params.id;
    });
    console.log(result);
    return res.json({
        code:200,
        data: result,
        success: true
    })
});

app.delete("/blogs/:id", (req, res) => {
    const indexToDelete = blogList.findIndex(currBlog => currBlog.id == req.params.id);
    
    if (indexToDelete != -1) {
        blogList.splice(indexToDelete, 1);
    } else {
        console.log("Object not found.");
    }
    return res.json({
        code: 202,
        success: true
    });
});


app.listen(PORT, () => {
  console.log("Server started on PORT 3000");
});
