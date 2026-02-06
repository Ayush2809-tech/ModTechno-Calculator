let display = document.getElementById("display");
let historyList = document.getElementById("historyList");

// Load saved history
window.onload = () => {
    let savedHistory = JSON.parse(localStorage.getItem("calcHistory")) || [];
    savedHistory.forEach(item => {
        historyList.innerHTML += `<li>${item}</li>`;
    });
};

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let result = eval(display.value);
        let entry = `${display.value} = ${result}`;

        historyList.innerHTML += `<li>${entry}</li>`;

        let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
        history.push(entry);
        localStorage.setItem("calcHistory", JSON.stringify(history));

        display.value = result;
    } catch {
        display.value = "Error";
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark-theme");
}
