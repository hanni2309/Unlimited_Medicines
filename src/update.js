async function populateUpdateForm() {
    const queryParams = new URLSearchParams(window.location.search);
    // Check if query parameters are present
    if (queryParams.has("id")) {
        // If query parameters are present, use them to populate the form
        const drugId = queryParams.get("id");
        const name = decodeURIComponent(queryParams.get("name"));
        const classification = decodeURIComponent(queryParams.get("classification"));
        const expirationDate = decodeURIComponent(queryParams.get("expirationDate"));
        const productionDate = decodeURIComponent(queryParams.get("productionDate"));
        const quantity = decodeURIComponent(queryParams.get("quantity"));
        const location = decodeURIComponent(queryParams.get("location"));
        const batchNumber = decodeURIComponent(queryParams.get("batchNumber"));
        const ingredients = decodeURIComponent(queryParams.get("ingredients"));
        const status = queryParams.get("status") === "true";

        // Fill form fields with the retrieved information
        document.getElementById("drugId").value = drugId;
        document.getElementById("name").value = name;
        document.getElementById("classification").value = classification;
        document.getElementById("expirationDate").value = expirationDate;
        document.getElementById("productionDate").value = productionDate;
        document.getElementById("quantity").value = quantity;
        document.getElementById("location").value = location;
        document.getElementById("batchNumber").value = batchNumber;
        document.getElementById("ingredients").value = ingredients;
        document.getElementById("status").checked = status;
    }
}

// Function to populate the update form with drug information
async function updateDrug() {
    console.log('Updating drug...');
    if (!window.contract) {
        console.error('Contract not initialized. Make sure to connect to the contract first.');
        return;
    }

    const drugId = document.getElementById('drugId').value;
    const name = document.getElementById('name').value;
    const classification = document.getElementById('classification').value;
    const expirationDate = document.getElementById('expirationDate').value;
    const productionDate = document.getElementById('productionDate').value;
    const quantity = document.getElementById('quantity').value;
    const location = document.getElementById('location').value;
    const batchNumber = document.getElementById('batchNumber').value;
    const ingredients = document.getElementById('ingredients').value;
    const status = document.getElementById('status').checked;

    try {
        // Call the updateDrug function in the smart contract
        await window.contract.methods.updateDrug(
            drugId,
            name,
            classification,
            expirationDate,
            productionDate,
            quantity,
            location,
            batchNumber,
            ingredients,
            status
        ).send({ from: window.ethereum.selectedAddress });

        console.log('Drug updated successfully.');
    } catch (error) {
        console.error('Error updating drug:', error);
    }
}

