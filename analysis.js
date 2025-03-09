const dataForge = require("data-forge");

function analyzeFacts(facts) {
    const df = new dataForge.DataFrame(facts);

    // Filtrar los hechos que contienen la palabra 'cat' 
    const catFacts = df.where(row => row.fact.includes("cat")).toArray();

    console.log(`Se encontraron ${catFacts.length} hechos sobre gatos.`);
    return catFacts;
}

module.exports = analyzeFacts;
