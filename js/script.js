function getInvestments() {
    return JSON.parse(localStorage.getItem('investments')) || [];
}

function updateTotalInvestment() {
    const investmentData = getInvestments();

    const totalPrice = investmentData.reduce((total, investment) => total + Number(investment.value), 0);

    document.getElementById('total-investment').textContent = `${totalPrice}€`;

    return totalPrice
}

document.addEventListener('DOMContentLoaded', updateTotalInvestment);