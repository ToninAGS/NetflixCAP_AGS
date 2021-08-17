window.onload = function () {

    document.getElementById("buscar").addEventListener("click", buscar);

    function buscar() {
        let titulo = document.getElementById("titulo").value;
        let year = document.getElementById("year").value;
        const urltitulo = "http://www.omdbapi.com/?apikey=a98f434c&t=";
        const urlfinal = urltitulo+titulo+"&y="+year;
        
        fetch(urlfinal)
            .then(data => data.json())
            .then(data => {
                document.getElementById("muestraImagen").innerHTML= '<img class="card-img-top" src="'+ data.Poster +'" alt="Card image cap" >';
                document.getElementById("muestraTitulo").innerHTML =data.Title;
                document.getElementById("muestraYear").innerHTML = "Año: "+ data.Year;
                document.getElementById("muestraEstreno").innerHTML ="Estreno en salas: "+  data.Released;
                document.getElementById("muestraActores").innerHTML ="Actores: "+  data.Actors;
                document.getElementById("muestraGenero").innerHTML ="Genero: "+  data.Genre;
                document.getElementById("muestraSinopsis").innerHTML ="Sinposis: "+  data.Plot;
                console.log(data);
            })
            .catch(err => {console.log(err)});
    }//fin buscar

}