import React, { Component } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import { Home, Sukses } from "./pages"
import { NavbarComp } from "./Components"

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComp />
        <main>
          <Switch>
            <Route exact path="/" component={Home} exact />
            <Route exact path="/sukses" component={Sukses} exact />
          </Switch>
        </main>
      </BrowserRouter >
    )
  }
}
