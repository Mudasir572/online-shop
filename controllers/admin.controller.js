const Product = require("../models/product.model");
const Order = require("../models/order.model");
const Coupon = require("../models/coupon.model");
const couponCodeGenerator = require("../util/generate-coupon-code");

async function getAllProducts(req, res, next) {
  let products;
  try {
    products = await Product.findAll();
  } catch (error) {
    return next(error);
  }
  res.render("admin/products", { products: products });
}

function getAddProduct(req, res) {
  res.render("admin/new-product");
}

async function addProduct(req, res) {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (error) {
    return next(error);
  }

  res.redirect("/admin/products");
}

async function getUpdateProduct(req, res) {
  const product = await Product.findById(req.params.id);

  res.render("admin/update-product", { product: product });
}

async function updateOrder(req, res, next) {
  const orderId = req.params.id;
  const newStatus = req.body.newStatus;

  try {
    const order = await Order.findById(orderId);

    order.status = newStatus;

    await order.save();

    res.json({ message: "Order updated", newStatus: newStatus });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res) {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });
  if (req.file) {
    product.replaceImage(req.file.filename);
  }
  try {
    await product.save();
  } catch (error) {
    return next(error);
  }

  res.redirect("/admin/products");
}

async function deleteProduct(req, res) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    await product.delete();
  } catch (error) {
    return next(error);
  }

  res.json({ message: "Deleted Product!" });
}

async function getAllOrders(req, res, next) {
  try {
    const orders = await Order.findAllOrders();
    res.render("admin/orders", { orders: orders });
  } catch (error) {
    return next(error);
  }
}

async function getAddCoupon(req, res, next) {
  let sessionData = req.session.flashedData;

  if (!sessionData) {
    sessionData = {
      code: "",
      type: "persentage",
      discount: "",
      expiry: "",
    };
  }

  req.session.flashedData = null;

  const couponCode = couponCodeGenerator();

  res.render("admin/add-coupon", {
    couponCode: couponCode,
    inputData: sessionData,
  });
}

async function addCoupon(req, res, next) {
  const enteredData = {
    code: req.body.code,
    type: req.body.type,
    discount: req.body.discount,
    expiry: req.body.expiry,
  };
  if (
    !enteredData.code ||
    enteredData.code.trim().length < 6 ||
    !enteredData.discount ||
    enteredData.discount <= 0 ||
    !enteredData.expiry
  ) {
    req.session.flashedData = {
      errorMassage:
        "Code should be more then six charaters ,discount greater then zero and all inputs should be filled!",
      ...enteredData,
    };
    req.session.save(function () {
      res.redirect("/admin/coupon");
    });

    return;
  }

  if (enteredData.type === "persentage" && enteredData.discount >= 100) {
    req.session.flashedData = {
      errorMassage:
        "While type is persentage discount should be less then 100%!",
      ...enteredData,
    };
    req.session.save(function () {
      res.redirect("/admin/coupon");
    });

    return;
  }

  if (new Date(enteredData.expiry).getTime() <= new Date().getTime()) {
    req.session.flashedData = {
      errorMassage: "Expiry Date should be in future!",
      ...enteredData,
    };
    req.session.save(function () {
      res.redirect("/admin/coupon");
    });

    return;
  }

  const coupon = new Coupon(
    req.body.code,
    req.body.type,
    req.body.discount,
    req.body.expiry
  );

  await coupon.save();

  res.redirect("/coupon/success");
}

function getCouponSuccess(req, res) {
  res.render("admin/coupon-added");
}
module.exports = {
  getAllProducts: getAllProducts,
  getAddProduct: getAddProduct,
  addProduct: addProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  updateOrder: updateOrder,
  getAllOrders: getAllOrders,
  getAddCoupon: getAddCoupon,
  addCoupon: addCoupon,
  getCouponSuccess: getCouponSuccess,
};
