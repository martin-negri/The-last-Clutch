const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
    abrir.classList.add("oculto");
    cerrar.classList.remove("oculto");
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
    cerrar.classList.add("oculto");
    abrir.classList.remove("oculto");
});
