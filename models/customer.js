const bcrypt = require('bcrypt');
var mysql = require("mysql-await");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "flight_ticket_booking",
});

exports.getOneAccount = async function (phone) {
    return await connection.awaitQuery(`SELECT * FROM (account JOIN client ON client.phone = account.phone) WHERE client.phone = ${phone};`);
};

exports.getListFlight = async function (phone) {
    return await connection.awaitQuery(`SELECT * FROM (client_seat JOIN (seat JOIN (flight JOIN brand ON flight.brand= brand.id) ON seat.id_flight = flight.id) ON client_seat.id_seat = seat.id) WHERE phone=  ${phone};`);
};

exports.updateOne = async function (name, address, phone, email, sex, nationality, birthday) {
    await connection.awaitQuery(
        `UPDATE client SET name = "${name}", address = "${address}", email="${email}", sex="${sex}", nationality="${nationality}", birthday="${birthday}" WHERE phone = ${phone}; `);
};
exports.updatePass = async function (password, phone) {
    var pwd=bcrypt.hashSync(password, 10);
    await connection.awaitQuery(
        `UPDATE account SET password = "${pwd}" WHERE phone = ${phone}; `);
};

exports.getClient = async function(phone) {
    return await connection.awaitQuery(
        `SELECT * FROM client WHERE phone = ${phone};`
    );
};

exports.getOne = async function(phone) {
    return await connection.awaitQuery(
        `SELECT * FROM account WHERE phone = ${phone};`
    );
};
