
const { ipcRenderer } = require("electron");

window.onload = () => {
    ipcRenderer.on("cargar-detalles", (event, dato) => {
        document.getElementById("detalle-texto").innerText = dato.fact;
    });
};
