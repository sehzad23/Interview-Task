const Category = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <ul className="no-scrollbar py-5 overflow-y-auto max-h-[calc(100%-2.5rem)] w-full">
      {categories.map((cat, index) => (
        <li
          key={index}
          onClick={() => onSelectCategory(cat)}
          className={`block text-green-900 text-xl mt-5 hover:bg-green-700 hover:text-white p-3 w-full duration-300 pl-5 cursor-pointer ${
            selectedCategory === cat ? "bg-green-700 text-white font-bold" : ""
          }`}
        >
          {cat}
        </li>
      ))}
    </ul>
  );
};
export default Category;
