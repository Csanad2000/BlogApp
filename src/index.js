import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import {ApolloProvider, ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter } from 'react-router-dom';
import { AUTH_TOKEN } from './constants';
import { getMainDefinition } from '@apollo/client/utilities';

const root = ReactDOM.createRoot(document.getElementById('root'));
const httpLink = createHttpLink({uri: 'http://localhost:4000'});
const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN)
    }
  }
});
const link = split(
  ({query}) => {
    const {kind, operation} = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' &&
      operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);
const client = new ApolloClient({link, cache: new InMemoryCache()});

root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);