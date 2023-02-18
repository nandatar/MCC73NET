//AJAX => Asynchronous Javascript and XML
$(document).ready(function () {

    //atur ulang modal ditutup
    $('#formEmployee').on('hidden.bs.modal', function () {
        //atur ulang
        $('#nik').val('');
        document.getElementById("nik").disabled = false;
        $('#firstName').val('');
        $('#lastName').val('');
        $('#phone').val('');
        document.getElementById("phone").disabled = false;
        $('#salary').val('');
        $('#email').val('');
        document.getElementById("email").disabled = false;
        //button switch
        $('#insertButton').css('display', 'block');
        $('#editButton').css('display', 'none');

    });

    let table = $("#tableEmployee").DataTable({
        ajax: {
            url: "https://localhost:7234/api/Employees",
            dataType: "Json",
            dataSrc: "data" //need notice, kalau misal API kalian 
        },
        columns: [
            {
                "data": "nik"
            },
            {
                "data": "firstName"
            },
            {
                "data": "lastName"
            },
            {
                "data": "phone"
            },
            {
                "data": "birthDate"

            },
            {
                "data": "salary",
                render: function (data, type, row) {
                    return "Rp. " + row.salary.toLocaleString();
                }
            },
            {
                "data": "email"
            },
            {
                "data": "gender",
                render: function (data, type, row) {
                    return (row.gender == 0) ? "Male" : "Female";
                }
            },
            {
                "data": "nik",
                render: function (data, type, row) {
                    return `<button onclick="updateEmployee(\'${data}\')" class="btn btn-info">Edit</button> 
                            <button onclick="deleteEmployee(\'${data}\')" class="btn btn-danger">Delete</button>`
                }
            },
        ],
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'copyHtml5',
                text: '<i class="fa fa-files-o"> Copy</i>',
                titleAttr: 'Copy',
                className: 'copyButton'
            },
            {
                extend: 'excelHtml5',
                text: '<i class="fa fa-file-excel-o"> Excel</i>',
                titleAttr: 'Excel',
                className: 'excelButton'
            },
            {
                extend: 'csvHtml5',
                text: '<i class="fa fa-file-text-o"> CSV</i>',
                titleAttr: 'CSV',
                className: 'csvButton'
            },
            {
                extend: 'pdfHtml5',
                text: '<i class="fa fa-file-pdf-o"> PDF</i>',
                titleAttr: 'PDF',
                className: 'pdfButton'
            },
            {
                extend: 'colvis',
                className: 'colvisButton'
            },
        ]
    });
    (function () {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {

                    event.preventDefault()
                    event.stopPropagation()

                    form.classList.add('was-validated')
                }, false)
            })
    })()

});

//$("#formValidation").validate({
//    ignore: ":hidden",
//    rules: {
//        nik: {
//            required: true
//        },
//        firstName: {
//            required: true
//        },
//        phone: {
//            required: true,
//            minlength: 10,
//            maxlength: 13
//        },
//        birthDate: {
//            required: true
//        },
//        salary: {
//            required: true,
//            number: true
//        },
//        email: {
//            required: true,
//            email: true
//        },
//        gender: {
//            required: true
//        }
//    },
//});

//$('#insertButton').click(function (e) {
//    e.preventDefault();
//    if ($('#formValidation').valid() == true) {
//        InsertEmployee();
//    }
//    else {
//        alert("Validation Gagal");
//    }
//});




