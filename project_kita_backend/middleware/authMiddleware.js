// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import model User

const protect = async (req, res, next) => {
    let token;

    // 1. Cek apakah token ada di header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Ambil token dari header (setelah 'Bearer ')
            token = req.headers.authorization.split(' ')[1];

            // Verifikasi token dan dapatkan ID user
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Cari user di DB (tanpa field password)
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Lanjut ke fungsi controller berikutnya
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Middleware untuk membatasi akses hanya untuk Admin
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // Lanjut jika user adalah admin
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, admin };