const Product = require("../models/Product");
const Finished = require("../models/Finished");

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

exports.getEditProduct = async (req, res, next) => {
  try {
    const nomor_order = req.params.nomor_order;
    const product = await Product.findByNomorOrder(nomor_order);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render("editProduct", {
      pageTitle: "Edit Product",
      path: "/edit-product",
      currentPage: req.originalUrl,
      product,
    });
  } catch (err) {
    next(err);
  }
};

exports.postUpdateProduct = async (req, res, next) => {
  try {
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

    const product = await Product.findByNomorOrder(nomor_order);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    product.quantity = quantity;
    product.nama_barang = nama_barang;
    product.size = size;
    product.tutup = tutup;
    product.body = body;
    product.elektroplating = elektroplating;
    product.isi = isi;
    product.rakit = rakit;
    product.qc = qc;
    product.packing = packing;

    await product.updateByNomorOrder(nomor_order);
    // Check if all stages are finished
    if (
      product.tutup.toString() === "3" &&
      product.body.toString() === "3" &&
      product.elektroplating.toString() === "3" &&
      product.isi.toString() === "3" &&
      product.rakit.toString() === "3" &&
      product.qc.toString() === "3" &&
      product.packing.toString() === "3"
    ) {
      const finishedProduct = new Finished(
        null,
        product.nomor_order,
        product.quantity,
        product.nama_barang,
        product.size
      );
      await finishedProduct.save();
    }

    res.status(200).send("Data berhasil disimpan!");
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).send("Internal Server Error");
  }
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

exports.deleteProduct = async (req, res, next) => {
  try {
    const { nomor_order } = req.params;
    const product = await Product.findByNomorOrder(nomor_order);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    await product.deleteByNomorOrder(nomor_order);
    res.status(200).send("Product deleted successfully");
  } catch (err) {
    next(err);
  }
};

exports.getFinished = (req, res, next) => {
  res.render("finishedProduct", {
    pageTitle: "Finished Product",
    path: "/finished-product",
    currentPage: req.originalUrl,
  });
};

exports.getFinishedProduct = async (req, res, next) => {
  try {
    const finishedProducts = await Finished.fetchAll();
    res.json({ data: finishedProducts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
