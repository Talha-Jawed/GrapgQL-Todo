import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider, Query, compose, graphql } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";


// const user = gql`
//   {
//     users{
//       id
//       name
//       age
//     }
//   }
//   `
// ;

const user = gql`
  query user($id: String!) {
    user(id: $id) {
      id
      firstName
      age
    }
  }
`;


class abcd extends Component {
  render() {
    return (
      <Query query={user} variables={{id: 'm0gv8w0'}} >
        {({ loading, error, data  , refetch}) => {
          if (loading) return <h1>loading..</h1>;
          if (error) return `Error! ${error.message}`;
          if (data) {
            console.log(data.user.firstName , 'data===>>>');
                 return <h1>{data.user.firstName }</h1>
            
            // return (
            //   data.users.map(item => {
            //     return (
            //     )
            //   })
            // )
          }
          
        }}
      </Query>
      // 
    )
  }
}

export default compose(
  graphql(user, { name: "user" })
)(abcd);
