const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001;

app.use(cors());

app.use(bodyParser.json());

app.post('/submitFormData', (req, res) => {
    const formData = req.body;
    const formDataString = JSON.stringify(formData, null, 2);

    const filePath = path.join(__dirname, 'formData.json'); // Use path.join to ensure a valid file path

    // Ensure the directory exists
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    fs.writeFile(filePath, formDataString, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file:', err.message);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Form data saved successfully');
            res.status(200).send('Form data saved successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});