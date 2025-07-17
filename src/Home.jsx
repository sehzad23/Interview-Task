import { useState, useEffect, useRef } from "react";
import axios from "axios";
import logo from "./asset/FoodChow-logo.jpg";
import Category from "./componants/Category";
import ItemCard from "./componants/ItemCard";

const Home = () => {
  const [menuData, setMenuData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsContainerRef = useRef(null);

  const removeFromCart = (indexToRemove) => {
    setCartItems((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + Number(item.Price),
    0
  );

  const categoryList = menuData.map((cat) => cat.CategryName);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setIsMenuOpen(false);
    setSearchQuery(""); // Clear search when selecting a category
    const section = itemsContainerRef.current.querySelector(
      `[data-category="${cat}"]`
    );
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://www.foodchow.com/api/FoodChowWD/GetRestaurantMenuWDWidget_multi?ShopId=3161&locale_id=null"
      )
      .then((res) => {
        const parsed = JSON.parse(res.data.data);
        setMenuData(parsed.CategoryList || []);
        if (parsed.CategoryList && parsed.CategoryList.length > 0) {
          setSelectedCategory(parsed.CategoryList[0].CategryName);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Filter menu items based on search query
  const filteredMenuData = searchQuery
    ? [
        {
          CategryName: "Search Results",
          ItemListWidget: menuData
            .flatMap((cat) => cat.ItemListWidget || [])
            .filter((item) =>
              item.ItemName.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        },
      ]
    : menuData;

  return (
    <div className="h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-gray-100 py-2 px-4 sm:px-7 shadow-xl flex justify-between items-center">
        <div className="flex items-center gap-4 sm:gap-12">
          <img
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
            src={logo}
            alt="FoodChow Logo"
          />
          <div>
            <h1 className="font-bold text-lg sm:text-2xl text-gray-800">
              Food Chow Demo India
            </h1>
            <p className="text-sm sm:text-base">Surat, Gujarat, India</p>
          </div>
        </div>

        {/* Hamburger Icon */}
        <button
          className="sm:hidden text-green-800 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* Desktop Navbar Buttons */}
        <div className="hidden sm:flex gap-3">
          <button className="font-semibold text-green-800 bg-transparent border text-sm border-green-700 px-3 py-2 rounded-2xl hover:bg-green-700 hover:text-white duration-300">
            Choose Service
          </button>
          <button className="font-semibold text-green-800 bg-transparent border text-sm border-green-700 px-3 py-2 rounded-2xl hover:bg-green-700 hover:text-white duration-300">
            Book Now
          </button>
          <button className="font-semibold text-green-800 bg-transparent border text-sm border-green-700 px-3 py-2 rounded-2xl hover:bg-green-700 hover:text-white duration-300">
            9367895241
          </button>
          <button className="font-semibold text-green-800 bg-transparent border text-sm border-green-700 px-3 py-2 rounded-2xl hover:bg-green-700 hover:text-white duration-300">
            en
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden fixed inset-0 bg-gray-800 bg-opacity-90 z-50 flex flex-col items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close mobile menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex flex-col gap-4 text-center">
            <button
              className="font-semibold text-white text-lg px-3 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Choose Service
            </button>
            <button
              className="font-semibold text-white text-lg px-3 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Now
            </button>
            <button
              className="font-semibold text-white text-lg px-3 py-2"
              onClick={() => {
                setIsMenuOpen(false);
                window.location.href = "tel:9367895241";
              }}
            >
              9367895241
            </button>
            <button
              className="font-semibold text-white text-lg px-3 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              en
            </button>
          </div>
        </div>
      )}

      {/* Restaurant Status */}
      <div className="text-center py-2 bg-gray-100">
        <h2 className="text-green-600 font-semibold text-sm sm:text-base">
          Restaurant is Open
        </h2>
        <p className="font-bold text-sm sm:text-base text-gray-500">
          Timing 11:30 am - 04:00 pm
        </p>
      </div>

      {/* Menu Nav */}
      <div className="menu">
        <ul className="flex p-3 sm:p-5 gap-3 sm:gap-5 justify-center flex-wrap">
          <li className="font-semibold text-green-800 bg-transparent border text-sm sm:text-base border-green-700 p-2 sm:p-3 rounded-2xl hover:bg-green-700 hover:text-white duration-300">
            Main Menu
          </li>
          <li className="font-semibold text-green-800 bg-transparent border text-sm sm:text-base border-green-700 p-2 sm:p-3 rounded-2xl hover:bg-green-700 hover:text-white duration-300">
            Breakfast
          </li>
          <li className="font-semibold text-green-800 bg-transparent border text-sm sm:text-base border-green-700 p-2 sm:p-3 rounded-2xl hover:bg-green-700 hover:text-white duration-300">
            Dinner Menu
          </li>
        </ul>
      </div>

      {/* Search Bar */}
      <div className="p-3 sm:p-5 bg-gray-100">
        <div className="relative max-w-lg mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search menu items..."
            className="w-full p-3 pr-10 text-sm sm:text-base border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-700"
            aria-label="Search menu items"
          />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="main bg-gray-200 w-full min-h-[calc(100vh-200px)] p-3 sm:p-5 flex flex-col lg:flex-row justify-between gap-3 sm:gap-5">
        {/* Sidebar Box1 */}
        <div className="box1 no-scrollbar bg-white w-full lg:w-[24%] h-auto lg:h-[90vh] rounded-2xl border-2 border-gray-300 py-4 overflow-y-auto">
          <h1 className="font-bold text-xl text-green-700 h-10 pl-5 border-b border-dashed border-gray-400 sticky top-0 bg-white z-10">
            CATEGORIES
          </h1>
          <Category
            categories={categoryList}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryClick}
          />
        </div>

        {/* Items Box2 */}
        <div
          className="no-scrollbar box2 bg-white w-full lg:w-[50%] h-auto lg:h-[90vh] rounded-2xl border-2 border-gray-300 overflow-y-auto"
          ref={itemsContainerRef}
        >
          <ItemCard
            menuData={filteredMenuData}
            setSelectedCategory={setSelectedCategory}
            addToCart={addToCart}
          />
        </div>

        {/* Cart Box3 */}
        <div className="no-scrollbar box3 bg-white w-full lg:w-[24%] h-auto lg:h-[90vh] rounded-2xl border-2 border-gray-300 p-4 overflow-y-auto">
          <h2 className="font-bold text-xl text-green-700 mb-4">Add to Cart</h2>
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <img
                src="https://foodchowdemoindia.foodchow.com/angular/v2/assets/Images/empty.png"
                alt="Empty Cart"
                className="w-40 h-40 object-contain"
              />
              <p className="mt-3 text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="mb-3 border-b pb-2 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.ItemName}
                    </p>
                    <p className="text-green-700">Rs.{item.Price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-600 font-bold hover:text-red-800"
                    aria-label={`Remove ${item.ItemName} from cart`}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <div className="border-t pt-3 mt-4">
                <h3 className="font-bold text-lg text-green-800">
                  Total: Rs.{totalAmount}
                </h3>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
