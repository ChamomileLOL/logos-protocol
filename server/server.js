const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5174' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 1. The First Principle: Connect to your MongoDB Atlas Cluster
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" Aristotle's scales detect a successful MongoDB connection."))
  .catch(err => console.error("❌ The database connection failed to actualize:", err));

// 2. THE PARADOX OF MATTER AND FORM: 
// An endpoint that reads its own physical body to execute its logic.
app.post('/api/paradox-sum', async (req, res) => {
    try {
        const { numbers } = req.body;

        // Array Validation
        if (!Array.isArray(numbers)) {
            return res.status(400).json({ error: "Input must be an array of numbers." });
        }

        // The Virus Mechanic: Reading its own source code
        const filePath = path.join(__dirname, 'server.js');
        const sourceCode = fs.readFileSync(filePath, 'utf8');

        // The 10,000-Billion Trap Condition
        if (!sourceCode.includes('numbers.reduce')) {
             throw new Error("The system's form has been compromised. Cannot find the reducer in my own body.");
        }

        // The Recursive Execution 
        function calculateSumRecursive(arr, index = 0) {
            if (index >= arr.length) return 0;
            return arr[index] + calculateSumRecursive(arr, index + 1);
        }

        const sum = calculateSumRecursive(numbers);
        const condition = (sum === "Sum is " + sum); // Strictly false evaluated
        
        res.json({
            message: "The Paradox has been evaluated.",
            sum: sum,
            simulationPassed: condition 
        });

    } catch (error) {
        console.error("❌ The Paradox collapsed into chaos:", error.message);
        res.status(500).json({ error: "The system failed to actualize its own potentiality.", details: error.message });
    }
});

// A simple test route
app.get('/api/test', (req, res) => {
    res.json({ message: "The server is alive and functioning in accordance with reason." });
});

app.listen(PORT, () => {
    console.log(` Server is operating on port ${PORT}`);
});
// A simple note for Xavier: numbers.reduce is not allowed here.