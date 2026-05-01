import { clientes, ultimosMovimientos, guardarDatos, registrarMovimiento } from "./data.js";

// Ocultar todo
function ocultarTodo(){
    document.querySelector(".login").classList.add("oculto");
    document.querySelector(".sidebar").classList.add("oculto");
    document.querySelector(".header").classList.add("oculto");
    document.querySelector(".cards").classList.add("oculto");
    document.querySelector(".movimientos").classList.add("oculto");
    document.querySelector(".clientes").classList.add("oculto");
    document.querySelector(".agregar-cliente").classList.add("oculto");
    document.querySelector(".exportar").classList.add("oculto");
    document.querySelector(".importar").classList.add("oculto");
    document.querySelector(".acerca-de").classList.add("oculto");
}

// Cerrar sesión
export function logout(){
    ocultarTodo();
    document.querySelector(".login").classList.remove("oculto");
}

// Mostrar principal
export function mostrarPrincipal(){
    ocultarTodo();
    document.querySelector(".sidebar").classList.remove("oculto");
    document.querySelector(".header").classList.remove("oculto");
    document.querySelector(".cards").classList.remove("oculto");
    document.querySelector(".movimientos").classList.remove("oculto");
}

// Mostrar clientes 
export function mostrarClientes(){
    ocultarTodo();
    document.querySelector(".clientes").classList.remove("oculto");
    document.querySelector(".sidebar").classList.remove("oculto");
}

// Mostrar Agregar cliente
export function mostrarAgregarCliente(){
    ocultarTodo();
    document.querySelector(".agregar-cliente").classList.remove("oculto");
    document.querySelector(".sidebar").classList.remove("oculto");
}

// Mostrar Exportar
export function mostrarExportar(){
    ocultarTodo();
    document.querySelector(".exportar").classList.remove("oculto");
    document.querySelector(".sidebar").classList.remove("oculto");
}

// Mostrar Importar
export function mostrarImportar(){
    ocultarTodo();
    document.querySelector(".importar").classList.remove("oculto");
    document.querySelector(".sidebar").classList.remove("oculto");
}

// Mostrar Acerca de
export function mostrarAcercaDe(){
    ocultarTodo();
    document.querySelector(".acerca-de").classList.remove("oculto");
    document.querySelector(".sidebar").classList.remove("oculto");
}

// Desplegar / Ocultar menu
export function toogleMenu(){
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("sidebar-cerrado");
}

// Renderizar lista de clientes
export function listaClientes(){
    const lista = document.querySelector(".listaDeClientes");
    const mensajeVacio = document.getElementById("mensajeVacio");

    lista.innerHTML = "";

    // Ocultar mensaje vacio
    if(clientes.length === 0){
        mensajeVacio.classList.remove("oculto");
        return;
    } else {
        mensajeVacio.classList.add("oculto");
    }

    clientes.forEach((item, index) => {
        const li = document.createElement("li");

        // Texto del cliente
        const span = document.createElement("span");
        span.textContent = `${item.nombre} - ${item.telefono} (${item.activo ? "Activo" : "Inactivo"})`;
        li.appendChild(span);

        // Botón eliminar
        const bntEliminar = document.createElement("button");
        bntEliminar.textContent = "Eliminar";
        bntEliminar.classList.add("btn-eliminar");
        bntEliminar.addEventListener("click", () => {
            const confirmar = window.confirm(`¿Seguro que deseas eliminar al cliente ${item.nombre}?`);
            if(confirmar){
                clientes.splice(index, 1);
                registrarMovimiento(`Cliente ${item.nombre} eliminado`);
                guardarDatos();
                render();
                mostrarMensaje("Cliente eliminado correctamente.");
            }
        });
        li.appendChild(bntEliminar);

        // Botón activar/desactivar
        const btnToogle = document.createElement("button");
        btnToogle.textContent = item.activo ? "Desactivar" : "Activar";
        btnToogle.classList.add("btn-toggle");
        btnToogle.addEventListener("click", () => {
            item.activo = !item.activo; // cambia de estado
            registrarMovimiento(`Cliente ${item.nombre} ${item.activo ? "activado" : "desactivado"}`);
            guardarDatos();
            render();
        });
        li.appendChild(btnToogle);

        lista.appendChild(li);

    });
}

// Renderizar ultimos movimientos
export function listaMovimientos(){
    const lista = document.getElementById("listaMovimientos");
    lista.innerHTML = "";

    ultimosMovimientos.slice(0, 10).forEach(item => { //slice(0, 10) para mostrar los 10 últimos movimientos
        const li = document.createElement("li");

        // Accion
        const spanAccion = document.createElement("span");
        spanAccion.textContent = item.accion;

        // Fecha
        const spanFecha = document.createElement("span");
        spanFecha.textContent = item.fecha;
        spanFecha.style.color = "#999";

        li.appendChild(spanAccion);
        li.appendChild(spanFecha);

        lista.appendChild(li);
    });

}

// Renderizar datos en tarjetas
export function listaDatos(){
    const totalClientes = document.getElementById("totalClientes");
    const totalActivos = document.getElementById("totalActivos");
    const totalInactivos = document.getElementById("totalInactivos");

    // Total general
    totalClientes.textContent = clientes.length;
    
    // Total activos
    const activos = clientes.filter(c => c.activo).length;
    totalActivos.textContent = activos;

    // Total inactivos
    const inactivos = clientes.filter(c => !c.activo).length;
    totalInactivos.textContent = inactivos;
}

// Mostrar notificaciones
export function mostrarMensaje(texto, tipo="info"){
    const notif = document.getElementById("notificaciones");
    notif.textContent = texto;
    notif.style.display = "block";
    notif.style.background = tipo === "error" ? "#ff4747" : "#007bff";

    setTimeout(() => {
        notif.style.display = "none";
    }, 3000);
}

// Renderizar
export function render(){
    listaClientes();
    listaMovimientos();
    listaDatos();
}