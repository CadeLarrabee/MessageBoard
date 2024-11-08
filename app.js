//The setup for EXPRESS
const express = require("express");
const path = require("node:path");

//Express validation & assignment
const { body, validationResult } = require("express-validator");
const app = express();

//psql DB assignment
//self reminder- . is for relative path, .. is for leaving the folder you're in, and entering another folder at the same level
const db = require("./db/queries");

// Middleware to parse form data (urlencoded) and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//The setup for EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//without this we can't serve CSS files
app.use(express.static(path.join(__dirname, "public")));

const CurrentDate = new Date();

const links = [
  { href: "/", text: "Message Board" },
  { href: "new", text: "New Message" },
];

app.get("/", async (req, res) => {
  try {
    const messages = await db.getAllMessages();

    res.render("index", {
      links: links,
      messages: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("An error occurred while retrieving messages.");
  }
});

app.get("/message/:id", async (req, res) => {
  try {
    const messageId = parseInt(req.params.id) + 1;
    console.log(messageId);
    const message = await db.getMessageById(messageId);

    if (message) {
      res.render("message", { message });
    } else {
      res.status(404).send("Message not found");
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("An error occurred while retrieving messages.");
  }
});

app.get("/new", (req, res) => {
  res.render("new", {
    links: links,
    CurrentDate: CurrentDate,
  });
});

app.get("/search", async (req, res) => {
  try {
    const searchString = req.query.searchString;
    console.log("Search Query:", searchString);
    const messages = await db.searchMessage(searchString);

    if (messages && messages.length > 0) {
      res.render("search", { links: links, messages: messages });
    } else {
      res.status(404).send("No matching messages found");
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("An error occurred while retrieving messages.");
  }
});

app.post("/new", async (req, res) => {
  try {
    const { text, user } = req.body;
    if (text && user) {
      console.log(text, user);
      await db.insertMessage(user, text);
      res.redirect("/");
    } else {
      res.status(400).send("Message and user are required");
    }
  } catch (error) {
    console.error("Error inserting username:", error);
    res.status(500).send("An error occurred");
  }
});

app.post("/delete", async (req, res) => {
  try {
    await db.deleteAllMessages();
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting all messages:", error);
    res.status(500).send("An error occurred while deleting messages.");
  }
});

//Start the server on port 3k:

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
