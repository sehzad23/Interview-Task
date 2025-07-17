import { useEffect, useRef } from "react";

const ItemCard = ({ menuData, setSelectedCategory, addToCart }) => {
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const catName = visibleEntry.target.getAttribute("data-category");
          if (catName) {
            setSelectedCategory(catName);
          }
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -60% 0px",
        threshold: 0.1,
      }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [menuData]);

  return (
    <div className="p-5 w-full h-full">
      {menuData.map((category, index) => (
        <div
          key={index}
          ref={(el) => (sectionRefs.current[category.CategryName] = el)}
          data-category={category.CategryName}
          className="mb-10 "
        >
          <h2 className="text-2xl font-bold mb-3 text-green-800 border-b pb-1 border-dashed">
            {category.CategryName}
          </h2>
          {category.ItemListWidget?.length > 0 ? (
            category.ItemListWidget.map((item, i) => (
              <div
                key={i}
                className="bg-white  shadow-xl mt-5 p-4 rounded w-full flex flex-col sm:flex-row justify-between items-center"
              >
                <div className="flex  w-full lg:gap-4  gap-3 ">
                  <div className="imag">
                    {item.ItemImage ? (
                      <img
                        src={`https://www.foodchow.com/FoodItemImages/${item.ItemImage}`}
                        alt={""}
                        className="w-24 h-24  lg:w-30 lg:h-30 object-cover rounded-xl hover:scale-105 duration-300"
                      />
                    ) : (
                      <div className="w-30 h-30 lg:w-30 lg:h-30  rounded-xl"></div>
                    )}
                  </div>

                  <div className="sm:w-full mt-9">
                    <h2 className="lg:text-lg sm:text-xl sm:w-full font-bold lg:text-start sm:text-center">
                      {item.ItemName}
                    </h2>
                    <p className="text-green-700 font-semibold lg:text-start sm:text-center">
                      Rs.{item.Price}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-3 sm:mt-0 bg-transparent border-green-700 border-2 text-green-700 px-3 py-1 rounded-full hover:bg-green-700 hover:text-white duration-300"
                >
                  Add
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No items in this category.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemCard;
