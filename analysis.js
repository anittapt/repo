//practica_ut9/analysis.js

const dataForge = require("data-forge");

function analyzeFacts(facts) {
    const df = new dataForge.DataFrame(facts);

    const catFacts = df.where(row => row.fact.includes("cat")).toArray();

    console.log(`Se encontraron ${catFacts.length} hechos sobre gatos.`);
    return catFacts;
}

module.exports = analyzeFacts;

