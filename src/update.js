// Function to populate the update form with drug information
async function populateUpdateForm() {
    if (!window.contract) {
        console.error('Contract not initialized. Make sure to connect to the contract first.');
        return;
    }

    const queryParams = getQueryParams();
    const drugIdToUpdate = queryParams.id;

    if (!drugIdToUpdate) {
        console.error('Invalid drug ID to update.');
        return;
    }

    if (!window.ethereum || !window.ethereum.selectedAddress) {
        console.error('Metamask not connected or no Ethereum address selected.');
        return;
    }

    try {
        // Check the returned value from the getDrug function
        const drug = await window.contract.methods.getDrug(drugIdToUpdate).call({ from: window.ethereum.selectedAddress });
        console.log('Fetched drug information:', drug);

        // Populate form fields with drug information
        document.getElementById('drugId').value = drug.id;
        document.getElementById('name').value = drug.name;
        document.getElementById('classification').value = drug.classification;
        document.getElementById('expirationDate').value = drug.expirationDate;
        document.getElementById('productionDate').value = drug.productionDate;
        document.getElementById('quantity').value = drug.quantity;
        document.getElementById('location').value = drug.location;
        document.getElementById('batchNumber').value = drug.batchNumber;
        document.getElementById('ingredients').value = drug.ingredients;
        document.getElementById('status').checked = drug.status;
    } catch (error) {
        console.error('Error fetching drug information:', error);
    }
}

// Function to update drug information
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
