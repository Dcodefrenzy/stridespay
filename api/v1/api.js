const express = require("express");

const api = express.Router();
const adminRouter = require("./admins/adminRouter.js");
const usersRouter = require("./users/usersRouter.js");
const logsRouter = require("./logs/logsRouter.js");
const productRouter = require("./products/productRouter.js");
const paymentRouter = require("./payment/paymentRouter.js");
const transactionsRouter = require("./transaction/transactionRouter.js");
const milestoneRouter = require("./milestones/milestoneRouter.js");
const withdrawRouter = require("./withdraw/withdrawRouter.js");
const accountRouter = require("./accounts/accountRouter.js");
const walletRouter = require("./wallet/walletsRouter.js");
api.use("/admins", adminRouter);
api.use("/users", usersRouter);
api.use("/notifications", logsRouter);
api.use("/products", productRouter);
api.use("/payments", paymentRouter);
api.use("/transactions", transactionsRouter);
api.use("/milestones", milestoneRouter);
api.use("/withdraws", withdrawRouter);
api.use("/accounts", accountRouter);
api.use("/wallets", walletRouter);

module.exports = api;