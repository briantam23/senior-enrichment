const router = require('express').Router();
const { Student } = require('./db').models;

router.get('/', (req, res, next) => {
    Student.findAll()
        .then(students => res.send(students))
        .catch(next)
})

module.exports = router;