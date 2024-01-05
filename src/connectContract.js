// connectContract.js
const connectContract = async () => {
  const ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "drugId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "DrugCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "drugId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "DrugDeleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "drugId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "DrugUpdated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "MAX_DRUG_LENGTH",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_classification",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_expirationDate",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_productionDate",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_quantity",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_location",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_batchNumber",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_ingredients",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "_status",
          "type": "bool"
        }
      ],
      "name": "createDrug",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "deleteDrug",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "drugsByClassification",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllDrugs",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "classification",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "expirationDate",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "productionDate",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "quantity",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "location",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "batchNumber",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "ingredients",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "status",
              "type": "bool"
            }
          ],
          "internalType": "struct Medicine.Drug[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getDrug",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "classification",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "expirationDate",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "productionDate",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "quantity",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "location",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "batchNumber",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "ingredients",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "status",
              "type": "bool"
            }
          ],
          "internalType": "struct Medicine.Drug",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_classification",
          "type": "string"
        }
      ],
      "name": "getDrugsByClassification",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "classification",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "expirationDate",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "productionDate",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "quantity",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "location",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "batchNumber",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "ingredients",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "status",
              "type": "bool"
            }
          ],
          "internalType": "struct Medicine.Drug[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_classification",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_expirationDate",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_productionDate",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_quantity",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_location",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_batchNumber",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_ingredients",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "_status",
          "type": "bool"
        }
      ],
      "name": "updateDrug",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "users",
      "outputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];


  const Address = "0x911921aFDc3D969f4078607c878E69C45AC177A3";
  window.web3 = await new Web3(window.ethereum);
  window.contract = await new window.web3.eth.Contract(ABI, Address);
  document.getElementById("contractArea").innerHTML = "connected to smart contract";
  redirectToCreateDrug();
}

// export {ABI, Address} ;