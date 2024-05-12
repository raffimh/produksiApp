const db = require("../config/database");
const bcrypt = require("bcrypt");

class User {
  constructor(username, nama, password, role) {
    this.username = username;
    this.nama = nama;
    this.password = password;
    this.role = role;
  }

  static async findByUsername(username) {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );
      if (rows.length > 0) {
        const { id, username, nama, password, role } = rows[0];
        return new User(username, nama, password, role);
      }
      return null;
    } catch (error) {
      throw new Error(`Error fetching user by username: ${error.message}`);
    }
  }

  async comparePassword(password) {
    try {
      const isMatch = await bcrypt.compare(password, this.password);
      return isMatch;
    } catch (error) {
      console.error("Error comparing passwords:", error);
      throw new Error("Error comparing passwords");
    }
  }

  async save() {
    try {
      // Simpan pengguna ke basis data
      await db.execute(
        "INSERT INTO users (username, nama, password, role) VALUES (?, ?, ?, ?)",
        [this.username, this.nama, this.password, this.role]
      );
    } catch (error) {
      throw new Error(`Error saving user: ${error.message}`);
    }
  }
}

module.exports = User;
