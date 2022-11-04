var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var loginModel = require("../models/login");

router.get("/", function(req, res) {
    res.render("forgotpassword/index");
});

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var OTP = 0;
router.post("/confirmotp", async function(req, res) {
    let phone = req.body.phone;
    console.log(phone);
    const user = await loginModel.getOne(phone);

    if (user.length > 0) {
        OTP = getRndInteger(100000, 999999);
        console.log(OTP);

        var userInfo = { status: "phone valid", phone: phone };
        var viewInfo = { data: userInfo };
        res.render("forgotpassword/confirmotp", viewInfo);
    } else {
        console.log("This phone has no account");
        var userInfo = { status: "phone invalid", phone: phone };
        var viewInfo = { data: userInfo }
        res.render('forgotpassword/index', viewInfo);
    }
});

router.post("/confirmotp/newpassword", async function(req, res) {

    let otp = req.body.otpcode;
    let phone = req.body.phone;
    console.log(OTP);
    if (parseInt(otp) === OTP) {
        console.log("otp true");
        var userInfo = { status: "otp true", phone: phone };
        var viewInfo = { data: userInfo };
        return res.render("forgotpassword/newpassword", viewInfo);
    } else {
        console.log("otp failed");
        var userInfo = { status: "otp failed", phone: phone };
        var viewInfo = { data: userInfo };
        return res.render("forgotpassword/confirmotp", viewInfo);
    }
});

router.post("/confirmotp/newpassword/noticesuccess", async function(req, res) {

    let phone = req.body.phone;
    let password = req.body.password;
    let pwd = password;
    password = bcrypt.hashSync(pwd, 10);
    try {
        await loginModel.updatePass(phone, password);
        var userInfo = { status: "reset" };
        var viewInfo = { data: userInfo };
        res.render("login/index", viewInfo);
    } catch (err) {
        console.log(err);
        return res.render("/login/index", { message: "Registerd successfully" });
    }
});


module.exports = router;
