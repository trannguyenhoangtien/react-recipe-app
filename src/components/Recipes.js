import React, { Component } from 'react'
import {fetchRecipes} from '../actions/recipeActions';
import { connect } from 'react-redux';
import style from '../recipe.module.css'
import '../App.css';

class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state={
            query: 'chicken',
            from: 0,
            to: 10,
            loading: true,
            keyword: '',
            hasMore: false
        }
    };
    
    componentDidMount(){
        this.props.fetchRecipes(this.state.query, this.state.from, this.state.to)
        .then(response=>{
            this.setState({
                loading: false,
                query: '',
                keyword: this.state.query
            })
        })
    };

    getSearch = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        this.props.fetchRecipes(this.state.query, this.state.from, this.state.to)
        .then(response=>{
            this.setState({
                loading: false,
                query: "",
                keyword: this.state.query
            })
        })
    }
    updateSearch = (e) =>{
        this.setState({ query: e.target.value });
    }

    
    render() {
        return (
            <div className="App">
                <form onSubmit={this.getSearch} className="search-form">
                    <input required placeholder="ex: chicken" className="search-bar" value={this.state.query} onChange={this.updateSearch} type="text" />
                    <button className="search-button" type="submit">Search</button>
                </form>
                <p className="result">Search results with keywords: {this.state.keyword}</p>
                <div className="recipes">
                    {
                        !this.props.recipes || this.state.loading ? (<div>Loading...</div>) :
                        (
                            this.props.recipes.map((recipe, index) => (
                                <div key={index} className={style.recipe}>
                                    <h1>{recipe.recipe.label}</h1>
                                    <ol>
                                        {recipe.recipe.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient.text}</li>
                                        ))}
                                    </ol>
                                    <p>Calories: {recipe.recipe.calories}</p>
                                    <img className={style.image} src={recipe.recipe.image} alt=""/>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        )
    }
}

export default connect((state) => ({ recipes: state.recipes.items }), {
    fetchRecipes
  })(Recipes);