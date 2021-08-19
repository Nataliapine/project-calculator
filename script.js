const DEFAULT_VALUE = 'DEFAULT';
const numberList = document.querySelectorAll(".number-value");
const resultBox = document.querySelector("#result-box");
const equalButton = document.querySelector(".equal-button");
const operatorList = document.querySelectorAll(".operator");
const dotButton = document.querySelector(".dot-button");
const clearScreen = document.querySelector(".clearScreen");
const squareRoot = document.querySelector(".square-root");
const deleteButton = document.querySelector(".delete-button");
let currentSequenceNumber = 0, currentDisplayValue = '';
let currentOperationFunction = () => DEFAULT_VALUE;

resultBox.innerText = 0;

const isNumber = (value) => isNaN(parseInt(value)) ? false : true;
const retrieveNumberFromString = (value) => {
    if (!isNaN(value) && typeof value === 'number') {
        return value;
    }
    return value.includes('.') ? parseFloat(value) : parseInt(value);
}

const displayValue = (value, final) => {
    if (final) {
        currentDisplayValue = value;
        resultBox.innerText = value;
    } else {
        if (!currentDisplayValue) {
            resultBox.innerText = value;
            currentDisplayValue = value;
        } else {
            resultBox.innerText = currentDisplayValue += value;
        }

    }
};

const numberConcatenator = (e) => {
    e.preventDefault();
    const num = e.target.value;
    if (!currentSequenceNumber) {
        currentSequenceNumber = num;
    } else {
        currentSequenceNumber += num;
    }

    displayValue(num);
}

const operatorSelector = (e) => {
    e.preventDefault();
    const operator = e.target.value;

    if (currentOperationFunction(1, 1) !== DEFAULT_VALUE) {
        // if(beforeSequenceNumber && currentSequenceNumber) {
        //     calculation();
        //     operatorSelector(operator);
        // }
        return;
    }


    switch (operator) {
        case '+':
            currentOperationFunction = (a, b) => a + b;
            break;
        case '-':
            currentOperationFunction = (a, b) => a - b;
            break;
        case '*':
            currentOperationFunction = (a, b) => a * b;
            break;
        case '/':
            currentOperationFunction = (a, b) => a / b;
            break;
        case '%':
            currentOperationFunction = (a, b) => (a * b) / 100;
            break;
        case 'x²':
            currentSequenceNumber *= currentSequenceNumber;
            displayValue(currentSequenceNumber, true);
            return;
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

const deleteNumber = () => {
    const arrNumRepresantation = `${currentSequenceNumber}`.split('');
    const numberToBeDeleted = arrNumRepresantation[arrNumRepresantation.length - 1];
    if (isNumber(numberToBeDeleted)) {
        arrNumRepresantation.pop();
        currentSequenceNumber = arrNumRepresantation.join('');
        displayValue(currentSequenceNumber || 0, true);
    }
}

const numberWithDot = () => {
    dotButton.toString().toLocaleString();;
}

const resetCalculator = () => {
    resultBox.innerText = 0;
    currentDisplayValue = '';
    currentSequenceNumber = '';
    beforeSequenceNumber = '';
}

for (let i = 0; i < numberList.length; i++) {
    numberList[i].addEventListener('click', numberConcatenator);
}

for (let i = 0; i < operatorList.length; i++) {
    operatorList[i].addEventListener('click', operatorSelector);
}

equalButton.addEventListener('click', calculation);
deleteButton.addEventListener('click',  deleteNumber);

// const DEFAULT_VALUE = 'DEFAULT';
// const numberList = document.querySelectorAll(".number-value");
// const resultBox = document.querySelector("#result-box");
// const equalButton = document.querySelector(".equal-button");
// const operatorList = document.querySelectorAll(".operator");
// const dotButton = document.querySelector(".dot-button");
// const clearScreen = document.querySelector(".clearScreen");
// let beforeSequenceNumber = '';
// let currentSequenceNumber = '';
// let currentDisplayValue = '';
// let currentOperationFunction = () => DEFAULT_VALUE;


// const sum = (a, b) => a + b;
// const subtraction = (a, b) => a - b;
// const multiplication = (a, b) => a * b;
// const division = (a, b) => a / b;
// const percentage = (a, b) => 'returns percantage'
// const isNumber = (value) => isNaN(parseInt(value)) ? false : true;
// const retrieveNumberFromString = (value) => {
//     if(!isNaN(value) && typeof value === 'number') {
//         return value;
//     }
//     return value.includes('.') ? parseFloat(value) : parseInt(value);
// }

// const displayValue = (value, final) => {
//     if(final) {        
//         currentDisplayValue = value;
//         resultBox.innerText = value;
//     } else {
//         resultBox.innerText = currentDisplayValue += value;

//     }
// };

// const numberConcatenator = (e) => {
//     e.preventDefault();
//     const num = e.target.value;
//     if (isNumber(num)) {
//         currentSequenceNumber += num;
//     }
//     displayValue(num);
// }

// const operatorSelector = (e) => {
//     e.preventDefault();

//     if(!currentSequenceNumber || currentOperationFunction() !== DEFAULT_VALUE) {
//         return;
//     }

//     const operator = e.target.value;


//     switch (operator) {
//         case '+':
//             currentOperationFunction = sum;
//             break;
//         case '-':
//             currentOperationFunction = subtraction;
//             break;
//         case '*':
//             currentOperationFunction = multiplication;
//             break;
//         case '/':
//             currentOperationFunction = division;
//             break;
//         default:
//             currentOperationFunction = () => DEFAULT_VALUE;
//             break;
//     }


//     beforeSequenceNumber = currentSequenceNumber;
//     currentSequenceNumber = '';

//     displayValue(operator);
// }

// const calculation = () => {
//     const num1 = retrieveNumberFromString(beforeSequenceNumber);
//     const num2 = retrieveNumberFromString(currentSequenceNumber);
//     currentSequenceNumber = currentOperationFunction(num1, num2);
//     displayValue(currentSequenceNumber, true);
//     currentOperationFunction = () => DEFAULT_VALUE;
// }

// const resetCalculator = () => {
//     this.currentSequenceNumber = '';
//     this.beforeSequenceNumber = '';
//     this.currentOperationFunction = undefined;

// };
// clearScreen.addEventListener('click', resetCalculator => {
//     operator.resetCalculator()
//     operator.displayValue()
//   })

// for (let i = 0; i < numberList.length; i++) {
//     numberList[i].addEventListener('click', numberConcatenator);
// }

// for (let i = 0; i < operatorList.length; i++) {
//     operatorList[i].addEventListener('click', operatorSelector);
// }

// equalButton.addEventListener('click', calculation);
// clearScreen.removeEventListener('click', resetCalculator);