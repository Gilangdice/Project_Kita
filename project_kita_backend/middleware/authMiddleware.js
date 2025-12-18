const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Cari user di DB. Jika User.js sudah diupdate, ini akan mendapatkan field 'role'
            req.user = await User.findById(decoded.id).select('-password'); 

            next(); 
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// START PERUBAHAN KRITIS
// Middleware Generik untuk Otorisasi Berdasarkan Peran
const authorize = (allowedRoles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    const userRole = req.user.role; // Ambil peran dari objek req.user
    
    // Cek apakah peran user termasuk dalam array peran yang diizinkan
    if (allowedRoles.includes(userRole)) {
        next(); // Lanjutkan
    } else {
        res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
};

// Middleware 'admin' yang disederhanakan (hanya mengecek role 'admin')
const admin = authorize(['admin']);

// Ubah module.exports untuk mengekspor fungsi authorize dan admin yang baru
module.exports = { protect, authorize, admin };
// END PERUBAHAN KRITIS