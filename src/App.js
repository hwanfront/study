import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, NavBar, Products } from './components/index';

const App = () => {
    return (
        <>
        <NavBar />
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/products" render={(props) => <Products sortBy="newest" />} />
            </Switch>
        </div>
        </>
    );
};

export default App;
  