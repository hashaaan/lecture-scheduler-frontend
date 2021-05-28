import React from "react";
import "./App.css";
import "./custom.scss";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import AppRouter from "./AppRouter";

function App(props) {
  const { store, persistor } = props;

  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<h1>Loading...</h1>}>
          <AppRouter />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
