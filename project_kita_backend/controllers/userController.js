const User = require('../models/User');
const jwt = require('jsonwebtoken'); 

// Fungsi Pembantu: Membuat JWT (token sesi)
const generateToken = (id) => {
    // ID user dimasukkan sebagai payload dalam JWT
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token akan kadaluarsa dalam 30 hari
    });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Cek apakah user sudah terdaftar
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Buat user baru (Password otomatis di-hash oleh pre-save hook di User.js)
        const user = await User.create({ name, email, password }); 

        if (user) {
            // Beri respons sukses beserta token dan status role
            res.status(201).json({
                _id: user._id, 
                name: user.name, 
                email: user.email, 
                isAdmin: user.isAdmin, // False secara default
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // Cek apakah user ditemukan DAN password cocok
        if (user && (await user.matchPassword(password))) {
            // Login sukses, kirim data user dan token baru
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin, // Penting untuk FE membedakan Customer/Admin
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
    // req.user diisi oleh authMiddleware/protect
    if (req.user) {
        res.json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            isAdmin: req.user.isAdmin,
        });
    } else {
        // Seharusnya tidak pernah terjadi jika middleware bekerja
        res.status(404).json({ message: 'User not found' });
    }
};