import { inicializarEventos } from "./events.js";
import { logoutEvent } from "./events.js";
import { sidebarEvents } from "./events.js";
import { menuEvents } from "./events.js";
import { agregarCliente } from "./events.js";
import { renderizarEvent } from "./events.js";
import { exportarEvent, importarEvent } from "./events.js";
import { mostrarPrincipal } from "./ui.js";

// Login
function iniciarApp(){
    inicializarEventos();

    // Si ya hay clientes guardados, saltar login al recargar la página
    if(localStorage.getItem("clientes")){
        mostrarPrincipal();
    }
}

iniciarApp();

// Logout
function salir(){
    logoutEvent();
}

salir();

// sidebar events
function ventanas(){
    sidebarEvents();

    // Mostrar / ocultar menu
    menuEvents();
}

ventanas();

// Agregar cliente
function guardar(){
    agregarCliente();
}

guardar();

// Renderizar
function renderizar(){
    renderizarEvent();
}

renderizar();

// Exportar
function exportar(){
    exportarEvent();
}

exportar();

// Importar
function importar(){
    importarEvent();
}

importar();