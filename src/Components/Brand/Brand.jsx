

const Brand = () => {
   const brands = [
        {
            id: 1,
            image: ""
        },
        {
            id: 2,
            image: ""
        },
        {
            id: 3,
            image: ""
        },
        {
            id: 4,
            image: ""
        },
        {
            id: 5,
            image: ""
        },
        {
            id: 6,
            image: ""
        }, 
        {
            id: 7,
            image: ""
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