
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { inicializarDB, obtenerDatosGatos, guardarDatoGato } = require("./database");
const { obtenerDatoGato } = require("./api");
const analyzeFacts = require("./analysis");

let mainWindow;

app.whenReady().then(async () => {
      // Inicializa la base de datos antes de abrir la ventana
    await inicializarDB();

      // Crear la ventana principal
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,// Permite usar Node.js en el renderizador
        },
    });

    //cargar la ventana principal
    mainWindow.loadFile("renderer/home/index.html");

      // Obtener un dato de la API y guardarlo en la base de datos
    ipcMain.handle("obtener-gato-api", async () => {
        const fact = await obtenerDatoGato();
        if (fact) {
            await guardarDatoGato(fact);  // guardar en la base de datos
        }
        return fact;
    });

      // Obtener los datos guardados en la base de datos
    ipcMain.handle("obtener-gatos-bd", async () => {
        return await obtenerDatosGatos();
    });

    ipcMain.handle("analizar-gatos", async () => {
        const datos = await obtenerDatosGatos();
        return analyzeFacts(datos);  // analisis con data-forge
    });

     // Abrir la ventana de detalles
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

        // Enviar el dato a la ventana de detalles cuando se haya cargado
        detailsWindow.webContents.once("did-finish-load", () => {
            detailsWindow.webContents.send("cargar-detalles", fact);
        });
    });
});

// Cerrar la aplicación cuando todas las ventanas estén cerradas
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
