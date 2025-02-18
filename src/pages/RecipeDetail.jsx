import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Button, Grid, Paper } from "@mui/material";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=068d134bfa72449796edd5e551457e1e`);
        setRecipe(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipeDetails();
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from Favorites" : "Added to Favorites");
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 mt-24">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={6}>
          <Card elevation={3} className="h-full shadow-lg flex flex-col">
            <CardMedia
              component="img"
              alt={recipe.title}
              height="400"
              image={recipe.image}
              className="object-cover"
            />
            <CardContent className="flex flex-col justify-between h-full">
              <Typography variant="h5" gutterBottom>{recipe.title}</Typography>
              <div className="flex justify-between items-center mt-3">
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </Button>
                <Button 
                  variant="outlined" 
                  color={isFavorite ? "error" : "primary"} 
                  onClick={toggleFavorite}
                  startIcon={isFavorite ? <FaHeart /> : <FaRegHeart />}
                  className="mt-2"
                >
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Paper elevation={3} className="p-6 shadow-lg h-full flex flex-col justify-start">
            <Typography variant="h6" className="font-bold mb-2">Ingredients:</Typography>
            <ul className="list-disc pl-6 text-gray-600">
              {recipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.name}</li>
              ))}
            </ul>
            <Typography variant="h6" className="font-bold mt-4">Preparation Time:</Typography>
            <Typography variant="body1 " className="text-gray-600">{recipe.readyInMinutes} minutes</Typography>
            <Typography variant="h6" className="font-bold mt-4">Serving Size:</Typography>
            <Typography variant="body1" className="text-gray-600">{recipe.servings} servings</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default RecipeDetail;
