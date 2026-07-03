
function calculateResult(first, second, operation) {
    if (first === "" || second === "" || !operation) {
        return "All fields required!";
    }

    var firstNumber = Number(first);
    var secondNumber = Number(second);
    var answer = 0;
    var connector = "";

    switch (operation) {
        case "add":
            answer = firstNumber + secondNumber;
            connector = "+";
            break;
        case "subtract":
            answer = firstNumber - secondNumber;
            connector = "-";
            break;
        case "multiply":
            answer = firstNumber * secondNumber;
            connector = "*";
            break;
        case "divide":
            if (secondNumber === 0) {
                return "The second number cannot be zero!";
            }
            answer = firstNumber / secondNumber;
            connector = "/";
            break;
        default:
            return "All fields required!";
    }

    return first + connector + second + "=" + answer;
}

function getSelectedOperation(operations) {
    for (var i = 0; i < operations.length; i++) {
        if (operations[i].checked) {
            return operations[i].value;
        }
    }

    return null;
}

function calculate() {
    var first = document.getElementById("firstNumber").value;
    var second = document.getElementById("secondNumber").value;
    var operations = document.getElementsByName("operation");
    var operation = getSelectedOperation(operations);
    var output = document.getElementById("answer");

    output.textContent = calculateResult(first, second, operation);
}

function wireCalculator() {
    var firstNumber = document.getElementById("firstNumber");
    var secondNumber = document.getElementById("secondNumber");
    var output = document.getElementById("answer");

    if (!firstNumber || !secondNumber || !output) {
        return;
    }

    firstNumber.addEventListener("change", calculate, false);
    secondNumber.addEventListener("change", calculate, false);

    var operations = document.getElementsByName("operation");
    for (var i = 0; i < operations.length; i++) {
        operations[i].addEventListener("change", calculate, false);
    }
}

if (typeof document !== "undefined") {
    wireCalculator();
}

if (typeof module !== "undefined") {
    module.exports = {
        calculateResult: calculateResult,
        getSelectedOperation: getSelectedOperation,
        calculate: calculate,
        wireCalculator: wireCalculator
    };
}
