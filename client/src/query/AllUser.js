import React, { Component } from 'react';
import { ApolloProvider, Query, compose, graphql } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import InputField from '../component/Input'
import { users, deleteUser } from './quries'


// const users = gql`
//   {
//     allUser{
//         firstName,
//         id,
//         age
//     }
//   }
//   `
//     ;

// const user = gql`
//   query user($id: String!) {
//     user(id: $id) {
//       id
//       firstName
//       age
//     }
//   }
// `;


class AllUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }

    delete(id) {
        this.props.deleteUser({
            variables: { id: id },
            refetchQueries: [{
                query: users,
            }]
        });
    }

    edit(id, text) {
        // console.log(id, text);
        this.setState({ text: text, id: id })
    }


    componentWillReceiveProps(props) {

        console.log(props, '-=-=-=-=-=-=-=');
    }

    render() {

        return (
            <div>
                <InputField editVal={this.state.text} id={this.state.id} />
                {/* <input type='text' value={this.state.text} onChange={(e) => this.setState({ text: e.target.value })} /> */}
                <Query fetchPolicy="network-only" query={users}>
                    {({ loading, error, data, refetch }) => {
                        if (loading) return <h1>loading..</h1>;
                        if (error) return `Error! ${error.message}`;
                        if (data) {
                            return (
                                data.allUser.map(item => {
                                    console.log(item.firstName, 'alluserItem====');
                                    return (
                                        <div>
                                            <h1>{item.firstName}</h1>
                                            <button onClick={() => this.delete(item.id)}>Delete</button>
                                            <button onClick={() => this.edit(item.id, item.firstName)}>Edit</button>
                                        </div>
                                    )
                                })
                            )
                        }
                    }}
                </Query>
            </div>
        )
    }
}

export default compose(
    graphql(users, { firstName: "users" }),
    graphql(deleteUser, { name: "deleteUser" })
)(AllUsers);
