const mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "this field is mandatory",
  },
  colour: {
    type: String,
  },
  price: {
    type: Number,
    required: "this field is mandatory",
  },
  quantity: {
    type: Number,
  },
});

mongoose.model("product", productSchema);
