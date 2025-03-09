
const { ipcRenderer } = require("electron");

window.onload = async () => {
    const btnObtenerGato = document.getElementById("obtener-gato");
    const btnVerGuardados = document.getElementById("ver-guardados");
    const btnAnalizarGatos = document.getElementById("analizar-gatos");
    const listaDatos = document.getElementById("lista-datos");

    // Obtener un dato de la API y guardarlo en la BD
    btnObtenerGato.onclick = async () => {
        const fact = await ipcRenderer.invoke("obtener-gato-api");
        alert(fact ? `Nuevo dato obtenido: ${fact}` : "Error al obtener datos.");
    };

    // Ver los datos guardados en la BD
    btnVerGuardados.onclick = async () => {
        listaDatos.innerHTML = "";//limpiar la lista
        const datos = await ipcRenderer.invoke("obtener-gatos-bd");

        datos.forEach(dato => {
            const item = document.createElement("li");
            item.innerText = dato.fact;
            item.style.cursor = "pointer";
            item.onclick = () => ipcRenderer.send("abrir-detalles", dato.fact);
            listaDatos.appendChild(item);
        });
    };

    btnAnalizarGatos.onclick = async () => {
        const analisis = await ipcRenderer.invoke("analizar-gatos");
        alert(`Se encontraron ${analisis.length} hechos con la palabra "cat".`);
    };
};
