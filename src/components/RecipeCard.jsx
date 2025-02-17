import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const RecipeCard = ({ recipe, onFavoriteToggle }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-md hover:shadow-gray-500 duration-300 bg-white">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="font-bold text-lg h-16 overflow-hidden">{recipe.title}</h3>

        <Link to={`/recipe/${recipe.id}`} className="text-blue-600 mt-2 block">
          <button className="text-lg text-blue-500 hover:text-blue-700 transition-colors">
            View Recipe
          </button>
        </Link>
      </div>

      <div className="absolute bottom-3 right-2">
        <button
          onClick={() => onFavoriteToggle(recipe)}
          className="text-xl transition-colors duration-300"
        >
          {recipe.isFavorite ? (
            <FaHeart className="text-red-500 hover:text-red-700" />
          ) : (
            <FaRegHeart className="text-gray-500 hover:text-red-500" />
          )}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
