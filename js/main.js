// ARRAYS Y VARIABLES
let carrito = []; // Juegos en el carrito
let carritoJSON = []; // Carrito con JSON.stringify para guardar en Storage

// Datos para confirmar la compra y pagar
let datosCompra = {
    nombre: "",
    email: "",
    direccion: "",
    metodo: "",
    numeroTarjeta: "",
};

// ICONO DEL CARRITO
let carritoIcono = document.querySelector("#carritoIcono");
carritoIcono.addEventListener("click", mostrarCarrito);

let carritoNumero = document.querySelector("#carritoNumero");
carritoNumero.addEventListener("click", mostrarCarrito);
function actualizarNumeroCarrito(){ carritoNumero.innerHTML = carrito.length; }

// OBTENER DATOS DEL LOCAL
if(localStorage.getItem("carrito") !== null){
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarNumeroCarrito();
}

// FUNCION PARA AGREGAR UN JUEGO AL CARRITO
function agregarJuego(idBoton){
    let alertaJuegoAgregado = document.querySelector("#alerta");

    for(item of juegos){
        if(idBoton == item.id){
            
            item.agregarCarrito();
            let divAlerta = document.createElement("div");
            divAlerta.innerHTML = `<i class="fas fa-check"></i> Agregaste:<br>${item.nombre}`;
            alertaJuegoAgregado.appendChild(divAlerta);

            $("#alerta div").fadeIn(1000)
                .delay(3000)
                .fadeOut(1000);
            setTimeout(function() { $('#alerta div:first-child').remove();}, 4000);
        }
    }
}

// FUNCTION PARA CONTAR ITEMS REPETIDOS EN EL CARRITO
function contadorCarrito(id){
    let n = 0;
    for(item of carrito){
        if (item.id === id) {
            n++
        }
    }
    return n;
}

// FUNCION PARA SUMAR EL TOTAL DE PRECIOS
function contarTotal(){
    let total = 0;
    for(let item of carrito){
        total += item.precio
    }
    return total;
}

// FUNCION PARA DEVOLVER CARRITO LIMPIO SIN REPETIDOS
function devolverCarritoLimpio(){
    let carritoSinRepetidos = [];
    
    for(item of juegos){
        let x = carrito.find(el => el.id === item.id)
        if(typeof x == "undefined"){
        }else{
            carritoSinRepetidos.push(x);
        }
    }
    return carritoSinRepetidos;
}

