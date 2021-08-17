window.onload = function () {

    document.getElementById("buscar").addEventListener("click", buscar);

    function buscar() {
        let titulo = document.getElementById("titulo").value;
        let year = document.getElementById("year").value;
        let src;
        const urltitulo = "http://www.omdbapi.com/?apikey=a98f434c&t=";
        const urlfinal = urltitulo+titulo+"&y="+year;
        
        fetch(urlfinal)//para mostrar el titulo
            .then(data => data.json())
            .then(data => {
                document.getElementById("muestraTitulo").innerHTML = data.Title;
                src=data.Poster;
                document.getElementById("muestraImagen").innerHTML= '<img src="'+ src +'" >';
        })
        
        



    }//fin buscar

}