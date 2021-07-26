import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import { useSelector, useDispatch } from "react-redux";

import HomePage from "./routes/HomePage";
import CartPage from "./routes/CartPage";
import NotFoundPage from "./routes/NotFoundPage";
import Header from "./components/Header";

import { setPizzas } from "./redux/actions/pizzas";

import "./scss/app.scss";

function App() {
  const dispatch = useDispatch();

  // hranilishe in original video. useSelector receives state and returns new obj - storage = {items, sortBy}
  const {items} = useSelector(({ pizzas, filter }) => {
    return {
      items: pizzas.items,
      sortBy: filter.sortBy,
    };
  });

  useEffect(() => {
    fetch("http://localhost:3001/pizzas")
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(setPizzas(data));
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Switch>
          <AnimatedSwitch atEnter={{ opacity: 0 }} atLeave={{ opacity: 1 }} atActive={{ opacity: 1 }} className="switch-wrapper">
            <Route exact path="/" component={HomePage} />
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
