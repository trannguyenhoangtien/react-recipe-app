import { FETCH_RECIPES } from "../types";

const APP_ID = "54b6ab56";
const APP_KEY = "9f7f110706c0aeb6897c075f6c270f7e";
export const fetchRecipes = (query, from, to) => async (dispatch) =>{
    let data = null;
    let error = null;
    const res = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${from}&to=${to}`)
    .catch((e) =>{
        error = "Bad request from server, please try again later.";
    });
    
    if(res){
        data = await res.json();
        //console.log(data);
    }

    dispatch({
        payload: {items: data===null? null : data.hits, count: data===null?0:data.count + 1, error: error},
        type: FETCH_RECIPES
    })
};