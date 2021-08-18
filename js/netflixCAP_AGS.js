window.onload = function () {
    document.getElementById("buscar").addEventListener("click", () => buscar(1));
    document.getElementById("before").addEventListener("click", buscarBefore);
    document.getElementById("next").addEventListener("click", buscarNext);
    let num = 0;


    function url() {
        document.getElementById("muestra").innerHTML = "";
        let titulo = document.getElementById("titulo").value;
        const urlapi = "http://www.omdbapi.com/?apikey=a98f434c&s=";
        const urltitulo = urlapi + titulo;
        return urltitulo;
    }


    function buscar(x) {        

        switch (x) {
            case 1:
                document.getElementById("next").disabled=false;
                num = 1;                
                break;
            case 2:
                num += 1;
                document.getElementById("before").disabled=false;
                break;
            case 3:
                num -= 1;
                break;
            default:
                break;
        }

        if (num <= 1) {                       
            document.getElementById("before").disabled=true;
            num = 1; 
        }

        let urltitulo = url();
        const urlfinal = urltitulo + "&page=" + num;
        fetch(urlfinal)
            .then(estado)
            .then(function (respuesta) {
                return respuesta.json();
            })
            .then(function (datos) {
                let pelis = datos.Search;
                console.log(datos);
                console.log(Math.ceil(datos.totalResults / 10));
                let resultsPage = Math.ceil(datos.totalResults / 10);
                if (num>=resultsPage) {
                    document.getElementById("next").disabled=true;
                }
                console.log(urlfinal);
                document.getElementById("resultado").innerHTML = `Se han encontrado ${datos.totalResults} películas que contienen la palabra "${document.getElementById("titulo").value}"`;
                for (var p in pelis) {
                    let url2 = "http://www.omdbapi.com/?apikey=a98f434c&t=" + pelis[p].Title;
                    fetch(url2)
                        .then(peli => peli.json())
                        .then(peli => {
                            document.getElementById("muestra").innerHTML +=
                                ` 
                                <div class="col-4">
                                <div class="row">
                                    <div class="card deck">
                                        <img class="card-img-top img-thumbnail" src="${peli.Poster}" type="button" alt="..." data-toggle="modal"
                                            data-target="#${peli.imdbID}">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="modal fade" id="${peli.imdbID}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">                            
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="card">
                                             <img src="${peli.Poster}" class="card-img-top" alt="...">
                                                <div class="card-body">
                                                    <h3 class="card-title text-center">${peli.Title}</h3>
                                                    <p class="card-text">${peli.Plot}</p>
                                                    <p class="card-text"><span class="font-weight-bold">Año:</span> ${peli.Year}</p>                                                    
                                                    <p class="card-text"><span class="font-weight-bold">Estreno en salas:</span> ${peli.Released}</p>                                                    
                                                    <p class="card-text"><span class="font-weight-bold">Actores:</span> ${peli.Actors}</p>                                                    
                                                    <p class="card-text"><span class="font-weight-bold">Genero:</span> ${peli.Genre}</p>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>                            
                                </div>
                            </div>
                            </div>
                            <br>
                            `;
                        });
                }
            })
            .catch(err => { console.log(err) });
    }//fin buscar

    function buscarNext() {
        buscar(2);
    }

    function buscarBefore() {
        buscar(3);
    }

    function estado(respuesta) {
        if (respuesta.ok) {
            return Promise.resolve(respuesta);
        } else {
            return Promise.reject(new Error(respuesta.statusText));
        }
    }
}