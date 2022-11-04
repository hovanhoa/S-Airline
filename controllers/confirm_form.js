var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render("confirm_form/confirm_form");
});

router.post("/", async function (req, res) {
    const client_seat = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        birthday: req.body.birthday,
        id_number: req.body.id_number,
    }
    req.session.client_seat = client_seat;
    res.redirect("/payment")
});


module.exports = router;