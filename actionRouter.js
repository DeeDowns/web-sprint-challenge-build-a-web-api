const express = require('express')

const Actions = require('./data/helpers/actionModel')
const { json } = require('express')

const router = express.Router()

//GET all actions
router.get('/', (req, res) => {
    

    Actions.get()
    .then(actions => {
        console.log(actions)
        res.status(200).json(actions)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: 'error fetching actions' })
    })
})

//GET action by id
router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action)
   
   
//     const { id } = req.params

//     Actions.get(id) 
//     .then(action => {
//         console.log(action)
//         res.status(200).json(action)
//     })
//     .catch(error => {
//         console.log(error)
//         res.status(500).json({message: 'error fetching action' })
//     })
})


/******* Middleware *******/
function validateActionId(req, res, next) {
    const { id } = req.params

    Actions.get(id) 
    .then(action => {
        if(action) {
            req.action = action
            next()
        } else {
            res.status(404).json({ message: 'action not found' })
        }
    })
    .catch(error => {
        res.status(500).json({message: 'error fetching action' })
    })

}


module.exports = router