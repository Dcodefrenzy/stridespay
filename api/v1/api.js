const express = require("express");

const api = express.Router();
const adminRouter = require("./admins/adminRouter.js");
const usersRouter = require("./users/usersRouter.js");
const logsRouter = require("./logs/logsRouter.js");
const productRouter = require("./products/productRouter.js");
const paymentRouter = require("./payment/paymentRouter.js");

api.use("/admins", adminRouter);
api.use("/users", usersRouter);
api.use("/logs", logsRouter);
api.use("/products", productRouter);
api.use("/payments", paymentRouter);

module.exports = api;