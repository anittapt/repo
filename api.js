//practica_ut9/api.js

const axios = require("axios");

const API_URL = "https://catfact.ninja/fact";

async function obtenerDatoGato() {
    try {
        const respuesta = await axios.get(API_URL);
        return respuesta.data.fact;
    } catch (error) {
        console.error("Error al obtener dato de la API:", error);
        return null;
    }
}

module.exports = { obtenerDatoGato };



