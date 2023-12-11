async function getAllDrugs() {
    try {
        const allDrugs = await window.contract.methods.getAllDrugs().call({ from: window.ethereum.selectedAddress });
        displayDrugsWithButtons("allDrugsList", allDrugs);
    } catch (error) {
        console.error('Error getting all drugs:', error);
    }
}

function displayDrugsWithButtons(elementId, drugs) {
    const listElement = document.getElementById(elementId);
    listElement.innerHTML = "";

    drugs.forEach(drug => {
        const listItem = document.createElement("li");
        listItem.textContent = JSON.stringify(drug);

        // Add "Delete" button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            deleteDrugById(drug.id); // Call the delete function with the drug ID
        };
        listItem.appendChild(deleteButton);

        // Add "Update" button
        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.onclick = function () {
            redirectToUpdateDrug(drug.id, drug.name, drug.classification); // Call update with drug info
        };
        listItem.appendChild(updateButton);

        listElement.appendChild(listItem);
    });
    updateButton.onclick = function () {
    redirectToUpdateDrug(drug);
};
}

function displaySingleDrug(elementId, drug) {
    const container = document.getElementById(elementId);
    container.innerHTML = "";

    const drugInfo = document.createElement("p");
    drugInfo.textContent = JSON.stringify(drug);
    container.appendChild(drugInfo);

    // Thêm button "Update Drug"
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update Drug";
    updateButton.onclick = function () {
        redirectToUpdateDrug(drug);
    };
    container.appendChild(updateButton);
}


async function deleteDrugById(drugId) {
    try {
        // Call the smart contract function to delete a drug
        await window.contract.methods.deleteDrug(drugId).send({ from: window.ethereum.selectedAddress });

        alert('Drug deleted successfully!');
        // Optionally, you can reload the drugs list after deletion
        await getAllDrugs();
    } catch (error) {
        console.error('Error deleting drug by ID:', error);
        alert('Error deleting drug. See console for details.');
    }
}

async function getDrugById() {
    const drugId = document.getElementById('drugId').value;
    try {
        // Gọi hàm getDrug từ smart contract và hiển thị thông tin drug
        const drug = await window.contract.methods.getDrug(drugId).call({ from: window.ethereum.selectedAddress });
        displaySingleDrug("singleDrugInfoContainer", drug);
    } catch (error) {
        console.error('Error getting drug by ID:', error);
    }
}


async function getDrugsByClassification() {
    const enteredClassification = document.getElementById('classification').value;
    try {
        const drugsByClass = await window.contract.methods.getDrugsByClassification(enteredClassification).call({ from: window.ethereum.selectedAddress });
        displayDrugsWithButtons("classificationDrugsList", drugsByClass);
    } catch (error) {
        console.error('Error getting drugs by classification:', error);
    }
}

// lấy thông tin cũ
function redirectToUpdateDrug(id, name, classification) {
    const queryParams = buildQueryParams({ id, name, classification });
    window.location.href = `updateDrug.html${queryParams}`;
 
}


function buildQueryParams(drug) {
    let queryParams = `?id=${drug.id}&name=${encodeURIComponent(drug.name)}&classification=${encodeURIComponent(drug.classification)}`;
    queryParams += `&expirationDate=${encodeURIComponent(drug.expirationDate)}`;
    queryParams += `&productionDate=${encodeURIComponent(drug.productionDate)}`;
    queryParams += `&quantity=${encodeURIComponent(drug.quantity)}`;
    queryParams += `&location=${encodeURIComponent(drug.location)}`;
    queryParams += `&batchNumber=${encodeURIComponent(drug.batchNumber)}`;
    queryParams += `&ingredients=${encodeURIComponent(drug.ingredients)}`;
    queryParams += `&status=${drug.status}`;

    return queryParams;
}
