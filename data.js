export let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
export let ultimosMovimientos = JSON.parse(localStorage.getItem("ultimosMovimientos")) || [];

export function cargarDatos(){

}

// Guardar datos
export function guardarDatos(){
    localStorage.setItem("clientes", JSON.stringify(clientes));
    localStorage.setItem("ultimosMovimientos", JSON.stringify(ultimosMovimientos));
}

// Registrar movimiento
export function registrarMovimiento(accion){
    const fecha = new Date().toLocaleString();
    ultimosMovimientos.unshift({accion, fecha}); // unshift = agrega al inicio
    guardarDatos();
}

// Exportar datos
export function exportarDatos(){
    const datos = { clientes };

    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "respaldo.json";
    a.click();

    URL.revokeObjectURL(url);

    mostrarMensaje("Los datos se han exportado con éxito.");
    
}

// Importar datos
export function importarDatos(fileContent){
    const datos = JSON.parse(fileContent);
    clientes.length === 0;
    clientes.push(...(datos.clientes || []));
    guardarDatos();
    registrarMovimiento("Datos importados");
}
