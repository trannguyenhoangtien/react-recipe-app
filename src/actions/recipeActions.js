import { FETCH_RECIPES } from "../types";

const APP_ID = "54b6ab56";
const APP_KEY = "9f7f110706c0aeb6897c075f6c270f7e";
export const fetchRecipes = (query, from, to) => async (dispatch) =>{
    const res = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${from}&to=${to}`);
    const data = await res.json();
    
    dispatch({
        payload: data.hits,
        type: FETCH_RECIPES
    })
};