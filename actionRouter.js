const express = require('express')

const Actions = require('./data/helpers/actionModel')

const router = express.Router()

router.get('/:id', (req, res) => {
    const { id } = req.params

    Actions.get(id)
    .then(actions => {
        console.log(actions)
    })
    .catch(error => {
        console.log(error)
    })
})


module.exports = router