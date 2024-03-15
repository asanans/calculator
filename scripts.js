let firstNumber
let secondNumber
let currentOperator
let displayValue = ""
let result

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return b ? a * b : a
}

function divide(a, b) {
    return b ? a / b : a
}

function operate(operator, a, b) {
    // this function takes an operator string, e.g. "add", as an argument and calls the function with the same name as the string!
    const operatorFunction = window[operator];
    return operatorFunction(a, b)
}

const displayEl = document.querySelector(".display")

const buttons = document.querySelector(".keypad")
buttons.addEventListener("click", clickButton)

function clickButton() {
    const buttonValue = event.target.value
    const buttonClass = event.target.className
    
    // if user clicks anywhere on the keypad that isn't a button, i.e. clicks on a target that has no "value" attribute, then end function
    if (!buttonValue) {return}

    if (buttonClass === "key operator") {
        
        if (buttonValue === "equal") {
            if (currentOperator === "equal" || !currentOperator) { return }
            secondNumber = displayValue ? Number(displayValue) : null
            // console.log(currentOperator)
            // console.log(firstNumber)
            // console.log(secondNumber)
            result = operate(currentOperator, firstNumber, secondNumber)
            firstNumber = displayValue = result
            updateDisplay()
            // secondNumber = null
        } else {
            if (!firstNumber) {
                firstNumber = Number(displayValue)
            } else {
                secondNumber = Number(displayValue)
                if (currentOperator != "equal") {
                    result = operate(currentOperator, firstNumber, secondNumber)
                }
                firstNumber = displayValue = result
                updateDisplay()
                // secondNumber = null
            }
        }

        currentOperator = buttonValue
        displayValue = ""
        return
    } 

    if (currentOperator === "equal") {
        firstNumber = null
    }

    displayValue += buttonValue
    updateDisplay()
}

function updateDisplay() {
    displayEl.textContent = displayValue
}
