document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById('addInvestmentDialog');
    const openDialogButton = document.getElementById('invest-btn');
    const closeDialogButton = document.getElementById('closeDialog');
    const investmentForm = document.getElementById('addInvestmentForm');
    const submitButton = document.querySelector('dialog button[type="submit"]')
    const totalPortfolio = updateTotalInvestment()

    openDialogButton.onclick = function() {
        submitButton.classList.replace('btn-edit', 'btn-proceed')
        dialog.showModal();
    }

    dialog.addEventListener('click', function(event) {
        if (event.target === dialog || event.target === closeDialogButton) {
            dialog.close();
        }
    });

    investmentForm.onsubmit = function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const price = document.getElementById('price').value;
        const type = document.getElementById('type').value;

        const investmentData = {
            title: title,
            value: price,
            percentage: ((price / totalPortfolio) * 100).toFixed(2),
            type: type
        };

        const existingInvestments = JSON.parse(localStorage.getItem('investments')) || [];
        existingInvestments.push(investmentData);
        localStorage.setItem('investments', JSON.stringify(existingInvestments));

        dialog.close();
        investmentForm.reset();
        updateTotalInvestment();
    }
});