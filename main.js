//practica_ut9/main.js

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { inicializarDB, obtenerDatosGatos, guardarDatoGato } = require("./database");
const { obtenerDatoGato } = require("./api");
const analyzeFacts = require("./analysis");

let mainWindow;

app.whenReady().then(async () => {
    await inicializarDB();

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile("renderer/home/index.html");

    ipcMain.handle("obtener-gato-api", async () => {
        const fact = await obtenerDatoGato();
        if (fact) {
            await guardarDatoGato(fact);  // **AHORA GUARDA EN BD**
        }
        return fact;
    });

    ipcMain.handle("obtener-gatos-bd", async () => {
        return await obtenerDatosGatos();
    });

    ipcMain.handle("analizar-gatos", async () => {
        const datos = await obtenerDatosGatos();
        return analyzeFacts(datos);  // **ANÁLISIS CON DATA-FORGE**
    });

    ipcMain.on("abrir-detalles", (event, fact) => {
        const detailsWindow = new BrowserWindow({
            width: 400,
            height: 300,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
        });

        detailsWindow.loadFile("renderer/details/index.html");

        detailsWindow.webContents.once("did-finish-load", () => {
            detailsWindow.webContents.send("cargar-detalles", fact);
        });
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

