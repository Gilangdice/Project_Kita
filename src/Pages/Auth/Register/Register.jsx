import {Link, useNavigate} from "react-router"
import {MoveRight} from "lucide-react"

const Register = () => {

  const navigate = useNavigate();

  const submitHandle = () => {
    navigate("/");
  }
  return (
    <div className="lg:container mx-auto p-[80px]">
      <div className="max-w-[648px] w-full min-h-[382px] p-[31px] mx-auto flex items-center justify-center flex-col rounded-lg border-[1px] border-[#9a9caa]">
        <h3 className="text-3xl text-[#272343] font-inter font-semibold mb-5 capitalize">Register</h3>
        <form action="#" onSubmit={submitHandle} className=" flex flex-col items-center w-full space-y-4">
          <input type="text" placeholder="Username" className="w-full h-[50px] bg-[#f0f2f3] rounded-lg pl-3.5" />
          <input type="email" placeholder="Email" className="w-full h-[50px] bg-[#f0f2f3] rounded-lg pl-3.5" />
          <input type="password" placeholder="Password" className="w-full h-[50px] bg-[#f0f2f3] rounded-lg pl-3.5" />
          <button type="submit" className="w-full h-[50px] bg-[#007580] rounded-lg pl-3.5 text-base text-white font-inter font-semibold capitalize flex items-center justify-center cursor-pointer gap-2.5">register<MoveRight /></button>
        </form>
        <p className="text-[#272343] text-base font-inter font-normal mt-4 flex items-center justify-center gap-2.5">Already have an account? <Link to={"/auth/login"} className="text-[#007580]">Login</Link></p>
      </div>
    </div>
  )
}

export default Register;