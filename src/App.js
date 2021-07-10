import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";

import HomePage from "./routes/HomePage";
import CartPage from "./routes/CartPage";
import NotFoundPage from "./components/NotFoundPage";
import Header from "./components/Header";

import "./scss/app.scss";

function App() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/db.json")
      .then((resp) => resp.json())
      .then((json) => {
        setPizzas(json.pizzas);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Switch>
          <AnimatedSwitch atEnter={{ opacity: 0 }} atLeave={{ opacity: 0 }} atActive={{ opacity: 1 }} className="switch-wrapper">
            <Route exact path="/" render={() => <HomePage pizzas={pizzas} />} />
            <Route exact path="/cart" component={CartPage} />
            <Route path="/404" component={NotFoundPage} />
            <Redirect to="/404" />
          </AnimatedSwitch>
        </Switch>
      </div>
    </div>
  );
}

export default App;
