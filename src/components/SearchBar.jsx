import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipes } from "../redux/favoritesSlice";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchRecipes(searchQuery));
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search recipes..."
        className="p-2 rounded text-black"
      />
      <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded text-black">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
