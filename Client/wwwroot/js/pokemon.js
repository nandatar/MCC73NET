//let judul = document.getElementById("judul");


//let paragraf = document.getElementsByTagName("p")[0];
//paragraf.style.backgroundColor = "red";

//let variable1 = document.getElementsByClassName("list");

//judul.onclick = function () {
//    paragraf.innerHTML = "berubah!";
//}

//let ul = document.getElementsByTagName("ul");
//let li = ul.getElementsByTagName("li");

//judul.onclick = () => {
//    judul.style.backgroundColor = "cyan";
//    judul.innerHTML = "saya rubah dari JS";
//}

//judul.addEventListener("click", function () {
//    paragraf.innerHTML = "berubah!";
//});

//judul.addEventListener("click", function () {
//    judul.style.backgroundColor = "cyan";
//    judul.innerHTML = "saya rubah dari JS";
//});

//paragraf.addEventListener("mouseenter", function () {
//    paragraf.innerHTML = "Mashokkkk!!!";
//});

//paragraf.addEventListener("mouseleave", function () {
//    paragraf.innerHTML = "KELOARRR!!!";
//});

//let list3 = document.querySelector("li.list#list:nth-child(3)");

//function berubah() {
//    for (var i = 0; i < variable1["length"]; i++) {
//        variable1[i].innerHTML = "diubah dari onclick html";
//    }
//}

////Array
//let array = [1, 2, 3, 4];
////insert last
//array.push("halo");
//console.log(array);
////delete last
//array.pop();
//console.log(array);
////insert first
//array.unshift("test");
//console.log(array);
////delete first
//array.shift();
//console.log(array);

////array multi dimensi
//let arrayMulti = [1, 2, 3, ['a', 'b', 'c'], true];
//console.log(arrayMulti);

//let tambah = (x, y) => { return x + y; }
//console.log(tambah(5, 10));

////array associative
//array["asda"]

//////constanta
////const nilai = 50;
////console.log(nilai);
////nilai = 90;
////console.log(nilai);


////object
//const mhs = {
//    nama: "budi",
//    nim: "a111293192",
//    gender: "laki",
//    hobby: ["mancing", "tawuran", "ngegame"],
//    isActive: true
//};

//console.log(mhs);
//const user = {};
//user.username = "budilagi";
//user.password = "inipasswordbudi";
//console.log(user);

//user.password = "berubah";
//console.log(user);

////array of object
//const animals = [
//    { name: "budi", species: "dog", class: {name:"mamalia"}},
//    { name: "tono", species: "dog", class: {name:"mamalia"}},
//    { name: "nemo", species: "fish", class: {name:"invertebrata"}},
//    { name: "dory", species: "fish", class: {name:"invertebrata"}},
//    { name: "james", species: "dog", class: {name:"mamalia"}}
//]

//console.log(animals);
////function onlydog, yaitu looping ke animals=> yg diambil hanya species dog
////const onlyDog
////jika species = fish => maka ubah class name menjadi 'non-mamalia'

///*const onlyDog = [];*/
////for (var i = 0; i < animals.length; i++) {
////    if (animals[i].species == "dog") {
////        onlyDog.push(animals[i]);
////    }
////}

///*onlyDog.push(animals.filter(animal => animal.species == "dog"));*/
////console.log(onlyDog);

//let detailAnimal;
//detailAnimal = animals.map(animal => {
//    return {
//        name: animal.name,
//        species: animal.species,
//        isFish: animal.species == "fish" ? true:false
//    }
//})

//console.log(detailAnimal);

//let data = {
//    series: [30,20],
//    labels: ["cowok","cewek"]
//}

//jquery

//$("#judul").click(function () {
//    $("#judul").css("background-color", "red");
//    $("#judul").html("Berubah!!")
//})

//AJAX => Asynchronous Javascript and XML
$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/",
}).done((result) => {
    /*console.log(result.results);*/
    let temp = ""
    $.each(result.results, function (key, val) {
        temp += `<tr>
                    <td>${key + 1}</td>
                    <td>${val.name}</td>
                    <td><button class="btn btn-primary" onclick="detailPoke('${val.url}')" data-bs-toggle="modal" data-bs-target="#modalPokeDetail">Detail</button></td>
                </tr>`
    })
    $("#tablePoke").html(temp);


}).fail((err) => {
    console.log(err);
})

$(document).ready(function () {
    $('#table_id').DataTable();
});


