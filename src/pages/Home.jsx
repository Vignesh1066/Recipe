import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite} from "../redux/favoritesSlice";
import { toast } from "react-toastify";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const dispatch = useDispatch();
  const { searchQuery, favorites } = useSelector((state) => state.recipes);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=cb482247826647cfbdd5fd68daa87eaf"
      );
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
  }, [favorites]);

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

  return (
    <>
    <div className="w-full">
      <HeroSection />
    </div>
    <div className=" mx-auto p-4 mt-6">
      <h1 className="text-3xl font-bold mb-6">Our Recipes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="relative">
            <RecipeCard recipe={recipe} onFavoriteToggle={handleFavorite} />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Home;
