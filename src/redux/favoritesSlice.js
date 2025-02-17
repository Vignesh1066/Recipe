import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchRecipes = createAsyncThunk("recipes/fetchRecipes", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    toast.success("Recipes loaded successfully!");
    return response.data.meals; 
  } catch (error) {
    toast.error("Failed to fetch recipes!");
    return rejectWithValue(error.message);
  }
});

const initialState = {
  searchQuery: "",
  recipes: [],
  favorites: [],
  loading: false,
};

const favoritesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    searchRecipes: (state, action) => {
      state.searchQuery = action.payload;
    },
    
    addFavorite: (state, action) => {
      const existingRecipe = state.favorites.find((recipe) => recipe.idMeal === action.payload.idMeal);
      if (!existingRecipe) {
        state.favorites.push(action.payload);
        // toast.success("Recipe added to favorites!");
      }
    },
    
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((recipe) => recipe.idMeal !== action.payload);
      // toast.success("Recipe removed from favorites!");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.loading = false;
      state.recipes = action.payload;
    });
    builder.addCase(fetchRecipes.rejected, (state) => {
      state.loading = false;  
    });
  },
});


export const { searchRecipes, addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
