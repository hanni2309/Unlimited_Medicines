// async function populateUpdateForm() {
//     const queryParams = new URLSearchParams(window.location.search);
//     // Check if query parameters are present
//     if (queryParams.has("id")) {
//         // If query parameters are present, use them to populate the form
//         const drugId = queryParams.get("id");
//         const name = decodeURIComponent(queryParams.get("name"));
//         const classification = decodeURIComponent(queryParams.get("classification"));
//         const expirationDate = decodeURIComponent(queryParams.get("expirationDate"));
//         const productionDate = decodeURIComponent(queryParams.get("productionDate"));
//         const quantity = decodeURIComponent(queryParams.get("quantity"));
//         const location = decodeURIComponent(queryParams.get("location"));
//         const batchNumber = decodeURIComponent(queryParams.get("batchNumber"));
//         const ingredients = decodeURIComponent(queryParams.get("ingredients"));
//         const status = queryParams.get("status") === "true";

//const { id } = require("ethers");

//         // Fill form fields with the retrieved information
//         document.getElementById("drugId").value = drugId;
//         document.getElementById("name").value = name;
//         document.getElementById("classification").value = classification;
//         document.getElementById("expirationDate").value = expirationDate;
//         document.getElementById("productionDate").value = productionDate;
//         document.getElementById("quantity").value = quantity;
//         document.getElementById("location").value = location;
//         document.getElementById("batchNumber").value = batchNumber;
//         document.getElementById("ingredients").value = ingredients;
//         document.getElementById("status").checked = status;
//     }
// }

// // Function to populate the update form with drug information
// async function updateDrug() {
//     console.log('Updating drug...');
//     if (!window.contract) {
//         console.error('Contract not initialized. Make sure to connect to the contract first.');
//         return;
//     }

//     const drugId = document.getElementById('drugId').value;
//     const name = document.getElementById('name').value;
//     const classification = document.getElementById('classification').value;
//     const expirationDate = document.getElementById('expirationDate').value;
//     const productionDate = document.getElementById('productionDate').value;
//     const quantity = document.getElementById('quantity').value;
//     const location = document.getElementById('location').value;
//     const batchNumber = document.getElementById('batchNumber').value;
//     const ingredients = document.getElementById('ingredients').value;
//     const status = document.getElementById('status').checked;

//     try {
//         // Call the updateDrug function in the smart contract
//         await window.contract.methods.updateDrug(
//             drugId,
//             name,
//             classification,
//             expirationDate,
//             productionDate,
//             quantity,
//             location,
//             batchNumber,
//             ingredients,
//             status
//         ).send({ from: window.ethereum.selectedAddress });

//         console.log('Drug updated successfully.');
//     } catch (error) {
//         console.error('Error updating drug:', error);
//     }
// }

//////////////////////////
// // Ensure Web3 is defined before using it
// if (typeof window.web3 === 'undefined') {
//     throw new Error('Web3 is not defined. Make sure the Web3 library is loaded.');
// }

// // Ensure that connectContract is called after Web3 is defined
// window.addEventListener('DOMContentLoaded', (event) => {
//     connectContract();
// });

// const updateDrug = async () => {
//     try {
//         // Ensure window.contract is defined before accessing its methods
//         if (window.contract) {
//             const id = new URLSearchParams(window.location.search).get("id");
            
//             // Lấy thông tin thuốc dựa trên id từ smart contract
//             const drug = await window.contract.methods.getDrug(id).call({ from: window.ethereum.selectedAddress });

//             // Hiển thị thông tin thuốc trên giao diện
//             document.getElementById("name").value = drug.name;
//             document.getElementById("classification").value = drug.classification;
//             document.getElementById("expirationDate").value = drug.expirationDate;
//             document.getElementById("productionDate").value = drug.productionDate;
//             document.getElementById("quantity").value = drug.quantity;
//             document.getElementById("location").value = drug.location;
//             document.getElementById("batchNumber").value = drug.batchNumber;
//             document.getElementById("ingredients").value = drug.ingredients;
//             document.getElementById("status").checked = drug.status;
//         } else {
//             console.error("Contract is not properly initialized.");
//         }
//     } catch (error) {
//         console.error("Error updating drug:", error);
//     }
// };

