const Category = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <ul className="py-2 overflow-auto max-h-[calc(100%-2rem)] .no-scrollbar">
      {categories.map((cat, index) => (
        <li
          key={index}
          onClick={() => onSelectCategory(cat)}
          className={` .no-scrollbar  text-xl py-1 px-2 cursor-pointer ${
            selectedCategory === cat
              ? "bg-green-700 text-white font-semibold"
              : "text-green-800 hover:bg-green-100"
          }`}
        >
          {cat}
        </li>
      ))}
    </ul>
  );
};

export default Category;
