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

  const totalAmount = cartItems.reduce((acc, item) => acc + Number(item.Price), 0);

  const categoryList = menuData.map((cat) => cat.CategryName);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setIsMenuOpen(false);
    setSearchQuery("");
    const section = itemsContainerRef.current.querySelector(`[data-category="${cat}"]`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    axios
      .get("https://www.foodchow.com/api/FoodChowWD/GetRestaurantMenuWDWidget_multi?ShopId=3161&locale_id=null")
      .then((res) => {
        const parsed = JSON.parse(res.data.data);
        setMenuData(parsed.CategoryList || []);
        if (parsed.CategoryList && parsed.CategoryList.length > 0) {
          setSelectedCategory(parsed.CategoryList[0].CategryName);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredMenuData = searchQuery
    ? [
        {
          CategryName: "Search Results",
          ItemListWidget: menuData
            .flatMap((cat) => cat.ItemListWidget || [])
            .filter((item) => item.ItemName.toLowerCase().includes(searchQuery.toLowerCase())),
        },
      ]
    : menuData;

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navbar */}
      <nav className="w-full bg-gray-100 py-3 px-4 sm:px-6  flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-4 ">
          <img className="w-20 h-20 object-contain" src={logo} alt="FoodChow Logo" />
          <div>
            <h1 className="font-bold text-sm sm:text-lg text-gray-800">FoodChow Demo India</h1>
            <p className="text-xs sm:text-sm text-gray-600">Surat, Gujarat, India</p>
          </div>
        </div>

  {/* Restaurant Status */}
      <div className="text-center py-2 bg-gray-100 ">
        <h2 className="text-green-700 font-semibold text-sm sm:text-base inline-flex items-center gap-1">
          Restaurant is Open
        </h2>
        <p><span className="text-gray-500">Timing - Open 24 Hours</span>  <span className="text-gray-400">ⓘ</span></p>
      </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="text-xs sm:text-sm font-semibold hover:text-white duration-300 text-green-800 border-2 border-green-800 px-2 py-3 rounded-full  hover:bg-green-800">Choose Service</button>
          <button className="text-xs sm:text-sm font-semibold text-green-800 hover:text-white duration-300 border-green-800 border-2 px-2 py-3 rounded-full hover:bg-green-800">Book Now</button>
          <button className="text-xs sm:text-sm font-semibold text-green-800 border-green-800 hover:text-white duration-300 border-2 px-2 py-3 rounded-full hover:bg-green-800">6351985157</button>
          <button className="text-xs sm:text-sm font-semibold border-green-800 border-2 hover:text-white duration-300 text-green-800 px-2 py-3 rounded-full hover:bg-green-800">en</button>
        </div>
        <button className="sm:hidden text-green-700 focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMenuOpen}>
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden fixed inset-0 bg-gray-800 bg-opacity-95 z-50 flex flex-col items-center justify-center">
          <button className="absolute top-4 right-4 text-white" onClick={() => setIsMenuOpen(false)} aria-label="Close mobile menu">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex flex-col gap-3 text-center">
            <button className="font-semibold text-white text-lg px-4 py-2" onClick={() => setIsMenuOpen(false)}>Choose Service</button>
            <button className="font-semibold text-white text-lg px-4 py-2" onClick={() => setIsMenuOpen(false)}>Book Now</button>
            <button className="font-semibold text-white text-lg px-4 py-2" onClick={() => { setIsMenuOpen(false); window.location.href = "tel:6351985157"; }}>6351985157</button>
            <button className="font-semibold text-white text-lg px-4 py-2" onClick={() => setIsMenuOpen(false)}>en</button>
          </div>
        </div>
      )}

    

      {/* Menu Nav */}
      <div className="bg-white p-2 sm:p-4">
        <ul className="flex justify-center gap-2 sm:gap-4 flex-wrap">
          <li className="font-semibold text-green-800 bg-transparent border border-green-700 text-xs sm:text-sm px-3 py-1 rounded-full hover:bg-green-700 hover:text-white transition duration-300">Main Menu</li>
          <li className="font-semibold text-green-800 bg-transparent border border-green-700 text-xs sm:text-sm px-3 py-1 rounded-full hover:bg-green-700 hover:text-white transition duration-300">Breakfast</li>
          <li className="font-semibold text-green-800 bg-transparent border border-green-700 text-xs sm:text-sm px-3 py-1 rounded-full hover:bg-green-700 hover:text-white transition duration-300">Dinnermenu</li>
        </ul>
      </div>

    

      {/* Main Content */}
      <div className="bg-gray-100 p-2 sm:p-4 flex flex-col lg:flex-row gap-2 sm:gap-4">
        {/* Sidebar Box1 */}
        <div className=".no-scrollbar  bg-white w-full lg:w-[22%] h-auto max-h-[70vh] rounded-lg border border-gray-300 p-2 ">
          <h1 className="font-bold text-lg text-green-700 mb-2">CATEGORIES</h1>
          <Category categories={categoryList} selectedCategory={selectedCategory} onSelectCategory={handleCategoryClick} />
        </div>

        {/* Items Box2 */}
            {/* Search Bar */}
      <div className="p-5 sm:p-4 bg-white w-[55%] overflow-auto  ">
        <div className="relative max-w-md   p-5 ">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for dishes..."
            className="w-[45rem] p-5   text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
            aria-label="Search menu items"
          />
        </div>
        <div className="bg-white w-full lg:w-[100%] h-auto max-h-[70vh] rounded-lg border border-gray-300 p-2 overflow-y-auto no-scrollbar" ref={itemsContainerRef}>
          <ItemCard menuData={filteredMenuData} setSelectedCategory={setSelectedCategory} addToCart={addToCart} />
        </div>
      </div>

        {/* Cart Box3 */}
        <div className="bg-white w-full no-scrollbar lg:w-[22%] h-auto max-h-[70vh] rounded-lg border border-gray-300 p-2 overflow-y-auto">
          
          <h2 className="font-bold text-lg text-green-700 mb-2">Your Cart</h2>
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <img src="https://foodchowdemoindia.foodchow.com/angular/v2/assets/Images/empty.png" alt="Empty Cart" className="w-24 h-24 object-contain mb-2" />
              <p className="text-gray-500 text-sm">Your cart is empty! Add some</p>
              <p className="text-gray-500 text-sm">delicious food items and satisfy</p>
              <p className="text-gray-500 text-sm">your cravings. 😊</p>
            </div>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <div key={index} className="mb-2 border-b pb-2 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{item.ItemName}</p>
                    <p className="text-green-700 text-sm">Rs.{item.Price}</p>
                  </div>
                  <button onClick={() => removeFromCart(index)} className="text-red-600 font-bold hover:text-red-800" aria-label={`Remove ${item.ItemName} from cart`}>✕</button>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <h3 className="font-bold text-base text-green-800">Total: Rs.{totalAmount}</h3>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;