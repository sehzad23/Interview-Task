import { useEffect, useRef } from "react";

const ItemCard = ({ menuData, setSelectedCategory, addToCart }) => {
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const catName = visibleEntry.target.getAttribute("data-category");
          if (catName) setSelectedCategory(catName);
        }
      },
      { root: null, rootMargin: "0px 0px -60% 0px", threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [menuData, setSelectedCategory]);

  return (
    <div className="p-2">
      {menuData.map((category, index) => (
        <div
          key={index}
          ref={(el) => (sectionRefs.current[category.CategryName] = el)}
          data-category={category.CategryName}
          className="mb-4"
        >
          <h2 className="text-lg font-bold mb-2 text-green-800 border-b border-dashed pb-1">
            {category.CategryName}
          </h2>
          {category.ItemListWidget?.length > 0 ? (
            category.ItemListWidget.map((item, i) => (
              <div
                key={i}
                className="bg-white shadow-md mb-2 p-2 rounded-lg flex items-center justify-between "
              >
                <div className="flex items-center gap-2">
                  {item.ItemImage ? (
                    <img
                      src={`https://www.foodchow.com/FoodItemImages/${item.ItemImage}`}
                      alt={item.ItemName}
                      className="w-30 h-30 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded"></div>
                  )}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                      {item.ItemName}
                    </h3>
                    <p className="text-green-700 text-sm">Rs.{item.Price}</p>
                    {item.Stock === 0 && (
                      <span className="text-red-500 text-xs font-medium">
                        Sold Out
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    item.Stock === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-green-700 text-white hover:bg-green-800"
                  }`}
                  disabled={item.Stock === 0}
                >
                  Add
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No items in this category.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemCard;
