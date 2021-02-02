import React, { Component } from 'react'
import {fetchRecipes} from '../actions/recipeActions';
import { connect } from 'react-redux';
import style from '../recipe.module.css'
import '../App.css';
import InfiniteScroll from "react-infinite-scroll-component";
import formatCalories from '../ulti'

class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state={
            query: 'chicken',
            from: 0,
            to: 10,
            loading: true,
            keyword: '',
            listRecipe: [],
            loading: "Loading..."
        }
    };
    
    componentDidMount(){
        this.props.fetchRecipes(this.state.query, this.state.from, this.state.to)
        .then(response=>{
            if(this.props.error !==null){
                this.setState({
                    loading: ''
                })
            }
            this.setState({
                query: "",
                keyword: this.state.query,
                listRecipe: this.props.recipes
            })
        })
    };

    getSearch = (e) => {
        e.preventDefault();
        this.setState({
            listRecipe: [],
            loading: "Loading..."
        })
        this.props.fetchRecipes(this.state.query, 0, 10)
        .then(response=>{
            if(this.props.error !==null){
                this.setState({
                    loading: ''
                })
            }
            this.setState({
                keyword: this.state.query,
                listRecipe: this.props.recipes,
                from: 0,
                to: 10,
                query: ""
            })
        })
    }
    updateSearch = (e) =>{
        this.setState({ query: e.target.value });
    }

    fetchMoreData = () =>{
        this.setState({
            from: this.state.from + 11,
            to: this.state.to + 11,
        })
        this.props.fetchRecipes(this.state.keyword, this.state.from, this.state.to)
        .then(response=>{
            if(this.props.error === null){
                this.setState({
                    listRecipe: [...new Set([...this.state.listRecipe, ...this.props.recipes])]
                })
            }
        })
    }
    
    render() {
        return (
            <div className="App">
                <form onSubmit={this.getSearch} className="search-form">
                    <input required placeholder="ex: chicken" className="search-bar" value={this.state.query} onChange={this.updateSearch} type="text" />
                    <button className="search-button" type="submit">Search</button>
                </form>
                {
                    !this.state.listRecipe ? "" : (
                        <p className="result">There are {this.props.count} search results with keywords: {this.state.keyword}</p>
                    )
                } 
                {
                        
                !this.state.listRecipe || this.state.listRecipe.length === 0 ? (<div>{this.state.loading}</div>) :
                (
                    <InfiniteScroll
                        dataLength={this.state.listRecipe.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.listRecipe.length < this.props.count}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                              <b>Yay! You have seen it all</b>
                            </p>
                          }
                        >
                            <div className="recipes">
                            {
                                this.state.listRecipe.map((recipe, index) => (
                                    <div key={index} className={style.recipe}>
                                        <h1>{recipe.recipe.label}</h1>
                                        <ol>
                                            {recipe.recipe.ingredients.map((ingredient, index) => (
                                                <li key={index}>{ingredient.text}</li>
                                            ))}
                                        </ol>
                                        <p>Calories: {formatCalories(recipe.recipe.calories)}</p>
                                        <img className={style.image} src={recipe.recipe.image} alt=""/>
                                    </div>
                                ))
                            }                
                        </div>
                    </InfiniteScroll>
                )}
                {
                    this.props.error ===null ? "" : <div className={style.error}>{this.props.error}</div>
                }
            </div>
        )
    }
}

export default connect((state) => ({ 
    recipes: state.recipes.items, 
    count: state.recipes.count,
    error: state.recipes.error
}), {
    fetchRecipes
  })(Recipes);