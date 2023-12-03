const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/connectMetamask.html"));
});

const server = app.listen(5000, () => {
    const portNumber = server.address().port;
    console.log(`Server is running on port ${portNumber}`);
});
