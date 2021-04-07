const express = require("express");
const router = express.Router();

const CommandController = require('../controllers/commandController');

router.get("/", function(req, res) {
  return res.sendStatus(200);
});

router.get("/commands", CommandController.get)

router.get("/commands/:command", CommandController.getByName)

router.post("/commands", CommandController.post)

module.exports = router;