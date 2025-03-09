
const axios = require("axios");

const API_URL = "https://catfact.ninja/fact";//URL de api publica cat facts

// Función para obtener un dato aleatorio sobre gatos desde la API
async function obtenerDatoGato() {
    try {
        const respuesta = await axios.get(API_URL);
        return respuesta.data.fact;//extrae un dato sobre gatos
    } catch (error) {
        console.error("Error al obtener dato de la API:", error);
        return null;
    }
}

module.exports = { obtenerDatoGato };
