const db = require("../config/database");

module.exports = class Product {
  constructor(
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
  ) {
    this.nomor_order = nomor_order;
    this.quantity = quantity;
    this.nama_barang = nama_barang;
    this.size = size;
    this.tutup = tutup;
    this.body = body;
    this.elektroplating = elektroplating;
    this.isi = isi;
    this.rakit = rakit;
    this.qc = qc;
    this.packing = packing;
  }

  static async fetchAll() {
    try {
      const [rows] = await db.execute("SELECT * FROM product");
      return rows; // Mengembalikan array objek produk
    } catch (err) {
      throw new Error(`Error fetching products: ${err.message}`);
    }
  }
};
