const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function getMessageById(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    id,
  ]);
  return rows[0]; // returns a single message object
}

async function searchMessage(searchString) {
  const { rows } = await pool.query(
    "SELECT * FROM messages WHERE username LIKE $1",
    [`%${searchString}%`]
  );
  return rows;
}

async function insertMessage(user, message) {
  await pool.query("INSERT INTO messages (username, message) VALUES ($1, $2)", [
    user,
    message,
  ]);
}

async function deleteAllMessages() {
  await pool.query("DELETE FROM messages");
}

module.exports = {
  getAllMessages,
  insertMessage,
  getMessageById,
  searchMessage,
  deleteAllMessages,
};
