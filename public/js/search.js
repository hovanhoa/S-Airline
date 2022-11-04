
// search
let searchButton = document.getElementById("search-button");
let closeButton = document.getElementById("close-button");
let searchResult = document.querySelector(".search-result");
let form = document.querySelector("form");

searchButton.onclick = function () {
    let inputFields = form.querySelectorAll("input");
    let flag = 0;
    const listInfo = [];
    for (let inputField of inputFields) {
        // console.log(inputField.value);
        listInfo.push(inputField.value);
        let message = inputField.parentElement.querySelector(".message");
        if (inputField.value == "") {
            message.classList.add("active");
            flag = 1;
        } else {
            message.classList.remove("active");
        }
    }
    if (flag == 1) return;
    if (listInfo[0] == "Hà Nội") listInfo[0] = "NOB";
    if (listInfo[0] == "Tp. Hồ Chí Minh") listInfo[0] = "TSN";
    if (listInfo[0] == "Đà Nẵng") listInfo[0] = "DAD";
    if (listInfo[0] == "Phú Quốc") listInfo[0] = "PQC";
    if (listInfo[0] == "Nha Trang") listInfo[0] = "NHA";
    if (listInfo[1] == "Hà Nội") listInfo[1] = "NOB";
    if (listInfo[1] == "Tp. Hồ Chí Minh") listInfo[1] = "TSN";
    if (listInfo[1] == "Đà Nẵng") listInfo[1] = "DAD";
    if (listInfo[1] == "Phú Quốc") listInfo[1] = "PQC";
    if (listInfo[1] == "Nha Trang") listInfo[1] = "NHA";

    const listResult = [];

    $.post("/allFlight", function (data) {
        console.log(data.data);
        for (let i = 0; i < data.data.length; i++) {
            data.data[i]["depart"] = moment(data.data[i]["depart"]).format('YYYY-MM-DD HH:mm:ss');
            if (
                data.data[i]["from"] == listInfo[0] &&
                data.data[i]["to"] == listInfo[1] &&
                data.data[i]["depart"].substring(0, 10) == listInfo[2]
            ) {
                listResult.push(data.data[i]);
            }
        }

        function compare( a, b ) {
            if ( a.depart < b.depart ){
              return -1;
            }
            if ( a.depart > b.depart ){
              return 1;
            }
            return 0;
        }
        listResult.sort( compare );
        
        console.log(listResult);
        document.getElementById("list_result").innerHTML = '';
        for (let i = 0; i < listResult.length; i++) {
            let imgsrc;
            if (listResult[i].brand == "BL") imgsrc = "images/jetstar.png";
            if (listResult[i].brand == "QH") imgsrc = "images/bamboo.png";
            if (listResult[i].brand == "VA") imgsrc = "images/vietnam_airline.png";
            if (listResult[i].brand == "VJ") imgsrc = "images/vietjet_air.png";

            document.getElementById("list_result").innerHTML +=
                `<div class="item">
                    <div class="item-flex item-location">
                        <span>${listResult[i].from}</span>
                        <img class="plane-logo" src=${imgsrc} alt="">
                        <span>${listResult[i].to}</span>
                    </div>
                    <div class="item-time">
                        <span class="gray">Khởi hành:</span>
                        <span>${moment(listResult[i].depart).format('DD/MM/YYYY HH:mm')}</span>
                    </div>
                    <div class="item-flex item-line">
                        <img src="images/start_icon.png" alt="">
                        <img src="images/plane_icon.png" alt="">
                        <img src="images/end_icon.png" alt="">
                    </div>
                    <div class="item-flex item-bottom">
                        <div>
                            <span class="gray">Giá vé:</span>
                            <span class="price">${listResult[i].price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") +" VND"}</span>
                        </div>
                            <span class="view" data-id = ${listResult[i].id}>Xem chi tiết</span>
                        </div>
                    </div>`;
        }
        if(listResult.length == 0) document.getElementById("list_result").innerHTML += "<h4 style='color:red;'> Không có chuyến bay phù hợp ! </h4>"
    });


    searchResult.classList.add("active");
};


closeButton.onclick = function () {
    console.log("ád");
    searchResult.classList.remove("active");
};

form.onsubmit = function () {
    return false;
};

// select seat
let seatWrapper = document.querySelector(".seat-wrapper");
seatWrapper.onclick = function (event) {
    let target = event.target.closest(".seat-column");
    if (!target) return;
    if (
        target.classList.contains("occupied") ||
        target.classList.contains("waiting")
    )
        return;
    if (target.classList.contains("active")){
        target.classList.remove("active");
        return;
    }

    target.classList.add("active");
};

// view detail
searchResult.onclick = function (event) {
    let target = event.target.closest(".search-result span.view");
    if (!target) return;

    var id = $(target).data("id");
    console.log(id);


    $.post("/allSeat", function(data) {
        const listSeat = [];
        for(let i = 0; i < data.data.length; i ++) {
            if(data.data[i]["id_flight"] == id) listSeat.push(data.data[i]);
        }
        for(let i = 0; i < listSeat.length; i ++) {
            listSeat[i]["id"] = listSeat[i]["id"].substring(0,3);
        }
        for(let i = 0; i < listSeat.length; i ++){
            var element = document.getElementById(listSeat[i].id);
            element.classList.remove("occupied");
            element.classList.remove("active");
        }
        
        for(let i = 0; i < listSeat.length; i ++){
            if(listSeat[i].type == "2"){
                var element = document.getElementById(listSeat[i].id);
                element.classList.add("occupied");
            }
        }

    });

    $.post("/allFlight", function (data) {
        const listInfo = [];
        for (let i = 0; i < data.data.length; i++) {
            if(data.data[i]["id"] == id) listInfo.push(data.data[i]);
        }
        console.log(listInfo);
        document.getElementById("from").innerHTML = '';
        document.getElementById("to").innerHTML = '';
        document.getElementById("depart").innerHTML = '';
        document.getElementById("id").innerHTML = '';
        document.getElementById("price").innerHTML = '';
    
        document.getElementById("from").innerHTML += listInfo[0]["from"];
        document.getElementById("to").innerHTML += listInfo[0]["to"];
        document.getElementById("depart").innerHTML += listInfo[0]["depart"].toString().toLocaleString('en-US'); 
        document.getElementById("id").innerHTML += listInfo[0]["id"];
        document.getElementById("price").innerHTML += listInfo[0]["price"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") +" VND";

        var d = new Date(document.getElementById("depart").innerHTML);
        document.getElementById("depart").innerHTML = d.toLocaleString();

    });

    let searchDetail = document.querySelector(".search-detail");
    searchDetail.classList.add("active");
};

let searchDetail = document.querySelector(".search-detail");
let searchDetailClose = document.querySelector(".search-detail .fa-times");
searchDetailClose.onclick = function () {
    searchDetail.classList.remove("active");
};

// resolve form validation
let seat = document.querySelector(".seat");
let bookButton = document.getElementById("bookButton");
bookButton.onclick = function () {
    let seatFields = seat.querySelectorAll(".seat-column.active");
    const listSeat = [];

    for (let seatField of seatFields) {
        listSeat.push(seatField.id);
    }
    var result = "";
    result += document.getElementById("id").innerHTML;

    for(let i = 0; i < listSeat.length; i ++)
    {
        result += ":" + listSeat[i];
    }
    document.getElementById("idSeat").value = result;
    document.getElementById("idSeat").innerHTML = '';
    document.getElementById("idSeat").innerHTML += result;
};

