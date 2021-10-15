const https = require("https");
const fs = require("fs");
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
const HTTPS_PORT = 3000;

// const controllers = require("./controllers");


app.use(
  cors({
    credentials: true,
    origin: ["https://localhost:3001"],
    methods: "GET"
  })
);

app.get("/", (req, res) => {
  console.log("동작")
  res.status(200).send("hello world")
})

// app.post("/login", controllers.login);
// app.post("/signup", controllers.signup);
// app.post("/signout", controllers.signout);
// app.post("/toilet", controllers.toilet);

// app.get("/user/userinfo", controllers.get_userinfo);
// app.get("/user/mylist", controllers.get_mylist);

// app.put("/user/toilet", controllers.put_toilet);
// app.put("/user/comment", controllers.put_comment);
// app.put("/user/userinfo", controllers.put_userinfo);

// app.delete("/user/userinfo", controllers.delete_userinfo);
// app.delete("/user/toilet", controllers.delete_toilet);
// app.delete("/user/comment", controllers.delete_comment);


let server;
if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log("Port : 3000, server runnning"));

} else {
  server = app.listen(HTTPS_PORT)
}

https
  .createServer(
    {
      key: fs.readFileSync(__dirname + '/key.pem', 'utf-8'),
      cert: fs.readFileSync(__dirname + '/cert.pem', 'utf-8'),
    },
    app.use('/', (req, res) => {
      res.send('Congrats! You made https server now :)');
    })
  ).listen(3000, () => console.log("Port : 3000, server runnning"));



module.exports = server;