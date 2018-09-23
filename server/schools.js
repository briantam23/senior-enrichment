const router = require('express').Router();
const { School } = require('./db').models;

router.get('/', (req, res, next) => {
    School.findAll()
        .then(schools => res.send(schools))
        .catch(next)
})
router.get('/:id', (req, res, next) => {
    School.findById(req.params.id)
        .then(school => res.send(school))
        .catch(next)
})
router.post('/', (req, res, next) => {
    School.create(req.body)
        .then(school => res.send(school))
        .catch(next)
})
router.put('/:id', (req, res, next) => {
    School.findById(req.params.id)
        .then(school => school.update(req.body))
        .then(_school => res.send(_school))
        .catch(next)
})
router.delete('/:id', (req, res, next) => {
    School.destroy({ where: { id: req.params.id } })
        .then(() => res.sendStatus(204))
        .catch(next)
})


module.exports = router;