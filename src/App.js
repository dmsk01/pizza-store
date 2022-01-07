import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";

import HomePage from "./routes/HomePage";
import CartPage from "./routes/CartPage";
import NotFoundPage from "./routes/NotFoundPage";
import { Header } from "./components";

import "./scss/app.scss";

function App() {
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
