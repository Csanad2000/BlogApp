import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ApolloProvider, ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
const httpLink=createHttpLink({uri: 'http://localhost:4000'});
const client=new ApolloClient({link: httpLink, cache: new InMemoryCache()});

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);