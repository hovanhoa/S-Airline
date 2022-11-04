$("#tab-faculty").DataTable({
    responsive: true,
    lengthChange: false,
    autoWidth: false,
    language: {
        url: "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Vietnamese.json",
    },
    dom: "Bfrtip",
    buttons: ["copy", "csv", "excel", "pdf", "print"],
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

$(".btn-edit").click(function (e) {
    console.log($(this).data());
    var id = $(this).data("id");
    var brand = $(this).data("brand");
    var from = $(this).data("from");
    var to = $(this).data("to");
    var depart = $(this).data("depart");
    var end = $(this).data("end");
    var price = $(this).data("price");

    if (depart) depart = depart.replace(/(:00.000Z$)/, "");
    if (end) end = end.replace(/(:00.000Z$)/, "");

    $("#editFlightModal input[name='id']").val(id);
    $("#editFlightModal select[name='brand']").val(brand);
    $("#editFlightModal select[name='from']").val(from);
    $("#editFlightModal select[name='to']").val(to);
    $("#editFlightModal input[name='depart']").val(depart);
    $("#editFlightModal input[name='price']").val(price);
    $("#editFlightModal input[name='end']").val(end);

    $("#editFlightModal").modal("show");
});


$(".btn-view").click(function (e) {
    var from = $(this).data("from");
    var to = $(this).data("to");
    var depart = $(this).data("depart");
    var id = $(this).data("id");
    var price = $(this).data("price");

    document.getElementById("from").innerHTML = from.toString();  
    document.getElementById("to").innerHTML = to.toString();  
    document.getElementById("depart").innerHTML = depart.toString().toLocaleString('en-US');  
    document.getElementById("id").innerHTML = id.toString();  
    document.getElementById("price").innerHTML = price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") +" VND";
    
    var d = new Date(document.getElementById("depart").innerHTML);

    document.getElementById("depart").innerHTML = d.toLocaleString();

    $.post("/admin/listSeat", function (data) {
        const listSeat = [];
        for (let i = 0; i < data.data.length; i ++){
            if(data.data[i].id_flight == id) listSeat.push(data.data[i]);
        }
        for(let i = 0; i < listSeat.length; i ++){
            listSeat[i].id = listSeat[i].id.substring(0, 3);
        }
        for(let i = 0; i < listSeat.length; i ++){
            var element = document.getElementById(listSeat[i].id);
            element.classList.remove("occupied");
        }
        for(let i = 0; i < listSeat.length; i ++){
            if(listSeat[i].type == "2"){
                var element = document.getElementById(listSeat[i].id);
                element.classList.add("occupied");
            }
        }
        // console.log(listSeat);
    });

    $("#viewFlightModal").modal("show");
});

$(".btn-delete").click(function (e) {
    var id = $(this).data("id");

    $("#deleteFlightModal input[name='id']").val(id);

    $("#deleteFlightModal").modal("show");
});

$(".btn-editAcc").click(function (e) {
    console.log($(this).data());
    var phone = $(this).data("phone");
    var type = $(this).data("type");


    $("#editAccountModal input[name='phone']").val(phone);
    $("#editAccountModal select[name='type']").val(type);


    $("#editAccountModal").modal("show");
});

$(".btn-deleteAcc").click(function (e) {
    var phone = $(this).data("phone");

    $("#deleteAccountModal input[name='phone']").val(phone);

    $("#deleteAccountModal").modal("show");
});

$(".btn-deleteBrand").click(function (e) {
    var id = $(this).data("id");

    $("#deleteBrandModal input[name='id']").val(id);

    $("#deleteBrandModal").modal("show");
});

$(".btn-deleteAirport").click(function (e) {
    var id = $(this).data("id");
    // console.log(id);

    $("#deleteAirportModal input[name='id']").val(id);

    $("#deleteAirportModal").modal("show");
});

$(".btn-deleteBank").click(function (e) {
    var id = $(this).data("id");
    // console.log(id);

    $("#deleteBankModal input[name='id']").val(id);

    $("#deleteBankModal").modal("show");
});

