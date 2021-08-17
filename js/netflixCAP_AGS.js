window.onload = function () {

    document.getElementById("buscar").addEventListener("click", buscar);

    function buscar() {
        let titulo = document.getElementById("titulo").value;
        let year = document.getElementById("year").value;
        const urltitulo = "http://www.omdbapi.com/?apikey=a98f434c&t=";
        const urlfinal = urltitulo+titulo+"&y="+year;
        
        fetch(urlfinal)//para mostrar el titulo
            .then(data => data.json())
            .then(data => {
                document.getElementById("muestraTitulo").innerHTML = data.Title;
                document.getElementById("muestraImagen").innerHTML= '<img src="'+ data.Poster +'" >';
                console.log(data.Poster);
        })
    }//fin buscar

}