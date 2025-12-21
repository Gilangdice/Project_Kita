import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionTitle from "../SectionTitle/SectionTitle";

const Categories = () => {
  const categories = [
    {
      title: "Wing Chair",
      products: "3,585 Products",
      image: "/src/assets/banner_image.png",
    },
    {
      title: "Wooden Chair",
      products: "185 Products",
      image: "/src/assets/banner_image.png",
    },
    {
      title: "Desk Chair",
      products: "585 Products",
      image: "/src/assets/banner_image.png",
    },
    {
      title: "Park Bench",
      products: "55 Products",
      image: "/src/assets/banner_image.png",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "80px",
  };

  return (
    <section className="pt-8 pb-4">
      <div className="lg:container mx-auto px-4">
        <SectionTitle title="Top Categories" mb="mb-6" />

        <Slider {...settings}>
          {categories.map((category, index) => (
            <div key={index} className="px-3">
              <div className="relative rounded-xl overflow-hidden shadow-lg group">
                {/* image */}
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-[360px] object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* overlay */}
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 p-4">
                  <h4 className="text-white text-xl font-semibold capitalize">
                    {category.title}
                  </h4>
                  <p className="text-sm text-white">
                    {category.products}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Categories;
