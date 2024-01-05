
//////////
async function getAllDrugs() {
    try {
        if (window.contract) {
            const drugs = await window.contract.methods.getAllDrugs().call({ from: window.ethereum.selectedAddress });
            displayDrugTable(drugs);
        } else {
            console.error("Contract is not properly initialized.");
        }
    } catch (error) {
        console.error("Error fetching drug data:", error);
    }
}

async function getDrugsByClassification() {
    try {
        if (window.contract) {
            const classification = prompt("Enter drug classification:");
            if (classification) {
                const drugs = await window.contract.methods.getDrugsByClassification(classification).call({ from: window.ethereum.selectedAddress });
                displayDrugTable(drugs);
            } else {
                console.error("Classification input is empty.");
            }
        } else {
            console.error("Contract is not properly initialized.");
        }
    } catch (error) {
        console.error("Error fetching drug data by classification:", error);
    }
}

async function getDrugById() {
    try {
        if (window.contract) {
            const drugId = document.getElementById("drugId").value;
            if (drugId < 1) {
                const drug = await window.contract.methods.getDrug(drugId).call({ from: window.ethereum.selectedAddress });
                displaySingleDrug(drug);
            } else {
                console.error("Drug ID input is empty.");
            }
        } else {
            console.error("Contract is not properly initialized.");
        }
    } catch (error) {
        console.error("Error fetching drug data by ID:", error);
    }
}

function displaySingleDrug(drug) {
    const drugInfoDiv = document.getElementById("drugInfo");
    drugInfoDiv.innerHTML = `
    <h2>Drug Information</h2>
    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Classification</th>
            <th>Expiration Date</th>
            <th>Production Date</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Batch Number</th>
            <th>Ingredients</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
        <tr>
            <td>${drug.id}</td>
            <td>${drug.name}</td>
            <td>${drug.classification}</td>
            <td>${drug.expirationDate}</td>
            <td>${drug.productionDate}</td>
            <td>${drug.quantity}</td>
            <td>${drug.location}</td>
            <td>${drug.batchNumber}</td>
            <td>${drug.ingredients}</td>
            <td>${drug.status ? "Available" : "Out of Stock"}</td>
            <td>
                <button onclick="redirectToUpdateDrug(${drug.id})">Update</button>
                <button onclick="deleteDrug(${drug.id})">Delete</button>
            </td>
        </tr>
    </table>
    `;
}

function displayDrugTable(drugs) {
    const drugTable = document.createElement("table");
    drugTable.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Classification</th>
            <th>Expiration Date</th>
            <th>Production Date</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Batch Number</th>
            <th>Ingredients</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    `;

    for (const drug of drugs) {
        if (parseInt(drug.id) >= 1) { // Kiểm tra ID của drug, hiển thị nếu ID >= 1
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${drug.id}</td>
                <td>${drug.name}</td>
                <td>${drug.classification}</td>
                <td>${drug.expirationDate}</td>
                <td>${drug.productionDate}</td>
                <td>${drug.quantity}</td>
                <td>${drug.location}</td>
                <td>${drug.batchNumber}</td>
                <td>${drug.ingredients}</td>
                <td>${drug.status ? "Available" : "Out of Stock"}</td>
                <td>
                    <button onclick="redirectToUpdateDrug(${drug.id})">Update</button>
                    <button onclick="deleteDrug(${drug.id})">Delete</button>
                </td>
            `;
            drugTable.appendChild(row);
        }
    }

    const drugInfoDiv = document.getElementById("drugInfo");
    drugInfoDiv.innerHTML = "";
    drugInfoDiv.appendChild(drugTable);
}

// Function to delete a drug by its ID
async function deleteDrug(drugId) {
    try {
        if (window.contract) {
            // Call the deleteDrug function from the smart contract
            await window.contract.methods.deleteDrug(drugId).send({ from: window.ethereum.selectedAddress });

            // Refresh the drug list after successful deletion
            displayDrugs();

            // Show a success message (you can customize this)
            alert("Drug deleted successfully!");
        } else {
            console.error("Contract is not properly initialized.");
        }
    } catch (error) {
        console.error("Error deleting drug:", error);
    }
}

// chuyển sang trang update tương ứng vs từng drug
function redirectToUpdateDrug(drugId) {
    window.location.href = `updateDrug.html?id=${drugId}`;
}