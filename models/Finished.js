const db = require("../config/database");

module.exports = class Finished {
  constructor(id, nomor_order, quantity, nama_barang, size) {
    this.id = id;
    this.nomor_order = nomor_order;
    this.quantity = quantity;
    this.nama_barang = nama_barang;
    this.size = size;
  }
  static async fetchAll() {
    try {
      const [rows] = await db.execute("SELECT * FROM finished_product");
      return rows;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async findByNomorOrder(nomor_order) {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM finished_product WHERE nomor_order = ?",
        [nomor_order]
      );
      if (rows.length > 0) {
        const { id, nomor_order, quantity, nama_barang, size } = rows[0];
        return new Finished(id, nomor_order, quantity, nama_barang, size);
      }
      return null;
    } catch (err) {
      throw new Error(
        `Error fetching finished product by nomor_order: ${err.message}`
      );
    }
  }

  async save() {
    try {
      const [result] = await db.execute(
        "INSERT INTO finished_product (nomor_order, quantity, nama_barang, size) VALUES (?, ?, ?, ?)",
        [this.nomor_order, this.quantity, this.nama_barang, this.size]
      );
      return result;
    } catch (err) {
      throw new Error(`Error saving finished product: ${err.message}`);
    }
  }
};
