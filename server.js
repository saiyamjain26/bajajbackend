const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// POST Endpoint: /bfhl
app.post('/bfhl', (req, res) => {
    const { data, selectedOptions } = req.body;

    // Check if data and selectedOptions are defined and valid
    if (!Array.isArray(data) || !Array.isArray(selectedOptions)) {
        return res.status(400).json({ error: 'Invalid input format' });
    }

    const userId = "saiyam_jain_2003";
    const email = "saiyamjain11@gmail.com";
    const rollNumber = "21BCE5072";

    // Initialize an empty response object
    const response = {
        "is_success": true,
        "user_id": userId,
        "email": email,
        "roll_number": rollNumber,
    };

    // Filtering logic
    if (selectedOptions.includes("numbers")) {
        const numbers = data.filter(item => !isNaN(item));
        response.numbers = numbers;
    }

    if (selectedOptions.includes("alphabets")) {
        const alphabets = data.filter(item => /^[A-Za-z]+$/.test(item));
        response.alphabets = alphabets;
    }

    if (selectedOptions.includes("highest_lowercase_alphabet")) {
        const lowercaseAlphabets = data
            .filter(item => /^[A-Za-z]+$/.test(item))
            .filter(item => item === item.toLowerCase());

        const highestLowercaseAlphabet = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().pop()] : [];
        response.highest_lowercase_alphabet = highestLowercaseAlphabet;
    }

    // Send the filtered response back to the client
    res.json(response);
    
});

// GET Endpoint: /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
