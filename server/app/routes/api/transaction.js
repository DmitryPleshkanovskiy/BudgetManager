const router = require('express').Router();
const Transaction = require('../../models/transactions');
import isAuthenticated from '../../middlewares/isAuthenticated';

router.get('/', isAuthenticated, (req, res, next) => {
    Transaction.find({user: req.currentUser._id}).sort({date: -1})
        .exec(function(err, transactions) {
            if (err) {
                res.send(500);
                return handleError(err)
            }
            res.status(200).send(transactions);
        });
});

router.post('/', isAuthenticated,  (req, res, next) => {
    //TODO: add validation 
    let transaction = new Transaction({
        date: req.body.date,
        value: req.body.value,
        type: req.body.type,
        description: req.body.description,
        category: req.body.category,
        user: req.currentUser._id
    });
    transaction.save(function (error) {
        if (error!=null) {
            res.status(500).json({ errors: {form: 'adding transaction failed'}, details: error});
        } else {
            res.status(200).json({success: true});;
        }
    });
});

router.get('/:id', isAuthenticated, (req, res, next) => {
    var id = req.params.id;
    res.send('get transaction with id: ' + id);
});

router.put('/:id', isAuthenticated,  (req, res, next) => {
    var id = req.params.id;
    res.send('put transaction with id: ' + id);
});


module.exports = router;