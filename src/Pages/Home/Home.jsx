import Banner from "../../Components/Banner/Banner.jsx"

import Brand from "../../Components/Brand/Brand.jsx"
import Features from "../../Components/Features/Features.jsx"
import Recent from "../../Components/Recent/Recent.jsx"



const Home = () => {
  return (
    <div>
      
      {/* banner component */}
      <div className="w-full min-h-[850px] bg-[#f0f2f3] flex items-center justify-center">
        <Banner></Banner>
      </div>

      {/* brand component */}
      <div className="brand flex items-center h-[171px] justify-center w-full mt-8 mb-8">
        <Brand></Brand>
      </div>

      {/* features component */}
      <div className="w-full flex items-center justify-center  pt-[80px] mb-[80px]">
        <Features></Features>
      </div>

      {/* Recent component  */}
      <div className="w-full flex items-center justify-center pb-[80px] pt-[80px]">
        <Recent></Recent>
      </div>

    </div>
  )
}

export default Home;