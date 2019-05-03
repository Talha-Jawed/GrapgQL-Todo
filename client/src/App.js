import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider, Query, compose, graphql } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import Abcd from './user'
import InputField from './component/Input'
import AllUsers from './query/AllUser'

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});
// console.log(client , '==-=-=-=');

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h2>My first Apollo app 🚀🚀🚀🚀🚀🚀🚀</h2>

          {/* <Abcd/> */}
          <AllUsers/>
        </div>
      </ApolloProvider>
     
    );
  }
}

export default App;
