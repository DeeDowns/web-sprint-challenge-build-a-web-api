const express = require('express')
const helmet = require('helmet')

//importing actionRouter and projectRouter
const projectRouter = require('./projectRouter.js')
const actionRouter = require('./actionRouter.js')


const server = express()

server.use(express.json())
server.use(helmet())
server.use(logger)

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)



server.get('/', (req, res) => {
    res.send(`<h1>Server upppp</h2>`)
})

function logger(req, res, next) {
    console.log(`a ${req.method} request was made to ${req.url}`)
    next()
}

module.exports = server