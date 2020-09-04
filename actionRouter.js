const express = require('express')

const Actions = require('./data/helpers/actionModel')
const { json } = require('express')
const { del } = require('./data/dbConfig')

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
   
    // WITHOUT MIDDLEWARE
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

//Endpoint to create new action is in projectRouter
//the url to add a new post seems better to be /api/projects/:id/actions
//rather than just /api/actions
//just makes better sense in my head, since you would add by the post id


//PUT edit action
router.put('/:id', validateActionId, (req, res) => {
    const { id } = req.params
    const { description, notes, completed } = req.body

    Actions.update(id, { description, notes, completed })
    .then(updatedAction => {
        console.log(updatedAction)
        res.status(200).json(updatedAction)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'error updating action' })
    })
})

//DELETE action
router.delete('/:id', validateActionId, (req, res) => {
    const { id } = req.params

    Actions.remove(id) 
    .then(deletedAction => {
        console.log(deletedAction)
        res.status(200).json({ message: 'action has been removed'})
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'error removing action'})
    })
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