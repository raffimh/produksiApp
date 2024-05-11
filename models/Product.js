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
  async save() {
    try {
      const sql = `
        INSERT INTO product 
        (nomor_order, quantity, nama_barang, size, tutup, body, elektroplating, isi, rakit, qc, packing) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        this.nomor_order,
        this.quantity,
        this.nama_barang,
        this.size,
        this.tutup,
        this.body,
        this.elektroplating,
        this.isi,
        this.rakit,
        this.qc,
        this.packing,
      ];

      const [result] = await db.execute(sql, values);
      return result; // Mengembalikan hasil dari operasi INSERT
    } catch (err) {
      throw new Error(`Error saving product: ${err.message}`);
    }
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
