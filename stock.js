let datos = []; // ARRAY DE JUEGOS DESDE stock.json
let juegos = []; // JUEGOS CON ATRIBUTOS Y FUNCIONES PARA USARLO EN main.js

// GET stock.json
let url = "stock.json"
$.getJSON(url, function(response, state){
    if(state == "success"){
        datos = response;

        // GUARDAR datos EN EL ARRAY juegos CON SUS ATRIBUTOS Y FUNCIONES
        for(let item of datos){
            juegos.push(new Juego(item.id, item.nombre, item.plataforma, item.precio, item.imagen));
        }

        //GUARDAR ARRAY juegos EN EL LOCAL STORAGE
        let juegosJSON = JSON.stringify(juegos);
        localStorage.setItem("data", juegosJSON);

        // AGREGAR JUEGOS AL DOCUMENT
        let juegosDOM = document.querySelector("#juegosDOM");

        for(let el of datos){
            let divJuego = document.createElement("div");
            divJuego.classList.add("juego");
            divJuego.innerHTML = `
                <div class="imagen_juego">
                    <img src="${el.imagen}" alt="${el.nombre}">
                </div>
                <div class="descripcion_juego">
                    <p class="descripcion_juego--nombre">${el.nombre}</p>
                    <p class="descripcion_juego--plataforma">${el.plataforma}</p>
                    <p class="descripcion_juego--precio">$ARS ${el.precio}</p>
                    <button onClick="agregarJuego(${el.id})">Agregar</button>
                </div>`;
            juegosDOM.appendChild(divJuego);
        };
    }
});

//FUNCION PARA CONSTRUIR CADA JUEGO DENTRO DEL ARRAY juegos
function Juego(id, nombre, plataforma, precio, imagen){
    
    this.id = parseInt(id);
    this.nombre = nombre;
    this.plataforma = plataforma;
    this.precio = parseInt(precio);
    this.imagen = imagen;
    
    // Agregar item al carrito y al Local Storage
    this.agregarCarrito = function(){
        carrito.push(new Juego(this. id, this.nombre, this.plataforma, this.precio));
        
        //Actualizar en el Local Storage
        carritoJSON = JSON.stringify(carrito);
        localStorage.setItem("carrito", carritoJSON);

        // Numero de items en el icono del carrito
        actualizarNumeroCarrito();
    }
}

