import React from "react";
import { BrowserRouter, Link, Redirect, Route } from "react-router-dom";

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  logout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function Public1Component() {
  return <h3>Public page one</h3>;
}
function Public2Component() {
  return <h3>Public page two</h3>;
}

function Protected1Component() {
  return <h3>Protected page one</h3>;
}

function Protected2Component() {
  return <h3>Protected page two</h3>;
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

class LoginComponent extends React.Component {
  state = { redirectToReferrer: false };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;
    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

function LogoutComponent() {
  fakeAuth.logout();
  return <h3>Logout</h3>;
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
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
      <Route path="/public1" component={Public1Component} />
      <Route path="/public2" component={Public2Component} />
      <Route path="/login" component={LoginComponent} />
      <Route path="/logout" component={LogoutComponent} />
      <PrivateRoute path="/protected1" component={Protected1Component} />
      <PrivateRoute path="/protected2" component={Protected2Component} />
    </BrowserRouter>
  );
}

export default App;
