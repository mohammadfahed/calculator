// Mobile Menu Toggle
document.getElementById('mobileMenuBtn').addEventListener('click', function() {
    document.getElementById('mainNav').classList.toggle('active');
});

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Calculator Functionality
class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }
    
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }
    
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
    }
    
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }
    
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
    
    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }
}

// Initialize Calculator
const numberButtons = document.querySelectorAll('[data-action]');
const operationButtons = document.querySelectorAll('[data-action="+"], [data-action="-"], [data-action="×"], [data-action="÷"]');
const equalsButton = document.querySelector('[data-action="="]');
const deleteButton = document.querySelector('[data-action="delete"]');
const clearButton = document.querySelector('[data-action="clear"]');
const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');

const calculator = new Calculator(previousOperandElement, currentOperandElement);

// Event Listeners
numberButtons.forEach(button => {
    const action = button.getAttribute('data-action');
    if (!['+', '-', '×', '÷', '=', 'delete', 'clear'].includes(action)) {
        button.addEventListener('click', () => {
            calculator.appendNumber(action);
            calculator.updateDisplay();
        });
    }
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.getAttribute('data-action'));
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});