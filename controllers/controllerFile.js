const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = mongoose.model("product");
mongoose.set("useFindAndModify", false);

router.get("/", (req, res) => {
  res.render("product/insertOrUpdate", {
    viewTitle: "Enter The product details : ",
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
  
});

function insertRecord(req, res) {
  var product = new Product();

  product.name = req.body.name;
  product.colour = req.body.colour;
  product.price = req.body.price;
  product.quantity = req.body.quantity;
  product.save((err, doc) => {
    if (!err) res.redirect("product/list");
    else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("product/insertOrUpdate", {
          viewTitle: "Enter The product details: ",
          product: req.body,
        });
      } else console.log("Error during record insertion : " + err);
    }
  });
}

function updateRecord(req, res) {
  Product.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("product/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("product/insertOrUpdate", {
            viewTitle: "Update product",
            Product: req.body,
          });
        } else console.log("Error during record update : " + err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  Product.find((err, docs) => {
    if (!err) {
      res.render("product/list", {
        list: docs,
      });
    } else {
      console.log("Error in retrieving product list :" + err);
    }
  });
});

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "name":
        body["nameError"] = err.errors[field].message;
        break;
      case "price":
        body["priceError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

router.get("/:id", (req, res) => {
  Product.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("product/insertOrUpdate", {
        viewTitle: "Update product",
        product: doc,
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/product/list");
    } else {
      console.log("Error in product delete :" + err);
    }
  });
});

module.exports = router;
