let juegos = JSON.parse(localStorage.getItem("data"));
let carrito = JSON.parse(localStorage.getItem("carrito"));
let datosCompra = JSON.parse(localStorage.getItem("datosCompra"));

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

let carritoLimpio = devolverCarritoLimpio();
let listaDeArticulos = ""
for(let item of carritoLimpio){
    listaDeArticulos += `
    <tr>
    <td>${item.nombre}</td>
    <td>$ ${item.precio}</td>
    <td>${contadorCarrito(item.id)}</td>
    </tr>`;
}


document.getElementById("factura").innerHTML =`
    <h1>Factura de compra</h1>
    <h2>Datos del cliente:</h2>
    <p><strong>Nombre:</strong> ${datosCompra.nombre}</p>
    <p><strong>Email:</strong> ${datosCompra.email}</p>
    <p><strong>Direccion:</strong> ${datosCompra.direccion}</p>
    <p><strong>Metodo de pago:</strong> ${datosCompra.metodo}</p>
    <p><strong>Tarjeta:</strong> ${datosCompra.numeroTarjeta}</p>
    <br>
    <div class="table">
        <table>
            <tr>
                <th>Juego</th>
                <th>Precio</th>
                <th>Cantidad</th>
            </tr>
            ${listaDeArticulos}
        </table>
    </div>
    <p><strong>Total:</strong> $ARS ${contarTotal()}</p>
`

localStorage.removeItem("carrito")
localStorage.removeItem("datosCompra")