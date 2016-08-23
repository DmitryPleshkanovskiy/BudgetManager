/**
 * Created by Nick on 23.08.2016.
 */

const router = require('express').Router();

router.get('/',  (req, res, next) => {
    res.send('get transactions');
});

router.post('/',  (req, res, next) => {
    res.send('add transaction');
});

router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    res.send('get transaction with id: ' + id);
});

router.put('/:id', (req, res, next) => {
    var id = req.params.id;
    res.send('put transaction with id: ' + id);
});


module.exports = router;