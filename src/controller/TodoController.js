const TodoModel = require("../model/TodoModel");

exports.create = async (req, res) => {
  try {
    let email = req.headers["email"];
    let reqBody = req.body;
    reqBody.email = email;

    await TodoModel.create(reqBody);
    res.json({ status: "success", message: "Create Completed" });
  } catch (err) {
    res.json({ status: "fail", message: err });
  }
};

exports.update = async (req, res) => {
  try {
    let email = req.headers["email"];
    let { id } = req.params;
    let reqBody = req.body;
    await TodoModel.updateOne({ _id: id, email: email }, reqBody);
    res.json({ status: "success", message: "Update Completed" });
  } catch (err) {
    res.json({ status: "fail", message: err });
  }
};

exports.read = async (req, res) => {
  try {
    let email = req.headers["email"];
    let data = await TodoModel.find({ email: email });
    res.json({ status: "success", data: data });
  } catch (err) {
    res.json({ status: "fail", message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    let email = req.headers["email"];
    let { id } = req.params;
    await TodoModel.deleteOne({ _id: id, email: email });
    res.json({ status: "success", message: "Delete Completed" });
  } catch (err) {
    res.json({ status: "fail", message: err });
  }
};

exports.seleteByStatus = async (req, res) => {
  try {
    let email = req.headers["email"];

    let TodoStatus = req.body["TodoStatus"];

    const data = await TodoModel.find({ email: email, TodoStatus: TodoStatus });
    res.json({
      status: "success",
      message: "selete status Completed",
      data: data,
    });
  } catch (err) {
    res.json({ status: "fail", message: err });
  }
};
