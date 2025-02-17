import { useSelector } from "react-redux";
import RecipeCard from "../components/RecipeCard";

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.recipes.favorites);

  return (
    <div className="min-h-[80vh] mt-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-xl text-gray-500">No favorites found. Start adding some recipes to your favorites!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
