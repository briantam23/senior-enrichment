const router = require('express').Router();
const { School } = require('./db').models;

router.get('/', (req, res, next) => {
    School.findAll()
        .then(schools => res.send(schools))
        .catch(next)
})


module.exports = router;