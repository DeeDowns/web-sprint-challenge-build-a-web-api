const express = require('express')

const Projects = require('./data/helpers/projectModel.js')

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


//     const { id } = req.params
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




module.exports = router