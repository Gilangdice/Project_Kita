import { Link } from "react-router";
import { Home } from "lucide-react";

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f3] p-5">
      <div className="text-center">
        {/* Angka Error Besar */}
        <h1 className="text-9xl font-bold text-[#007580]">404</h1>
        
        {/* Pesan Error */}
        <h2 className="text-3xl font-semibold text-[#272343] mt-4 capitalize">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-[#9a9caa] mt-2 mb-8 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan ke alamat lain.
        </p>

        {/* Tombol Kembali ke Home */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-[#007580] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#005f68] transition-all"
        >
          <Home size={20} />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};

export default Error;