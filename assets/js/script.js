function obtenerDigimon(name) {
    fetch(`https://digimon-api.vercel.app/api/digimon/name/${name}`)
        .then(response => response.json())
        .then(data => {

            document.getElementById("container-card").innerHTML = '';
            let html = '';
            html +=
                `<div class="tarjetaUnica" style="width: 40%;">
                    <div class="row g-0">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button onclick="obtenerTodosDigimon()" type="button" class="btn-close" aria-label="Close"></button>
                        </div>
                    <div class="row">
                        <img src="${data[0].img}" class="img-fluid rounded-start" alt="...">
                    </div>
                        <div>
                        <h5 class="tarjetaUnica_nombre">${data[0].name}</h5>
                        <p class="tarjetaUnica_level">Level: ${data[0].level}</p>
                        </div>
                    </div>
                    </div>
                </div>`
            document.getElementById("container-card").innerHTML += html
        })
        .catch()
}



function obtenerTodosDigimon() {
    fetch("https://digimon-api.vercel.app/api/digimon")
        .then(response => response.json())
        .then(data => {
            let digimones = data;
            let html = '';
            document.getElementById("container-card").innerHTML = ''

            for (let digimon of digimones) {
                html +=
                    `<div class="tarjeta">
                        <div class="tarjeta__cont">
                            <h1 class="tarjeta__nombre">${digimon.name}</h1>
                            <a onclick="obtenerDigimon('${digimon.name}')" class="tarjeta__a">Mostrar mas</a>
                        </div>
                        <img src="${digimon.img}" class="tarjeta__img" alt="...">
                    </div>`

            }
            document.getElementById("container-card").innerHTML += html

        })
        .catch(error => console.log(error))
}

obtenerTodosDigimon();


function buscarDigimon() {

    eleccion = document.getElementById("nombre").value.toLowerCase();


    fetch('https://digimon-api.vercel.app/api/digimon')

        .then(response => response.json())
        .then(data => {
            const digimon = data.find(digimon => digimon.name.toLowerCase() === eleccion);
            if (digimon) {
                document.getElementById("container-card").innerHTML = '';
                let html = '';
                html +=
                    `<div class="tarjetaUnica" style="width: 40%;">
                    <div class="row g-0">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button onclick="obtenerTodosDigimon()" type="button" class="btn-close" aria-label="Close"></button>
                        </div>
                    <div class="row">
                        <img src="${digimon.img}" class="img-fluid rounded-start" alt="...">
                    </div>
                        <div>
                        <h5 class="tarjetaUnica_nombre">${digimon.name}</h5>
                        <p class="tarjetaUnica_level">Level: ${digimon.level}</p>
                        </div>
                    </div>
                    </div>
                </div>`
                document.getElementById("container-card").innerHTML += html
            } else {
                alert("No se encontró ningún digimon con ese nombre.");
            }
        }
        )
}

let botonEnter = document.querySelector("#nombre")

botonBuscar.addEventListener("click", buscarDigimon)

botonEnter.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        buscarDigimon();
    }
})
