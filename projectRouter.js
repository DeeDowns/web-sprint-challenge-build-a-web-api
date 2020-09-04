const express = require('express')

const Projects = require('./data/helpers/projectModel.js')
const Actions = require('./data/helpers/actionModel.js')

const router = express.Router()

//GET all projects
router.get('/', (req, res) => {
    // res.send(`<h1>project upppp</h2>`)
    const { id } = req.params
   Projects.get()
   .then(projects => {
       console.log(projects)
       res.status(200).json(projects)
   })
   .catch(error => {
       console.log(error)
       res.status(500).json({ message: 'error fetching projects' })
   })
})

//GET project by id
router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)


//    const { id } = req.params
//    Projects.get(id)
//    .then(project => {
//        console.log(project)
//        res.status(200).json(project)
//    })
//    .catch(error => {
//        console.log(error)
//        res.status(500).json({ message: 'error fetching project' })
//    })
})

//GET all actions by project id
router.get('/:id/actions', validateProjectId, validateProjectActions, (req, res) => {
    res.status(200).json(req.projectActions)
    

    // const { id: project_id } = req.params

    // Projects.getProjectActions(project_id)
    // .then(projectActions => {
    //     console.log(projectActions)
    //     res.status(200).json(projectActions)
    // })
    // .catch(error => {
    //     console.log(error)
    //     res.status(500).json({ message: 'error fetching project actions' })
    // })
})

//POST new project
router.post('/', validateProject, (req, res) => {
    const { name, description, completed } = req.body

    Projects.insert({ name, description, completed })
    .then(newProject => {
        console.log(newProject)
        res.status(201).json(newProject)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'error adding new project' })
    })
})

//POST add new action by project id
router.post('/:id/actions', validateProjectId,  (req, res) => {
    const { id: project_id} = req.params
    const {description, notes, completed } = req.body

    Actions.insert({project_id, description, notes, completed})
    .then(newAction => {
        console.log(newAction)
        res.status(201).json(newAction)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'error adding new action'})
    })
})

//PUT update project
router.put('/:id', validateProjectId, validateProject, (req, res) => {
    const { id } = req.params
    const { name, description, completed} = req.body

    Projects.update(id, {name, description, completed}) 
    .then(updatedProject => {
        console.log(updatedProject)
        res.status(200).json(updatedProject)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'error updating post' })
    }) 
})

//DELETE project
router.delete('/:id', validateProjectId, (req, res) => {
    const { id } = req.params

    Projects.remove(id) 
    .then(removedPost => {
        console.log(removedPost)
        res.status(200).json({ message: 'project has been removed' })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'error removing project' })
    })
})



/********* Middleware ********/
function validateProjectId(req, res, next) {
    const { id } = req.params
    Projects.get(id)
    .then(project => {
        if(project) {
            req.project = project
            next()
        } else {
            res.status(404).json({ message: 'project not found' })
        }
    }).catch(error => {
        res.status(500).json({ message: 'error fetching project' })
    })
}

function validateProject(req, res, next) {
    const { name, description } = req.body 
    
    if(name === '' || description === '') {
        res.status(400).json({ message: 'project must include name and description'})
    } else {
       next()
    }
}

function validateProjectActions(req, res, next) {
    const { id: project_id } = req.params

    Projects.getProjectActions(project_id)
    .then(projectActions => {
        console.log(projectActions)
        req.projectActions = projectActions
        if(projectActions.length === 0) {
            res.status(404).json({ message: 'this project has no actions'})
        } else {
            next()
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'error fetching project actions' })
    })
}






module.exports = router