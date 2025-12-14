

const Brand = () => {
   const brands = [
        {
            id: 1,
            image: "/src/assets/brand_img.jpg"
        },
        {
            id: 2,
            image: "/src/assets/brand_img.jpg"
        },
        {
            id: 3,
            image: "/src/assets/brand_img.jpg"
        },
        {
            id: 4,
            image: "/src/assets/brand_img.jpg"
        },
        {
            id: 5,
            image: "/src/assets/brand_img.jpg"
        },
        {
            id: 6,
            image: "/src/assets/brand_img.jpg"
        }, 
        {
            id: 7,
            image: "/src/assets/brand_img.jpg"
        },
 
    ]

    return (
        <div className="lg:container mx-auto">
            <div className="grid grid-cols-7 items-center justify-center gap-5">
                {
                    brands?.map((brand) => (
                        <div key={brand?.id} className="brand_item">
                            <img className="w-auto h-auto" src={brand?.image} alt="brand" />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Brand;