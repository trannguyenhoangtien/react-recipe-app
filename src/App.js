import React, {useEffect} from 'react';
import './App.css';
import Recipes from './components/Recipes';
import { Provider } from 'react-redux';
import store from './store'

function App() {
  useEffect(() => {
    document.title = "React Recipe App"
  }, [])
  return (
    <Provider store={store}>    
          <Recipes />
    </Provider>
  );
}

export default App;
