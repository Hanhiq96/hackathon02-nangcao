const express = require("express");
const router = express.Router();
const db = require("../utils/database");
// get all users
router.get("/", async (req, res) => {
  try {
    let data = await db.execute("SELECT * FROM user");
    let [row] = data;
    console.log(row);
    res.json({
      users: row,
    });
  } catch (error) {
    res.json({
      message: "Get all users",
    });
  }
});

// post
router.post("/", async (req, res) => {
  let { name, description } = req.body;
  try {
    await db.execute("INSERT INTO user(name,description) VALUES(?,?)", [
      name,
      description,
    ]);
    res.json({
      message: "Create New Student Successfully",
    });
  } catch (error) {
    res.json({
      message: "error",
    });
  }
});
// put
router.put("/:id", async (req, res) => {
  let { name, description } = req.body;
  const userId = req.params.id;
  try {
    await db.execute("UPDATE  user SET name=?,description=? WHERE id=?", [
      name,
      description,
      userId,
    ]);
    res.json({
      message: "update student successfully",
    });
  } catch (error) {
    res.json({
      message: "error",
    });
  }
});
// delete
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    await db.execute("DELETE FROM user WHERE id = ?", [userId]);
    let data = await db.execute("SELECT * FROM user");
    res.json({
      users: data[0],
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "error",
    });
  }
});
module.exports = router;
