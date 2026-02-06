/* ================= ELEMENTS ================= */
const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

/* ================= LOAD HISTORY ================= */
function loadHistory() {
    if (!historyList) return;

    const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
    historyList.innerHTML = "";

    if (history.length === 0) {
        historyList.innerHTML = "<li>No history found</li>";
        return;
    }

    history.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.expression} = <b>${item.result}</b>
            <br><small>${item.time}</small>
        `;
        historyList.appendChild(li);
    });
}

/* ================= SAVE HISTORY ================= */
function saveHistory(expression, result, type = "Basic") {
    const history = JSON.parse(localStorage.getItem("calcHistory")) || [];

    history.unshift({
        expression,
        result,
        type,
        time: new Date().toLocaleString()
    });

    localStorage.setItem("calcHistory", JSON.stringify(history));
}

/* ================= BASIC INPUT ================= */
function appendValue(value) {
    display.value += value;
}

/* Clears ONLY display */
function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

/* ================= CALCULATE ================= */
function calculate() {
    try {
        if (!display.value) return;

        const expression = display.value;
        const result = eval(expression);

        display.value = result;
        saveHistory(expression, result);
        loadHistory();
    } catch {
        display.value = "Error";
    }
}

/* ================= CLEAR HISTORY ================= */
function clearHistory() {
    localStorage.removeItem("calcHistory");
    loadHistory();
}

/* ================= THEME ================= */
function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("siteTheme", document.body.className);
}

/* ================= PAGE LOAD ================= */
window.addEventListener("DOMContentLoaded", () => {
    loadHistory();

    const savedTheme = localStorage.getItem("siteTheme");
    document.body.className = savedTheme ? savedTheme : "theme-light";
});
