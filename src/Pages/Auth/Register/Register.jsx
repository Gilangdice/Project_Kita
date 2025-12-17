import { Link, useNavigate } from "react-router";
import { MoveRight, Eye, EyeOff } from "lucide-react"; 
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  // State untuk data input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State untuk fitur lihat password (masing-masing kolom punya kontrol sendiri)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submitHandle = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Password tidak cocok!");
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        name: username,
        email,
        password,
      });

      alert("Pendaftaran Berhasil!");
      navigate("/auth/login");
    } catch (error) {
      alert(error.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="lg:container mx-auto p-[80px]">
      <div className="max-w-[648px] w-full p-[31px] mx-auto flex items-center justify-center flex-col rounded-lg border-[1px] border-[#9a9caa]">
        <h3 className="text-3xl text-[#272343] font-inter font-semibold mb-5 capitalize">Register</h3>
        
        <form onSubmit={submitHandle} className="flex flex-col items-center w-full space-y-4">
          
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full h-[50px] bg-[#f0f2f3] rounded-lg pl-3.5" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />

          <input 
            type="email" 
            placeholder="Email" 
            className="w-full h-[50px] bg-[#f0f2f3] rounded-lg pl-3.5" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />

          {/* Kolom Password 1 */}
          <div className="relative w-full">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              className="w-full h-[50px] bg-[#f0f2f3] rounded-lg pl-3.5 pr-10" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <div 
              className="absolute right-3 top-3.5 cursor-pointer text-gray-400 hover:text-[#007580]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* Kolom Verifikasi Password dengan Icon Mata Sendiri */}
          <div className="relative w-full">
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="Password Verification" 
              className="w-full h-[50px] bg-[#f0f2f3] rounded-lg pl-3.5 pr-10" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
            <div 
              className="absolute right-3 top-3.5 cursor-pointer text-gray-400 hover:text-[#007580]"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <button type="submit" className="w-full h-[50px] bg-[#007580] rounded-lg text-white font-semibold flex items-center justify-center gap-2.5 cursor-pointer hover:bg-[#005f68] transition-all">
            register <MoveRight />
          </button>
        </form>
        
        <p className="mt-4 flex gap-2.5">
          Already have an account? <Link to={"/auth/login"} className="text-[#007580] font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;