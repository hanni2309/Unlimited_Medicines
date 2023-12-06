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
    async function deleteDrugById() {
        const drugIdToDelete = document.getElementById('drugIdToDelete').value;

        try {
            // Call the smart contract function to delete a drug
            await window.contract.methods.deleteDrug(drugIdToDelete).send({ from: window.ethereum.selectedAddress });

            alert('Drug deleted successfully!');
            // Optionally, you can reload the drugs list after deletion
            await getAllDrugs();
        } catch (error) {
            console.error('Error deleting drug by ID:', error);
            alert('Error deleting drug. See console for details.');
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
    function displayDrugsWithUpdate(elementId, drugs) {
        const listElement = document.getElementById(elementId);
        listElement.innerHTML = "";

        drugs.forEach(drug => {
            const listItem = document.createElement("li");

            // Display drug information
            listItem.textContent = JSON.stringify(drug);

            // Create an update button for each drug
            const updateButton = document.createElement("button");
            updateButton.textContent = "Update";
            updateButton.addEventListener("click", () => redirectToUpdateDrug(drug.id, drug.name, drug.classification));
            
            // Append the update button to the list item
            listItem.appendChild(updateButton);

            // Append the list item to the list
            listElement.appendChild(listItem);
        });
    }

    // Function to redirect to updateDrug.html with query parameters
    function redirectToUpdateDrug(id, name, classification) {
        window.location.href = `updateDrug.html?id=${id}&name=${encodeURIComponent(name)}&classification=${encodeURIComponent(classification)}`;
    }