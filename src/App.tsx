
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../src/styles/index.scss"
import Login from "./Pages/Login";
import Todopage from "./Pages/TodoPage";



function App() {



  return (
    <Router>
      <div className="App">
        <Suspense fallback={<h2>Loading...</h2>}>
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route path="/home" component={Todopage}></Route>
          </Switch>
        </Suspense>
      </div>
    </Router>

  );
}

export default App;


