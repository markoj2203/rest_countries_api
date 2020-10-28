import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import setCountryName from "./reducers/";
//import thunk from "redux-thunk";

//import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(setCountryName);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
