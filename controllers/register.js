var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var loginModel = require("../models/login");

router.get("/", function(req, res) {
    res.render("register/index");
});

router.post("/", async function(req, res) {
    const userInput = {
        name: req.body.name,
        phone: req.body.phone,
        password: req.body.password,
        confirmPassword: req.body.password_confirmation,
        role: '1'
    }

    const user = await loginModel.getOne(userInput.phone);
    if (user.length > 0) {
        console.log("This phone has already used");
        res.render('register/index', { message: "This email has already used" });
    } else {
        let pwd = userInput.password;
        userInput.password = bcrypt.hashSync(pwd, 10);
        try {
            const today = new Date();
            let day = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            await loginModel.insertOne(userInput.phone, userInput.password, userInput.role, day);
            await loginModel.insertClient(userInput.phone, userInput.name);
            return res.render("login/index");
        } catch (err) {
            console.log(err);
            return res.render("login/index", { message: "Registerd successfully" });
        }
    }
});

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var OTP = 0;
router.post("/confirmotp", async function(req, res) { //
    let phone = req.body.phone;
    let password = req.body.password;
    let name = req.body.name;
    console.log(phone);
    console.log(password);
    console.log(name);
    const user = await loginModel.getOne(phone);
    if (user.length > 0) {
        console.log("This phone has already used");
        var userInfo = { status: "phone invalid", phone: phone, password: password, name: name }
        var viewInfo = { data: userInfo }
        res.render('register/index', viewInfo);
    } else {
        OTP = getRndInteger(100000, 999999);
        console.log(OTP);

        var userInfo = { phone: phone, password: password, name: name }
        var viewInfo = { data: userInfo }
        res.render("register/confirmotp", viewInfo);
    }



});

router.post("/checkOTP", async function(req, res) {
    let otp = req.body.otpcode;

    const userInput = {
        name: req.body.name,
        phone: req.body.phone,
        password: req.body.password,
        role: '1'
    }


    console.log(OTP);
    if (parseInt(otp) === OTP) {
        let pwd = userInput.password;
        userInput.password = bcrypt.hashSync(pwd, 10);
        try {
            const today = new Date();
            let day = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            await loginModel.insertOne(userInput.phone, userInput.password, userInput.role, day);
            await loginModel.insertClient(userInput.phone, userInput.name);
            var userInfo = { status: "sign up" };
            var viewInfo = { data: userInfo };
            res.render("login/index", viewInfo);
        } catch (err) {
            console.log(err);
            return res.render("/login/index", { message: "Registerd successfully" });
        }

    } else {
        console.log("otp failed");
        var userInfo = { status: "otp failed", phone: userInput.phone, password: userInput.password, name: userInput.name };
        var viewInfo = { data: userInfo };
        return res.render("register/confirmotp", viewInfo);
    }
});

router.post("/confirmotp/noticesuccess", function(req, res) {
    res.render("register/noticesuccess");
});


module.exports = router;
