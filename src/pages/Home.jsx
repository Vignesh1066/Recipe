import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";
import { toast } from "react-toastify";
import HeroSection from "../components/HeroSection";
import { FaUtensils, FaCoffee, FaHamburger, FaDrumstickBite, FaFilter } from "react-icons/fa";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dispatch = useDispatch();
  const { searchQuery, favorites } = useSelector((state) => state.recipes);

  const fetchRecipes = async () => {
    try {
      let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=068d134bfa72449796edd5e551457e1e`;

      if (selectedFilter !== "all") {
        url += `&type=${selectedFilter}`;
      }

      const response = await axios.get(url);
      const fetchedRecipes = response.data.results;

      const updatedRecipes = fetchedRecipes.map((recipe) => ({
        ...recipe,
        isFavorite: favorites.includes(recipe.id),
      }));

      setRecipes(updatedRecipes);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch recipes!");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [favorites, selectedFilter]);

  const handleFavorite = (recipe) => {
    if (recipe.isFavorite) {
      dispatch(removeFavorite(recipe.id));
      setRecipes((prevRecipes) =>
        prevRecipes.map((r) =>
          r.id === recipe.id ? { ...r, isFavorite: false } : r
        )
      );
      toast.success(`${recipe.title} removed from favorites`);
    } else {
      dispatch(addFavorite(recipe));
      setRecipes((prevRecipes) =>
        prevRecipes.map((r) =>
          r.id === recipe.id ? { ...r, isFavorite: true } : r
        )
      );
      toast.success(`${recipe.title} added to favorites`);
    }
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filters = [
    { id: "all", label: "All", icon: <FaUtensils /> },
    { id: "breakfast", label: "Breakfast", icon: <FaCoffee /> },
    { id: "lunch", label: "Lunch", icon: <FaHamburger /> },
    { id: "dinner", label: "Dinner", icon: <FaDrumstickBite /> },
  ];

  return (
    <>
      <div className="w-full">
        <HeroSection />
      </div>

      <div className="fixed bottom-6 z-50 right-6 md:hidden">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)} 
          className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition duration-300"
        >
          <FaFilter size={24} />
        </button>
      </div>

      {/* Mobile View: Filter */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center md:hidden">
          <div className="bg-white w-80 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Filter Recipes</h2>
            <div className="space-y-4">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => {
                    setSelectedFilter(filter.id);
                    setIsFilterOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition ${
                    selectedFilter === filter.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <span className="text-lg">{filter.icon}</span>
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsFilterOpen(false)} 
              className="mt-4 w-full text-center text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}


      <div className="mx-auto p-4 mt-6">
        <h1 className="text-3xl font-bold mb-6 xl:mb-2">Our Recipes</h1>

        <div className="hidden md:flex justify-center mb-5 mt-4 xl:mt-1 px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 bg-white shadow-md p-2 md:p-3 rounded-lg w-full md:w-auto overflow-x-auto no-scrollbar">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium whitespace-nowrap transition ${
                  selectedFilter === filter.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <span className="text-lg">{filter.icon}</span>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div key={recipe.id} className="relative">
                <RecipeCard recipe={recipe} onFavoriteToggle={handleFavorite} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No recipes found for {selectedFilter}.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
