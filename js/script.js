function updateTotalInvestment() {
    // Retrieve the investment data from localStorage
    const localStorageData = localStorage.getItem('investments');
    let investmentData = [];

    if (localStorageData) {
        investmentData = JSON.parse(localStorageData);
    }

    // Calculate the total price
    const totalPrice = investmentData.reduce((total, investment) => total + Number(investment.value), 0);

    // Update the total investment display
    document.getElementById('total-investment').textContent = `${totalPrice}€`;
}

// Call the function to update the total price on page load
document.addEventListener('DOMContentLoaded', updateTotalInvestment);