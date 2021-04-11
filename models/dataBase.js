// #1 importing the mongoose package
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
// #2 establishing connection to the mongo database
const url="mongodb+srv://vedantdb:Tonyman@1998@cluster0.kkjx0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("Database Connection is established");
    } else {
      console.log(
        "error! error! Database Connection is NOT established : " + err
      );
    }
  }
);
// #3 Models defined on the mongoose instance
require("./product.model");
