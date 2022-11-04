var express = require('express');
var router = express.Router();
var paymentModels = require("../models/payment");

router.get('/', async function (req, res) {
    var Flight = await paymentModels.getOneFlight(req.session.cart["items"][0].substring(3,9));
    var ListBank = await paymentModels.getBank();
    var viewBag = {
        Flight: Flight,
        ListBank: ListBank
    }
    res.render("payment/payment", viewBag);
});

router.get('/QR', async function (req, res) {
    res.render("payment/QR");
});

router.post("/", async function (req, res) {
    var cart = req.session.cart;
    var client_seat = req.session.client_seat;
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    var create_date = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    
    for(let i = 0; i < cart["items"].length; i ++) {
        await paymentModels.updateSeat(cart["items"][i]);
    }
    for(let i = 0; i < cart["items"].length; i ++) {
        await paymentModels.insertClientSeat(client_seat["phone"], cart["items"][i], client_seat["name"], client_seat["address"], client_seat["birthday"], client_seat["id_number"], client_seat["email"],create_date, cart["totalPrice"]);
    }
    return res.redirect("payment/QR");
});


module.exports = router;
