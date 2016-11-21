const router = require('express').Router();
const Account = require('../../models/account');

router.get('/',  (req, res, next) => {
    Account.find({})
        .exec(function(err, accounts) {
            if (err) {
                res.send(500);
                return handleError(err)
            }
            res.status(200).send(accounts);
        });
});

router.post('/',  (req, res, next) => {
    let account = new Account({
        name: req.body.name,
        value: req.body.value,
        description: req.body.description,
        category: req.body.category,
        user: '1'
    });
    account.save(function (error) {
        if (error!=null) {
            res.status(500).send('adding account failed');
        } else {
            res.status(200).send('added new account');
        }
    });
});

router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    res.send('get account with id: ' + id);
});

router.put('/:id', (req, res, next) => {
    var id = req.params.id;
    res.send('put account with id: ' + id);
});

module.exports = router;