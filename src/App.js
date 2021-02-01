import React, { useState, useEffect } from 'react';
import Recipe from './Recipe';
import './App.css';
import style from './recipe.module.css'
import Recipes from './components/Recipes';
import { Provider } from 'react-redux';
import store from './store'

function App() {

  const updateSearch = e => {
    setSearch(e.target.value);
  }
  
  return (
    <Provider store={store}>    
          <Recipes />
    </Provider>
  );
}

export default App;
