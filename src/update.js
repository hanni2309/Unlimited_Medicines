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
