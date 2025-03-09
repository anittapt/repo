//practica_ut9/database.js

const { createClient } = require("@libsql/client");

const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
});

async function inicializarDB() {
    await db.execute(`
        CREATE TABLE IF NOT EXISTS datos_gatos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fact TEXT NOT NULL
        )
    `);
}

async function guardarDatoGato(fact) {
    await db.execute({
        sql: "INSERT INTO datos_gatos (fact) VALUES (?)",
        args: [fact],
    });
}

async function obtenerDatosGatos() {
    const resultado = await db.execute("SELECT * FROM datos_gatos");
    return resultado.rows;
}

module.exports = { inicializarDB, guardarDatoGato, obtenerDatosGatos };

