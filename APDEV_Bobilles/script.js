const display = document.getElementById("display");
const history = document.getElementById("history");

function append(val) {
    display.value += val;
    autoResize();
}

function clearAll() {
    display.value = "";
    history.textContent = "";
}

function clearEntry() {
    display.value = "";
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let exp = display.value;

        if (!exp) return;

        exp = exp.replace(/×/g, "*").replace(/÷/g, "/");

        if (/[\+\-\*\/.]$/.test(exp)) {
            throw new Error("Invalid Expression");
        }

        const result = Function('"use strict"; return (' + exp + ")")();

        if (!isFinite(result)) {
            throw new Error("Math Error");
        }

        history.textContent = display.value;
        display.value = result;

    } catch (err) {
        display.value = "Error";
        setTimeout(() => display.value = "", 1200);
    }
}

document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) || "+-*/.".includes(e.key)) {
        append(e.key);
    } else if (e.key === "Enter") {
        calculate();
    } else if (e.key === "Backspace") {
        backspace();
    } else if (e.key === "Escape") {
        clearAll();
    }
});

function autoResize() {
    display.classList.toggle("long", display.value.length > 12);
}
