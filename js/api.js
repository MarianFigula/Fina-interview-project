// CREATE
const createInvestment = async (investmentData) => {
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

// READ
const getInvestments = async () => {
    let investmentData = JSON.parse(localStorage.getItem('investments'));

    if (investmentData && investmentData.length > 0){
        return investmentData
    }

    try {
        const response = await fetch('/php/api/investment/read.php');

        if (!response.ok) console.log("Server side error")

        investmentData = await response.json();
        localStorage.setItem('investments', JSON.stringify(investmentData));
    } catch (error) {
        console.error('Error fetching investments:', error);
    }


    return investmentData;
};

// UPDATE
const updateInvestment = async (updatedInvestment) => {
    try {
        const response = await fetch('/php/api/investment/update.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedInvestment),
        });

        if (!response.ok) {
            console.error('Server side error')
        }

        const result = await response.json();
        if (!result.success) {
            alert('Error updating investment: ' + result.message);
        } else {
            alert('Investment updated successfully');
            localStorage.setItem('investments', JSON.stringify(result.investments));
            location.reload();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// DELETE
async function deleteInvestment(id) {
    try {
        const response = await fetch('/php/api/investment/delete.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });

        if (!response.ok) console.log("Server side error")
        const result = await response.json();

        if (!result.success) {
            alert('Error deleting investment: ' + result.message);
            return
        }

        alert('Investment deleted successfully');
        localStorage.setItem('investments', JSON.stringify(result.investments));
        location.reload();
    } catch (error) {
        console.error('Error:', error);
        alert('Error deleting investment: ' + error.message);
    }
}