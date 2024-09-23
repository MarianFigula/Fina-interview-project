async function deleteInvestment() {
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
    }
}