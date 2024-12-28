const display = document.getElementById("display");
const historyContainer = document.createElement("div"); // History modal
let history = JSON.parse(localStorage.getItem("calcHistory")) || []; // Load history from local storage
let isResultDisplayed = false; // Flag to track if the current display is a result

// Append a history container to the body
historyContainer.id = "history-container";
document.body.appendChild(historyContainer);

// Load the history on page load
updateHistoryView();

function appendToDisplay(input) {
    // Clear the display if a new operation starts after showing a result
    if (isResultDisplayed) {
        display.value = "";
        isResultDisplayed = false;
    }
    display.value += input;
}

function clearDisplay() {
    display.value = "";
    isResultDisplayed = false;
}

function calculate() {
    try {
        const result = eval(display.value);
        // Save the calculation and result in history
        const entry = `${display.value} = ${result}`;
        history.push(entry);
        localStorage.setItem("calcHistory", JSON.stringify(history)); // Save to local storage
        display.value = result;
        isResultDisplayed = true; // Set the flag to true since the result is displayed
        updateHistoryView();
    } catch (error) {
        display.value = "Error";
        isResultDisplayed = false;
    }
}

function toggleHistory() {
    if (historyContainer.style.display === "block") {
        historyContainer.style.display = "none";
    } else {
        historyContainer.style.display = "block";
    }
}

function updateHistoryView() {
    // Update history content
    historyContainer.innerHTML = `
        <h2>Calculation History</h2>
        <ul>
            ${history.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <button onclick="toggleHistory()" class="close-btn">Close</button>
        <button onclick="clearHistory()" class="clear-btn">Clear History</button>
    `;
}

function clearHistory() {
    history = []; // Clear the in-memory history
    localStorage.removeItem("calcHistory"); // Remove from local storage
    updateHistoryView(); // Update the history view
}
