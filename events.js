import { mostrarPrincipal } from "./ui.js";
import { logout } from "./ui.js";
import { mostrarClientes } from "./ui.js";
import { mostrarAgregarCliente } from "./ui.js";
import { mostrarExportar } from "./ui.js";
import { mostrarImportar } from "./ui.js";
import { mostrarAcercaDe } from "./ui.js";
import { toogleMenu } from "./ui.js";
import { clientes, guardarDatos, registrarMovimiento, ultimosMovimientos } from "./data.js";
import { render } from "./ui.js";
import { exportarDatos, importarDatos } from "./data.js";
import { mostrarMensaje } from "./ui.js";

// Login
export function inicializarEventos(){
    const btnLogin = document.getElementById("btnLogin");
    const txtUser = document.getElementById("user");

    btnLogin.addEventListener("click", ()=> {
        if(txtUser.value.trim() === ""){
            mostrarMensaje("Por favor, ingresa tu usuario para continuar.", "error");
            return;
        }

        mostrarPrincipal();
        txtUser.value = "";
    });
}

// logout
export function logoutEvent(){
    const btnSalir = document.getElementById("btnLogout");

    btnSalir.addEventListener("click", () => {
        logout();
    });
}

// Sidebar events
export function sidebarEvents(){
    const container = document.getElementById("sidebar");

    container.addEventListener("click", (e) => {
        const action = e.target.dataset.action;

        switch(action){
            
            // Mostrar principal
            case "principal":
                mostrarPrincipal();
                break;
                
            case "clientes":
                mostrarClientes();
                break;

            case "agregarCliente":
                mostrarAgregarCliente();
                break;

            case "exportar":
                mostrarExportar();
                break;

            case "importar":
                mostrarImportar();
                break;

            case "acercaDe":
                mostrarAcercaDe();
                break;

            default: return;
        }

    });
}

// Mostrar / Ocultar sidebar
export function menuEvents(){
    const botonesMenu = document.querySelectorAll(".menu-btn");

    botonesMenu.forEach(btn => {
        btn.addEventListener("click", () => {
            toogleMenu();
        });
    });
}

// Agregar cliente
export function agregarCliente(){
    const nombre = document.getElementById("nombreCliente");
    const telefono = document.getElementById("telefonoCliente");
    const form = document.getElementById("formAgregarCliente");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if(nombre.value.trim() === "" && telefono.value.trim() === ""){
            mostrarMensaje("Debes llenar el nombre y el teléfono del cliente.", "error");
        } else if(nombre.value.trim() === ""){
            mostrarMensaje("El campo de nombre no puede quedar vacío.", "error");
        } else if(telefono.value.trim() === ""){
            mostrarMensaje("El campo de teléfono no puede quedar vacío.", "error");
        } else {
            clientes.push({
                nombre: nombre.value.trim(),
                telefono: telefono.value.trim(),
                activo: true
            });
            registrarMovimiento(`Cliente ${nombre.value.trim()} agregado `);
            guardarDatos();
            mostrarMensaje("Cliente registrado correctamente.");

            render();

            nombre.value = "";
            telefono.value = "";
        }
    });
}

// Renderizar
export function renderizarEvent(){
    render();
}

// Exportar datos
export function exportarEvent(){
    const btnExportar = document.querySelector(".btn-exportar");

    btnExportar.addEventListener("click", () => {
        exportarDatos();
    });
}

// Importar datos
export function importarEvent(){
    const inputFile = document.getElementById("fileImport");
    const btnImportar = document.querySelector(".btn-importar");
    let archivoSeleccionado = null;

    inputFile.addEventListener("change", (e) => {
        archivoSeleccionado = e.target.files[0];
    });

    btnImportar.addEventListener("click", () => {
        if(!archivoSeleccionado){
            mostrarMensaje("Selecciona un archivo antes de importar.", "error");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                importarDatos(e.target.result);
                renderizarEvent();
                mostrarMensaje("Los datos se han importado correctamente");
            } catch (error) {
                mostrarMensaje("No se pudo leer el archivo. Verifica que sea un JSON válido.", "error");
            }
            inputFile.value = "";
            archivoSeleccionado = null;
        };
        reader.readAsText(archivoSeleccionado);
    });
}