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
                num = 1
                break;
            case 2:
                num += 1
                break;
            case 3:
                num -= 1
                break;
            default:
                break;
        }

        if (num < 1) {
            num=1;
            alert("Ya has llegado al inicio de la búsqueda");
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
                console.log(datos.totalResults);
                console.log(Math.ceil(datos.totalResults/10));
                console.log(urlfinal);
                document.getElementById("resultado").innerHTML = `Se han encontrado ${datos.totalResults} películas con ese criterio de búsqueda`;
                for (var p in pelis) {
                    //console.log(pelis[p].Title+" : "+pelis[p].Year+" : "+pelis[p].Released+" : "+pelis[p].Actors+" : "+pelis[p].Genre+" : "+pelis[p].Plot);
                    document.getElementById("muestra").innerHTML +=
                        `
                        <div class="card deck" style="width: 18rem; margin : auto;">
                            <img class="card-img-top img-thumbnail" src="${pelis[p].Poster}" alt="Card image cap">
                            <div class="card-body">
                                <h4 class="card-title text-center">${pelis[p].Title}</h5>
                                <h5 class="text-center text-secondary">Año: ${pelis[p].Year}</h5>
                            </div>                        
                            <ul class="list-group list-group-flush">
                            <!-- <a href="#" class="btn btn-seconday">Infomación</a>-->
                            </ul>
                        </div>                  
                    <br>
                    `;
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