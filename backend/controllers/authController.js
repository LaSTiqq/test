import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new userModel({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(201).send("Register succeed");
  } catch (error) {
    if (error.errors.login.name === "ValidatorError") {
      res.status(400).send("Username already taken");
    } else {
      res.status(405).send(error);
    }
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ login: req.body.login });
    if (!user) {
      return res.status(404).send("Wrong login or password");
    }

    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!correctPassword) {
      return res.status(404).send("Wrong login or password");
    }

    return res.status(200).send("Login succeed");
  } catch (error) {
    res.status(405).send(error);
  }
};