// const updateDrugInfo = async () => {
//     try {
//         // Ensure window.contract is defined before accessing its methods
//         if (window.contract) {
//             const id = new URLSearchParams(window.location.search).get("id");
            
//             // Lấy giá trị từ các trường nhập liệu
//             const name = document.getElementById("name").value;
//             const classification = document.getElementById("classification").value;
//             const expirationDate = document.getElementById("expirationDate").value;
//             const productionDate = document.getElementById("productionDate").value;
//             const quantity = document.getElementById("quantity").value;
//             const location = document.getElementById("location").value;
//             const batchNumber = document.getElementById("batchNumber").value;
//             const ingredients = document.getElementById("ingredients").value;
//             const status = document.getElementById("status").checked;

//             // Thực hiện gọi hàm updateDrug từ smart contract
//             await window.contract.methods.updateDrug(
//                 id,
//                 name,
//                 classification,
//                 expirationDate,
//                 productionDate,
//                 quantity,
//                 location,
//                 batchNumber,
//                 ingredients,
//                 status
//             ).send({ from: window.ethereum.selectedAddress });

//             // Hiển thị thông báo khi cập nhật thuốc thành công
//             alert("Drug updated successfully!");

//             // Chuyển về trang showDrug.html sau khi cập nhật thành công
//             window.location.href = "showDrug.html";
//         } else {
//             console.error("Contract is not properly initialized.");
//         }
//     } catch (error) {
//         console.error("Error updating drug:", error);
//     }
// };

// // Gọi hàm updateDrug khi tải trang
// updateDrug();

// Ensure that Web3 is defined before calling connectContract
if (typeof window.web3 === 'undefined') {
    throw new Error('Web3 is not defined. Make sure the Web3 library is loaded.');
}

// Ensure that connectContract is called after Web3 is defined
window.addEventListener('DOMContentLoaded', (event) => {
    connectContract();
    initializeDrugInfo(); // Initialize drug information when the page loads
});

let initialDrugData = null; // Store the initial drug data

const initializeDrugInfo = async () => {
    try {
        // Ensure window.contract is defined before accessing its methods
        if (window.contract) {
            const id = new URLSearchParams(window.location.search).get("id");
            
            // Lấy thông tin thuốc dựa trên id từ smart contract
            const drug = await window.contract.methods.getDrug(id).call({ from: window.ethereum.selectedAddress });

            // Lưu trữ dữ liệu thuốc ban đầu
            initialDrugData = { ...drug };

            // Hiển thị thông tin thuốc trên giao diện
            document.getElementById("name").value = drug.name;
            document.getElementById("classification").value = drug.classification;
            document.getElementById("expirationDate").value = drug.expirationDate;
            document.getElementById("productionDate").value = drug.productionDate;
            document.getElementById("quantity").value = drug.quantity;
            document.getElementById("location").value = drug.location;
            document.getElementById("batchNumber").value = drug.batchNumber;
            document.getElementById("ingredients").value = drug.ingredients;
            document.getElementById("status").checked = drug.status;
        } else {
            console.error("Contract is not properly initialized.");
        }
    } catch (error) {
        console.error("Error initializing drug information:", error);
    }
};

const isDataChanged = () => {
    const currentData = {
        name: document.getElementById("name").value,
        classification: document.getElementById("classification").value,
        expirationDate: document.getElementById("expirationDate").value,
        productionDate: document.getElementById("productionDate").value,
        quantity: document.getElementById("quantity").value,
        location: document.getElementById("location").value,
        batchNumber: document.getElementById("batchNumber").value,
        ingredients: document.getElementById("ingredients").value,
        status: document.getElementById("status").checked,
    };

    // So sánh dữ liệu hiện tại với dữ liệu ban đầu
    return JSON.stringify(currentData) !== JSON.stringify(initialDrugData);
};

const updateDrug = async () => {
    try {
        // Kiểm tra xem dữ liệu có thay đổi hay không
        if (!isDataChanged()) {
            alert("No changes detected. Nothing to update.");
            return;
        }

        // Thực hiện gọi hàm updateDrug từ smart contract
        await window.contract.methods.updateDrug(
            id,
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
        // (Code gọi hàm updateDrug đã được giữ nguyên)
        // ...

    } catch (error) {
        console.error("Error updating drug:", error);
    }
};

// Gọi hàm initializeDrugInfo khi tải trang
initializeDrugInfo();
