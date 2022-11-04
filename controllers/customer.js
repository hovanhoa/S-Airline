var express = require("express");
var router = express.Router();
var customerModel = require("../models/customer");
const bcrypt = require('bcrypt');

router.get("/", async function (req, res) {
    const user = req.session.user;
    let listAccount = await customerModel.getOneAccount(user.phone);
    let listFlight = await customerModel.getListFlight(user.phone);
    console.log(listAccount);
    var viewBag = {
        listAccount: listAccount,
        listFlight: listFlight,
    }
    res.render("customer/index", viewBag);
});

router.post("/edit", async function (req, res) {
    var name =  req.body.name;
    var address = req.body.address;
    var phone = req.body.phone;
    var email = req.body.email;
    var sex = req.body.sex;
    var nationality = req.body.nationality;
    var birthday = req.body.birthday;

    try {
        await customerModel.updateOne(name, address, phone, email, sex, nationality, birthday);
        const result = await customerModel.getOne(phone);
        const result2 = await customerModel.getClient(phone);
        req.session.user = result[0];
        req.session.client = result2[0];
    } catch (err) {
        res.redirect("/500");
    }

    return res.redirect("/customer"); 
});

router.post("/", async function (req, res) {
    var password =  req.body.password_; //mat khau hien tai 
    var phone = req.body.phone;
    var pwd = req.body.password;
    var confirmPassword= req.body.confirmPassword;

    const user = req.session.user;
    let listAccount = await customerModel.getOneAccount(user.phone);
    let listFlight = await customerModel.getListFlight(user.phone);
    if (password){
        if (!bcrypt.compareSync(password, pwd)) {
            var userInfo = { status: "failed password"}
            var viewBag = {
                listAccount: listAccount,
                listFlight: listFlight,
                data: userInfo
            }
            res.render("customer/index", viewBag);
        }
        else{

    await customerModel.updatePass(confirmPassword, phone);
    var userInfo = { status: "password"}
    var viewBag = {
        listAccount: listAccount,
        listFlight: listFlight,
        data: userInfo
    }
    res.render("customer/index", viewBag);
  
    }
    res.redirect("/customer"); 
    }
  

});


module.exports = router;
