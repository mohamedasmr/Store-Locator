const Store = require("../models/Stores");

// Get All Stores
// Get /api/v1/stores
// Access Public
exports.getStore = async (req, res, next) => {
  try {
    const stores = await Store.find();

    return res.status(200).send({
      success: true,
      count: stores.length,
      data: stores,
    });
  } catch (e) {
    res.status(500).send({ error: "Server error" });
  }
};

// Create All Stores
// Post /api/v1/stores
// Access Public
exports.addStore = async (req, res, next) => {
  try {
    const stores = await Store.create(req.body);

    return res.status(200).send({
      success: true,
      data: stores,
    });
  } catch (e) {
    console.error(e);
    if (e.code === 11000) {
      return res.status(400).send({ error: "This store already exists" });
    }
    res.status(500).send({ error: "Server error" });
  }
};
