// function redirectToUpdateDrug(drugId) {
//     window.location.href = `updateDrug.html?id=${drugId}`;
// }

// Function to fetch and display the current drug data before updating
async function displayCurrentDrugData() {
    try {
        // Retrieve the drug ID from the URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const drugId = urlParams.get('id');

        // Fetch the current drug data using the smart contract function
        const drug = await window.contract.methods.getDrug(drugId).call({ from: window.ethereum.selectedAddress });

        // Display the current drug data in the update form
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
        console.error("Error fetching current drug data:", error);
    }
}

// Function to update the drug on the blockchain
async function updateDrug() {
    try {
        // Retrieve the drug ID from the URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const drugId = urlParams.get('id');

      // Get values from the form
      const name = document.getElementById('name').value;
      const classification = document.getElementById('classification').value;
      const expirationDate = document.getElementById('expirationDate').value;
      const productionDate = document.getElementById('productionDate').value;
      const quantity = document.getElementById('quantity').value;
      const location = document.getElementById('location').value;
      const batchNumber = document.getElementById('batchNumber').value;
      const ingredients = document.getElementById('ingredients').value;
      const status = document.getElementById('status').checked;

      // Call the smart contract function to update the drug
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
            // Pass other input values
        ).send({ from: window.ethereum.selectedAddress });

        // Redirect to the show.html page after successful update
        window.location.href = "showDrug.html";

    } catch (error) {
        console.error("Error updating drug:", error);
    }
}

// Call the displayCurrentDrugData function when the page loads
window.onload = displayCurrentDrugData;
