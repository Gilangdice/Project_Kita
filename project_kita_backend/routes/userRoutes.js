const express = require('express');
// PASTIKAN Anda mengimpor getAllUsers di sini:
const { registerUser, loginUser, getUserProfile, getAllUsers } = require('../controllers/userController'); 
// Mengimpor middleware (pastikan Anda sudah menerapkan authorize dan admin di authMiddleware.js)
const { protect, authorize, admin } = require('../middleware/authMiddleware'); 

const router = express.Router();

// Route Public 
router.post('/register', registerUser); 
router.post('/login', loginUser);

// Route Private 
router.get('/profile', protect, getUserProfile); 

// Baris ini yang menyebabkan error (sekarang sudah ada controller getAllUsers)
// Route yang hanya bisa diakses oleh Admin
router.get('/userslist', protect, admin, getAllUsers); 

module.exports = router;