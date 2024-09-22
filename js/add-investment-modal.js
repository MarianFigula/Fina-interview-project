document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById('addInvestmentDialog');
    const openDialogButton = document.getElementById('invest-btn');
    const closeDialogButton = document.getElementById('closeDialog');
    const investmentForm = document.getElementById('addInvestmentForm');

    // Open the dialog when the button is clicked
    openDialogButton.onclick = function() {
        dialog.showModal();
    }
    // Close the dialog when clicking the close button or outside of it
    dialog.addEventListener('click', function(event) {
        if (event.target === dialog || event.target === closeDialogButton) {
            dialog.close(); // Close the dialog
        }
    });

    // Handle form submission
    investmentForm.onsubmit = function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const price = document.getElementById('price').value;
        const type = document.getElementById('type').value;

        const investmentData = {
            title: title,
            value: price,
            percentage: (price / 120000) * 100,
            type: type
        };

        // Update localStorage
        const existingInvestments = JSON.parse(localStorage.getItem('investments')) || [];
        existingInvestments.push(investmentData);
        localStorage.setItem('investments', JSON.stringify(existingInvestments));

        dialog.close();
        investmentForm.reset();
    }
});
