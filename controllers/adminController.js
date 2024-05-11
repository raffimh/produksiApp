const Product = require("../models/Product");

exports.getDatatables = (req, res, next) => {
  res.render("datatables", {
    pageTitle: "Datatables",
    path: "/datatables",
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
