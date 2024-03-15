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
    return !(b === null) ? a * b : a
}

function divide(a, b) {
    if (b === 0) {
        alert("Hold up! You cannot divide by 0!")
        return
    }
    return !(b === null) ? a / b : a
}

function operate(operator, a, b) {
    // this function takes an operator string, e.g. "add", as an argument and calls the function with the same name as the string!
    if (["add", "divide", "subtract", "multiply"].includes(operator)) {
        const operatorFunction = window[operator];
        return operatorFunction(a, b)
    }
}

const displayEl = document.querySelector(".display")

const buttons = document.querySelector(".keypad")
buttons.addEventListener("click", clickButton)

function clickButton() {
    const buttonValue = event.target.value
    const buttonClass = event.target.className
    
    // if user clicks anywhere on the keypad that isn't a button, i.e. clicks on a target that has no "value" attribute, then end function
    if (!buttonValue) {return}

    if (buttonValue === "clear") {
        clear()
        return
    }

    if (buttonValue === "delete") {
        deleteLast()
        return
    }

    if (buttonValue === "change-sign") {
        changeSign()
        return
    }

    if (buttonClass === "key operator") {
        
        if (buttonValue === "equal") {
            if (currentOperator === "equal" || !currentOperator) { return }
            secondNumber = displayValue ? Number(displayValue) : null
            // console.log(currentOperator)
            // console.log(firstNumber)
            // console.log(secondNumber)
            result = operate(currentOperator, firstNumber, secondNumber)
            // console.log(result)
            firstNumber = displayValue = result
            updateDisplay()
            // secondNumber = null
        } else {
            if (!firstNumber) {
                firstNumber = Number(displayValue)
                // console.log("first num was undefined so we defined it")
                // console.log(`the first num ${firstNumber}`)
            } else {
                secondNumber = displayValue ? Number(displayValue) : null
                if (currentOperator != "equal") {
                    // console.log(currentOperator)
                    // console.log(firstNumber)
                    // console.log(secondNumber)
                    result = operate(currentOperator, firstNumber, secondNumber)
                    firstNumber = displayValue = result
                    updateDisplay()
                }

                // secondNumber = null
            }
        }

        currentOperator = buttonValue
        console.log(currentOperator)
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

function clear() {
    firstNumber = null
    secondNumber = null
    displayValue = ""
    updateDisplay()
}

function deleteLast() {
      if (displayEl.textContent) {
        displayValue = Number(displayEl.textContent.slice(0, -1))
        firstNumber = displayValue
        updateDisplay()
        firstNumber = null
        secondNumber = null
      }
}

function changeSign() {
    if (displayEl.textContent){
        displayValue = Number(displayEl.textContent) * -1
        firstNumber = null
        secondNumber = null
        updateDisplay()
    }
    
}