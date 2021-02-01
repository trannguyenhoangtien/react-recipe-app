import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function Recipe(query, from, to) {
    const APP_ID = "54b6ab56";
    const APP_KEY = "9f7f110706c0aeb6897c075f6c270f7e";

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setRecipes([]);
    }, [query])

    const data2 = async ()=>{
        const recipeApi = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${from}&to=${to}`;
        const response = await fetch(recipeApi);
        const data = await response.json();
        setRecipes(prevRecipes => {
            return [...new Set([...prevRecipes, ...data.hits])];
        })
        setLoading(false);
        console.log(data.hits);
    }

    const getData = async () =>{
        await axios({
            method: 'GET',
            url: `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${from}&to=${to}`,
        }).then(res =>{
            setRecipes(prevRecipes => {
                return [...new Set([...prevRecipes, ...res.data.hits])];
            })
            setHasMore(res.data.hits.length < res.data.count);
            setLoading(false);
            console.log(res.data);
        }).catch(e=> {
            setError(true);
        })
    }

    useEffect(() =>{
        setLoading(true);
        setError(false);
        data2();
        
    }, [query, from, to])

    return {loading, error, recipes, hasMore};
}
