import { Armchair, Check, Info, Search, ShoppingCart, Heart, User, Menu, LogOut, UserCircle } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router"; // Tambah useNavigate

const Navbar = () => {
  const navigate = useNavigate();
  
  // --- LOGIKA PENGECEKAN LOGIN ---
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("Berhasil Logout!");
    navigate("/auth/login");
  };

  return (
    <div>
      {/* top navbar*/}
      <div className="navbar_top flex items-center justify-center bg-[#272343] h-[45px] w-full">
        <div className="lg:container flex justify-between items-center px-4">
          <p className="flex items-center gap-2 text-sm font-inter font-normal text-white capitalize">
            <Check size={16}/> Free on all orders over $50
          </p>
          <div className="navbar_top_right flex items-center gap-6">
            <select defaultValue="eng" className="bg-transparent border-none text-sm font-inter font-normal capitalize text-white outline-none cursor-pointer">
              <option value="eng" className="text-black">eng</option>
              <option value="ind" className="text-black">ind</option>
            </select>
            <Link to="/faqs" className="text-sm text-white font-inter font-normal capitalize">faqs</Link>
            <Link to="/help" className="flex items-center gap-1 text-sm text-white font-inter font-normal capitalize">
              <Info size={15} /> help
            </Link>
          </div>
        </div>
      </div>

      {/*middle navbar*/}
      <div className="navbar_middle flex items-center justify-center bg-[#f0f2f3] h-[84px] w-full">
        <div className="lg:container grid grid-cols-[1fr_2fr_1fr] items-center px-4">
          <div className="logo_wrapper">
            <Link to="/" className="text-3xl text-black font-inter font-medium capitalize flex items-center gap-2">
              <Armchair size="2rem" color="#029fae" />comforty
            </Link>
          </div>

          <div className="search_box hidden md:flex justify-center flex-1 max-w-md mx-8">
            <form className="w-full max-w-[443px] h-[44px] relative">
              <input type="text" placeholder="Search here..." className="w-full h-full bg-white rounded-lg pl-4 outline-[#029fae]" />
              <button type="button" className="absolute top-1/2 right-4 -translate-y-1/2">
                <Search size="22px" color="#272343"/>
              </button>
            </form>
          </div>

          <div className="navbar_middle_right flex items-center gap-4 justify-end">
            <button className="btn bg-white border-none hover:bg-gray-200 capitalize flex items-center gap-3 shadow-sm">
              <ShoppingCart size={20}/> cart <div className="badge border-none text-white bg-[#029fae]">2</div>
            </button>
            <button className="btn bg-white border-none hover:bg-gray-200 shadow-sm">
              <Heart size={20}/>
            </button>

            {/* --- DROPDOWN USER (BAGIAN YANG DIUBAH) --- */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className={`btn m-1 border-none shadow-sm ${token ? 'bg-[#029fae] text-white' : 'bg-white'}`}>
                <User size={20}/>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[100] w-52 p-2 shadow-lg border border-gray-100">
                {token ? (
                  <>
                    <li className="menu-title text-[#272343]">My Profile</li>
                    <li><Link to="/profile" className="flex items-center gap-2"><UserCircle size={18}/> Account</Link></li>
                    {userRole === 'admin' && <li><Link to="/admin" className="text-orange-600 font-bold">Admin Panel</Link></li>}
                    <hr className="my-1"/>
                    <li><button onClick={handleLogout} className="flex items-center gap-2 text-red-500"><LogOut size={18}/> Logout</button></li>
                  </>
                ) : (
                  <>
                    <li className="menu-title text-[#272343]">Welcome!</li>
                    <li><Link to="/auth/login" className="hover:text-[#029fae]">Login</Link></li>
                    <li><Link to="/auth/register" className="hover:text-[#029fae]">Register</Link></li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/*bottom navbar*/}
      <div className="navbar_bottom flex items-center justify-center w-full h-[75px] bg-white border-b-[1px] border-[#e1e3e5]">
        <div className="lg:container flex items-center justify-between px-4">
          <div className="navbar_bottom_left flex items-center gap-8">
            <div className="dropdown dropdown-start">
              <div tabIndex={0} role="button" className="btn bg-white border border-[#e1e3e5] hover:bg-gray-50 m-1 flex items-center gap-3 capitalize font-medium">
                <Menu size={20}/> all categories
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[100] w-52 p-2 shadow-lg border border-gray-100 capitalize">
                <li><a>top clothes</a></li>
                <li><a>bottom clothes</a></li>
                <li><a>accessories</a></li>
              </ul>
            </div>
            <nav className="flex items-center gap-8">
              <NavLink to="/" className={({isActive}) => `text-sm font-medium capitalize ${isActive ? 'text-[#029fae]' : 'text-[#636270]'}`}>home</NavLink>
              <NavLink to="/shop" className="text-sm text-[#636270] hover:text-[#029fae] font-medium capitalize">shop</NavLink>
              <NavLink to="/about" className="text-sm text-[#636270] hover:text-[#029fae] font-medium capitalize">about</NavLink>
            </nav>
          </div>
          <div className="navbar_bottom_right hidden sm:block"> 
            <p className="text-sm text-[#636270] font-medium">Contact: <span className="text-[#272343] font-semibold">(+62) 856-2134-5122</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;