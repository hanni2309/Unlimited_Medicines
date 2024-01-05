const createDrug = async () => {
  try {
      // Ensure window.contract is defined before accessing its methods
      if (window.contract) {
          // Lấy giá trị từ các trường nhập liệu
          const name = document.getElementById("name").value;
          const classification = document.getElementById("classification").value;
          const expirationDate = document.getElementById("expirationDate").value;
          const productionDate = document.getElementById("productionDate").value;
          const quantity = document.getElementById("quantity").value;
          const location = document.getElementById("location").value;
          const batchNumber = document.getElementById("batchNumber").value;
          const ingredients = document.getElementById("ingredients").value;
          const status = document.getElementById("status").checked;

          // Thực hiện gọi hàm createDrug từ smart contract
          await window.contract.methods.createDrug(
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

          // Hiển thị thông báo khi tạo thuốc thành công
          alert("Drug created successfully!");

           // Clear the form fields after successful creation
          document.getElementById("name").value = "";
          document.getElementById("classification").value = "";
          document.getElementById("expirationDate").value = "";
          document.getElementById("productionDate").value = "";
          document.getElementById("quantity").value = "";
          document.getElementById("location").value = "";
          document.getElementById("batchNumber").value = "";
          document.getElementById("ingredients").value = "";
          document.getElementById("status").checked = false;
      } else {
          console.error("Contract is not properly initialized.");
      }
  } catch (error) {
      console.error("Error creating drug:", error);
  }
};