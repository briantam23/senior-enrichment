const router = require('express').Router();
const { Student } = require('./db').models;

router.get('/', (req, res, next) => {
    Student.findAll()
        .then(students => res.send(students))
        .catch(next)
})
router.get('/:id', (req, res, next) => {
    Student.findById(req.params.id)
        .then(student => res.send(student))
        .catch(next)
})
router.post('/', (req, res, next) => {
    Student.create(req.body)
        .then(student => res.send(student))
        .catch(next)
})
router.put('/:id', (req, res, next) => {
    Student.findById(req.params.id)
        .then(student => student.update(req.body))
        .then(_student => res.send(_student))
        .catch(next)
})
router.delete('/:id', (req, res, next) => {
    Student.destroy({ where: { id: req.params.id } })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router;