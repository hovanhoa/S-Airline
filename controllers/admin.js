var express = require("express");
var router = express.Router();
var adminModel = require("../models/admin");


router.get("/", async function (req, res) {
    res.redirect("admin/report");
});

router.get("/editairline", async function (req, res){
    let flightList = await adminModel.getAll();
    let airportList = await adminModel.getAirport();
    let brandList = await adminModel.getBrand();
    var viewBag = {
        flightList: flightList,
        airportList: airportList,
        brandList: brandList,
    }
    res.render("admin/editairline", viewBag);
})

router.get("/report", async function (req, res){
    var viewBag = {
        facultyList: [],
    };
    res.render("admin/report", viewBag);
})

router.post("/add", async function (req, res) {
    var id = req.body.id;
    var brand = req.body.brand;
    var from = req.body.from;
    var to = req.body.to;
    var depart = req.body.depart;
    var end = req.body.end;
    var price = req.body.price;
    console.log(end);
    try {
        await adminModel.insertOne(id, brand, from, to, depart, end, price);
    } catch (err) {
        return res.redirect("/500");
    }

    return res.redirect("editairline");
});

router.post("/edit", async function (req, res) {
    var id = req.body.id;
    var brand = req.body.brand;
    var from = req.body.from;
    var to = req.body.to;
    var depart = req.body.depart;
    var end = req.body.end;
    var price = req.body.price;
    try {
        await adminModel.updateOne(id, brand, from, to, depart, end, price);
    } catch (err) {
        res.redirect("/500");
    }
    return res.redirect("editairline"); 
});


router.post("/delete", async function (req, res) {
    var id = req.body.id;
    try {
        await adminModel.deleteOne(id);
    } catch (err) {
        return res.redirect("/500");
    }

    return res.redirect("editairline");
});

router.get("/editaccount", async function (req, res){
    let accountList = await adminModel.getAccount();
    var viewBag = {
        accountList: accountList,
    }
    res.render("admin/editaccount", viewBag);
})

router.post("/addaccount", async function (req, res) {
    var phone = req.body.phone;
    var type = req.body.type;

    try {
        await adminModel.insertAccount(phone, type);
    } catch (err) {
        return res.redirect("/500");
    }

    return res.redirect("editaccount");
});

router.post("/editAccount", async function (req, res) {
    var phone = req.body.phone;
    var type = req.body.type;

    try {
        await adminModel.updateAccount(phone, type);
    } catch (err) {
        res.redirect("/500");
    }

    return res.redirect("editaccount"); 
});

router.post("/deleteaccount", async function (req, res) {
    var phone = req.body.phone;

    try {
        await adminModel.deleteAccount(phone);
    } catch (err) {
        return res.redirect("/500");
    }
    return res.redirect("editaccount");
});

router.get("/editbrand", async function (req, res){
    let brandList = await adminModel.getBrand();
    var viewBag = {
        brandList: brandList,
    }
    res.render("admin/editbrand", viewBag);
})

router.post("/deletebrand", async function (req, res) {
    var id = req.body.id;

    try {
        await adminModel.deleteBrand(id);
    } catch (err) {
        return res.redirect("/500");
    }

    return res.redirect("editbrand");
});

router.post("/addbrand", async function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    try {
        await adminModel.insertBrand(id, name);
    } catch (err) {
        return res.redirect("/500");
    }

    return res.redirect("editbrand");
});

router.get("/editairport", async function (req, res){
    let airportList = await adminModel.getAirport();
    var viewBag = {
        airportList: airportList,
    }
    res.render("admin/editairport", viewBag);
})


router.post("/deleteairport", async function (req, res) {
    var id = req.body.id;   

    try {
        await adminModel.deleteAirport(id);
    } catch (err) {
        return res.redirect("/500");
    }

    return res.redirect("editairport");
});


router.post("/addairport", async function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    try {
        await adminModel.insertAirport(id, name);
    } catch (err) {
        return res.redirect("/500");
    }

    return res.redirect("editairport");
});

router.get("/editbank", async function (req, res){
    let bankList = await adminModel.getBank();
    var viewBag = {
        bankList: bankList,
    }
    res.render("admin/editbank", viewBag);
})

router.post("/addbank", async function (req, res) {
    console.log(req.body);
    var id = req.body.id;
    var name = req.body.name;
    try {
        await adminModel.insertBank(id, name);
    } catch (err) {
        return res.redirect("/500");
    }

    return res.redirect("editbank");
});

router.post("/deletebank", async function (req, res) {
    var id = req.body.id;   

    try {
        await adminModel.deleteBank(id);
    } catch (err) {
        return res.redirect("/500");
    }

    return res.redirect("editbank");
});

router.post("/listFlight", async function (req, res) {
    let listFlight = await adminModel.getAll();
    if(listFlight.length>0) {
        res.json({
            data: listFlight
    })};
});

router.post("/listAccount", async function (req, res) {
    let listAccount = await adminModel.getAccount();
    if(listAccount.length>0) {
        res.json({
            data: listAccount
    })};
});

router.post("/listTicket", async function (req, res) {
    let listTicket = await adminModel.getTicket();
    if(listTicket.length>0) {
        res.json({
            data: listTicket
    })};
});


router.post("/listSeat", async function (req, res) {
    let listSeat = await adminModel.getSeat();
    if(listSeat.length>0) {
        res.json({
            data: listSeat
    })};
});


module.exports = router;
