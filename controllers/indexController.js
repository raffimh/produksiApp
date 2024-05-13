const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.postLogin = async (req, res) => {
  const { emailUsername, password } = req.body;
  try {
    // Cari user berdasarkan username atau email
    const user = await User.findByUsername(emailUsername);

    if (!user) {
      return res.status(401).send("Invalid username or password");
    }

    // Bandingkan password yang dimasukkan dengan password di database
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).send("Invalid match password");
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      nama: user.nama,
      role: user.role,
    };

    // Jika autentikasi berhasil, lakukan sesuatu (contoh: membuat sesi atau token)
    // kirim respon ke ajax
    // res.redirect("/datatables");
    res
      .status(200)
      .json({ message: "Login successful", user: req.session.user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getIndex = (req, res, next) => {
  res.render("auth", {
    pageTitle: "Login Area",
    path: "/",
  });
};

exports.getRegister = (req, res, next) => {
  res.render("register", {
    pageTitle: "Register",
    path: "/register",
  });
};

exports.register = async (req, res) => {
  const { emailUsername, name, password, role } = req.body;

  try {
    // Periksa apakah pengguna sudah terdaftar berdasarkan username
    const existingUser = await User.findByUsername(emailUsername);

    if (existingUser) {
      return res.status(400).send("Username already exists");
    }

    // Enkripsi password sebelum disimpan ke basis data
    const hashedPassword = await bcrypt.hash(password, 10); // Menggunakan bcrypt untuk mengenkripsi password

    // Buat objek user baru
    const newUser = new User(emailUsername, name, hashedPassword, role);

    // Simpan pengguna baru ke basis data
    await newUser.save();

    // Kirim respons sukses
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(200).json({ message: "Logout successful" });
    }

    res.clearCookie("sid");
    res.redirect("/");
  });
};
