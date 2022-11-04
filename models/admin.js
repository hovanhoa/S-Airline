var mysql = require("mysql-await");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "flight_ticket_booking",
});

exports.getAll = async function () {
    return await connection.awaitQuery("SELECT * FROM flight");
};

exports.getAirport = async function () {
    return await connection.awaitQuery("SELECT * FROM airport");
};

exports.getBrand = async function () {
    return await connection.awaitQuery("SELECT * FROM brand");
};


exports.getAccount = async function () {
    return await connection.awaitQuery("SELECT * FROM account");
};

exports.getTicket = async function () {
    return await connection.awaitQuery("SELECT * FROM client_seat");
};

exports.getBank = async function () {
    return await connection.awaitQuery("SELECT * FROM bank");
};

exports.getSeat = async function () {
    return await connection.awaitQuery("SELECT * FROM seat");
};

exports.insertOne = async function (id, brand, from, to, depart, end, price) {
    await connection.awaitQuery(
        "INSERT INTO `flight`(`id`, `brand`, `from`, `to`, `depart`, `end`,  `price`) VALUES ('"+ id +"','"+ brand +"','"+ from +"','"+ to +"','"+ depart + "','"+ end + "','"+ price +"')"
    );
};

exports.updateOne = async function (id, brand, from, to, depart, end , price) {
    await connection.awaitQuery(
        "UPDATE `flight` SET `brand`='" + brand +"',`from`='" + from +"',`to`='" + to +"',`depart`='" + depart +"',`end`='" + end +"',`price`='" + price +"' WHERE `id`='" + id +"'"
    );
};

exports.deleteOne = async function (id) {
    await connection.awaitQuery("DELETE FROM `flight` WHERE `id` = '" + id +"'");
};

exports.insertAccount = async function (phone, type) {
    await connection.awaitQuery(
        "INSERT INTO `account`(`phone`, `type`) VALUES ('"+ phone +"','"+ type +"')"
    );
};

exports.updateAccount = async function (phone, type) {
    await connection.awaitQuery(
        "UPDATE `account` SET `type`='" + type +"' WHERE `phone`='" + phone +"'"
    );
};

exports.deleteAccount = async function (phone) {
    await connection.awaitQuery("DELETE FROM `account` WHERE `phone` = '" + phone +"'");
};

exports.insertBrand = async function (id, name) {
    await connection.awaitQuery(
        "INSERT INTO `brand`(`id`, `name`) VALUES ('"+ id +"','"+ name +"')"
    );
};

exports.deleteBrand = async function (id) {
    await connection.awaitQuery("DELETE FROM `brand` WHERE `id` = '" + id +"'");
};

exports.insertAirport = async function (id, name) {
    await connection.awaitQuery(
        "INSERT INTO `airport`(`id`, `name`) VALUES ('"+ id +"','"+ name +"')"
    );
};

exports.deleteAirport = async function (id) {
    await connection.awaitQuery("DELETE FROM `airport` WHERE `id` = '" + id +"'");
};

exports.insertBank = async function (id, name) {
    await connection.awaitQuery(
        "INSERT INTO `bank`(`id`, `name`) VALUES ('"+ id +"','"+ name +"')"
    );
};

exports.deleteBank = async function (id) {
    await connection.awaitQuery("DELETE FROM `bank` WHERE `id` = '" + id +"'");
};
