var express = require("express");
var app = express();
var moment = require('moment');  

var homeController = require('./controllers/home');
var adminController = require("./controllers/admin");
const authUser = require('./controllers/Auth');
var customerControler = require("./controllers/customer");
var loginController = require("./controllers/login");
var registerController = require("./controllers/register");
var forgotpasswordController = require("./controllers/forgotpassword");
var confirm_form = require("./controllers/confirm_form");
var payment = require("./controllers/payment");


app.set("view engine", "pug");
app.use(express.static("public"));

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

const session = require('express-session');
//------------------ STORE IN COOKIES -----------------------
app.use(session({
    cookie: { maxAge: 3 * 24 * 60 * 60 * 1000 },
    secret: "S3cret",
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});


app.locals.moment = require('moment');
moment.locale('vi');  
app.use("/", homeController);
app.use("/admin",  authUser(2), adminController);
app.use("/customer", customerControler);
app.use("/login", loginController);
app.use("/register", registerController);
app.use("/forgotpassword", forgotpasswordController);
app.use("/confirm_form", confirm_form);
app.use("/payment", payment);



app.listen(5000, function() {
    console.log("Server is listening on port 5000!");
})