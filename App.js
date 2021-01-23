import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import productsReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
  products: productsReducer
});

const store = createStore(rootReducer);

export default function App() {
  const [fontLoaded, setFondLoaded] = useState(false);

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