// MOSTRAR CARRITO AL HACER CLICK SOBRE EL ICONO DEL CARRITO
function mostrarCarrito(){
    let itemsCarritoHTML = "";
    let boxCarrito = document.querySelector("#boxCarrito");
    let carritoLimpio = devolverCarritoLimpio(); // Carrito sin items repetidos

    // Crear tabla con cada elemento del carrito y guardarlo en itemsCarritoHTML
    for(let item of carritoLimpio){
        itemsCarritoHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>ARS$ ${item.precio}</td>
                <td>${contadorCarrito(item.id)}</td>
                <td><button onClick="borrarDelCarrito(${item.id})"><i class="fas fa-trash-alt"></i></button></td>
            </tr>`
    }       

    // Modificar el contenido de la tabla y agregar el itemsCarritoHTML
    if(carrito.length == 0){
        boxCarrito.innerHTML =`
            <div class="boxSinItems">
                <i class="fas fa-shopping-cart fa-shopping-cart--sinItems" id="carritoIcono"></i><br>
                <p class="p_sinItems">No hay artículos en el carrito</p>
            </div>
        `;
    }else(
        boxCarrito.innerHTML = `
            <div>
                <table>
                    <tr>
                        <th>Juego</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th></th>
                    </tr>  
                    ${itemsCarritoHTML}
                    <caption>Total: ARS$ ${contarTotal()}</caption>
                </table>
                <button id="eliminarTodo" onClick="eliminarTodo()">Eliminar todo</button>
                <button onClick="confirmar()" class="confirmar">Confirmar Compra</button>
            </div>    
        `);
    
    // Habilitar-deshabilitar visibilidad del box el carrito
    $("#fondoGris").fadeIn();
    $('#boxCarrito').slideDown();
}

// SALIR DEL BOX DEL CARRITO
$("#fondoGris").on('click', function(){
    $('#boxCarrito').slideUp();
    $("#fondoGris").fadeOut();
})

// BORRAR CARRITO CON BOTON #eliminarTodo EN EL BOX
function eliminarTodo(){
    carrito = [];

    // Actualizar carrito en el Local Storage
    carritoJSON = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoJSON);

    // Actualizar contador en el icono del carrito
    actualizarNumeroCarrito()

    // Actualizar el document
    mostrarCarrito();
    borrarLocalVacio();
}

// BORRAR EL LOCAL STORAGE SI EL KEY carrito ESTA VACIO
function borrarLocalVacio(){
    let x = JSON.parse(localStorage.getItem("carrito"));
    if(x.length == 0){
        localStorage.removeItem("carrito");
    }
}

// BORRAR ITEM DEL CARRITO
function borrarDelCarrito(e){
    
    //Borar items del carrito
    for(let i = carrito.length-1; i>(-1);  i-=1){
        if (carrito[i].id == e) {
            carrito.splice(i, 1); 
        }
    }

    // Actualizar carrito en el Local Storage
    carritoJSON = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoJSON);

    // Actualizar contador en el icono del carrito
    actualizarNumeroCarrito()

    // Actualizar el document con los juegos restantes en el carrito y el total de precios
    mostrarCarrito();
    borrarLocalVacio();
}

// ANIMACIONES DEL BOX PARA PONER DATOS DE LA COMPRA
function confirmar(){
    $("#boxCarrito").fadeOut();
    $("#datosCompra").fadeIn().css("display", "flex");
    $("#fondoGrisConfirmar").fadeIn().css("display", "block");
};

// ANIMACIONES Y FUNCIONES DEL BOTON "Cancelar"
document.querySelector("#cancelar").addEventListener("click", function(){
    $("#datosCompra").fadeOut();
    $("#fondoGrisConfirmar").fadeOut();
    $("#boxMetodoDePago").fadeOut();
    $("#fondoGris").fadeOut();

    setTimeout(function(){
        let errorDatos = document.querySelectorAll(".errorDatos")
        for(let item of errorDatos){
            item.innerHTML = "";
        }
    }, 1000); 
});

// BOTON "Siguiente" PARA TOMAR DATOS DEL COMPRADOR
document.querySelector("#siguienteCompra").addEventListener("click", function(e){
    e.preventDefault()
    let nombreComprador = document.querySelector("#datosCompra_nombre");
    let emailComprador = document.querySelector("#datosCompra_email");
    let direccionComprador = document.querySelector("#datosCompra_direccion");

    if(nombreComprador.value && emailComprador.value && direccionComprador.value){

        // Tomar nombre, email y direccion del comprador
        datosCompra.nombre = nombreComprador.value
        datosCompra.email = emailComprador.value
        datosCompra.direccion = direccionComprador.value

        // Pasar datos al local storage
        localStorage.setItem("datosCompra", JSON.stringify(datosCompra))

        //Animaciones
        $("#datosCompra").fadeOut();
        $("#boxMetodoDePago").css("display", "flex").fadeIn();

    }else{
        document.querySelector("#errorDatos").innerHTML = "Por favor completá todos los campos";
    }
});

// METODOS DE PAGO
let selectorMetodoDePago = document.querySelector("#selectorMetodoDePago"); // ELTIQUETA SELECTOR
let formularioMetodoDePago = document.querySelectorAll("#metodoDePago form"); // FORM DE CADA METODO DE PAGO
function ocultarFormularios(){
    for(let item of formularioMetodoDePago){
        item.style.display = "none";
    }
}

// SELECCIONAR EL METODO DE PAGO (CREDITO, DEBITO O GIFT CARD)
selectorMetodoDePago.addEventListener("change", function(){

    if(selectorMetodoDePago.value == "seleccione"){
        ocultarFormularios()
        
    }else if(selectorMetodoDePago.value == "TDC"){
        ocultarFormularios()
        document.querySelector("#TDC").style.display = "flex";

    }else if(selectorMetodoDePago.value == "TDD"){
        ocultarFormularios()
        document.querySelector("#TDD").style.display = "flex";

    }else if(selectorMetodoDePago.value == "Giftcard"){
        ocultarFormularios()
        document.querySelector("#giftCard").style.display = "flex";
    }
});

// TOMAR DATOS (TARJETA DE CREDITO)
document.querySelector("#validarTDC").addEventListener("click", function(e){
    e.preventDefault();
    let numeroTDC = document.querySelector("#numTDC");
    let vencimientoTDC = document.querySelector("#vencimientoTDC");
    let cvvTDC = document.querySelector("#cvvTDC");
    
    // Agregar info al array "datosCompra"
    datosCompra.numeroTarjeta = numeroTDC.value;
    datosCompra.metodo = "Crédito";

    // Animaciones, tomar datos y guardar en local storage
    if(numeroTDC.value && vencimientoTDC.value && cvvTDC.value){
        $("#boxMetodoDePago").css("display", "none").fadeOut();
        $("#confirmarDatos").css("display", "flex").fadeIn();
        recolectarDatosCompra();
        localStorage.setItem("datosCompra", JSON.stringify(datosCompra))

    }else if(numeroTDC.value == "" || vencimientoTDC.value == "" || cvvTDC.value == ""){
        document.querySelector("#errorDatosTDC").innerHTML = "Por favor completá todos los campos";
    }
});

// TOMAR DATOS DE TARJETA DE DEBITO
document.querySelector("#validarTDD").addEventListener("click", function(e){
    e.preventDefault();
    let numeroTDD = document.querySelector("#numTDD");
    let vencimientoTDD = document.querySelector("#vencimientoTDD");
    let cvvTDD = document.querySelector("#cvvTDD");

    // Agregar info al array "datosCompra"
    datosCompra.numeroTarjeta = numeroTDD.value;
    datosCompra.metodo = "Débito";

    // Animaciones, tomar datos y guardar en local storage
    if(numeroTDD.value && vencimientoTDD.value && cvvTDD.value){
        $("#boxMetodoDePago").css("display", "none").fadeOut();
        $("#confirmarDatos").css("display", "flex").fadeIn();
        recolectarDatosCompra();
        localStorage.setItem("datosCompra", JSON.stringify(datosCompra))

    }else{
        document.querySelector("#errorDatosTDD").innerHTML = "Por favor completá todos los campos";
    }
});

// TOMAR DATOS DE GIFT CARD
document.querySelector("#validarGC").addEventListener("click", function(e){
    e.preventDefault();
    let numeroGC = document.querySelector("#numGC");

    // Agregar info al array "datosCompra"
    datosCompra.numeroTarjeta = numeroGC.value;
    datosCompra.metodo = "Gift Card";

    // Animaciones, tomar datos y guardar en local storage
    if(numeroGC.value){
        $("#boxMetodoDePago").fadeOut().css("display", "none");
        $("#confirmarDatos").css("display", "flex").fadeIn();
        recolectarDatosCompra();
        localStorage.setItem("datosCompra", JSON.stringify(datosCompra))

    }else{
        document.querySelector("#errorDatosGC").innerHTML = "Por favor completá todos los campos";
    }
});

// MTOMAR Y MOSTRAR DATOS DE COMPRA EN EL DOM
function recolectarDatosCompra() {
    document.querySelector("#confirmarDatos div").innerHTML =`
        <p><strong>Nombre:</strong> ${datosCompra.nombre}</p>
        <p><strong>Email:</strong> ${datosCompra.email}</p>
        <p><strong>Direccion:</strong> ${datosCompra.direccion}</p>
        <p><strong>Metodo de pago:</strong> ${datosCompra.metodo}</p>
        <p><strong>Tarjeta:</strong> ${datosCompra.numeroTarjeta}</p>
        <p><strong>Total a pagar:</strong> ${contarTotal()} ARS</p>
        `;
}

// ANIMACIONES PARA EL BOTON PAGAR
document.querySelector("#pagar").addEventListener("click", function(){
    $("#confirmarDatos").fadeOut().css("display", "none");
    $("#compraCompletada").css("display", "flex").fadeIn();
    $("#compraCompletada h3").css("display", "none");
    $("#salir").css("display", "none");
    $("#printFactura").css("display", "none");
    $("#compraCompletada div").css("display", "block");
    $("#compraCompletada p").css("display", "block");
    
    setTimeout(function(){  
        $("#compraCompletada div").css("display", "none");
        $("#compraCompletada p").css("display", "none");
        $("#compraCompletada h3").fadeIn().css("display", "block");
        $("#salir").fadeIn().css("display", "block");
        $("#printFactura").fadeIn().css("display", "block");
    }, 5000)

    setTimeout(function(){
        let errorDatos = document.querySelectorAll(".errorDatos")
        for(let item of errorDatos){
            item.innerHTML = "";
        }
    }, 1000); 
});

// ANIMACIONES Y FUNCIONES PARA EL BOTON "Cancelar compra"
document.querySelector("#cancelarCompra").addEventListener("click", function(){
    $("#confirmarDatos").fadeOut();
    $("#fondoGrisConfirmar").fadeOut();
    $("#fondoGris").fadeOut();

    setTimeout(function(){
        let errorDatos = document.querySelectorAll(".errorDatos")
        for(let item of errorDatos){
            item.innerHTML = "";
        }
    }, 1000); 
})

// ANIMACIONES Y FUNCIONES PARA EL BOTON "Salir" AL FINALIZAR LA COMPRA
document.querySelector("#salir").addEventListener("click", function(){
    $("#fondoGrisConfirmar").fadeOut();
    $("#fondoGris").fadeOut();
    $("#compraCompletada").fadeOut();
    localStorage.removeItem("carrito")
    localStorage.removeItem("datosCompra")
    carrito = [];
    actualizarNumeroCarrito();
});

// ANIMACIONES Y FUNCIONES PARA EL BOTON "Mostrar factura"
document.querySelector("#printFactura").addEventListener("click", function(){
    $("#fondoGrisConfirmar").fadeOut();
    $("#fondoGris").fadeOut();
    $("#compraCompletada").fadeOut();
    carrito = [];
    actualizarNumeroCarrito();
});

// MENU NAV DESPLEGABLE PARA PANTALLAS CHICAS
let itemsNav = document.querySelector(".nav__links_pantalla_chica");
document.querySelector(".fa-bars").addEventListener("click", function(){
    itemsNav.classList.toggle("nav__links_pantalla_chica--desplegado");
});