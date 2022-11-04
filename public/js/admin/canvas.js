$(document).ready(function () {
    //-------------
    //- DONUT CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.
    $.post("/admin/listFlight", function (data) {
        console.log(data);
        var counts = [];
        var num = 0;
        for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].brand == "BL") num++;
        }
        counts.push(num);
        num = 0;

        for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].brand == "QH") num++;
        }
        counts.push(num);
        num = 0;

        for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].brand == "VA") num++;
        }
        counts.push(num);
        num = 0;

        for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].brand == "VJ") num++;
        }
        counts.push(num);
        num = 0;

        // console.log(counts);

        var donutChartCanvas = $("#donutChart").get(0).getContext("2d");
        var donutData = {
            labels: [
                "Jetstar Pacific Airlines",
                "Bamboo Airways",
                "VietnamAirlines",
                "Vietjet Air",
                //- 'Opera',
                //- 'Navigator',
            ],
            datasets: [
                {
                    data: counts,
                    backgroundColor: [
                        "#f56954",
                        "#00a65a",
                        "#f39c12",
                        "#00c0ef",
                        // "#3c8dbc",
                        // "#d2d6de",
                    ],
                },
            ],
        };
        var donutOptions = {
            maintainAspectRatio: false,
            responsive: true,
        };
        //Create pie or douhnut chart
        // You can switch between pie and douhnut using the method below.
        new Chart(donutChartCanvas, {
            type: "doughnut",
            data: donutData,
            options: donutOptions,
        });

        ///////////////////////////////////////
        
    });

    $.post("/admin/listAccount", function (data) {
        console.log(data);
        const chart = [0,0,0,0,0,0,0,0,0,0,0,0];
        for (let i = 0; i < data.data.length; i++) {
            if(data.data[i]["create_time"].substring(5, 7) == "01") chart[0]++;
            if(data.data[i]["create_time"].substring(5, 7) == "02") chart[1]++;
            if(data.data[i]["create_time"].substring(5, 7) == "03") chart[2]++;
            if(data.data[i]["create_time"].substring(5, 7) == "04") chart[3]++;
            if(data.data[i]["create_time"].substring(5, 7) == "05") chart[4]++;
            if(data.data[i]["create_time"].substring(5, 7) == "06") chart[5]++;
            if(data.data[i]["create_time"].substring(5, 7) == "07") chart[6]++;
            if(data.data[i]["create_time"].substring(5, 7) == "08") chart[7]++;
            if(data.data[i]["create_time"].substring(5, 7) == "09") chart[8]++;
            if(data.data[i]["create_time"].substring(5, 7) == "10") chart[9]++;
            if(data.data[i]["create_time"].substring(5, 7) == "11") chart[10]++;
            if(data.data[i]["create_time"].substring(5, 7) == "12") chart[11]++;
        }
        console.log(chart);

        var areaChartCanvas = $('#areaChart').get(0).getContext('2d')
        var areaChartData = {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            datasets: [
                {
                    label: 'Năm nay',
                    backgroundColor: 'rgba(60,141,188,0.9)',
                    borderColor: 'rgba(60,141,188,0.8)',
                    pointRadius: false,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(60,141,188,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    data: chart
                },
            ]
        }

        var areaChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                    }
                }]
            }
        }

        // This will get the first returned node in the jQuery collection.
    

        //-------------
        //- LINE CHART -
        //--------------
        var lineChartCanvas = $('#lineChart').get(0).getContext('2d')
        var lineChartOptions = $.extend(true, {}, areaChartOptions)
        var lineChartData = $.extend(true, {}, areaChartData)
        lineChartData.datasets[0].fill = false;
        // lineChartData.datasets[1].fill = false;
        lineChartOptions.datasetFill = false

        var lineChart = new Chart(lineChartCanvas, {
            type: 'line',
            data: lineChartData,
            options: lineChartOptions
        })
    });

    $.post("/admin/listTicket", function (data) {
        //  --------------
        //- AREA CHART -
        //--------------

        console.log(data.data);
        const chart0 = [0,0,0,0,0,0,0,0,0,0,0,0];
        const chart1 = [0,0,0,0,0,0,0,0,0,0,0,0];
        // console.log(data.data[0]["create_time"].substring(0, 4));
        // console.log(data.data[0]["create_time"].substring(5, 7));
        for (let i = 0; i < data.data.length; i++) {
            if(data.data[i]["create_time"].substring(0, 4) == "2021"){
                if(data.data[i]["create_time"].substring(5, 7) == "01") chart1[0]++;
                if(data.data[i]["create_time"].substring(5, 7) == "02") chart1[1]++;
                if(data.data[i]["create_time"].substring(5, 7) == "03") chart1[2]++;
                if(data.data[i]["create_time"].substring(5, 7) == "04") chart1[3]++;
                if(data.data[i]["create_time"].substring(5, 7) == "05") chart1[4]++;
                if(data.data[i]["create_time"].substring(5, 7) == "06") chart1[5]++;
                if(data.data[i]["create_time"].substring(5, 7) == "07") chart1[6]++;
                if(data.data[i]["create_time"].substring(5, 7) == "08") chart1[7]++;
                if(data.data[i]["create_time"].substring(5, 7) == "09") chart1[8]++;
                if(data.data[i]["create_time"].substring(5, 7) == "10") chart1[9]++;
                if(data.data[i]["create_time"].substring(5, 7) == "11") chart1[10]++;
                if(data.data[i]["create_time"].substring(5, 7) == "12") chart1[11]++;
            }
            else {
                if(data.data[i]["create_time"].substring(5, 7) == "01") chart0[0]++;
                if(data.data[i]["create_time"].substring(5, 7) == "02") chart0[1]++;
                if(data.data[i]["create_time"].substring(5, 7) == "03") chart0[2]++;
                if(data.data[i]["create_time"].substring(5, 7) == "04") chart0[3]++;
                if(data.data[i]["create_time"].substring(5, 7) == "05") chart0[4]++;
                if(data.data[i]["create_time"].substring(5, 7) == "06") chart0[5]++;
                if(data.data[i]["create_time"].substring(5, 7) == "07") chart0[6]++;
                if(data.data[i]["create_time"].substring(5, 7) == "08") chart0[7]++;
                if(data.data[i]["create_time"].substring(5, 7) == "09") chart0[8]++;
                if(data.data[i]["create_time"].substring(5, 7) == "10") chart0[9]++;
                if(data.data[i]["create_time"].substring(5, 7) == "11") chart0[10]++;
                if(data.data[i]["create_time"].substring(5, 7) == "12") chart0[11]++;
            }
            
        }
        // console.log(chart0);
        // console.log(chart1);


        var areaChartCanvas = $('#areaChart').get(0).getContext('2d')

        var areaChartData = {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            datasets: [
                {
                    label: 'Năm nay',
                    backgroundColor: 'rgba(60,141,188,0.9)',
                    borderColor: 'rgba(60,141,188,0.8)',
                    pointRadius: false,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(60,141,188,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    data: chart1
                },
                {
                    label: 'Năm trước',
                    backgroundColor: 'rgba(210, 214, 222, 1)',
                    borderColor: 'rgba(210, 214, 222, 1)',
                    pointRadius: false,
                    pointColor: 'rgba(210, 214, 222, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: chart0
                },
            ]
        }
        
        var areaChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                    }
                }]
            }
        }
        new Chart(areaChartCanvas, {
            type: 'line',
            data: areaChartData,
            options: areaChartOptions
        })



        
    });

    $.post("/admin/listTicket", function(data) {
        console.log(data.data);
        const chart2 = [0,0,0,0,0,0,0,0,0,0,0,0];
        const chart3 = [0,0,0,0,0,0,0,0,0,0,0,0];
        for (let i = 0; i < data.data.length; i++) {
            if(data.data[i]["create_time"].substring(0, 4) == "2021"){
                if(data.data[i]["create_time"].substring(5, 7) == "01") chart2[0]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "02") chart2[1]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "03") chart2[2]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "04") chart2[3]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "05") chart2[4]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "06") chart2[5]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "07") chart2[6]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "08") chart2[7]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "09") chart2[8]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "10") chart2[9]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "11") chart2[10]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "12") chart2[11]+= data.data[i]["price"];
            }
            else {
                if(data.data[i]["create_time"].substring(5, 7) == "01") chart3[0]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "02") chart3[1]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "03") chart3[2]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "04") chart3[3]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "05") chart3[4]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "06") chart3[5]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "07") chart3[6]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "08") chart3[7]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "09") chart3[8]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "10") chart3[9]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "11") chart3[10]+= data.data[i]["price"];
                if(data.data[i]["create_time"].substring(5, 7) == "12") chart3[11]+= data.data[i]["price"];
            }
            
        }



        var areaChartCanvas = $('#areaChart').get(0).getContext('2d')

        var areaChartData = {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            datasets: [
                {
                    label: 'Năm nay',
                    backgroundColor: 'rgba(60,141,188,0.9)',
                    borderColor: 'rgba(60,141,188,0.8)',
                    pointRadius: false,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(60,141,188,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    data: chart2
                },
                {
                    label: 'Năm trước',
                    backgroundColor: 'rgba(210, 214, 222, 1)',
                    borderColor: 'rgba(210, 214, 222, 1)',
                    pointRadius: false,
                    pointColor: 'rgba(210, 214, 222, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: chart3
                },
            ]
        }
        
        var areaChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                    }
                }]
            }
        }
        var barChartCanvas = $('#barChart').get(0).getContext('2d')
        var barChartData = $.extend(true, {}, areaChartData)
        var temp0 = areaChartData.datasets[0]
        var temp1 = areaChartData.datasets[1]
        barChartData.datasets[0] = temp1
        barChartData.datasets[1] = temp0

        var barChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            datasetFill: false
        }

        new Chart(barChartCanvas, {
            type: 'bar',
            data: barChartData,
            options: barChartOptions
        })
    });


});
