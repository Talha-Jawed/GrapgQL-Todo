import gql from "graphql-tag";

const users = gql`
  {
    allUser{
        firstName,
        id,
        age
    }
  }
  `
  ;

const ADD_TODO = gql`
  mutation addUser($firstName: String!) {
    addUser(firstName: $firstName) {
      id
      firstName
      }
    }
  `
  ;

const deleteUser = gql`
  mutation deleteUser($id: String!){
    deleteUser(id:$id){
      firstName
    }
  }
  `;

const editUser = gql`
  mutation deleteUser($id: String! , $firstName: String){
    editUser(
      id:$id
      firstName: $firstName
      ){
      firstName
    }
  }
  `;

export { users, ADD_TODO, deleteUser , editUser };