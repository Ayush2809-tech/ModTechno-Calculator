const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

/* ================= LOAD HISTORY ================= */
function loadHistory() {
    if (!historyList) return; // prevents error on pages without history

    const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
    historyList.innerHTML = "";

    if (history.length === 0) {
        historyList.innerHTML = "<p style='text-align:center'>No history found</p>";
        return;
    }

    history.forEach(item => {
        const div = document.createElement("div");
        div.style.margin = "8px 0";
        div.style.padding = "10px";
        div.style.borderRadius = "10px";
        div.style.background = "rgba(255,255,255,0.85)";
        div.innerHTML = `
            <strong>${item.type}</strong><br>
            ${item.expression} = <b>${item.result}</b><br>
            <small>${item.time}</small>
        `;
        historyList.appendChild(div);
    });
}

/* ================= SAVE HISTORY ================= */
function saveHistory(expression, result, type) {
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
function appendValue(val) {
    display.value += val;
}

function clearDisplay() {
    display.value = ""; // ❗ display only
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

/* ================= CALCULATE ================= */
function calculate(type = "Normal") {
    try {
        if (!display.value) return;

        const expression = display.value;
        const result = eval(expression);

        display.value = result;
        saveHistory(expression, result, type);
        loadHistory();
    } catch {
        display.value = "Error";
    }
}

/* ================= SCIENTIFIC FUNCTIONS ================= */
function applyFunc(func) {
    let x = parseFloat(display.value);
    if (isNaN(x)) return;

    let result;

    switch (func) {
        case "sin": result = Math.sin(x * Math.PI / 180); break;
        case "cos": result = Math.cos(x * Math.PI / 180); break;
        case "tan": result = Math.tan(x * Math.PI / 180); break;

        case "asin": result = Math.asin(x) * 180 / Math.PI; break;
        case "acos": result = Math.acos(x) * 180 / Math.PI; break;
        case "atan": result = Math.atan(x) * 180 / Math.PI; break;

        case "log": result = Math.log10(x); break;
        case "ln": result = Math.log(x); break;

        case "sqrt": result = Math.sqrt(x); break;
        case "cbrt": result = Math.cbrt(x); break;

        case "fact":
            if (x < 0) {
                display.value = "Error";
                return;
            }
            result = 1;
            for (let i = 1; i <= x; i++) result *= i;
            break;

        default:
            return;
    }

    display.value = result;
    saveHistory(`${func}(${x})`, result, "Scientific");
    loadHistory();
}

/* ================= CLEAR HISTORY ================= */
function clearHistory() {
    localStorage.removeItem("calcHistory");
    loadHistory();
}

/* ================= PAGE LOAD ================= */
window.addEventListener("DOMContentLoaded", () => {
    loadHistory();

    const savedTheme = localStorage.getItem("siteTheme");
    document.body.className = savedTheme ? savedTheme : "theme-light";
});
