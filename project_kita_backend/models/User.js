const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Dipakai untuk hashing

// Definisi Schema User
const userSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true,
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    // Field Kunci untuk Multiple Login (false = Customer, true = Admin)
   role: { // Ganti dari isAdmin (Boolean) ke role (String Enum)
        type: String, 
        required: true, 
        enum: ['admin', 'manager', 'user'], // Tambahkan peran lain di sini
        default: 'user' 
    },
}, { 
    timestamps: true // Otomatis menambahkan createdAt dan updatedAt
});

// Middleware Mongoose (Hook): Melakukan Hashing Password sebelum menyimpan User baru
userSchema.pre('save', async function (next) {
    // Hanya lakukan hashing jika password dimodifikasi (atau baru dibuat)
    if (!this.isModified('password')) {
        next();
    }
    // Generate salt dan hash
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Metode untuk membandingkan password yang dimasukkan dengan hash di DB saat Login
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;