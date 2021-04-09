const express = require("express");
const router = express.Router();

const CommandController = require('../controllers/commandController');
const GuildController = require('../controllers/guildController');
const MemberController = require('../controllers/memberController');
const UserController = require('../controllers/userController');

router.get("/", function(req, res) {
  return res.sendStatus(200);
});

// Commands - GET
router.get("/commands", CommandController.get);
router.get("/commands/:command", CommandController.getByName);

// Guilds - GET
router.get("/guilds", GuildController.get);
router.get("/guilds/:guild", GuildController.getById);

// Members - GET
router.get("/members", MemberController.get);
router.get("/members/:member", MemberController.getById);

// Users - GET
router.get("/users", UserController.get);
router.get("/users/:user", UserController.getById);

// Commands - POST
router.post("/commands", CommandController.post);

// Guilds - POST
router.post("/guilds", GuildController.post);

// Members - POST
router.post("/members", MemberController.post);

// Members - PUT
router.put("/members/:member", UserController.put);

// Users - POST
router.post("/users", UserController.post);

// Users - PUT
router.put("/users/:user", UserController.put);


module.exports = router;