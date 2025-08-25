// --- NAV ---
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir?.addEventListener("click", () => {
    nav?.classList.add("visible");
    abrir.classList.add("oculto");
    cerrar?.classList.remove("oculto");
});

cerrar?.addEventListener("click", () => {
    nav?.classList.remove("visible");
    cerrar.classList.add("oculto");
    abrir?.classList.remove("oculto");
});

// --- PRODUCTOS ---
const productos = [
    { id: 1, nombre: "LeBron XXII", categoria: { nombre: "lebron", id: "lebron" }, precio: 154999, imagen: "../assets/Lebron XXII.avif" },
    { id: 2, nombre: "LeBron XXI", categoria: { nombre: "lebron", id: "lebron" }, precio: 169999, imagen: "../assets/Lebron XXI.avif" },
    { id: 3, nombre: "LeBron XI Gray", categoria: { nombre: "lebron", id: "lebron" }, precio: 169999, imagen: "../assets/Men's Nike Gray Lebron XXI Basketball Shoes.avif" },
    { id: 4, nombre: "LeBron XXI Coral", categoria: { nombre: "lebron", id: "lebron" }, precio: 154999, imagen: "../assets/Nike Coral Queen Conch Lebron XXI Basketball Shoe.avif" },
    { id: 5, nombre: "LeBron XXI 'Optimism'", categoria: { nombre: "lebron", id: "lebron" }, precio: 128999, imagen: "../assets/LEBRON XXI 'OPTIMISM'.webp" },
    { id: 6, nombre: "KD15", categoria: { nombre: "kd", id: "kd" }, precio: 154999, imagen: "../assets/KD15 Three Quarter High Shoe.avif" },
    { id: 7, nombre: "KD17", categoria: { nombre: "kd", id: "kd" }, precio: 184999, imagen: "../assets/Black KD 17 Basketball Shoes.avif" },
    { id: 8, nombre: "KD17 Easy Money", categoria: { nombre: "kd", id: "kd" }, precio: 154999, imagen: "../assets/KD 17 EASY MONEY.webp" },
    { id: 9, nombre: "KD17", categoria: { nombre: "kd", id: "kd" }, precio: 184999, imagen: "../assets/KD17.webp" },
    { id: 10, nombre: "Giannis Freak 5", categoria: { nombre: "giannis", id: "giannis" }, precio: 154999, imagen: "../assets/Giannis Antetokounmpo Nike Red Zoom Freak 5 Low Top Shoes.avif" },
    { id: 11, nombre: "Giannis Freak 6", categoria: { nombre: "giannis", id: "giannis" }, precio: 154999, imagen: "../assets/Giannis Freak 6 Basketball.avif" },
    { id: 12, nombre: "Giannis Freak 5", categoria: { nombre: "giannis", id: "giannis" }, precio: 154999, imagen: "../assets/Giannis Freak 5 Basketball Sneakers.avif" }
];

// --- RENDER / FILTRO  ---
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
let tituloPrincipal = document.querySelector("#titulo-principal") || document.querySelector(".calzado-principal-title");

function normalizarCat(id) {
    if (!id) return null;
    const v = id.toLowerCase();
    return v === "durant" ? "kd" : v;
}

const displayName = { lebron: "LeBron", giannis: "Giannis", kd: "KD" };

function actualizarTitulo(categoriaId) {
    if (!tituloPrincipal) return;
    const key = normalizarCat(categoriaId);
    tituloPrincipal.textContent = key && displayName[key] ? displayName[key] : "Calzados";
}

function cargarProductos(productosElegidos) {
    if (!contenedorProductos) return;
    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {
    const div = document.createElement("div");
    div.className = "calzado-img";
    div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" title="${producto.nombre}">
        <h3 class="producto-nombre">${producto.nombre}</h3>
        <p class="producto-precio">$${producto.precio.toLocaleString()}</p>
        <button class="calzado-agregar" id="${producto.id}" aria-label="Agregar ${producto.nombre} al carrito">Agregar</button>
    `;
    contenedorProductos.appendChild(div);
});
}

function getCategoriaDesdeURL() {
    const params = new URLSearchParams(window.location.search);
    return normalizarCat(params.get("cat"));
}

(function initProductos() {
    if (!contenedorProductos) return;
    const catInicial = getCategoriaDesdeURL();
    if (catInicial) {
    const filtrados = productos.filter(p => p.categoria.id === catInicial);
    cargarProductos(filtrados.length ? filtrados : productos);
    actualizarTitulo(catInicial);
    document.querySelector(`#${catInicial}`)?.classList.add("active");
} else {
    cargarProductos(productos);
    actualizarTitulo(null);
}
})();

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
    const categoriaId = normalizarCat(e.currentTarget.id);
    botonesCategorias.forEach(btn => btn.classList.remove("active"));
    e.currentTarget.classList.add("active");
    if (contenedorProductos) {
        const filtrados = productos.filter(p => p.categoria.id === categoriaId);
        cargarProductos(filtrados);
        actualizarTitulo(categoriaId);
    } else {
        window.location.href = `./page/calzado.html?cat=${categoriaId}`;
    }
});
});


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarNumerito() {
    const numerito = document.querySelector(".numerito");
    if (!numerito) return;
    numerito.textContent = carrito.reduce((acc, p) => acc + p.cantidad, 0);
}

