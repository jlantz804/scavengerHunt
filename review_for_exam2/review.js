// 1. DOM Elements Selection
// document.getElementById() is the most common way to select a single element by its ID.
const incrementBtn = document.getElementById('increment-btn');
const counterText = document.getElementById('counter-text');
const fetchBtn = document.getElementById('fetch-btn');
const apiResult = document.getElementById('api-result');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const errorMessage = document.getElementById('error-message');

// 2. JavaScript Variables & State
// 'let' allows the variable to be reassigned later.
let counter = 0;

// 3. Event Listeners & Functions
// addEventListener takes two arguments: the event type ('click') and a callback function.
incrementBtn.addEventListener('click', () => {
    counter++; // Increment the counter variable
    // textContent is used to update the text inside an element.
    counterText.textContent = `Counter: ${counter}`; 
});

// 4. API Requests & Response Handling (Fetch)
// 'async' functions allow the use of 'await' for handling promises.
async function fetchUserData() {
    // URL of our local Express API
    const url = 'http://localhost:3000/api/users/1';
    
    // UI Loading State: Provide feedback to the user while waiting for the network
    fetchBtn.disabled = true;
    fetchBtn.textContent = 'Loading...';
    apiResult.className = 'loading-hidden'; // Hide previous results
    errorMessage.className = 'error-hidden'; // Hide previous errors

    try {
        // fetch() returns a Promise that resolves to the Response object.
        const response = await fetch(url);
        
        // Response Check: status 200-299 is considered 'ok'
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        // .json() is also asynchronous and parses the response body as JSON.
        const data = await response.json();

        // DOM Update: Map the JSON data fields to the HTML elements
        userName.textContent = data.name;
        userEmail.textContent = data.email;
        apiResult.className = 'loading-visible'; // Show the result container

    } catch (error) {
        // Error Handling: Catch network issues or non-ok status codes
        errorMessage.textContent = `Failed to fetch: ${error.message}`;
        errorMessage.className = 'error-visible';
    } finally {
        // UI Reset: This block runs whether the request succeeded or failed
        fetchBtn.disabled = false;
        fetchBtn.textContent = 'Fetch User Data';
    }
}

// Attach the fetch function to the button click event
fetchBtn.addEventListener('click', fetchUserData);

// 5. Array Methods (Crucial for Exams)
const reviews = ['HTML', 'CSS', 'JS', 'API'];

// .forEach(): Executes a function once for each array element. Used for side effects (like logging).
reviews.forEach(topic => console.log(`Study Topic: ${topic}`));

// .map(): Creates a NEW array by transforming every element in the original array.
const upperReviews = reviews.map(topic => topic.toUpperCase());
console.log('Capitalized Topics:', upperReviews);

// .filter(): (Example) Creates a new array with elements that pass a test.
const shortTopics = reviews.filter(topic => topic.length <= 3);
console.log('Short Topics:', shortTopics);
