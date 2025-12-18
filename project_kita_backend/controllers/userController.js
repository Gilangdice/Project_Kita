const User = require('../models/User');
const jwt = require('jsonwebtoken'); 

// START PERUBAHAN KRITIS
// Fungsi Pembantu: Membuat JWT (token sesi) - Sekarang menerima objek user lengkap
const generateToken = (user) => {
    return jwt.sign({ 
        id: user._id, 
        role: user.role // Kunci: Memasukkan role ke dalam token payload
    }, process.env.JWT_SECRET, {
        expiresIn: '30d', 
    });
};
// END PERUBAHAN KRITIS

// @desc    Register a new user
// @route   http://localhost:5000/api/users/register
// @route   POST/api/users/register

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Cek apakah user sudah terdaftar
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Buat user baru 
        const user = await User.create({ name, email, password }); 

        if (user) {
            res.status(201).json({
                _id: user._id, 
                name: user.name, 
                email: user.email, 
                // START PERUBAHAN KRITIS
                role: user.role, // Ganti isAdmin menjadi role
                token: generateToken(user), // Kirim objek user lengkap
                // END PERUBAHAN KRITIS
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate user & get token
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                // START PERUBAHAN KRITIS
                role: user.role, // Ganti isAdmin menjadi role
                token: generateToken(user), // Kirim objek user lengkap
                // END PERUBAHAN KRITIS
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
exports.getUserProfile = async (req, res) => {
    if (req.user) {
        res.json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            // START PERUBAHAN KRITIS
            role: req.user.role, // Ganti isAdmin menjadi role
            // END PERUBAHAN KRITIS
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Catatan: Jika Anda ingin menambahkan getAllUsers, Anda bisa menambahkannya di sini.
// @desc    Get all users (Hanya untuk Admin)
// @route   GET /api/users/userslist
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
    // Cari semua user di database, kecuali field password
    // Catatan: Pastikan Anda mengimpor Model User di awal file ini!
    const users = await User.find({}).select('-password'); 
    
    // Beri respons sukses
    res.status(200).json(users);
};