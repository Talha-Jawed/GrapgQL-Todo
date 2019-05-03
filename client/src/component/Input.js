import React, { Component } from 'react';
import { Mutation, compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import { ADD_TODO } from '../query/quries'
import { users, editUser } from '../query/quries'

class InputField extends Component {
    constructor() {
        super()
        this.state = {
            text: '',
            edited: false,
            id: ''
        }
    }

    componentWillReceiveProps(props) {
        console.log(props.editVal);
        if (props.editVal === '') {

        } else {
            this.setState({ edited: true, text: props.editVal, id: props.id })
        }

    }


    render() {
        const { text, edited, id } = this.state
        return (
            <Mutation mutation={ADD_TODO}>
                {(addUser, { data }) => (
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            {
                                edited ?
                                this.props.editUser({
                                    variables: { id: id, firstName: text },
                                    refetchQueries: [{
                                        query: users,
                                    }]
                                })
                                // this.setState({ text: '', edited: false, id: '' })
                                    :
                                    addUser({
                                        variables: { firstName: text },
                                        refetchQueries: [{
                                            query: users,
                                        }]
                                    });
                            }
                            this.setState({ text: '', edited: false, id: '' })
                        }}
                    >
                        <input
                            type='text' value={text} onChange={e => this.setState({ text: e.target.value })}
                        />
                        {edited ?
                            <button type="submit">Update</button>
                            :
                            <button type="submit">Add Todo</button>
                        }
                    </form>
                )}
            </Mutation>
        );
    }
}

export default compose(
    graphql(ADD_TODO, { name: "ADD_TODO" }),
    graphql(editUser, { name: "editUser" })
)(InputField);