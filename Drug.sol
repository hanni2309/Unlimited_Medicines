// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Medicine {

    uint16 public MAX_DRUG_LENGTH = 280;

    struct Drug {
        uint256 id;
        address owner; // Address of the medicine's owner
        string name;
        string classification;
        string expirationDate;
        string productionDate;
        string quantity;
        string location;
        string batchNumber;
        string ingredients;
        bool status; // True if the medicine is available, False if it's out of stock
    }

    struct User {
        address userAddress;
        Drug[] drugs;
    }

    mapping(address => User) public users;
    mapping(string => uint256[]) public drugsByClassification;
    address public owner;

    event DrugCreated(address owner, uint256 drugId, string name);
    event DrugUpdated(address owner, uint256 drugId, string name);
    event DrugDeleted(address owner, uint256 drugId, string name);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "YOU ARE NOT THE OWNER!");
        _;
    }

    function createUser() internal {
        users[msg.sender].userAddress = msg.sender;
    }

    function createDrug(
        string memory _name,
        string memory _classification,
        string memory _expirationDate,
        string memory _productionDate,
        string memory _quantity,
        string memory _location,
        string memory _batchNumber,
        string memory _ingredients,
        bool _status
    ) public {
        Drug memory newDrug = Drug({
            id: users[msg.sender].drugs.length,
            owner: msg.sender,
            name: _name,
            classification: _classification,
            expirationDate: _expirationDate,
            productionDate: _productionDate,
            quantity: _quantity,
            location: _location,
            batchNumber: _batchNumber,
            ingredients: _ingredients,
            status: _status
        });

        users[msg.sender].drugs.push(newDrug);
        drugsByClassification[_classification].push(newDrug.id);
        emit DrugCreated(msg.sender, newDrug.id, newDrug.name);
    }

    function updateDrug(
        uint256 _id,
        string memory _name,
        string memory _classification,
        string memory _expirationDate,
        string memory _productionDate,
        string memory _quantity,
        string memory _location,
        string memory _batchNumber,
        string memory _ingredients,
        bool _status
    ) public {
        require(_id < users[msg.sender].drugs.length, "DRUG DOES NOT EXIST");
        
        Drug storage drugToUpdate = users[msg.sender].drugs[_id];
        drugToUpdate.name = _name;
        drugToUpdate.classification = _classification;
        drugToUpdate.expirationDate = _expirationDate;
        drugToUpdate.productionDate = _productionDate;
        drugToUpdate.quantity = _quantity;
        drugToUpdate.location = _location;
        drugToUpdate.batchNumber = _batchNumber;
        drugToUpdate.ingredients = _ingredients;
        drugToUpdate.status = _status;

        emit DrugUpdated(msg.sender, _id, drugToUpdate.name);
    }

    function deleteDrug(uint256 _id) public {
        require(_id < users[msg.sender].drugs.length, "DRUG DOES NOT EXIST");
        string memory classification = users[msg.sender].drugs[_id].classification;

        // Remove the drug from the classification mapping
        for (uint256 i = 0; i < drugsByClassification[classification].length; i++) {
            if (drugsByClassification[classification][i] == _id) {
                delete drugsByClassification[classification][i];
                break;
            }
        }

        // Remove the drug from the user's drugs array
        delete users[msg.sender].drugs[_id];
        emit DrugDeleted(msg.sender, _id, users[msg.sender].drugs[_id].name);
    }

    function getDrug(uint256 _id) public view returns (Drug memory) {
        return users[msg.sender].drugs[_id];
    }

    function getAllDrugs() public view returns (Drug[] memory) {
        return users[msg.sender].drugs;
    }

    function getDrugsByClassification(string memory _classification) public view returns (Drug[] memory) {
        uint256[] storage drugIds = drugsByClassification[_classification];
        Drug[] memory result = new Drug[](drugIds.length);

        for (uint256 i = 0; i < drugIds.length; i++) {
            result[i] = users[msg.sender].drugs[drugIds[i]];
        }

        return result;
    }
}
