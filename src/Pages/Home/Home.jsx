
const Home = () => {
  return (
    <div>

      {/* brand component */}
      <div className="brand flex items-center h-[171px] justify-center w-full mt-8 mb-8">
        <Brand></Brand>
      </div>
      {/* features component */}
      <div className="w-full flex items-center justify-center mb-[80px]">
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