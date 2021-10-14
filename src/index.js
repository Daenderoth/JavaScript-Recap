import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import './index.css';
import store from "./store";
import App from "./App";

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  });

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <Provider store={store}>
                <Route>
                    <App></App>
                </Route>
            </Provider>
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);