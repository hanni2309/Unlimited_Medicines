
async function getAllDrugs() {
    try {
        const allDrugs = await window.contract.methods.getAllDrugs().call({ from: window.ethereum.selectedAddress });
        displayDrugs("allDrugsList", allDrugs);
    } catch (error) {
        console.error('Error getting all drugs:', error);
    }
}

async function getDrugById() {
    const drugId = document.getElementById('drugId').value;
    try {
        const drug = await window.contract.methods.getDrug(drugId).call({ from: window.ethereum.selectedAddress });
        displaySingleDrug("singleDrugInfo", drug);
    } catch (error) {
        console.error('Error getting drug by ID:', error);
    }
}

async function getDrugsByClassification() {
    const classification = document.getElementById('classification').value;
    try {
        const drugsByClass = await window.contract.methods.getDrugsByClassification(classification).call({ from: window.ethereum.selectedAddress });
        displayDrugs("classificationDrugsList", drugsByClass);
    } catch (error) {
        console.error('Error getting drugs by classification:', error);
    }
}

// Display functions
function displayDrugs(elementId, drugs) {
    const listElement = document.getElementById(elementId);
    listElement.innerHTML = "";
    drugs.forEach(drug => {
        const listItem = document.createElement("li");
        listItem.textContent = JSON.stringify(drug);
        listElement.appendChild(listItem);
    });
}

function displaySingleDrug(elementId, drug) {
    const displayElement = document.getElementById(elementId);
    displayElement.innerHTML = JSON.stringify(drug);
}