// let cors = require("cors");
// let express = require("express");
// let Auth = require("../Auth/Auth");
// let UserService = require("../Services/UserService");

// const UserController = express.Router();

// UserController.use(cors());

// UserController.post("/register", (req, res) => {
//   UserService.RegisterUser(req.body, res);
// });

// UserController.post("/login", (req, res) => {
//   UserService.LoginUser(req.body, res);
// });

// UserController.post("/refreshToken", (req, res) => {
//   UserService.RefreshToken(req, res);
// });

// UserController.get("/isAdmin", Auth.Authorize(), (req, res) => {
//   console.log(req.user);
//   res.json(req.user.role);
// });

// export cont new UserController();
