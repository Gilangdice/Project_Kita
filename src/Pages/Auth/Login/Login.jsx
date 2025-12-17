import { Link, useNavigate } from "react-router";
import { MoveRight, Eye, EyeOff } from "lucide-react"; // Tambahkan icon mata
import { useState } from "react"; // Untuk menangkap ketikan user
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  // --- [PENANDA: STATE BARU] ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Untuk fitur lihat password

  const submitHandle = async (e) => {
    e.preventDefault(); // Mencegah halaman refresh

    try {
      // --- [PENANDA: KONEKSI KE BACKEND] ---
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      // Simpan data login (Token & Role) ke memori browser
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      alert("Login Berhasil!");
      navigate("/"); // Pindah ke halaman utama
    } catch (error) {
      alert(error.response?.data?.message || "Email atau Password salah!");
    }
  };

  return (
    <div className="lg:container mx-auto p-[80px]">
      <div className="max-w-[648px] w-full min-h-[382px] p-[31px] mx-auto flex items-center justify-center flex-col rounded-lg border-[1px] border-[#9a9caa]">
        <h3 className="text-3xl text-[#272343] font-inter font-semibold mb-5 capitalize">Login</h3>
        
        <form onSubmit={submitHandle} className="flex flex-col items-center w-full space-y-4">
          
          {/* Input Email dengan format wajib email */}
          <input 
            type="email" // Penanda: Otomatis validasi format email
            placeholder="Email" 
            className="w-full h-[50px] bg-[#f0f2f3] rounded-lg pl-3.5" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required // Penanda: Wajib diisi
          />

          {/* Input Password dengan Icon Mata */}
          <div className="relative w-full">
            <input 
              type={showPassword ? "text" : "password"} // Berubah saat icon diklik
              placeholder="Password" 
              className="w-full h-[50px] bg-[#f0f2f3] rounded-lg pl-3.5 pr-10" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            {/* Tombol Icon Mata */}
            <div 
              className="absolute right-3 top-3.5 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <button type="submit" className="w-full h-[50px] bg-[#007580] rounded-lg text-white font-inter font-semibold capitalize flex items-center justify-center cursor-pointer gap-2.5">
            login <MoveRight />
          </button>
        </form>

        <p className="text-[#272343] text-base font-inter font-normal mt-4 flex items-center justify-center gap-2.5">
          Don't have an account? <Link to={"/auth/register"} className="text-[#007580]">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;