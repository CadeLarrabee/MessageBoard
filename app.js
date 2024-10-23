//The setup for EXPRESS
const express = require("express");
const path = require("node:path");

const app = express();

// Middleware to parse form data (urlencoded) and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.get("/message/:id", (req, res) => {
  const messageId = req.params.id;
  const message = messages[messageId];

  if (message) {
    res.render("message", { message });
  } else {
    res.status(404).send("message not found");
  }
});

app.post("/new", (req, res) => {
  const { text, user } = req.body;
  if (text && user) {
    messages.push({ text, user, added: new Date() });
    res.redirect("/");
  } else {
    res.status(400).send("Message and user are required");
  }
});

//Start the server on port 3k:

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
