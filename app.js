const express = require("express");
const path = require("path");
const yaml = require("js-yaml");
const fs = require("fs");
const Autolinker = require("autolinker");

const app = express();
const port = process.env.PORT || 3000;

let filename = process.argv[2];
if (filename == null) {
  filename = "profile-example";
}

const profile = yaml.safeLoad(fs.readFileSync(`${filename}.yml`, "utf8"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "personal")));

app.get("/", (req, res) => {
  res.render("index", { profile, Autolinker });
});

app.listen(port, () => {
  console.log(`your resume [${filename}] in http://localhost:${port} !`);
});
