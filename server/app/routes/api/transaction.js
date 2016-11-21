const router = require('express').Router();
const Transaction = require('../../models/transactions');

router.get('/',  (req, res, next) => {
    Transaction.find({})
        .exec(function(err, transactions) {
            if (err) {
                res.send(500);
                return handleError(err)
            }
            res.status(200).send(transactions);
        });
});

router.post('/',  (req, res, next) => {
    let transaction = new Transaction({
        date: req.body.date,
        value: req.body.value,
        description: req.body.description,
        category: req.body.category,
        user: '1'
    });
    transaction.save(function (error) {
        if (error!=null) {
            res.status(500).send('adding transaction failed');
        } else {
            res.status(200).send('added new transaction');
        }
    });
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