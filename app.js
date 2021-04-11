// variables

const carrito = document.querySelector('#lista-carrito');
const listaProductos = document.querySelector('#listaProductos');
const vaciarCarritoBTN = document.querySelector('#vaciar-carrito')
const contenedorCarrito = document.querySelector('tbody');
let articulos = [];

cargarEventListener();

function cargarEventListener() {
    // Cuando agregas un curso agregar
    listaProductos.addEventListener('click', agregarProducto);
    // Elimina un curso del carrito 
    carrito.addEventListener('click', eliminarCurso);

    vaciarCarritoBTN.addEventListener('click', () => {
        articulos = []
        limpiarHTML();
    })
}

// Funciones
//Escucha eventos en la zona del boton de comprar asi como seleccionar todo el elemento de la tarjeta de compras
function agregarProducto(e) {
    if (e.target.classList.contains('precio') || e.target.classList.contains('cube')) {
        const productoSeleccionad = e.target.parentElement.parentElement.parentElement.parentElement;
        leerDatosProductos(productoSeleccionad);

    }

}
//Eliminar un cursod el carrito

function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulos = articulos.filter(producto => producto.id !== cursoId);

        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}


//Lee el contenido del HTML 

function leerDatosProductos(producto) {

    // Crear un objeto con el contenido del producto actual
    const productoOBJ = {
        imagen: producto.querySelector("img").src,
        titulo: producto.querySelector("h2").textContent,
        precio: producto.querySelector(".precio").textContent,
        id: producto.querySelector('.precio').getAttribute('data-id'),
        cantidad: 1,
    }

    //Revisar si un elemnto ya existe en el carrito
    const existe = articulos.some(producto => producto.id === productoOBJ.id);
    if (existe) {
        const productos = articulos.map(producto => {
            if (producto.id === productoOBJ.id) {
                producto.cantidad++;
                return producto
            } else {
                return producto
            }
        });
        articulos = [...productos]
    } else {
        articulos = [...articulos, productoOBJ]
    }



    carritoHTML()
}

//Muestra el contenido en el HTMl generando el HTML basado en el carrido de compras.active

function carritoHTML() {
    //Utilizamos destructuracion para poder limpiar nuestro codigo y al mismo timpo para poder acceder a los valores del objeto


    //Limpiar el html antes 
    limpiarHTML();
    //recorre el carrito y genera el HTML
    articulos.forEach(producto => {
        const { imagen, titulo, precio, cantidad, id } = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
    <td>
        <img src="${imagen}" width="100">
    </td>
    <td class="tabSty">${titulo}</td>
    <td class="tabSty">${precio}</td>
    <td class="tabSty">${cantidad}</td>
    <td>
    <a href="#" class="borrar-curso" data-id="${id}" > X </a>
    </td>
    
    `;
        // Agrega el contenido en el HTML
        contenedorCarrito.appendChild(row);
    });


}
// Elimina los elemtos del table body antes de agregar nuevos

function limpiarHTML() {
    // forma lenta
    contenedorCarrito.innerHTML = "";
    // forma eficiente
    // while (contenedorCarrito.firstChild) {
    //     contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    // }
}