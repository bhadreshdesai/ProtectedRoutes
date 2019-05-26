import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";

function Public1() {
  return <h3>Public page one</h3>;
}
function Public2() {
  return <h3>Public page two</h3>;
}

function Protected1() {
  return <h3>Protected page one</h3>;
}

function Protected2() {
  return <h3>Protected page two</h3>;
}

function App() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/public1">Public 1</Link>
        </li>
        <li>
          <Link to="/public2">Public 2</Link>
        </li>
        <li>
          <Link to="/protected1">Protected 1</Link>
        </li>
        <li>
          <Link to="/protected2">Protected 2</Link>
        </li>
      </ul>
      <Route path="/public1" component={Public1} />
      <Route path="/public2" component={Public2} />
      <Route path="/protected1" component={Protected1} />
      <Route path="/protected2" component={Protected2} />
    </BrowserRouter>
  );
}

export default App;
