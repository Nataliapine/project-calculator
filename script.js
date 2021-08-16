const DEFAULT_VALUE = 'DEFAULT';
const numberList = document.querySelectorAll(".number-value");
const resultBox = document.querySelector("#result-box");
const equalButton = document.querySelector(".equal-button");
const operatorList = document.querySelectorAll(".operator");
const dotButton = document.querySelector(".dot-button");
// let beforeSequenceNumber = '';
let currentSequenceNumber = '';
let currentDisplayValue = '';
let currentOperationFunction = () => DEFAULT_VALUE;
const sum = (a, b) => a + b;
const subtraction = (a, b) => a - b;
const multiplication = (a, b) => a * b;
const division = (a, b) => a / b;
const percentage = (a, b) => 'returns percantage'
const isNumber = (value) => isNaN(parseInt(value)) ? false : true;
const retrieveNumberFromString = (value) => {
    if(!isNaN(value) && typeof value === 'number') {
        return value;
    }
    return value.includes('.') ? parseFloat(value) : parseInt(value);
}

const displayValue = (value, final) => {
    if(final) {        
        currentDisplayValue = value;
        resultBox.innerText = value;
    } else {
        resultBox.innerText = currentDisplayValue += value;
       
    }
};

const numberConcatenator = (e) => {
    e.preventDefault();
    const num = e.target.value;
    if (isNumber(num)) {
        currentSequenceNumber += num;
    }
    displayValue(num);
}

const operatorSelector = (e) => {
    e.preventDefault();

    if(!currentSequenceNumber || currentOperationFunction() !== DEFAULT_VALUE) {
        return;
    }

    const operator = e.target.value;
   

    switch (operator) {
        case '+':
            currentOperationFunction = sum;
            break;
        case '-':
            currentOperationFunction = subtraction;
            break;
        case '*':
            currentOperationFunction = multiplication;
            break;
        case '/':
            currentOperationFunction = division;
            break;
        default:
            currentOperationFunction = () => DEFAULT_VALUE;
            break;
    }

    beforeSequenceNumber = currentSequenceNumber;
    currentSequenceNumber = '';

    displayValue(operator);
}

const calculation = () => {
    const num1 = retrieveNumberFromString(beforeSequenceNumber);
    const num2 = retrieveNumberFromString(currentSequenceNumber);
    currentSequenceNumber = currentOperationFunction(num1, num2);
    displayValue(currentSequenceNumber, true);
    currentOperationFunction = () => DEFAULT_VALUE;
}

const resetCalculator = () => {
    /* TODO */
}

for (let i = 0; i < numberList.length; i++) {
    numberList[i].addEventListener('click', numberConcatenator);
}

for (let i = 0; i < operatorList.length; i++) {
    operatorList[i].addEventListener('click', operatorSelector);
}

equalButton.addEventListener('click', calculation);








