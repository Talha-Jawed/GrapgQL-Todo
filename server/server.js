const express = require('express')
const expressGrapgQL = require('express-graphql')
const schema = require('./schema/schema')
const cors = require('cors')

const app = express()

app.use(cors())

app.use('/graphql' , expressGrapgQL({
    schema,
    graphiql : true
}))

app.listen(5000, () => {
    console.log('server start');

})