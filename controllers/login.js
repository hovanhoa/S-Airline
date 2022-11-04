var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var loginModel = require("../models/login");

router.get("/", async function(req, res) {
    res.render("login/index");
});

router.post("/noticesuccess", function(req, res) {
    res.render("login/noticesuccess");
});


router.post("/", async function(req, res) {
    const userInput = {
        phone: req.body.phone,
        password: req.body.password
    }
    console.log(userInput);
    try {
        const result = await loginModel.getOne(userInput.phone);
        const result2 = await loginModel.getClient(userInput.phone);
        console.log(result);
        if (result) {
            if (bcrypt.compareSync(userInput.password, result[0].password)) {
                req.session.user = result[0];
                req.session.client = result2[0];

                if (result[0].type == '2') {
                    res.redirect('/admin');
                } else {
                    res.render("login/noticesuccess");
                }
            } else {
                console.log("login failed");
                var userInfo = { status: "failed password", phone: userInput.phone, password: userInput.password }
                var viewInfo = { data: userInfo }
                res.render("login/index", viewInfo);
            }
        } else {
            console.log("login failed");
            var userInfo = { status: "failed phone", phone: userInput.phone, password: userInput.password }
            var viewInfo = { data: userInfo }
            res.render("login/index", viewInfo);
        }
    } catch (err) {
        console.log("login failed");
        var userInfo = { status: "failed phone", phone: userInput.phone, password: userInput.password }
        var viewInfo = { data: userInfo }
        res.render("login/index", viewInfo);
    }
});


module.exports = router;