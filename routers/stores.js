const express = require("express");
const router = new express.Router();
const { getStore, addStore } = require("../controllers/stores");

router.route("/").get(getStore).post(addStore);

module.exports = router;
