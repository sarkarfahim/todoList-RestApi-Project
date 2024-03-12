const express = require("express");
const TodoController = require("../controller/TodoController");
const UserController = require("../controller/UserController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);

////after login
router.put("/profileUpdate", AuthMiddleware, UserController.profileUpdate);
router.get("/profileRead", AuthMiddleware, UserController.profileDetails);

////todo create, update, read, delete
router.post("/todo/create", AuthMiddleware, TodoController.create);
router.put("/todo/update/:id", AuthMiddleware, TodoController.update);
router.get("/todo/read", AuthMiddleware, TodoController.read);
router.get("/todo/delete/:id", AuthMiddleware, TodoController.delete);
router.get(
  "/todo/seleteByStatus",
  AuthMiddleware,
  TodoController.seleteByStatus
);

//User to-do list complete/cancel mark
module.exports = router;