function InsertEmployee() {
    var obj = new Object(); //sesuaikan sendiri nama objectnya dan beserta isinya
    //ini ngambil value dari tiap inputan di form nya

    obj.nik = $("#nik").val();
    obj.firstName = $("#firstName").val();
    obj.lastName = $("#lastName").val();
    obj.phone = $("#phone").val();
    obj.birthDate = $("#birthDate").val();
    obj.salary = parseInt($("#salary").val());
    obj.email = $("#email").val();
    /*let gender = ($("#gender").val()=="Male") ? 0 : 1;*/
    obj.gender = parseInt($("#gender").val());
    /*console.log(JSON.stringify(obj));*/

    //isi dari object kalian buat sesuai dengan bentuk object yang akan di post
    $.ajax({
        type: "POST",
        url: "https://localhost:7234/api/Employees",
        dataType: "Json",
        contentType: "application/json",
        data: JSON.stringify(obj)
        //jika terkena 415 unsupported media type (tambahkan headertype Json & JSON.Stringify();)
    }).done((result) => {
        Swal.fire(
            'Data Berhasil Disimpan'
        ),
            $('#formEmployee').modal('hide'),
            $('.modal-backdrop').remove();
        $('#tableEmployee').DataTable().ajax.reload();
        /*console.log("berhasil insert");*/
    }).fail((error) => {
        //alert pemberitahuan jika gagal
        /*console.log("gagal insert");*/
        Swal.fire(
            'Gagal Disimpan'
        )
    })
};

function deleteEmployee(nik) {
    console.log(nik),
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'

        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: 'https://localhost:7234/api/Employees?key=' + nik,
                    type: 'DELETE',
                    success: function (response) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )

                        $('#tableEmployee').DataTable().ajax.reload();
                    },
                    error: function (response) {
                        alert("Something went wrong.");
                        console.log(response);
                    },
                });
            }
        })
}

function updateEmployee(nik) {
    $('#namaHeader').html('Edit Data');
    $.ajax({
        url: 'https://localhost:7234/api/Employees/' + nik,
        success: function (result) {
            $('#nik').val(result.data.nik);
            document.getElementById("nik").disabled = true;
            $('#firstName').val(result.data.firstName);
            $('#lastName').val(result.data.lastName);
            $('#phone').val(result.data.phone);
            document.getElementById("phone").disabled = true;
            /*$('#birthDate').val(result.data.birthDate);*/
            $('#salary').val(result.data.salary);
            $('#email').val(result.data.email);
            document.getElementById("email").disabled = true;
            //button switch
            $('#insertButton').css('display', 'none');
            $('#editButton').css('display', 'block');
            //$("#submitButton").removeAttr("onclick");
            //$("#submitButton").click(function () {
            //    apiUpdate();
            //});
            $('#formEmployee').modal('show');
        }
    })
}


function apiUpdate() {

    var obj = new Object();
    obj.nik = $("#nik").val();
    obj.firstName = $("#firstName").val();
    obj.lastName = $("#lastName").val();
    obj.phone = $("#phone").val();
    obj.birthDate = $("#birthDate").val();
    obj.salary = parseInt($("#salary").val());
    obj.email = $("#email").val();
    /*let gender = ($("#gender").val()=="Male") ? 0 : 1;*/
    obj.gender = parseInt($("#gender").val());
    $.ajax({
        url: 'https://localhost:7234/api/Employees',
        type: 'PUT',
        dataType: "Json",
        contentType: "application/json",
        data: JSON.stringify(obj),
        success: function (response) {
            Swal.fire(
                'Updated!',
                'Your file has been updated.',
                'success'
            )
            $('#tableEmployee').DataTable().ajax.reload();
            $('#formEmployee').modal('hide');
            $('.modal-backdrop').remove();
        },
        error: function (response) {
            Swal.fire(
                'Gagal Disimpan'
            )
            console.log(response);
        },
    });
}

//CHART API
//fetching API
fetch('https://localhost:7234/api/Employees').then(function (response) {
    // The API call was successful!
    return response.json();
}).then(function (data) {

    let male = data.data.filter(item => item.gender == 0).length;
    let female = data.data.filter(item => item.gender == 1).length;
    console.log(male);
    console.log(female);

    //chart1
    var options = {
        series: [male, female],
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: ['Male', 'Female'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    //chart2
    var options = {
        series: [{
            name: 'Inflation',
            data: [male, female]
        }],
        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val;
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },

        xaxis: {
            categories: ["Male", "Female"],
            position: 'top',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val;
                }
            }

        },
        title: {
            text: 'Employee Gender Statistic',
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
                color: '#444'
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#chart2"), options);
    chart.render();
 
}).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
});