function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id == idProducto);
    if (!producto) return;

    const enCarrito = carrito.find(p => p.id == idProducto);
    if (enCarrito) {
    enCarrito.cantidad++;
} else {
    carrito.push({ ...producto, cantidad: 1 });
}

    guardarCarrito();
    actualizarNumerito();
    console.log("Carrito actualizado:", carrito);
}


contenedorProductos?.addEventListener("click", e => {
    if (e.target.classList.contains("calzado-agregar")) {
    const idProducto = e.target.id;
    agregarAlCarrito(idProducto);
}
});

// ==================== DESTACADOS ====================
const botonesDestacados = document.querySelectorAll(".destacados-agregar");
botonesDestacados.forEach(boton => {
    boton.addEventListener("click", e => {
    const productoElemento = e.currentTarget.closest(".destacados-img");
    const nombre = productoElemento.querySelector(".destacados-title").textContent;
    const precioTexto = productoElemento.querySelector(".destacados-precio").textContent.replace("$", "").replace(".", "").trim();
    const precio = parseInt(precioTexto, 10);
    const imagen = productoElemento.querySelector("img").getAttribute("src");

    
    let producto = productos.find(p => p.nombre === nombre);
    if (!producto) {
    
        producto = {
        id: Date.now(),
        nombre,
        precio,
        imagen,
        categoria: { nombre: "destacados", id: "destacados" }
    };
    productos.push(producto);
    }
    agregarAlCarrito(producto.id);
});
});

// --- RENDER EN carrito.html ---
function renderCarrito() {
    const lista = document.querySelector(".carrito-productos");
    const vacio = document.querySelector(".carrito-vacio");
    const acciones = document.querySelector(".carrito-acciones");
    const comprado = document.querySelector(".carrito-comprado");
    const totalEl = document.querySelector("#total");

if (!lista || !vacio || !acciones || !totalEl) return;

if (carrito.length === 0) {
    vacio.classList.remove("disabled");
    acciones.classList.add("disabled");
    lista.classList.add("disabled");
    comprado?.classList.add("disabled");
    totalEl.textContent = "$0";
    lista.innerHTML = "";
    return;
}

vacio.classList.add("disabled");
acciones.classList.remove("disabled");
lista.classList.remove("disabled");
comprado?.classList.add("disabled");

lista.innerHTML = "";

let total = 0;
carrito.forEach(p => {
    total += p.precio * p.cantidad;
    const item = document.createElement("div");
    item.className = "carrito-producto";
    item.innerHTML = `
        <img class="carrito-producto-imagen" src="${p.imagen}" alt="${p.nombre}">
        <div class="carrito-producto-titulo">
        <small>Título</small>
        <h3>${p.nombre}</h3>
        </div>
        <div class="carrito-producto-cantidad">
        <small>Cantidad</small>
        <p>${p.cantidad}</p>
        </div>
        <div class="carrito-producto-precio">
        <small>Precio</small>
        <p>$${p.precio.toLocaleString()}</p>
        </div>
        <div class="carrito-producto-subtotal">
        <small>Subtotal</small>
        <p>$${(p.precio * p.cantidad).toLocaleString()}</p>
        </div>
        <button class="carrito-producto-eliminar" data-id="${p.id}">
        <i class="bi bi-trash3-fill"></i>
        </button>
    `;
    lista.appendChild(item);
});

totalEl.textContent = `$${total.toLocaleString()}`;

lista.querySelectorAll(".carrito-producto-eliminar").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.id;
        carrito = carrito.filter(p => String(p.id) !== String(id));
        guardarCarrito();
        actualizarNumerito();
        renderCarrito();
    });
});
}

// botones "Vaciar" y "Comprar" (carrito.html)
function wireCarritoActions() {
    const btnVaciar = document.querySelector(".carrito-acciones-vaciar");
    const btnComprar = document.querySelector(".carrito-acciones-comprar");
    const comprado = document.querySelector(".carrito-comprado");

    btnVaciar?.addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    actualizarNumerito();
    renderCarrito();
});

btnComprar?.addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    actualizarNumerito();
    renderCarrito();
    comprado?.classList.remove("disabled");
});
}


document.addEventListener("DOMContentLoaded", () => {
    actualizarNumerito();
    renderCarrito();
    wireCarritoActions();
});


