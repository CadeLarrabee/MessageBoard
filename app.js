//The setup for EXPRESS
const express = require("express");
const path = require("node:path");

const app = express();

//The setup for EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];
const CurrentDate = new Date();

const links = [
  { href: "/", text: "Message Board" },
  { href: "new", text: "New Message" },
];

app.get("/", (req, res) => {
  res.render("index", {
    links: links,
    messages: messages,
  });
});

app.get("/new", (req, res) => {
  res.render("new", {
    links: links,
    CurrentDate: CurrentDate,
  });
});

//Start the server on port 3k:

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
