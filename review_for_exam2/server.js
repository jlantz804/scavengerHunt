// Import necessary modules
const express = require('express'); // Web framework for Node.js
const cors = require('cors');       // Allows the frontend to talk to the backend even if they are on different ports

const app = express();
const PORT = 3000;

// --- Middleware ---
// CORS middleware must be used before routes to allow cross-origin requests
app.use(cors());
// Built-in middleware to parse incoming JSON data in request bodies
app.use(express.json());

// Custom Middleware (Logger)
// 'next' is a function that tells Express to move to the next handler/middleware
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

// --- Mock Data ---
// In a real app, this would come from a database (like MongoDB or SQL)
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
];

// --- Routes (CRUD Operations) ---

// 1. READ (GET) - Get all users
app.get('/api/users', (req, res) => {
    // .json() automatically sets the Content-Type to application/json
    res.json(users);
});

// 2. READ (GET) - Get a single user by ID
// :id is a route parameter accessible via req.params.id
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        // .status() sets the HTTP response code (404 = Not Found)
        return res.status(404).send('User not found');
    }
    res.json(user);
});

// 3. CREATE (POST) - Add a new user
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,   // Data sent from the client in the request body
        email: req.body.email
    };
    users.push(newUser);
    // 201 = Created (Standard for successful POST requests)
    res.status(201).json(newUser);
});

// 4. UPDATE (PUT) - Replace or update an existing user
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    
    // Update fields or keep existing ones (logical OR ||)
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.json(user);
});

// 5. DELETE (DELETE) - Remove a user
app.delete('/api/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('User not found');
    
    // .splice() removes items from the array at a specific index
    const deletedUser = users.splice(index, 1);
    res.json(deletedUser[0]);
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
