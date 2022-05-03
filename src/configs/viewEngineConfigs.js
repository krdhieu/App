import express from "express";
import path from "path";

const configViewEngine = (app) => {
  app.set("view engine", "ejs");
  app.set("views", "src/views");
  app.use(express.static(path.join(path.dirname(__dirname), "public")));
};

export default configViewEngine;
