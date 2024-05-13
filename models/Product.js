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
    packing,
    selesai
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
    this.selesai = selesai;
  }
  async updateByNomorOrder(nomor_order) {
    try {
      const sql = `
        UPDATE product 
        SET quantity = ?, nama_barang = ?, size = ?, tutup = ?, body = ?, elektroplating = ?, isi = ?, rakit = ?, qc = ?, packing = ?, selesai = ?
        WHERE nomor_order = ?
      `;
      const values = [
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
        this.selesai,
        nomor_order,
      ];

      const [result] = await db.execute(sql, values);
      return result; // Mengembalikan hasil dari operasi UPDATE
    } catch (err) {
      throw new Error(`Error updating product: ${err.message}`);
    }
  }

  static async findByNomorOrder(nomor_order) {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM product WHERE nomor_order = ?",
        [nomor_order]
      );
      if (rows.length > 0) {
        const {
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
          selesai,
        } = rows[0];
        return new Product(
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
          selesai
        );
      }
      return null;
    } catch (err) {
      throw new Error(`Error fetching product by nomor_order: ${err.message}`);
    }
  }

  async save() {
    try {
      const sql = `
        INSERT INTO product 
        (nomor_order, quantity, nama_barang, size, tutup, body, elektroplating, isi, rakit, qc, packing, selesai) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        0,
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

  async deleteByNomorOrder(nomor_order) {
    try {
      const sql = "DELETE FROM product WHERE nomor_order = ?";
      const [result] = await db.execute(sql, [nomor_order]);
      return result; // Mengembalikan hasil dari operasi DELETE
    } catch (err) {
      throw new Error(`Error deleting product: ${err.message}`);
    }
  }
};
