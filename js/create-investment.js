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