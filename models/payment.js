var mysql = require("mysql-await");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "flight_ticket_booking",
});

exports.getBank = async function () {
    return await connection.awaitQuery("SELECT * FROM bank");
};

exports.getOneFlight = async function (id) {
    return await connection.awaitQuery(`SELECT * FROM flight WHERE id = "${id}";`);
};

exports.updateSeat = async function (id) {
    await connection.awaitQuery(`UPDATE seat SET type = 2 WHERE id = "${id}"`);
};

exports.insertClientSeat = async function (phone, id, name, address, birthday, id_number, email, create_time, price) {
    await connection.awaitQuery(`INSERT INTO client_seat (phone, id_seat, name, birthday, id_number, address, email, create_time, price)
                    VALUE (${phone}, "${id}", "${name}", "${birthday}", "${id_number}", "${address}", "${email}", "${create_time}", ${price});`);
};

exports.insertClient = async function (phone, name, birthday, id_number, address, email, bank_name, bank_number) {
    await connection.awaitQuery(`INSERT INTO client (phone, name, birthday, id_number, address, email, bank_name, bank_number) 
    VALUE ("${phone}","${name}", "${birthday}", "${id_number}","${address}" ,"${email}" ,"${bank_name}" ,"${bank_number}");`);
};
