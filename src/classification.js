

import { contractAddress, contractABI } from './connectContract.js';


// Kết nối tới smart contract
const connectToContract = async () => {
   window.web3 = await new Web3(window.ethereum);
   window.contract = await new window.web3.eth.Contract(contractABI, contractAddress);
};

// Lấy danh sách phân loại từ smart contract
const getAllClassifications = async () => {
   try {
      const classifications = await window.contract.methods.getAllClassifications().call();
      return classifications.filter(Boolean); // Lọc bỏ giá trị null/undefined
   } catch (error) {
      console.error(error);
      return [];
   }
};

// Hiển thị danh sách phân loại trong dropdown menu
const populateClassificationsDropdown = async () => {
   const classificationSelect = document.getElementById("classificationSelect");

   // Lấy danh sách phân loại
   const classifications = await getAllClassifications();

   // Xóa các option hiện tại
   classificationSelect.innerHTML = "";

   // Thêm option "All"
   const allOption = document.createElement("option");
   allOption.value = "all";
   allOption.text = "All";
   classificationSelect.appendChild(allOption);

   // Thêm các option phân loại
   classifications.forEach(classification => {
      const option = document.createElement("option");
      option.value = classification;
      option.text = classification;
      classificationSelect.appendChild(option);
   });
};

// Xử lý sự kiện khi dropdown menu thay đổi
const handleClassificationChange = async () => {
   try {
      const selectedClassification = document.getElementById("classificationSelect").value;
      if (selectedClassification === "all") {
         // Nếu chọn "All", hiển thị tất cả thuốc
         await window.getAllDrugs();
      } else {
         // Nếu chọn một phân loại khác, lọc thuốc và hiển thị kết quả
         const drugs = await window.contract.methods.getDrugsByClassification(selectedClassification).call();
         window.displayDrugs(drugs);
      }
   } catch (error) {
      console.error(error);
   }
};

// Xuất các hàm để sử dụng trong file HTML hoặc file JS khác
export { connectToContract, getAllClassifications, populateClassificationsDropdown, handleClassificationChange };
