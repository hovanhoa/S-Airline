var mysql = require("mysql-await");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "flight_ticket_booking",
});

exports.insertOne = async function(phone, password, type, time) {
    await connection.awaitQuery(
        `INSERT INTO account (phone, password, type, create_time) VALUES (${phone}, "${password}", ${type}, "${time}");`
    );
};

exports.insertClient = async function(phone, name) {
    await connection.awaitQuery(
        `INSERT INTO client (phone, name) VALUES (${phone}, "${name}");`
    );
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

exports.updatePass = async function(phone, pass) {
    await connection.awaitQuery(
        `UPDATE account SET password ="${pass}" WHERE phone = ${phone};`
    );
};
