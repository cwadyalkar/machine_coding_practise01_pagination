import React, { useState, useEffect } from "react";
import axios from "axios";
const Page = () => {
  const [products, setproducts] = useState([]);
  const [page, setpage] = useState(1);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      const productData = response.data.products;
      console.log(productData);
      setproducts(productData);
    } catch (error) {
      console.log(error);
    }
  };
  const selectselectedPage = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage != page
    )
      setpage(selectedPage);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {products.length > 0 && (
        <div className="grid text-gray-700 grid-cols-1 md:grid-cols-3 gap-5 p-0 m-[30px]">
          {products.slice(page * 10 - 10, page * 10).map((item) => (
            <div
              className="  bg-gray-100 flex flex-col items-center justify-center  p-5 text-center rounded-md pointer"
              key={item.id}
            >
              <h1 className=" font-semibold">{item.title}</h1>
              <img
                className="w-[50%] h-[95%]"
                src={item.thumbnail}
                alt={item.title}
              />
            </div>
          ))}
        </div>
      )}
      <div className="p-3  my-4 mx-0 flex justify-center">
        <span
          onClick={() => selectselectedPage(page - 1)}
          className={`py-3 px-5 border cursor-pointer ${
            page > 1 ? "" : "opacity-0"
          }`}
        >
          ◀️
        </span>
        {[...Array(products.length / 10)].map((_, i) => {
          return (
            <span
              onClick={() => selectselectedPage(i + 1)}
              className={`py-3 px-5 border cursor-pointer ${
                page == i + 1 ? `bg-gray-200` : ""
              }`}
            >
              {i + 1}
            </span>
          );
        })}
        <span
          onClick={() => selectselectedPage(page + 1)}
          className={`py-3 px-5 border cursor-pointer ${
            page < products.length / 10 ? "" : "opacity-0"
          }`}
        >
          ▶️
        </span>
      </div>
    </div>
  );
};

export default Page;
