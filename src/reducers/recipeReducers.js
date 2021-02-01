import { FETCH_RECIPES } from "../types";

export const recipeReducer = (state={}, action) => {
    
    switch(action.type){
        case FETCH_RECIPES:
            return{
                ...state,
                items: action.payload
            };
        default:
            return state;
    } 
};