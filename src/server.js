import express from "express";
require("dotenv").config();
import expressLayouts from "express-ejs-layouts";

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("sssss");
});

app.listen(port, console.log(">>>", port));
