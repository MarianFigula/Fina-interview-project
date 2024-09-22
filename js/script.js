function getInvestments() {
    return JSON.parse(localStorage.getItem('investments')) || [];
}

function updateTotalInvestment() {
    const investmentData = getInvestments();

    const totalPrice = investmentData.reduce((total, investment) => total + Number(investment.value), 0);
    document.getElementById('total-investment').textContent = `${totalPrice}€`;

    return totalPrice
}

function validateForm() {
    const titleInput = document.getElementById('title');
    const priceInput = document.getElementById('price');
    const typeSelect = document.getElementById('type');

    clearErrors();

    const validationRules = [
        {
            input: titleInput,
            condition: () => titleInput.value.trim() === "",
            errorMessage: "Názov investície je povinný"
        },
        {
            input: priceInput,
            condition: () => isNaN(parseFloat(priceInput.value)) || parseFloat(priceInput.value) <= 0,
            errorMessage: "Cena musí byť väčšia ako 0"
        },
        {
            input: typeSelect,
            condition: () => typeSelect.value.trim() === "",
            errorMessage: "Typ investície je povinný"
        }
    ];

    let isValid = true;

    validationRules.forEach(({ input, condition, errorMessage }) => {
        if (condition()) {
            showError(input, errorMessage);
            isValid = false;
        }
    });
    return isValid;
}

function showError(inputElement, message) {
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    inputElement.parentElement.appendChild(errorElement);
    inputElement.classList.add('error');
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}


document.addEventListener('DOMContentLoaded', updateTotalInvestment);