var express = require('express');
var router = express.Router();
var homeModel = require("../models/home");
const Cart = require('../models/Cart');

router.get('/', async function(req, res) {
    res.render("index");
});
router.get('/intro', function(req, res) {
    res.render("intro");
});

router.get('/contact', function(req, res) {
    res.render("contact");
});

router.get("/logout", function(req, res) {
    if (req.session.user) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    }
});

router.post('/add-to-cart', async function(req, res) {
    var idSeat = req.body.idSeat;
    var id_flight = idSeat.substr(0,6);
    idSeat = idSeat.slice(7);
    var id_seat = idSeat.split(":");

    for(let i = 0; i < id_seat.length; i ++){ 
        id_seat[i] += id_flight;
    }
    myCart = new Cart();
    myCart.saveQuantity(id_seat.length);
    for(let i = 0; i < id_seat.length; i ++){
        myCart.save(id_seat[i]);
    }
    let Flight = await homeModel.getOneFlight(id_flight);
    myCart.savePrice(Flight[0].price * id_seat.length);
    req.session.cart = myCart;
    res.redirect('/confirm_form');
});

router.post('/allFlight', async function(req, res) {
    let listFlight = await homeModel.getAllFlight();
    if(listFlight.length>0) {
        res.json({
            data: listFlight
    })};
});

router.post('/allSeat', async function(req, res) {
    let listSeat = await homeModel.getAllSeat();
    if(listSeat.length>0) {
        res.json({
            data: listSeat
    })};
});


module.exports = router;