function detailPoke(stringUrl) {
    $.ajax({
        url: stringUrl,
        success: function (result) {
            /*$(".modal-title").html('Details');*/
            $(".pokemon-img").attr('src', result.sprites.front_default);
            /*console.log((result.id.toString()).padStart(3, '0'));*/
            $(".pokemon-card__id").html("#" + (result.id.toString()).padStart(3, '0'));
            $(".pokemon-card__name").html(result.name);

            let temp = ""
            $.each(result.types, function (key, val) {
                /*console.log(val.ability.name);*/
                temp += `<span class="pokemon-type -${val.type.name}"> ${val.type.name}</span >`
            })
            $(".pokemon-types").html(temp);

            $(".-height").html(Math.round((result.height) * 10) / 100 + "m");
            $(".-weight").html(Math.round((result.weight) * 10) / 100 + "Kg");

            temp = ""
            $.each(result.abilities, function (key, val) {
                /*console.log(val.type.name);*/
                temp += `<span class="pokemon-card__ability">${val.ability.name}</span> `
            })
            $(".pokemon-card__abilities").html(temp);

            //hp
            let stats = result.stats[0].base_stat;
            let percent = (stats * 100) / 200 + "%";
            let bar = ""
            if (stats < 50) {
                bar = "low";
            }
            if (stats >= 50 && stats < 100) {
                bar = "medium";
            }
            if (stats >= 100 && stats < 150) {
                bar = "high";
            }
            if (stats >= 200) {
                bar = "epic";
            }
            temp = ""
            temp += `<div class="pokemon-card__graph -${bar} hp_bar" style="width:${percent}">`
            $(".hp_stat").html(stats);
            $(".hp").html(temp);

            //atk
            stats = result.stats[1].base_stat;
            percent = (stats * 100) / 200 + "%";
            bar = ""
            if (stats < 50) {
                bar = "low";
            }
            if (stats >= 50 && stats < 100) {
                bar = "medium";
            }
            if (stats >= 100 && stats < 150) {
                bar = "high";
            }
            if (stats >= 200) {
                bar = "epic";
            }
            temp = ""
            temp += `<div class="pokemon-card__graph -${bar} atk_bar" style="width:${percent}">`
            $(".atk_stat").html(stats);
            $(".atk").html(temp);

            //defense
            stats = result.stats[2].base_stat;
            percent = (stats * 100) / 200 + "%";
            bar = ""
            if (stats < 50) {
                bar = "low";
            }
            if (stats >= 50 && stats < 100) {
                bar = "medium";
            }
            if (stats >= 100 && stats < 150) {
                bar = "high";
            }
            if (stats >= 200) {
                bar = "epic";
            }
            temp = ""
            temp += `<div class="pokemon-card__graph -${bar} def_bar" style="width:${percent}">`
            $(".def_stat").html(stats);
            $(".def").html(temp);

            //spca
            stats = result.stats[3].base_stat;
            percent = (stats * 100) / 200 + "%";
            percent = (stats * 100) / 200 + "%";
            bar = ""
            if (stats < 50) {
                bar = "low";
            }
            if (stats >= 50 && stats < 100) {
                bar = "medium";
            }
            if (stats >= 100 && stats < 150) {
                bar = "high";
            }
            if (stats >= 200) {
                bar = "epic";
            }
            temp = ""
            temp += `<div class="pokemon-card__graph -${bar} spca_bar" style="width:${percent}">`
            $(".spca_stat").html(stats);
            $(".spca").html(temp);

            //spcd
            stats = result.stats[4].base_stat;
            percent = (stats * 100) / 200 + "%";
            bar = ""
            if (stats < 50) {
                bar = "low";
            }
            if (stats >= 50 && stats < 100) {
                bar = "medium";
            }
            if (stats >= 100 && stats < 150) {
                bar = "high";
            }
            if (stats >= 200) {
                bar = "epic";
            }
            temp = ""
            temp += `<div class="pokemon-card__graph -${bar} spcd_bar" style="width:${percent}">`
            $(".spcd_stat").html(stats);
            $(".spcd").html(temp);

            //speed
            stats = result.stats[5].base_stat;
            percent = (stats * 100) / 200 + "%";
            bar = ""
            if (stats < 50) {
                bar = "low";
            }
            if (stats >= 50 && stats < 100) {
                bar = "medium";
            }
            if (stats >= 100 && stats < 150) {
                bar = "high";
            }
            if (stats >= 200) {
                bar = "epic";
            }
            temp = ""
            temp += `<div class="pokemon-card__graph -${bar} spd_bar" style="width:${percent}">`
            $(".spd_stat").html(stats);
            $(".spd").html(temp);

            /* $(".badge").html(result.types[0].type.name);*/
            /*console.log(result.types);*/
            /*let temp = ""*/
            //$.each(result.abilities, function (key,val) {
            //    /*console.log(val.type.name);*/
            //    temp += `<span class="badge bg-primary">${val.ability.name}</span> `
            //})
            //$(".badge.skill").html(temp);
            //temp = ""
            //$.each(result.types, function (key, val) {
            //    /*console.log(val.ability.name);*/
            //    temp += `<span class="badge bg-primary">${val.type.name}</span> `
            //})
            //$(".type").html(temp);
        }
    })
}
