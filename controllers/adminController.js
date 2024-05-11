const Product = require("../models/Product");
const toastr = require("toastr");

exports.getDatatables = (req, res, next) => {
  res.render("datatables", {
    pageTitle: "Datatables",
    path: "/datatables",
    currentPage: req.originalUrl,
  });
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    const formattedProducts = products.map(product => ({
      nomor_order: product.nomor_order,
      quantity: product.quantity,
      nama_barang: product.nama_barang,
      size: product.size,
      tutup: product.tutup,
      body: product.body,
      elektroplating: product.elektroplating,
      isi: product.isi,
      rakit: product.rakit,
      qc: product.qc,
      packing: product.packing,
    }));
    res.json({ data: formattedProducts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getInputProduct = (req, res, next) => {
  res.render("inputProduct", {
    pageTitle: "Input Product",
    path: "/input-product",
    currentPage: req.originalUrl,
  });
};

exports.getPostProduct = async (req, res, next) => {
  const {
    nomor_order,
    quantity,
    nama_barang,
    size,
    tutup,
    body,
    elektroplating,
    isi,
    rakit,
    qc,
    packing,
  } = req.body;
  console.log(req.body);
  try {
    const product = new Product(
      nomor_order,
      quantity,
      nama_barang,
      size,
      tutup,
      body,
      elektroplating,
      isi,
      rakit,
      qc,
      packing
    );
    await product.save();

    // Kirim respons ke client (browser) setelah berhasil
    res.status(200).send("Data berhasil disimpan!");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
};
