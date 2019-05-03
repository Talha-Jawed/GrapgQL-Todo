const graphql = require('graphql');
// const _ = require('lodash')
const axios = require('axios')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql

// const users = [
//     { id: "1", firstName: 'talha', age: 22 },
//     { id: "3", firstName: 'usama', age: 14 }
// ]

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: CompanyType,
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3001/companies/${parentValue.companyID}`)
                    .then(res => res.data)
            }
        }
    })
})

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3001/companies/${parentValue.id}/users`)
                    .then(resp => resp.data)
            }
        }
    })
});



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3001/users${args.id}`)
                    .then(resp => resp.data)
                // return _.find(users, { id: args.id })
                // .findOne({ "id": args.id, "firstName": args.firstName });
            }
        },
        allUser: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3001/users`)
                    .then(resp => resp.data)
                // return _.find(users, { id: args.id })
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3001/companies/${args.id}`)
                    .then(resp => resp.data)
            }
        }
    })
})

// const RootQueryList = new GraphQLObjectType({
//     name: 'RootQueryTypeAllUser',
//     fields: () => ({
//         userAll: {
//             type:  new GraphQLList(UserType),
//             resolve(parentValue, args) {
//                 return axios.get(`http://localhost:3001/users`)
//                     .then(resp => resp.data)
//                 // return _.find(users, { id: args.id })
//             }
//         },
//         company: {
//             type: CompanyType,
//             args: { id: { type: GraphQLString } },
//             resolve(parentValue, args) {
//                 return axios.get(`http://localhost:3001/companies/${args.id}`)
//                     .then(resp => resp.data)
//             }
//         }
//     })
// })

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLInt },
                companyId: { type: GraphQLString },
            },
            resolve(parentValue, { firstName }) {
                return axios.post(`http://localhost:3001/users`, { firstName })
                    .then(res => res.data)
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { id }) {
                return axios.delete(`http://localhost:3001/users/${id}`)
                    .then(res => res.data)
            }
        },
        editUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: (GraphQLString) },
                age: { type: (GraphQLInt) },
                companyId: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return axios.patch(`http://localhost:3001/users/${args.id}`, args)
                    .then(res => res.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})