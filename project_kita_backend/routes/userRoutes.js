const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // <--- TAMBAHKAN INI

const router = express.Router();

// Route Public (Tidak perlu login)
router.post('/register', registerUser); 
router.post('/login', loginUser);

// Route Private (Membutuhkan login/token)
// Gunakan 'protect' sebagai middleware di tengah
router.get('/profile', protect, getUserProfile); // <--- TAMBAHKAN INI

module.exports = router;