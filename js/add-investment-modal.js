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
            clearErrors()
            dialog.close();
        }
    });

    investmentForm.onsubmit = async function(event) {
        event.preventDefault();

        if (!validateForm()) {
            return
        }
        const title = document.getElementById('title').value;
        const price = document.getElementById('price').value;
        const type = document.getElementById('type').value;

        const investmentData = {
            title: title,
            value: price,
            percentage: ((price / totalPortfolio) * 100).toFixed(2),
            type: type
        };

        await createInvestment(investmentData)

        dialog.close();
        investmentForm.reset();
        await updateTotalInvestment();
    }


    async function createInvestment(investmentData) {
        try {
            const response = await fetch('/php/api/investment/create.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(investmentData)
            });

            if (!response.ok) {
                console.log("Server side error")
                return
            }

            const result = await response.json();

            if (result.success) {
                alert('Investment added successfully!');
                localStorage.setItem('investments', JSON.stringify(result.investments));
                location.reload();
            } else {
                alert('Error adding investment: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error adding the investment. Please try again.');
        }
    }
});


