window.onload = function () {

    document.getElementById("buscar").addEventListener("click", buscar);

    function buscar() {
        document.getElementById("muestra").innerHTML="";
        let titulo = document.getElementById("titulo").value;
        const urltitulo = "http://www.omdbapi.com/?apikey=a98f434c&s=";
        const urlfinal = urltitulo + titulo;

        fetch(urlfinal)
            .then(estado)
            .then(function (respuesta){
                return respuesta.json();
            })
            .then (function(datos){
                let pelis = datos.Search;
                console.log(pelis);
                for (var p in pelis){
                    //console.log(pelis[p].Title+" : "+pelis[p].Year+" : "+pelis[p].Released+" : "+pelis[p].Actors+" : "+pelis[p].Genre+" : "+pelis[p].Plot);
                    document.getElementById("muestra").innerHTML+=
                    `
                    <div class="card text-center" style="width: 18rem; margin : auto;">
                    <img class="card-img-top" src="${pelis[p].Poster}" alt="Card image cap" >
                    <div class="card-body">
                        <h5 class="card-title">${pelis[p].Title}</h5>
                        <p class="card-text"><span id="muestraSinopsis"></span>${pelis[p].Plot}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><span id="muestraYear"></span>${pelis[p].Year}</li>
                        <li class="list-group-item"><span id="muestraEstreno"></span>${pelis[p].Released}</li>
                        <li class="list-group-item"><span id="muestraActores"></span>${pelis[p].Actors}</li>
                        <li class="list-group-item"><span id="muestraGenero"></span>${pelis[p].Genre}</li>
                    </ul>
                    </div>
                    <br>
                    `;
                }
            })
            .cath (function(err){
                console.error("Error en la búsqueda de películas",err)
            });
/*             .then(data => data.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    document.getElementById("muestraImagen").innerHTML = '<img class="card-img-top" src="' + data[i].Poster + '" alt="Card image cap" >';
                    document.getElementById("muestraTitulo").innerHTML = data[i].Title;
                    document.getElementById("muestraYear").innerHTML = "Año: " + data[i].Year;
                    document.getElementById("muestraEstreno").innerHTML = "Estreno en salas: " + data[i].Released;
                    document.getElementById("muestraActores").innerHTML = "Actores: " + data[i].Actors;
                    document.getElementById("muestraGenero").innerHTML = "Genero: " + data[i].Genre;
                    document.getElementById("muestraSinopsis").innerHTML = "Sinposis: " + data[i].Plot;
                    console.log(data);
                }
            })
            .catch(err => { console.log(err) }); */
    }//fin buscar

    function estado(respuesta){
        if(respuesta.ok){
            return Promise.resolve(respuesta);
        }else {
            return Promise.reject(new Error (respuesta.statusText));
        }
    }

    function tabla(datos){

        for (const d of datos) {


            
        }

    }

}