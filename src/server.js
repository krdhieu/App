import express from "express";
require("dotenv").config();
import expressLayouts from "express-ejs-layouts";
import viewEngineConfig from "./configs/viewEngineConfigs";
const app = express();
const port = process.env.PORT || 3001;
viewEngineConfig(app);
app.get("/", (req, res) => {
  res.render("app.ejs");
});

app.listen(port, console.log(">>>", port));
