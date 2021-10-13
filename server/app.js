const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

const controllers = require("./controllers")


const app = express();
app.use(express.json());
const port = 443;


app.use(
  cors({
    credentials: true,
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

app.post("/login", controllers.post_login);
app.post("/signup", controllers.post_signup);
app.post("/signout", controllers.post_signout);
app.post("/toilet", controllers.post_toilet);

app.get("/user/userinfo", controllers.get_userinfo);
app.get("/user/mylist", controllers.get_mylist);
app.get("/toilet", controllers.get_toilet);

app.put("/user/toilet", controllers.put_toilet);
app.put("/user/comment", controllers.put_comment);
app.put("/user/userinfo", controllers.put_userinfo);

app.delete("/user/userinfo", controllers.delete_userinfo);
app.delete("/user/toilet", controllers.delete_toilet);
app.delete("/user/comment", controllers.delete_comment);


app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
})